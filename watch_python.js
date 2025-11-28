#!/usr/bin/env node
/**
 * Monitor Node.js para Python
 * Vigia Python (Bot Discord) e reinicia se cair
 */

import http from "http";
import { exec } from "child_process";

const PYTHON_HEALTH_URL = "http://localhost:5000/health";
const CHECK_INTERVAL = 15000; // 15 segundos
let consecutiveFailures = 0;

function log(msg, level = "INFO") {
  const time = new Date().toISOString();
  console.log(`[WATCH-NODE] [${time}] [${level}] ${msg}`);
}

function checkPythonHealth() {
  return new Promise((resolve) => {
    const request = http.get(PYTHON_HEALTH_URL, { timeout: 5000 }, (res) => {
      resolve(res.statusCode === 200);
    });

    request.on("error", () => resolve(false));
    request.on("timeout", () => {
      request.destroy();
      resolve(false);
    });
  });
}

function restartPython() {
  log("❌ Python não está respondendo! Forçando reinício...", "ERROR");
  exec("pkill -f 'main.py' || true", (err) => {
    if (!err) {
      log("🔄 Python.py foi reiniciado", "INFO");
      consecutiveFailures = 0;
    }
  });
}

async function monitor() {
  log("Monitor Python iniciado");
  log(`Verificando saúde a cada ${CHECK_INTERVAL / 1000}s`);
  log(`Endpoint: ${PYTHON_HEALTH_URL}`);

  setInterval(async () => {
    try {
      const isHealthy = await checkPythonHealth();

      if (isHealthy) {
        log("✅ Python respondendo normalmente", "OK");
        consecutiveFailures = 0;
      } else {
        consecutiveFailures++;
        log(`⚠️  Python não respondeu (${consecutiveFailures}x)`, "WARN");

        if (consecutiveFailures >= 2) {
          restartPython();
        }
      }
    } catch (err) {
      log(`Erro no monitor: ${err.message}`, "ERROR");
    }
  }, CHECK_INTERVAL);
}

// Graceful shutdown
process.on("SIGINT", () => {
  log("Recebido SIGINT, encerrando...", "WARN");
  process.exit(0);
});

process.on("SIGTERM", () => {
  log("Recebido SIGTERM, encerrando...", "WARN");
  process.exit(0);
});

// Inicia monitor
monitor();
