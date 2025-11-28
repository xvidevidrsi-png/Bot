# 🎨 Bot Discord Zeus - Setup Render

## ✅ Arquivos prontos:
- `main.py` (6704 linhas)
- `requirements.txt` (dependências)
- `render.yaml` (config Render)
- `bot/bot_zeus.db` (database)

## 📍 Passo a Passo Render

1. **Crie conta em render.com**
   - Sign up → Email + senha
   - OU Connect GitHub

2. **Novo Dashboard → New +**
   - Clique "Web Service"
   - OU "Background Worker"

3. **Conecte seu repositório**
   - Escolha "Deploy from GitHub"
   - Selecione seu repo bot-zeus
   - Render lê `render.yaml` automaticamente

4. **Configure Variável de Ambiente**
   - Name: `DISCORD_BOT_TOKEN`
   - Value: `seu_token_aqui`

5. **Deploy!**
   - Render instala dependências
   - Roda `python main.py`
   - Bot online em 2-3 minutos

## 🆓 Render Free Tier:

- ✅ 750 horas/mês (grátis)
- ⏰ Se rodar 24/7 = ~720 horas
- ⚠️ Reseta todo mês (como Railway)
- 🔄 Com UptimeRobot = aumenta uptime

## 📊 Ver Logs Render:

- Dashboard → seu projeto
- Aba "Logs"
- Vê tudo em tempo real

## ⚙️ Como Render roda:

`render.yaml` diz ao Render:
```yaml
startCommand: python main.py
```

Render faz:
1. Instala requirements.txt
2. Roda python main.py
3. Bot online!

## 🚀 Próximos Passos:

1. Suba código no GitHub
2. Crie conta Render (render.com)
3. Deploy from GitHub Repo
4. Adicione token DISCORD_BOT_TOKEN
5. Pronto! ✅

Bot online 24/7 no Render! 🎉
