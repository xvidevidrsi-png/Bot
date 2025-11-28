#!/usr/bin/env node
import { spawn, exec } from "child_process";
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

let pythonProcess = null;
let nodeProcess = null;
let isRestarting = false;

// ========== CONFIGURAÇÃO ==========
const PYTHON_SCRIPT = "main.py";
const NODE_SCRIPT = "server/index-dev.ts";
const PYTHON_HEALTH_URL = "http://localhost:5000/health";
const NODE_HEALTH_URL = "http://localhost:3000/health";
const CHECK_INTERVAL = 30000; // 30 segundos
const RESTART_TIMEOUT = 60000; // 60 segundos

// ================================

const log = (msg, type = "INFO") => {
  const time = new Date().toISOString();
  console.log(`[${time}] [${type}] ${msg}`);
};

// Health check genérico
const healthCheck = (url) => {
  return new Promise((resolve) => {
    const request = http.get(url, { timeout: 5000 }, (res) => {
      resolve(res.statusCode === 200);
    });

    request.on("error", () => resolve(false));
    request.on("timeout", () => {
      request.destroy();
      resolve(false);
    });
  });
};

// Inicia Python
const startPython = async () => {
  return new Promise((resolve) => {
    if (pythonProcess) {
      log("Matando processo Python antigo...", "WARN");
      pythonProcess.kill("SIGKILL");
      pythonProcess = null;
    }

    log("🐍 Iniciando Python (Discord Bot)...", "START");
    pythonProcess = spawn("python3", [PYTHON_SCRIPT], {
      stdio: "inherit",
      detached: false,
    });

    pythonProcess.on("error", (err) => {
      log(`Erro ao iniciar Python: ${err.message}`, "ERROR");
      resolve(false);
    });

    pythonProcess.on("exit", (code) => {
      log(`Python saiu com código: ${code}`, "WARN");
      pythonProcess = null;
    });

    // Aguarda 10 segundos para que o Python inicialize
    setTimeout(() => resolve(true), 10000);
  });
};

// Inicia Node.js
const startNode = async () => {
  return new Promise((resolve) => {
    if (nodeProcess) {
      log("Matando processo Node antigo...", "WARN");
      nodeProcess.kill("SIGKILL");
      nodeProcess = null;
    }

    log("⚙️  Iniciando Node.js (HTTP Server)...", "START");
    nodeProcess = spawn("tsx", [NODE_SCRIPT], {
      stdio: "inherit",
      detached: false,
    });

    nodeProcess.on("error", (err) => {
      log(`Erro ao iniciar Node: ${err.message}`, "ERROR");
      resolve(false);
    });

    nodeProcess.on("exit", (code) => {
      log(`Node saiu com código: ${code}`, "WARN");
      nodeProcess = null;
    });

    // Aguarda 5 segundos para que o Node inicialize
    setTimeout(() => resolve(true), 5000);
  });
};

// Monitora saúde
const monitorHealth = async () => {
  const pythonOk = await healthCheck(PYTHON_HEALTH_URL);
  const nodeOk = await healthCheck(NODE_HEALTH_URL);

  if (!pythonOk) {
    log("❌ Python não respondeu! Reiniciando...", "ERROR");
    if (!isRestarting) {
      isRestarting = true;
      await startPython();
      isRestarting = false;
    }
  }

  if (!nodeOk) {
    log("❌ Node não respondeu! Reiniciando...", "ERROR");
    if (!isRestarting) {
      isRestarting = true;
      await startNode();
      isRestarting = false;
    }
  }

  if (pythonOk && nodeOk) {
    log("✅ Ambos os serviços estão funcionando", "OK");
  }
};

// Inicializa tudo
const init = async () => {
  log("🚀 AUTO-RESTART SYSTEM INICIADO", "START");
  log(`Python Health Check: ${PYTHON_HEALTH_URL}`, "INFO");
  log(`Node Health Check: ${NODE_HEALTH_URL}`, "INFO");
  log(`Intervalo de verificação: ${CHECK_INTERVAL / 1000}s`, "INFO");

  // Inicia ambos em paralelo
  await Promise.all([startPython(), startNode()]);

  // Aguarda que iniciem
  let attempts = 0;
  while (attempts < 30) {
    const pythonOk = await healthCheck(PYTHON_HEALTH_URL);
    const nodeOk = await healthCheck(NODE_HEALTH_URL);
    if (pythonOk && nodeOk) break;
    attempts++;
    await new Promise((r) => setTimeout(r, 1000));
  }

  log("✅ Sistema pronto para monitoramento", "OK");

  // Monitor contínuo
  setInterval(monitorHealth, CHECK_INTERVAL);

  // Graceful shutdown
  process.on("SIGINT", () => {
    log("Recebido SIGINT, encerrando...", "WARN");
    if (pythonProcess) pythonProcess.kill();
    if (nodeProcess) nodeProcess.kill();
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    log("Recebido SIGTERM, encerrando...", "WARN");
    if (pythonProcess) pythonProcess.kill();
    if (nodeProcess) nodeProcess.kill();
    process.exit(0);
  });
};

// Inicia
init().catch((err) => {
  log(`Erro fatal: ${err.message}`, "ERROR");
  process.exit(1);
});
