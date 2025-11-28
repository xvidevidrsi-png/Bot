import express from "express";
import axios from "axios";

const app = express();

// ✅ URL DO SEU REPL - SUBSTITUA AQUI
const REPL_URL = "https://bot-zeus.repl.co/best-ping";

// Ping a cada 45 segundos
setInterval(async () => {
  try {
    const response = await axios.get(REPL_URL, { timeout: 5000 });
    console.log(`[${new Date().toISOString()}] ✅ Ping enviado - Status: ${response.status}`);
  } catch (err) {
    console.log(`[${new Date().toISOString()}] ❌ Erro ao pingar: ${err.message}`);
  }
}, 45000);

// Health check do KeepAlive
app.get("/", (req, res) => {
  res.json({ 
    status: "KeepAlive ativo e funcionando! ✅",
    repl_url: REPL_URL,
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 KeepAlive iniciado na porta ${PORT}`);
  console.log(`📡 Pingando: ${REPL_URL}`);
  console.log(`⏰ Intervalo: 45 segundos`);
});
