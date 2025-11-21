import { spawn } from 'child_process';

console.log('🚀 Iniciando Bot Zeus via Node.js wrapper...');

// Spawn Python process
const pythonProcess = spawn('python', ['main.py'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

pythonProcess.on('error', (error) => {
  console.error('❌ Erro ao iniciar bot Python:', error);
  process.exit(1);
});

pythonProcess.on('exit', (code) => {
  console.log(`🔄 Bot Python finalizou com código ${code}`);
  process.exit(code || 0);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('\n⏹️ Encerrando bot...');
  pythonProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n⏹️ Encerrando bot...');
  pythonProcess.kill('SIGTERM');
});
