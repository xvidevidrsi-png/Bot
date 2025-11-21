# 🚀 Deploy Bot Zeus no Render (GRÁTIS + 24/7)

## ⚡ Super Rápido (5 minutos)

### **Passo 1: Push seu código no GitHub**
```bash
# Se ainda não tem repo:
git init
git add .
git commit -m "Bot Zeus pronto para deploy"
git push origin main
```

### **Passo 2: Criar conta no Render**
1. Acesse: https://render.com
2. Clique em **"Sign Up"**
3. Use sua conta GitHub (recomendado) ou email

### **Passo 3: Conectar GitHub ao Render**
1. No Render, clique em **"New +"**
2. Escolha **"Web Service"**
3. Conecte seu repositório GitHub com o código do bot
4. Selecione o repositório "bot-zeus" (ou seu repo)

### **Passo 4: Configurar o Serviço**
Preencha assim:

| Campo | Valor |
|-------|-------|
| **Name** | `bot-zeus` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `python main.py` |
| **Plan** | `Free` (grátis!) |

### **Passo 5: Adicionar Token do Bot (IMPORTANTE!)**
1. No painel do Render, vá em **"Environment"**
2. Clique em **"Add Environment Variable"**
3. Adicione:
   - **Key:** `DISCORD_TOKEN`
   - **Value:** `seu_token_bot_aqui`

> 💡 **Onde pega o token?** No Discord Developer Portal > Bot > Copy Token

### **Passo 6: Deploy!**
1. Clique em **"Create Web Service"**
2. Espere 2-3 minutos enquanto faz deploy
3. Quando aparecer **"Live"** em verde, está rodando! ✅

---

## ✅ Pronto!

Seu bot está **24/7 grátis** no Render!

### O que acontece agora:
- ✅ Bot roda SEMPRE ativo
- ✅ Reinicia automaticamente se cair
- ✅ Você não paga nada
- ✅ Grátis = 750 horas/mês (mais que 24/7!)

---

## 🐛 Se der erro:

**Erro: "ModuleNotFoundError"**
- Falta instalar dependências
- Solução: Verificar se `requirements.txt` está correto

**Erro: "DISCORD_TOKEN not found"**
- Falta configurar variável de ambiente
- Solução: Volte ao Passo 5 e adicione o token

**Bot offline**
- Clique em "Manual Deploy" no Render
- Ou faça um novo push no GitHub

---

## 📊 Monitorar Bot

No painel do Render você pode:
- Ver logs em tempo real
- Reiniciar o serviço
- Pausar/Retomar
- Ver uso de memória e CPU

**Tudo grátis! 🎉**
