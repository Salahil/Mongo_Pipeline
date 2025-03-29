# api_anime.py
from fastapi import FastAPI, Query
from typing import Optional
from pydantic import BaseModel
import pymongo
import urllib.parse
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="API de Animes",
    description="API para consultar e processar dados de animes do MongoDB",
    version="1.0.0"
)

# CORS caso queira liberar o front no futuro
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
username = "Juliokawahata"
password = "Essasenhaehboa"
password_encoded = urllib.parse.quote_plus(password)

MONGO_URI = f"mongodb+srv://{username}:{password_encoded}@clustersuspeito.twhb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSuspeito"
client = pymongo.MongoClient(MONGO_URI)
db = client["animes"]
collection = db["anime_collection"]

# Função auxiliar pra carregar os dados do Mongo e transformar em DataFrame
def carregar_dados():
    data = list(collection.find({}, {"_id": 0}))  # remove o _id
    return pd.DataFrame(data)

# Endpoint base
@app.get("/")
def home():
    return {"mensagem": "API de Animes está online!"}

# Endpoint para listar todos os animes
@app.get("/animes")
def listar_animes(limit: Optional[int] = 10):
    df = carregar_dados()
    return df.head(limit).to_dict(orient="records")

# Endpoint para filtrar por gênero
@app.get("/animes/por-genero")
def filtrar_por_genero(genero: str):
    df = carregar_dados()
    resultado = df[df["generos"].str.contains(genero, case=False, na=False)]
    return resultado.to_dict(orient="records")

# Endpoint para estatísticas de notas
@app.get("/animes/estatisticas")
def estatisticas_notas():
    df = carregar_dados()
    estat = df["nota"].replace("Indefinido", None)
    estat = pd.to_numeric(estat, errors='coerce').dropna()
    return {
        "média": round(estat.mean(), 2),
        "máximo": float(estat.max()),
        "mínimo": float(estat.min()),
        "mediana": float(estat.median())
    }

# Endpoint para exportar todos os dados como JSON completo
@app.get("/animes/exportar")
def exportar_todos_os_dados():
    df = carregar_dados()
    return df.to_dict(orient="records")