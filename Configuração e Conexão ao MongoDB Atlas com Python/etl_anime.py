# etl_anime.py
import pandas as pd
import pymongo
import urllib.parse

# Caminho real do CSV
csv_path = r"C:\Users\julio\Desktop\Não Abra (Hentai)\Coisas Importantes\Aula MongoDB\mongo-atlas-python\Configuração e Conexão ao MongoDB Atlas com Python\anime.csv"

# Ler o CSV
df = pd.read_csv(csv_path)

# Manter apenas colunas relevantes (ajuste os nomes exatos conforme a estrutura do seu CSV)
colunas_para_manter = [
    "Name", "Type", "Episodes", "Status", "Start Airing", "End Airing", "Premiered",
    "Broadcast", "Producers", "Licensors", "Studios", "Source", "Genres", "Themes",
    "Demographics", "Duration", "Rating", "Score", "Scored By", "Members"
]
df = df[colunas_para_manter]

# Renomear colunas para português
df.rename(columns={
    "Name": "nome",
    "Type": "tipo",
    "Episodes": "episodios",
    "Status": "status",
    "Start Airing": "data_inicio",
    "End Airing": "data_fim",
    "Premiered": "temporada",
    "Broadcast": "transmissao",
    "Producers": "produtores",
    "Licensors": "licenciadores",
    "Studios": "estudios",
    "Source": "fonte",
    "Genres": "generos",
    "Themes": "temas",
    "Demographics": "demografia",
    "Duration": "duracao",
    "Rating": "classificacao",
    "Score": "nota",
    "Scored By": "avaliado_por",
    "Members": "membros"
}, inplace=True)

# Preencher nulos com "Indefinido"
df.fillna("Indefinido", inplace=True)

# Conexão com MongoDB
username = "Juliokawahata"
password = "Essasenhaehboa"
password_encoded = urllib.parse.quote_plus(password)

MONGO_URI = f"mongodb+srv://{username}:{password_encoded}@clustersuspeito.twhb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSuspeito"
client = pymongo.MongoClient(MONGO_URI)
db = client["animes"]
collection = db["anime_collection"]

# Converter para JSON e enviar ao MongoDB
dados_json = df.to_dict(orient="records")
collection.insert_many(dados_json)

print("ETL finalizado com sucesso")
