#!/usr/bin/env python3
"""
Monitor Python para Node.js
Vigia Node e reinicia se cair
"""

import time
import requests
import subprocess
import signal
import sys

NODE_HEALTH_URL = "http://localhost:3000/health"
CHECK_INTERVAL = 15  # 15 segundos
NODE_PROCESS = None

def log(msg, level="INFO"):
    print(f"[WATCH-PYTHON] [{level}] {msg}", flush=True)

def check_node_health():
    """Testa se Node está respondendo"""
    try:
        response = requests.get(NODE_HEALTH_URL, timeout=5)
        return response.status_code == 200
    except:
        return False

def signal_handler(sig, frame):
    """Graceful shutdown"""
    log("Recebido sinal de término", "WARN")
    sys.exit(0)

# Configurar signal handlers
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

log("Monitor Node.js iniciado")
log(f"Verificando saúde a cada {CHECK_INTERVAL}s")
log(f"Endpoint: {NODE_HEALTH_URL}")

# Monitor loop
consecutive_failures = 0

while True:
    try:
        if check_node_health():
            log("✅ Node.js respondendo normalmente", "OK")
            consecutive_failures = 0
        else:
            consecutive_failures += 1
            log(f"⚠️  Node não respondeu ({consecutive_failures}x)", "WARN")
            
            if consecutive_failures >= 2:
                log("❌ Node.js não está respondendo! Forçando reinício...", "ERROR")
                # Matar Node para que o servidor principal reinicie
                import os
                os.system("pkill -f 'tsx server/index-dev.ts' || true")
                os.system("pkill -f 'node' || true")
                consecutive_failures = 0
                log("🔄 Node.js foi reiniciado", "INFO")
                time.sleep(5)
        
        time.sleep(CHECK_INTERVAL)
    
    except Exception as e:
        log(f"Erro no monitor: {str(e)}", "ERROR")
        time.sleep(CHECK_INTERVAL)
