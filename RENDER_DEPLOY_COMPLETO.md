# 🚀 Bot Discord Zeus - Deploy Completo Render (Último Passo)

## ✅ Tudo pronto! Segue este guia e seu bot vai rodar 24/7 GRÁTIS

---

## 1️⃣ VARIÁVEIS DE AMBIENTE NECESSÁRIAS

No painel Render → Web Service → **Environment**

Clique: **Add Environment Variable** para cada uma:

### Variável obrigatória:
```
Key:   DISCORD_TOKEN
Value: seu_token_discord_aqui_sem_aspas
```

**Como pegar seu token Discord:**
1. Discord Developer Portal → your-app → Bot
2. Token section → Copy
3. Cole em DISCORD_TOKEN

### Variáveis opcionais (já têm valores padrão):
```
Opcional:
OWNER_ID = 123456789 (seu ID Discord se quiser)
```

---

## 2️⃣ BUILD E START COMMANDS (COPIAR E COLAR)

No Web Service → Settings:

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
python main.py
```

OU (alternativa com script):
```
bash start.sh
```

---

## 3️⃣ BANCO DE DADOS SQLite (JÁ CONFIGURADO)

Seu arquivo `bot/bot_zeus.db`:
- ✅ Está na raiz do repositório
- ✅ Render vai fazer backup automaticamente
- ✅ Bot acessa em: `"bot/bot_zeus.db"`

**Nada a fazer!** Render copia o arquivo automaticamente.

---

## 4️⃣ PASSO A PASSO FINAL (5 MINUTOS)

### Etapa 1: GitHub pronto
```bash
# Na pasta do seu bot:
git add .
git commit -m "Bot Zeus deploy final"
git push origin main
```

Verifique se está no GitHub:
- `main.py` ✅
- `requirements.txt` ✅
- `render.yaml` ✅
- `bot/bot_zeus.db` ✅

### Etapa 2: Render Web Service

1. Entre em: https://render.com
2. Clique: **New +**
3. Selecione: **Web Service**
4. Conecte: **Deploy from GitHub Repo**
5. Escolha seu repositório

### Etapa 3: Configure Web Service

Preencha EXATAMENTE:
```
Name:           bot-zeus
Branch:         main
Environment:    Python 3
Build Command:  pip install -r requirements.txt
Start Command:  python main.py
Region:         US East (perto do Brasil)
Plan:           Free
```

Clique: **Create Web Service**

### Etapa 4: Adicione token

Render vai começar deploy (veja logs)

Enquanto instala:
- Vá em: **Environment**
- Clique: **Add Environment Variable**

```
Key:   DISCORD_TOKEN
Value: seu_token_aqui
```

Salve. Render vai reiniciar automaticamente.

### Etapa 5: Verifique logs

- Aba: **Logs**
- Procure por: "Bot is ready" ou mensagem de sucesso
- Se vir verde = ✅ Funcionando!
- Se vir vermelho = erro (mostra qual)

---

## 5️⃣ MANTER 24H ONLINE (UptimeRobot GRÁTIS)

Render free pode hibernar. Use UptimeRobot para acordar:

1. Entre em: https://uptimerobot.com
2. Sign Up (grátis)
3. Clique: **+ Add Monitor**
4. Tipo: **HTTP(s)**

```
Monitor Name:        Bot Zeus
URL:                 https://seu-bot.onrender.com/ping
Monitoring Interval: 5 minutes
```

5. Create Monitor

**Agora bot fica online 24/7!** 🎉

---

## ✅ CHECKLIST FINAL

- [ ] Código no GitHub (main.py + requirements.txt)
- [ ] Web Service criado no Render
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `python main.py`
- [ ] DISCORD_TOKEN adicionado em Environment
- [ ] Logs verdes (bot online)
- [ ] Bot respondendo: `/manual`, `/rank`, etc
- [ ] UptimeRobot configurado
- [ ] Bot 24/7 online ✅

---

## 🎮 TESTE SEU BOT

No Discord, teste:

```
/manual          → mostra guia
/rank            → mostra ranking
/1x1-mob         → cria fila 1x1 mobile
/fila_mediadores → menu mediadores
!p               → seu perfil
```

Se tudo responder = **BOT ESTÁ ONLINE! 🚀**

---

## 🆘 ERROS COMUNS

### "ModuleNotFoundError: discord"
- requirements.txt faltando ou errado
- Solução: Verifique se tem `discord.py==2.4.0`

### "DISCORD_TOKEN not found"
- Variável de ambiente não configurada
- Solução: Adicione em Environment Variables

### "Bot is already running"
- Build command errado
- Solução: Use `pip install -r requirements.txt`

### Logs vazios
- Deploy nem começou
- Solução: Verifique se repositório está no GitHub corretamente

### Bot "acordando lento"
- Render free demora no primeiro boot
- Solução: Normal! Primeiro deploy demora 20-30s

---

## 📊 RESUMO RENDER vs Alternativas

| Serviço | Preço | Uptime | Setup |
|---------|-------|--------|-------|
| **Render** | Grátis | 24/7 com UptimeRobot | ⭐ Fácil |
| Railway | Grátis/pago | 500h/mês | ⭐ Fácil |
| Heroku | Pago | 24/7 | ⭐⭐ Médio |
| Oracle Cloud | Grátis | 24/7 ilimitado | ⭐⭐⭐ Difícil |

**Render = melhor custo-benefício para começar!**

---

## 🎉 PRONTO!

Seu Bot Discord Zeus (6704 linhas):
- ✅ Online no Render
- ✅ 24/7 com UptimeRobot
- ✅ Database SQLite funcionando
- ✅ Todos comandos rodando
- ✅ 100% GRÁTIS

**Bot está VIVO! 🚀**

Qualquer erro, verifique os logs do Render e compare com este guia.

Sucesso! 🎊
