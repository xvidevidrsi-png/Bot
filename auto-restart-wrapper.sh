#!/bin/bash

# ============================================
# BOT ZEUS - AUTO-RESTART WRAPPER
# Monitora Python + Node e reinicia se caírem
# ============================================

echo "🚀 Iniciando Bot Zeus com Auto-Restart..."

# Mata qualquer processo anterior
pkill -f "main.py" 2>/dev/null || true
pkill -f "index-dev.ts" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true
sleep 2

# Executa o sistema de auto-restart
node auto-restart.js
