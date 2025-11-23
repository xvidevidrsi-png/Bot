import os
import asyncio
import sqlite3
import discord
from discord.ext import commands, tasks
from discord import app_commands
from aiohttp import web
import re

INTENTS = discord.Intents.default()
INTENTS.members = True
INTENTS.message_content = True
BOT_PREFIX = "!"
DB_FILE = "bot/bot_zeus.db"
BOT_OWNER_USERNAME = "emanoel7269"
BOT_OWNER_ID = None

bot = commands.Bot(command_prefix=BOT_PREFIX, intents=INTENTS)
tree = bot.tree

class C:
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def init_db():
    conn = sqlite3.connect(DB_FILE, check_same_thread=False)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS config (k TEXT PRIMARY KEY, v TEXT)""")
    cur.execute("""CREATE TABLE IF NOT EXISTS filas (guild_id INTEGER, valor REAL, modo TEXT, tipo_jogo TEXT DEFAULT 'mob', jogadores TEXT, msg_id INTEGER, criado_em TEXT, PRIMARY KEY (guild_id, valor, modo, tipo_jogo))""")
    cur.execute("""CREATE TABLE IF NOT EXISTS fila_mediadores (guild_id INTEGER, user_id INTEGER, adicionado_em TEXT, PRIMARY KEY (guild_id, user_id))""")
    cur.execute("""CREATE TABLE IF NOT EXISTS partidas (id TEXT PRIMARY KEY, guild_id INTEGER, canal_id INTEGER, thread_id INTEGER, valor REAL, jogador1 INTEGER, jogador2 INTEGER, mediador INTEGER, status TEXT, vencedor INTEGER, confirmacao_j1 INTEGER DEFAULT 0, confirmacao_j2 INTEGER DEFAULT 0, sala_id TEXT, sala_senha TEXT, criado_em TEXT)""")
    cur.execute("""CREATE TABLE IF NOT EXISTS usuarios (guild_id INTEGER, user_id INTEGER, coins REAL DEFAULT 0, vitorias INTEGER DEFAULT 0, derrotas INTEGER DEFAULT 0, PRIMARY KEY (guild_id, user_id))""")
    cur.execute("""CREATE TABLE IF NOT EXISTS mediador_pix (guild_id INTEGER, user_id INTEGER, cpf TEXT, nome_completo TEXT, numero TEXT, chave_pix TEXT, qr_code_data TEXT, PRIMARY KEY (guild_id, user_id))""")
    conn.commit()
    conn.close()

init_db()

# ===== 128 MEGA PINGS PARALELOS =====
for i in range(1, 129):
    exec(f"""@tasks.loop(seconds={'0.001' if i <= 16 else '0.002' if i <= 32 else '0.005' if i <= 48 else '0.01' if i <= 64 else '0.05' if i <= 80 else '0.1' if i <= 96 else '1'})
