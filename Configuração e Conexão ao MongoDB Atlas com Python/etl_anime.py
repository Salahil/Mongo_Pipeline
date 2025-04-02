# etl_anime.py
import pandas as pd
import pymongo
import urllib.parse

# ===============================
# 1. Caminho do CSV atualizado
# ===============================
csv_path = r"C:\Users\sergy\OneDrive\Documentos\MeusProjetos\Mongo_Pipeline\Configuração e Conexão ao MongoDB Atlas com Python\anime.csv"
df = pd.read_csv(csv_path)

# ===============================
# 2. Seleção e Tradução de Colunas
# ===============================
colunas_para_manter = [
    "MAL_ID", "Name", "Score", "Genres", "English name", "Japanese name", "Type",
    "Episodes", "Aired", "Premiered", "Producers", "Licensors", "Studios", "Source",
    "Duration", "Rating", "Ranked", "Popularity", "Members", "Favorites",
    "Watching", "Completed", "On-Hold", "Dropped", "Plan to Watch"
]

colunas_existentes = [col for col in colunas_para_manter if col in df.columns]
df = df[colunas_existentes]

df.rename(columns={
    "MAL_ID": "id_mal",
    "Name": "nome",
    "Score": "nota",
    "Genres": "generos",
    "English name": "nome_ingles",
    "Japanese name": "nome_japones",
    "Type": "tipo",
    "Episodes": "episodios",
    "Aired": "exibido_em",
    "Premiered": "temporada",
    "Producers": "produtores",
    "Licensors": "licenciadores",
    "Studios": "estudios",
    "Source": "fonte",
    "Duration": "duracao",
    "Rating": "classificacao",
    "Ranked": "colocacao_geral",
    "Popularity": "popularidade",
    "Members": "membros",
    "Favorites": "favoritos",
    "Watching": "assistindo",
    "Completed": "completos",
    "On-Hold": "em_espera",
    "Dropped": "abandonados",
    "Plan to Watch": "planeja_assistir"
}, inplace=True)

df.fillna("Indefinido", inplace=True)

# ===============================
# 3. Conectar ao MongoDB do Trabalho Final
# ===============================
username = "natan22201"
password = "wuCkCIyNLyISjnkN"
password_encoded = urllib.parse.quote_plus(password)

MONGO_URI = f"mongodb+srv://{username}:{password_encoded}@cluster0.didtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(MONGO_URI)

db = client["animes_final"]
collection = db["anime_collection_final"]

# ===============================
# 4. Inserir os dados
# ===============================
dados_json = df.to_dict(orient="records")
collection.insert_many(dados_json)

print("Dados atualizados com sucesso no MongoDB do Trabalho Final!")
