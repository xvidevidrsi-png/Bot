# 🚀 Bot Discord Zeus - Guia Completo Render (Pronto para Copiar e Colar)

## 📋 ANTES DE COMEÇAR

Você precisa de:
- ✅ Conta GitHub com seu bot enviado
- ✅ Token Discord do bot
- ✅ Conta Render (render.com)

---

## PASSO 1 – Criar conta no Render

1. Entre em: https://render.com
2. Clique em Sign Up
3. Use GitHub ou Google para login
4. Confirme a conta por email

---

## PASSO 2 – Conectar repositório GitHub

1. No dashboard Render, clique: **New → Web Service**
2. Clique: **Connect GitHub**
3. Autorize Render a acessar seus repos
4. Escolha o repositório do seu bot
5. Clique: **Next**

---

## PASSO 3 – Configurar o serviço (COPIA E COLA)

Preencha os campos EXATAMENTE assim:

```
Name: bot-zeus
(ou outro nome que desejar)

Branch: main
(ou a branch que você enviou)

Build Command: pip install -r requirements.txt

Start Command: python main.py

Environment: Python
(selecione Python, NÃO Node)

Region: US East
(ou a mais próxima do Brasil)

Plan: Free
(certifique-se de selecionar Free)
```

Clique: **Create Web Service**

---

## PASSO 4 – Adicionar Variáveis de Ambiente

1. Vá na aba: **Environment**
2. Procure por: **Environment Variables**
3. Clique: **Add Environment Variable**
4. Adicione:

```
Key: DISCORD_BOT_TOKEN
Value: SEU_TOKEN_AQUI
```

> ⚠️ **NÃO coloque tokens em arquivos públicos!**
> **Sempre coloque no Render → Environment Variables**

---

## PASSO 5 – Deploy Automático

Render vai:
1. Clonar seu repositório
2. Instalar dependências (requirements.txt)
3. Rodar: `python main.py`
4. Bot fica online automaticamente

**Veja os logs:**
- Clique na aba: **Logs**
- Se estiver verde = ✅ Funcionando
- Se estiver vermelho = ❌ Erro (mostra na tela)

---

## PASSO 6 – URL do seu Bot

Render fornece uma URL:
```
https://seu-bot.onrender.com
```

Use esta URL para:
- UptimeRobot ping
- Testes
- Status checks

---

## PASSO 7 – Manter 24h Online com UptimeRobot (GRÁTIS)

### Por que usar UptimeRobot?
- Render free pode "dormir" após inatividade
- UptimeRobot faz ping a cada 5 minutos
- Bot nunca dorme!

### Setup UptimeRobot (5 minutos):

1. Entre em: https://uptimerobot.com
2. Sign Up (grátis)
3. Clique: **+ Add Monitor**
4. Selecione: **HTTP(s)**

```
Monitor Name: Bot Zeus
URL: https://seu-bot.onrender.com/ping
Monitoring Interval: 5 minutes
```

5. Clique: **Create Monitor**

> Se seu bot não tiver endpoint `/ping`, vamos adicionar!

---

## 🔧 Adicionar Endpoint /ping ao Bot (Opcional)

Se quiser que UptimeRobot funcione, adicione no `main.py`:

```python
# No início do arquivo, após imports:
from flask import Flask
app_http = Flask(__name__)

@app_http.route('/ping')
def ping():
    return {'status': 'ok'}, 200

# No final do arquivo:
if __name__ == "__main__":
    from threading import Thread
    server_thread = Thread(target=lambda: app_http.run(host='0.0.0.0', port=5000), daemon=True)
    server_thread.start()
    bot.run(TOKEN)
```

---

## 📊 Resumo Final

| Item | Valor |
|------|-------|
| Custo | GRÁTIS ✅ |
| Uptime | ~24/7 com UptimeRobot |
| Horas/mês | 750 (suficiente) |
| Reinicio | Automático (reseta mês) |
| Bot Online | Sempre com UptimeRobot |

---

## ✅ Checklist Final

- [ ] Repositório GitHub criado
- [ ] Código enviado para GitHub
- [ ] Conta Render criada
- [ ] Serviço conectado (Web Service)
- [ ] DISCORD_BOT_TOKEN adicionado
- [ ] Deploy concluído (logs verdes)
- [ ] UptimeRobot configurado
- [ ] Bot online e respondendo comandos ✅

---

## 🚀 Seu Bot está ONLINE!

Teste no Discord:
- `/manual`
- `/rank`
- `/1x1-mob`
- Todos os comandos funcionarão!

**Bot 24/7 rodando no Render grátis!** 🎉
