# ✅ Bot Discord Zeus - Guia Final para Deploy no Render

## 📋 Arquivos na raiz do repositório (CORRETOS):

```
main.py                      ✅ (6704 linhas - seu bot)
requirements.txt             ✅ (discord.py + libs)
render.yaml                  ✅ (config Render)
.gitignore                   ✅ (arquivos ignorados)
.env.example                 ✅ (template variáveis)
start.sh                     ✅ (script opcional)
bot/                         ✅ (pasta com database)
  └─ bot_zeus.db            ✅ (SQLite database)
```

## 🚀 PASSO A PASSO RENDER (7 passos)

### 1️⃣ Suba código no GitHub

```bash
git add .
git commit -m "Bot Zeus pronto para Render"
git push origin main
```

Verifique se está lá:
- main.py ✅
- requirements.txt ✅
- render.yaml ✅
- bot/bot_zeus.db ✅

### 2️⃣ Crie conta no Render

Entre em: https://render.com
- Sign Up → GitHub
- Autorize Render acessar seus repos

### 3️⃣ Novo Web Service

- Dashboard → **New +**
- Selecione: **Web Service**
- Conecte: **Deploy from GitHub Repo**
- Escolha seu repositório `bot-zeus`

### 4️⃣ Configure Web Service

Preencha EXATAMENTE assim:

```
Name:                bot-zeus
Branch:              main
Environment:         Python 3
Build Command:       pip install -r requirements.txt
Start Command:       python main.py
Region:              US East (mais próximo do Brasil)
Plan:                Free
```

Clique: **Create Web Service**

### 5️⃣ Adicione token Discord

Render vai começar o deploy (veja Logs)

Depois de começar:
- Vá em: **Environment**
- Clique: **Add Environment Variable**

```
Key:   DISCORD_BOT_TOKEN
Value: seu_token_discord_aqui
```

Clique: **Save**

### 6️⃣ Monitore os Logs

Render vai:
1. Instalar requirements.txt
2. Rodar python main.py
3. Bot conectar no Discord

Se vir verde nos logs = ✅ Funcionando!
Se vir vermelho = ❌ Erro (mostra qual é)

### 7️⃣ Configure UptimeRobot (GRÁTIS)

Para bot não hibernar no free tier:

1. Entre em: https://uptimerobot.com
2. Sign Up (grátis)
3. Clique: **+ Add Monitor**
4. Tipo: **HTTP(s)**

```
Monitor Name:        Bot Zeus
URL:                 https://seu-bot.onrender.com/ping
Monitoring Interval: 5 minutes
```

5. Clique: **Create Monitor**

Agora Render faz ping a cada 5 min → Bot nunca dorme!

---

## ✅ Checklist Final

- [ ] Código no GitHub (main, requirements, render.yaml)
- [ ] Conta Render criada
- [ ] Web Service conectado
- [ ] Start Command correto: `python main.py`
- [ ] DISCORD_BOT_TOKEN adicionado em Environment
- [ ] Logs verdes (bot rodando)
- [ ] URL do bot apareceu
- [ ] UptimeRobot configurado
- [ ] Bot respondendo no Discord

---

## 🎉 Pronto!

Bot online 24/7 no Render GRÁTIS!

Teste seus comandos:
- `/manual`
- `/rank`
- `/1x1-mob`
- `/fila_mediadores`

**Tudo funcionando! 🚀**

---

## 🆘 Se houver erro

Erros comuns:

**"ModuleNotFoundError: discord"**
→ Adicione `discord.py==2.4.0` em requirements.txt

**"No module named 'main'"**
→ Start Command está errado, use: `python main.py`

**"Build failed"**
→ Verifique se requirements.txt está perfeito (sem erros)

**Logs vazios**
→ Render nem começou build. Verifique repositório GitHub.

---

## 📞 Suporte

Se tiver dúvida:
1. Verifique os logs no Render
2. Confirme arquivo principal é `main.py`
3. Confirme `requirements.txt` existe
4. Confirme token foi adicionado em Environment Variables

Seu bot está 100% pronto! 🎉
