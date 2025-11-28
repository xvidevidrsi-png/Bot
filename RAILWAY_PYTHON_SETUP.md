# 🚂 Bot Discord Zeus - Setup Railway (Python)

## 📋 Arquivos necessários ✅
- `main.py` (seu bot)
- `requirements.txt` (dependências)
- `Procfile` (como rodar no Railway)
- `bot/bot_zeus.db` (database)

## 🔧 Variáveis de Ambiente

No painel Railway, adicione:
```
DISCORD_BOT_TOKEN=seu_token_aqui
```

## 📍 Passo a Passo Railway

1. **Crie conta em railway.app** → Sign in with GitHub

2. **Novo Projeto:**
   - Clique "New Project"
   - Selecione "Deploy from GitHub Repo"
   - Escolha seu repositório

3. **Railway detecta Python automaticamente**
   - Lê `Procfile`
   - Instala `requirements.txt`
   - Roda comando do Procfile

4. **Adicione variável DISCORD_BOT_TOKEN:**
   - Vá em "Variables"
   - Clique "Add"
   - `DISCORD_BOT_TOKEN = seu_token`

5. **Deploy automático!**
   - Railway faz tudo sozinho
   - Bot fica online 24/7

## 📊 Ver Logs
- Vá em "Deployments"
- Clique no deploy ativo
- Abra "Logs"
- Vê tudo em tempo real

## ⚙️ Como o Railway roda

O arquivo `Procfile` diz ao Railway:
```
worker: python main.py
```

"Execute python main.py como worker"

É isso! Railway faz o resto.

## 🎯 Seu bot está pronto:
✅ Python 3.11+
✅ discord.py instalado
✅ Database SQLite integrado
✅ Auto-restart configurado
✅ 6704 linhas de código = sem problemas pro Railway

## 🚀 Deploy agora!

1. Suba código no GitHub
2. Conecte no Railway
3. Adicione token
4. Pronto! ✅

Bot online 24/7! 🎉
