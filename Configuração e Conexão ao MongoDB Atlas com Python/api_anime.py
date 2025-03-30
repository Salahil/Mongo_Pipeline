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

# CORS (libera para o Angular se quiser)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# MongoDB do Natan - Cluster Final
# ===============================
username = "natan22201"
password = "wuCkCIyNLyISjnkN"
password_encoded = urllib.parse.quote_plus(password)

MONGO_URI = f"mongodb+srv://{username}:{password_encoded}@cluster0.didtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(MONGO_URI)

db = client["animes_final"]
collection = db["anime_collection_final"]

# Função auxiliar
def carregar_dados():
    data = list(collection.find({}, {"_id": 0}))  # Remove o _id
    return pd.DataFrame(data)

# ========== ENDPOINTS ==========

@app.get("/")
def home():
    return {"mensagem": "API de Animes está online!"}

@app.get("/animes")
def listar_animes(limit: Optional[int] = 10):
    df = carregar_dados()
    return df.head(limit).to_dict(orient="records")

@app.get("/animes/por-genero")
def filtrar_por_genero(genero: str):
    df = carregar_dados()
    resultado = df[df["generos"].str.contains(genero, case=False, na=False)]
    return resultado.to_dict(orient="records")

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

@app.get("/animes/exportar")
def exportar_todos_os_dados():
    df = carregar_dados()
    return df.to_dict(orient="records")
