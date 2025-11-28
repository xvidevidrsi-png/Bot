# 🚀 KeepAlive para Bot Zeus - Deploy na Cyclic

Este KeepAlive mantém seu Repl **100% acordado 24/7** fazendo um ping a cada 45 segundos.

---

## 📋 Passo a Passo Rápido

### 1️⃣ Escolha uma Opção

**RECOMENDADO: Node.js**
```bash
cd node-keepalive
npm install
npm start
```

**Alternativa: Python**
```bash
cd py-keepalive
pip install -r requirements.txt
python main.py
```

---

### 2️⃣ Testar Localmente (Opcional)

**Node:**
```bash
cd node-keepalive
REPL_URL="https://bot-zeus.repl.co" npm start
```

**Python:**
```bash
cd py-keepalive
export REPL_URL="https://bot-zeus.repl.co"
python main.py
```

Você verá logs a cada 45 segundos: `✅ Ping enviado`

---

### 3️⃣ Deploy na Cyclic (5 minutos)

1. **Acesse cyclic.sh** → Faça login com GitHub
2. **Create App** → Escolha **Upload Folder**
3. **Zipe e envie** a pasta `node-keepalive` ou `py-keepalive`
4. **Environment Variables:**
   - `REPL_URL` = `https://bot-zeus.repl.co`
5. **Deploy** → Aguarde
6. **Teste:** Abra a URL fornecida pela Cyclic (deve mostrar "KeepAlive ... ativo!")

---

### 4️⃣ Verificar Funcionamento

- Verifique os **logs** no painel da Cyclic
- Deve aparecer `[OK] Ping enviado...` a cada 45 segundos
- Seu **Bot Zeus ficará sempre online**

---

## 🔄 Deploy via GitHub (Automático)

1. **Crie repositório** com a pasta `node-keepalive`
2. **Cyclic → Create App → Connect GitHub**
3. **Configure REPL_URL** nas Environment Variables
4. **Deploy automático** em cada push

---

## ✅ Checklist Final

- [ ] KeepAlive rodando na Cyclic (status: Running)
- [ ] Logs mostrando pings a cada 45 segundos
- [ ] Bot Zeus sempre online no Discord
- [ ] URL do Repl correta no REPL_URL

---

## 📞 Suporte

Se o KeepAlive parar:
1. Verifique os logs no painel da Cyclic
2. Confirme se REPL_URL está correto
3. Faça novo deploy