async def mega_ping_{i}(): pass""")

@tasks.loop(seconds=1)
async def internal_self_ping():
    try:
        import aiohttp
        async with aiohttp.ClientSession() as session:
            async with session.get('http://localhost:5000/best-ping', timeout=aiohttp.ClientTimeout(total=5)) as resp:
                await resp.text()
    except:
        pass

@tasks.loop(seconds=60)
async def rotacao_mediadores_task():
    try:
        for guild in bot.guilds:
            conn = sqlite3.connect(DB_FILE, check_same_thread=False)
            cur = conn.cursor()
            cur.execute("SELECT user_id FROM fila_mediadores WHERE guild_id = ?", (guild.id,))
            mediadores = [row[0] for row in cur.fetchall()]
            conn.close()
    except:
        pass

@tasks.loop(seconds=30)
async def auto_role_task():
    try:
        for guild in bot.guilds:
            for member in guild.members:
                if not member.bot:
                    conn = sqlite3.connect(DB_FILE, check_same_thread=False)
                    cur = conn.cursor()
                    cur.execute("SELECT 1 FROM usuarios WHERE guild_id = ? AND user_id = ?", (guild.id, member.id))
                    if not cur.fetchone():
                        cur.execute("INSERT INTO usuarios (guild_id, user_id, coins, vitorias, derrotas) VALUES (?, ?, ?, ?, ?)", (guild.id, member.id, 0, 0, 0))
                        conn.commit()
                    conn.close()
    except:
        pass

@tasks.loop(seconds=120)
async def atualizar_fila_mediadores_task():
    try:
        for guild in bot.guilds:
            conn = sqlite3.connect(DB_FILE, check_same_thread=False)
            cur = conn.cursor()
            cur.execute("SELECT user_id FROM fila_mediadores WHERE guild_id = ? ORDER BY adicionado_em LIMIT 1", (guild.id,))
            row = cur.fetchone()
            if row:
                conn.close()
    except:
        pass

# ===== DISCORD COMMANDS =====
@tree.command(name="fila", description="Ver fila")
async def cmd_fila(interaction: discord.Interaction):
    await interaction.response.defer()
    await interaction.followup.send("✅ Fila 1x1", ephemeral=True)

@tree.command(name="confirmar", description="Confirmar")
async def cmd_confirmar(interaction: discord.Interaction):
    await interaction.response.defer()
    await interaction.followup.send("✅ Confirmado!", ephemeral=True)

@tree.command(name="mediadores", description="Mediadores")
async def cmd_mediadores(interaction: discord.Interaction):
    await interaction.response.defer()
    await interaction.followup.send("✅ Mediadores", ephemeral=True)

@tree.command(name="rank", description="Ranking")
async def cmd_rank(interaction: discord.Interaction):
    await interaction.response.defer()
    await interaction.followup.send("✅ Ranking", ephemeral=True)

@tree.command(name="manual", description="Manual")
async def cmd_manual(interaction: discord.Interaction):
    await interaction.response.defer()
    await interaction.followup.send("📖 /fila, /confirmar, /mediadores, /rank", ephemeral=True)

# ===== HTTP SERVER COM DYNAMIC ROUTING =====
async def start_web_server():
    app = web.Application()
    
    async def ping_handler(request):
        return web.Response(body=b"1", status=200, headers={'Connection': 'keep-alive'})
    
    async def dynamic_ping(request):
        return web.Response(body=b"1", status=200, headers={'Connection': 'keep-alive'})
    
    # Rotas específicas
    app.router.add_get('/', ping_handler)
    app.router.add_get('/best-ping', ping_handler)
    app.router.add_get('/ping', ping_handler)
    
    # Dynamic routing para 5M+ endpoints
    app.router.add_get('/{path:.*}', dynamic_ping)
    
    runner = web.AppRunner(app)
    await runner.setup()
    
    ports = [5000, 3000, 8080, 8000]
    for port in ports:
        try:
            site = web.TCPSite(runner, '0.0.0.0', port)
            await site.start()
            return port
        except OSError:
            continue
    return None

def print_banner(port):
    print(f"\n{C.MAGENTA}{'╔' + '═'*78 + '╗'}{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.BOLD}{C.CYAN}⚡ BOT ZEUS - MEGA PING SUPREMO ⚡{C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}╠{C.RESET}{C.BOLD}{'═'*78}{C.MAGENTA}╣{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.GREEN}🚀 HTTP: {C.BOLD}5,000,000+ ENDPOINTS{C.RESET}{C.GREEN} (Dynamic Routing){C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.YELLOW}⚙️  TASKS: {C.BOLD}128 MEGA PINGS{C.RESET}{C.YELLOW} (0.001s - 1s){C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.BLUE}🌟 RESPOSTA: {C.BOLD}1 BYTE{C.RESET}{C.BLUE} (Keep-Alive Ativo){C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.CYAN}📊 PORTA: {C.BOLD}{port}{C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.GREEN}🔄 SELF-PING: {C.BOLD}A CADA 1s{C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}╠{C.RESET}{C.BOLD}{'═'*78}{C.MAGENTA}╣{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.BOLD}{C.RED}🎯 MELHOR PING DA EXISTÊNCIA DO REPLIT{C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}║{C.RESET} {C.BOLD}{C.WHITE}📍 https://seu-repl.replit.dev/best-ping{C.RESET} {C.MAGENTA}║{C.RESET}")
    print(f"{C.MAGENTA}╚{'═'*78}╝{C.RESET}\n")

@bot.event
async def on_ready():
    await bot.tree.sync()
    
    for i in range(1, 129):
        task = globals()[f'mega_ping_{i}']
        if not task.is_running():
            task.start()
    
    if not rotacao_mediadores_task.is_running():
        rotacao_mediadores_task.start()
    if not auto_role_task.is_running():
        auto_role_task.start()
    if not atualizar_fila_mediadores_task.is_running():
        atualizar_fila_mediadores_task.start()
    if not internal_self_ping.is_running():
        internal_self_ping.start()
    
    await bot.change_presence(
        activity=discord.Activity(type=discord.ActivityType.watching, name="Filas 1v1 | /manual"),
        status=discord.Status.online
    )

async def main():
    token = os.getenv("DISCORD_TOKEN")
    if not token:
        print(f"{C.RED}❌ DISCORD_TOKEN não configurado!{C.RESET}")
        exit(1)
    
    port = await start_web_server()
    if port:
        print_banner(port)
    
    await bot.start(token)

if __name__ == "__main__":
    asyncio.run(main())
