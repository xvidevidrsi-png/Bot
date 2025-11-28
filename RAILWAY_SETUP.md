# 🚂 Bot Zeus - Setup Railway

## Pré-requisitos
- Conta Railway (railway.app)
- Discord Bot Token

## Setup em 5 passos:

### 1. Criar novo projeto
- Acesse railway.app
- Clique em "Create New Project"
- Selecione "Deploy from GitHub" OU "Empty Project"

### 2. Conectar repositório
- Se usar GitHub, autorize sua conta
- Selecione este repositório
- Railway detectará Python automaticamente

### 3. Variáveis de Ambiente
Adicione no painel Railway:
```
DISCORD_BOT_TOKEN=seu_token_aqui
```

### 4. Comando de inicialização
No `railway.toml` ou no painel, defina:
```bash
python main.py
```

### 5. Deploy!
Railway faz deploy automaticamente

## Arquivos necessários ✅
- `main.py` ✅
- `requirements.txt` ✅
- `bot/bot_zeus.db` ✅
- `start.sh` (opcional no Railway)

## Dicas Railway
- Railway mantém apps online 24/7 (no plano pago)
- Hibernação: Free tier hiberna após 7 dias de inatividade (mas Discord bot fica online)
- Persistência: Database fica seguro
- Scale automático: Não precisa configurar

## Banco de dados
- SQLite funciona, mas Railway recomenda PostgreSQL
- Para começar com SQLite tá ok
- Se precisar escalar depois: use Railway Postgres (plugin)

## Status do bot
Após deploy, Railway fornece URL:
- Bot Discord estará online automaticamente
- Todos os comandos funcionarão normalmente

Sucesso! 🚀
