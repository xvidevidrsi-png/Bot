import { spawn } from 'child_process';
import express from 'express';

const app = express();
let pythonProcess: any = null;

console.log('🚀 Iniciando Bot Zeus via Node.js wrapper com Auto-Restart...');

// Spawn Python process
const startPython = () => {
  pythonProcess = spawn('python', ['main.py'], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  pythonProcess.on('error', (error: any) => {
    console.error('❌ Erro ao iniciar bot Python:', error);
  });

  pythonProcess.on('exit', (code: number) => {
    console.log(`⚠️ Bot Python saiu com código ${code}`);
    console.log('🔄 Reiniciando Python em 2 segundos...');
    
    // Reiniciar Python infinitamente
    setTimeout(() => {
      startPython();
    }, 2000);
  });
};

// Endpoints HTTP para saúde e ping
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    bot: 'Zeus Node Wrapper',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/ping', (req, res) => {
  res.send('1');
});

app.get('/best-ping', (req, res) => {
  res.send('1');
});

app.get('/', (req, res) => {
  res.json({
    bot: 'Bot Zeus',
    status: 'running',
    endpoints: ['/health', '/ping', '/best-ping'],
    message: 'Bot está online e funcionando'
  });
});

// Iniciar servidor HTTP na porta 3000 (Python usa 5000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ HTTP Server Node.js na porta ${PORT}`);
  console.log('📡 Endpoints: /health, /ping, /best-ping');
  console.log(`🐍 Python rodará na porta 5000`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} em uso! Aguardando 3s...`);
    setTimeout(() => {
      process.exit(1);
    }, 3000);
  }
});

// Iniciar Python
startPython();

// Handle termination signals
process.on('SIGINT', () => {
  console.log('\n⏹️ Encerrando bot...');
  if (pythonProcess) pythonProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⏹️ Encerrando bot...');
  if (pythonProcess) pythonProcess.kill('SIGTERM');
  process.exit(0);
});
