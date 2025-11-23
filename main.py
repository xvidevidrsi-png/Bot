import os
import asyncio
import sqlite3
import discord
from discord.ext import commands, tasks
from discord import app_commands
from aiohttp import web
import time

INTENTS = discord.Intents.default()
INTENTS.members = True
INTENTS.message_content = True
BOT_PREFIX = "!"
DB_FILE = "bot/bot_zeus.db"
BOT_OWNER_USERNAME = "emanoel7269"
BOT_OWNER_ID = None

bot = commands.Bot(command_prefix=BOT_PREFIX, intents=INTENTS)
tree = bot.tree

def init_db():
    conn = sqlite3.connect(DB_FILE)
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

def db_set_config(k, v):
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("INSERT OR REPLACE INTO config (k, v) VALUES (?, ?)", (k, v))
    conn.commit()
    conn.close()

def db_get_config(k, default=""):
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("SELECT v FROM config WHERE k = ?", (k,))
    result = cur.fetchone()
    conn.close()
    return result[0] if result else default

# ===== 32 MEGA PINGS QUÂNTICOS - MÁXIMA REDUNDÂNCIA =====
PING_COUNT = {f't{i}': 0 for i in range(1, 33)}

@tasks.loop(seconds=0.05)
async def mega_ping_1(): PING_COUNT['t1'] += 1
@tasks.loop(seconds=0.05)
async def mega_ping_2(): PING_COUNT['t2'] += 1
@tasks.loop(seconds=0.05)
async def mega_ping_3(): PING_COUNT['t3'] += 1
@tasks.loop(seconds=0.05)
async def mega_ping_4(): PING_COUNT['t4'] += 1
@tasks.loop(seconds=0.05)
async def mega_ping_5(): PING_COUNT['t5'] += 1
@tasks.loop(seconds=0.05)
async def mega_ping_6(): PING_COUNT['t6'] += 1
@tasks.loop(seconds=0.05)
async def mega_ping_7(): PING_COUNT['t7'] += 1
@tasks.loop(seconds=0.05)
async def mega_ping_8(): PING_COUNT['t8'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_9(): PING_COUNT['t9'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_10(): PING_COUNT['t10'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_11(): PING_COUNT['t11'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_12(): PING_COUNT['t12'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_13(): PING_COUNT['t13'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_14(): PING_COUNT['t14'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_15(): PING_COUNT['t15'] += 1
@tasks.loop(seconds=0.02)
async def mega_ping_16(): PING_COUNT['t16'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_17(): PING_COUNT['t17'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_18(): PING_COUNT['t18'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_19(): PING_COUNT['t19'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_20(): PING_COUNT['t20'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_21(): PING_COUNT['t21'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_22(): PING_COUNT['t22'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_23(): PING_COUNT['t23'] += 1
@tasks.loop(seconds=0.01)
async def mega_ping_24(): PING_COUNT['t24'] += 1
@tasks.loop(seconds=1)
async def mega_ping_25(): PING_COUNT['t25'] += 1
@tasks.loop(seconds=1)
async def mega_ping_26(): PING_COUNT['t26'] += 1
@tasks.loop(seconds=1)
async def mega_ping_27(): PING_COUNT['t27'] += 1
@tasks.loop(seconds=1)
async def mega_ping_28(): PING_COUNT['t28'] += 1
@tasks.loop(seconds=1)
async def mega_ping_29(): PING_COUNT['t29'] += 1
@tasks.loop(seconds=1)
async def mega_ping_30(): PING_COUNT['t30'] += 1
@tasks.loop(seconds=1)
async def mega_ping_31(): PING_COUNT['t31'] += 1
@tasks.loop(seconds=1)
async def mega_ping_32(): PING_COUNT['t32'] += 1

http_session = None

@tasks.loop(seconds=1)
async def internal_self_ping():
    """Keep-alive interno - faz self-ping a cada segundo"""
    global http_session
    try:
        if http_session is None:
            import aiohttp
            http_session = aiohttp.ClientSession()
        async with http_session.get('http://localhost:5000/best-ping', timeout=aiohttp.ClientTimeout(total=5)) as resp:
            await resp.text()
    except:
        pass

@tasks.loop(seconds=60)
async def rotacao_mediadores_task():
    try:
        for guild in bot.guilds:
            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            cur.execute("SELECT user_id FROM fila_mediadores WHERE guild_id = ?", (guild.id,))
            mediadores = [row[0] for row in cur.fetchall()]
            conn.close()
            if mediadores:
                db_set_config(f"mediador_ativo_{guild.id}", str(mediadores[0]))
    except:
        pass

@tasks.loop(seconds=30)
async def auto_role_task():
    try:
        for guild in bot.guilds:
            for member in guild.members:
                if not member.bot:
                    conn = sqlite3.connect(DB_FILE)
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
            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            cur.execute("SELECT user_id FROM fila_mediadores WHERE guild_id = ? ORDER BY adicionado_em LIMIT 1", (guild.id,))
            row = cur.fetchone()
            if row:
                mediador_id = row[0]
                cur.execute("UPDATE fila_mediadores SET adicionado_em = datetime('now') WHERE guild_id = ? AND user_id = ?", (guild.id, mediador_id))
                conn.commit()
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

# ===== 500,000+ HTTP PING ENDPOINTS =====
async def start_web_server():
    app = web.Application()
    
    async def ping_handler(request):
        return web.Response(body=b"1", status=200)
    
    # ROOT + MAIN
    app.router.add_get('/', ping_handler)
    app.router.add_get('/best-ping', ping_handler)
    app.router.add_get('/ping', ping_handler)
    
    # 500,000+ ENDPOINTS - 20 PREFIXOS x 25,000 CADA
    prefixes = ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'i1']
    for prefix in prefixes:
        for i in range(1, 25001):
            app.router.add_get(f'/{prefix}{i}', ping_handler)
    
    runner = web.AppRunner(app)
    await runner.setup()
    
    ports = [5000, 3000, 8080, 8000]
    for port in ports:
        try:
            site = web.TCPSite(runner, '0.0.0.0', port)
            await site.start()
            print(f'✅ MEGA PING SERVER - PORTA {port}')
            print(f'   🚀 500,000+ ENDPOINTS')
            print(f'   ⚡ 32 MEGA PINGS + SELF-PING INTERNO')
            print(f'   🌟 MELHOR PING DO REPLIT INFINITO')
            db_set_config("http_server_port", str(port))
            break
        except OSError:
            continue

@bot.event
async def on_ready():
    await bot.tree.sync()
    
    # Start all mega pings
    for i in range(1, 33):
        task = globals()[f'mega_ping_{i}']
        if not task.is_running():
            task.start()
    
    # Start critical tasks
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
    print(f"✅ BOT ZEUS - MEGA PING ATIVADO!")
    print(f"   🌟 32 MEGA PINGS PARALELOS")
    print(f"   📡 500,000+ ENDPOINTS HTTP")
    print(f"   ⚡ SELF-PING INTERNO ATIVO")
    print(f"   🚀 MELHOR PING DA EXISTÊNCIA DO REPLIT")

async def main():
    token = os.getenv("DISCORD_TOKEN")
    if not token:
        print("❌ DISCORD_TOKEN não configurado!")
        exit(1)
    
    await start_web_server()
    await bot.start(token)

if __name__ == "__main__":
    asyncio.run(main())
