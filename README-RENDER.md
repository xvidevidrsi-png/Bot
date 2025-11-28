# 🚀 Bot Discord Zeus - Deploy Render

## Status: 100% Pronto ✅

Bot adaptado completamente para rodar no Render free tier.

## Como fazer deploy:

1. **GitHub:**
   ```bash
   git push origin main
   ```

2. **Render (render.com):**
   - New Project → Deploy from GitHub
   - Escolha repositório `bot-zeus`
   - Render lê `render.yaml` automaticamente ✅

3. **Adicione token:**
   - Environment Variables
   - `DISCORD_TOKEN = seu_token_discord`

4. **Deploy automático!**

## Arquivos:
- ✅ `main.py` (6680 linhas)
- ✅ `requirements.txt` (sem qrcode/pillow)
- ✅ `render.yaml` (config automática)
- ✅ `bot/bot_zeus.db` (database)

## Funcionalidades:
- ✅ Filas (1v1, 2x2, 3x3, 4x4)
- ✅ Mediadores + PIX
- ✅ Ranking
- ✅ Logs
- ✅ Auto-restart 60 dias
- ✅ Todos os comandos

## Manter 24/7:
Configure UptimeRobot para fazer ping a cada 5 min.

**Bot pronto para produção!** 🎉
