#!/bin/bash

# ============================================
# BOT ZEUS - LAUNCHER FINAL
# Sistema de estabilidade máxima
# Orquestra Python + Node com auto-restart
# ============================================

echo "🚀 Iniciando BOT ZEUS - Sistema de Estabilidade Máxima"
echo "=================================================="

# Mata qualquer processo anterior
pkill -f "main.py" 2>/dev/null || true
pkill -f "index-dev" 2>/dev/null || true
pkill -f "watch_" 2>/dev/null || true
sleep 1

# 1. Inicia monitor Python (vigia o Node)
echo "[1/3] Iniciando monitor Python (vigia Node)..."
python3 watch_node.py &
PY_WATCH_PID=$!
echo "      PID: $PY_WATCH_PID"

# 2. Inicia monitor Node (vigia o Python)
echo "[2/3] Iniciando monitor Node (vigia Python)..."
node watch_python.js &
NODE_WATCH_PID=$!
echo "      PID: $NODE_WATCH_PID"

# 3. Aguarda um momento para que os monitores se iniciem
sleep 2

# 4. Inicia Node.js server (envolve Python)
echo "[3/3] Iniciando Node.js server (envolve Python)..."
NODE_ENV=development npx tsx server/index-dev.ts

# Se chegou aqui, algo falhou
echo "❌ Server principal encerrou. Reiniciando em 3s..."
sleep 3
exec bash start.sh
