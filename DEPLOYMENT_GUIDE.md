# 🤖 Bot Zeus - Deploy em VPS Grátis

## Opção 1: Oracle Cloud (MELHOR - Grátis Permanente)

### 1️⃣ Criar Conta
- Acesse: https://www.oracle.com/cloud/free/
- Crie conta (precisa cartão, mas NÃO COBRA)
- Cria uma VPS grátis "Always Free" (Ubuntu 22.04)

### 2️⃣ Conectar via SSH
```bash
ssh ubuntu@seu-ip-da-vps
```

### 3️⃣ Instalar Python e Dependências
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv git
```

### 4️⃣ Clonar ou Copiar Bot
```bash
mkdir -p ~/bot-zeus && cd ~/bot-zeus
# Copie seu main.py aqui (use SCP ou cole direto)
# scp main.py ubuntu@seu-ip:/home/ubuntu/bot-zeus/
```

### 5️⃣ Instalar Dependências do Bot
```bash
python3 -m venv venv
source venv/bin/activate
pip install discord.py python-dotenv
```

### 6️⃣ Criar Arquivo .env (Sua chave secreta)
```bash
nano .env
```
Cole isso:
```
DISCORD_TOKEN=seu_token_aqui
```
Salve com Ctrl+X, depois Y, depois Enter

### 7️⃣ Testar Bot
```bash
source venv/bin/activate
python3 main.py
```
Se funcionar, pressione Ctrl+C para parar

### 8️⃣ Rodar 24/7 com Systemd (Automático na reinicialização)

Crie arquivo de serviço:
```bash
sudo nano /etc/systemd/system/bot-zeus.service
```

Cole isso:
```ini
[Unit]
Description=Bot Zeus Discord Bot
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/bot-zeus
Environment="PATH=/home/ubuntu/bot-zeus/venv/bin"
ExecStart=/home/ubuntu/bot-zeus/venv/bin/python3 /home/ubuntu/bot-zeus/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Salve (Ctrl+X, Y, Enter) e depois:
```bash
sudo systemctl enable bot-zeus
sudo systemctl start bot-zeus
sudo systemctl status bot-zeus
```

Para ver logs:
```bash
sudo journalctl -u bot-zeus -f
```

---

## Opção 2: Render.com (Alternativa Mais Fácil)

1. Acesse: https://render.com
2. Crie conta com GitHub
3. Crie novo "Web Service"
4. Conecte seu repositório GitHub (push seu main.py lá)
5. Configure:
   - Build: `pip install -r requirements.txt`
   - Start: `python main.py`
6. Pronto! Roda 24/7 com 750 horas/mês grátis

---

## Qual Escolher?

| Aspecto | Oracle Cloud | Render |
|---|---|---|
| **Custo** | ✅ Grátis Permanente | ✅ Grátis (750h/mês) |
| **Facilidade** | 📌 Um pouco complexo | ✅ Muito fácil |
| **Recursos** | ✅ Melhor (2CPU, 12GB) | 📌 Limitado |
| **Downtime** | 📌 Praticamente zero | 📌 Pode reiniciar |

**Recomendação:** Use Oracle Cloud se quiser garantia total. Use Render se quiser simplicidade.

---

## Checklist Final

- [ ] Token do bot configurado em .env
- [ ] main.py copiado para VPS
- [ ] Dependências instaladas (`discord.py`, `python-dotenv`)
- [ ] Bot testado localmente antes de deploy
- [ ] Serviço systemd criado e ativado (Oracle) OU deploy feito no Render
- [ ] Verificar logs para confirmar que está rodando

---

**Dúvidas? Teste com `python3 main.py` primeiro!**
