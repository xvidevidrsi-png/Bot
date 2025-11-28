#!/bin/bash

# ============================================
# BOT ZEUS - LAUNCHER ESSENCIAL PARA CYCLIC
# Apenas Python - sem Node.js wrapper
# ============================================

echo "🚀 Iniciando BOT ZEUS"
echo "===================="

# Mata qualquer processo anterior
pkill -f "main.py" 2>/dev/null || true
sleep 1

# Inicia bot Python diretamente
echo "▶️ Iniciando bot Discord..."
python3 main.py

# Se chegou aqui, algo falhou
echo "❌ Bot encerrou. Reiniciando em 5s..."
sleep 5
exec bash start.sh
