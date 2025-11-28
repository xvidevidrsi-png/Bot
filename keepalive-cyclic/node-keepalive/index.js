import express from "express";
import axios from "axios";

const app = express();

// ========== CONFIGURAÇÃO ==========
// URL do seu Repl - pode usar variável de ambiente
const REPL_URL = process.env.REPL_URL || "https://bot-zeus.repl.co";
// ================================

// Intervalo de 45 segundos (discreto e eficiente)
const INTERVAL_MS = 45000;

// Ping automático a cada 45 segundos
setInterval(async () => {
  try {
    await axios.get(REPL_URL, { timeout: 10000 });
    console.log(`[${new Date().toISOString()}] ✅ Ping enviado para: ${REPL_URL}`);
  } catch (err) {
    console.log(`[${new Date().toISOString()}] ❌ Erro ao pingar: ${err.message || err}`);
  }
}, INTERVAL_MS);

// Endpoint para verificar status do KeepAlive
app.get("/", (req, res) => {
  res.json({
    status: "KeepAlive Node ativo! ✅",
    repl_url: REPL_URL,
    interval_seconds: INTERVAL_MS / 1000,
    uptime: process.uptime()
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 KeepAlive rodando na porta ${port}`);
  console.log(`📡 Pingando: ${REPL_URL}`);
  console.log(`⏰ Intervalo: ${INTERVAL_MS / 1000} segundos`);
});
