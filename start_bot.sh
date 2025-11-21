#!/bin/bash
# Script para iniciar o Bot Zeus Discord
echo "🚀 Iniciando Bot Zeus Discord..."
echo "📁 Diretório: $(pwd)"
echo "🐍 Python: $(python --version)"
echo ""

# Inicializar banco de dados se necessário
python -c "from main import init_db; init_db()" 2>/dev/null || true

# Iniciar bot
exec python main.py
