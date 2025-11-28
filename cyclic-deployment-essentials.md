# 🚀 Bot Zeus - Guia Essencial para Cyclic

## O que foi removido (Replit-specific):
- ❌ Node.js wrapper (`server/index-dev.ts`)
- ❌ Python/Node watch scripts (`watch_node.py`, `watch_python.js`)
- ❌ Keepalive endpoints desnecessários
- ❌ Endpoints HTTP para ping/health

## O que foi mantido (essencial):
- ✅ `main.py` - Bot Discord completo
- ✅ `start.sh` - Script simples para iniciar
- ✅ `bot.db` - Database SQLite
- ✅ Todas as funcionalidades do bot

## Setup no Cyclic:

### 1. Variáveis de Ambiente
Adicione no Cyclic:
```
DISCORD_BOT_TOKEN=seu_token_aqui
```

### 2. Comando de Inicialização
```bash
bash start.sh
```

ou diretamente:
```bash
python3 main.py
```

### 3. Requisitos
- Python 3.11+
- Dependências: discord.py, python-dotenv, etc (veja requirements.txt)

## Arquivo bot.db
- Localização: `./bot/bot_zeus.db`
- Backup automático recomendado antes de deploy
- SQLite3 - sem dependências externas

## Notas Importantes
- O bot usa SQLite (arquivo local) para dados - ideal para Cyclic free
- Sem Node.js overhead - mais leve e rápido
- Autorestart de fila a cada 60 dias (automático)
- Suporta 24/7 com economia de recursos

## Se precisar adicionar keepalive para Cyclic:
Adicione endpoint no main.py:
```python
@app.get('/ping')
async def ping():
    return {'status': 'ok'}
```

E crie cron job em Cyclic para chamar a cada 25 minutos.
