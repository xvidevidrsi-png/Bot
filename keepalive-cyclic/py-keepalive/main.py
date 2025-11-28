import time
import threading
import requests
import os
from datetime import datetime
from flask import Flask

app = Flask(__name__)

# ========== CONFIGURAÇÃO ==========
REPL_URL = os.getenv("REPL_URL", "https://bot-zeus.repl.co")
# ================================

INTERVAL = 45  # segundos

def keep_alive():
    """Thread que faz ping a cada 45 segundos"""
    while True:
        try:
            response = requests.get(REPL_URL, timeout=10)
            print(f"[{datetime.now().isoformat()}] ✅ Ping enviado - Status: {response.status_code}")
        except Exception as e:
            print(f"[{datetime.now().isoformat()}] ❌ Erro ao pingar: {str(e)}")
        time.sleep(INTERVAL)

@app.route("/")
def home():
    return {
        "status": "KeepAlive Python ativo! ✅",
        "repl_url": REPL_URL,
        "interval_seconds": INTERVAL,
        "uptime": time.time()
    }

@app.route("/health")
def health():
    return {"ok": True}

if __name__ == "__main__":
    # Inicia thread de keep-alive em background
    t = threading.Thread(target=keep_alive, daemon=True)
    t.start()
    
    # Inicia servidor Flask
    port = int(os.environ.get("PORT", 3000))
    print(f"🚀 KeepAlive rodando na porta {port}")
    print(f"📡 Pingando: {REPL_URL}")
    print(f"⏰ Intervalo: {INTERVAL} segundos")
    
    app.run(host="0.0.0.0", port=port)
