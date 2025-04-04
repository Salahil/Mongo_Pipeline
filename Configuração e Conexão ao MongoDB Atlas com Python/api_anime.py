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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

username = "natan22201"
password = "wuCkCIyNLyISjnkN"
password_encoded = urllib.parse.quote_plus(password)

MONGO_URI = f"mongodb+srv://{username}:{password_encoded}@cluster0.didtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(MONGO_URI)

db = client["animes_final"]
collection = db["anime_collection_final"]

def carregar_dados():
    data = list(collection.find({}, {"_id": 0}))
    return pd.DataFrame(data)

@app.get("/")
def home():
    return {"mensagem": "API de Animes está online!"}

@app.get("/animes")
def listar_animes(limit: Optional[int] = 10):
    df = carregar_dados()
    return df.head(limit).to_dict(orient="records")

@app.get("/animes/exportar")
def exportar_todos_os_dados():
    df = carregar_dados()
    return df.to_dict(orient="records")

@app.get("/animes/top-assistidos")
def top_assistidos():
    df = carregar_dados()
    df['assistindo'] = pd.to_numeric(df['assistindo'], errors='coerce')
    top = df.sort_values(by='assistindo', ascending=False).head(20)
    return top[["nome", "nome_ingles", "generos", "nota", "assistindo", "membros", "completos", "favoritos", "planeja_assistir"]].to_dict(orient="records")

@app.get("/animes/distribuicao-genero")
def distribuicao_genero():
    df = carregar_dados()
    generos_expandido = df.dropna(subset=['generos']).copy()
    generos_expandido["generos"] = generos_expandido["generos"].str.split(", ")
    exploded = generos_expandido.explode("generos")
    genero_counts = exploded["generos"].value_counts().reset_index()
    genero_counts.columns = ["genero", "quantidade"]

    media_membros = exploded.groupby("generos")["membros"].mean().reset_index(name="media_membros")
    media_popularidade = exploded.groupby("generos")["popularidade"].mean().reset_index(name="media_popularidade")

    return {
        "contagem_generos": genero_counts.to_dict(orient="records"),
        "media_membros": media_membros.to_dict(orient="records"),
        "media_popularidade": media_popularidade.to_dict(orient="records")
    }

@app.get("/animes/popularidade-tempo")
def popularidade_tempo():
    df = carregar_dados()

    # Remove valores "Unknown" na coluna 'temporada'
    df = df[df["temporada"] != "Unknown"]

    # Converte a coluna 'popularidade' para numérico
    df["popularidade"] = pd.to_numeric(df["popularidade"], errors="coerce")

    # Remove linhas com NaN após conversão ou ausência de dados
    df = df.dropna(subset=['temporada', 'popularidade'])

    # Agrupamento para média por temporada
    agrupado = df.groupby("temporada")["popularidade"].mean().reset_index()

    # Dados para o boxplot
    boxplot_data = df[['temporada', 'popularidade']]

    return {
        "popularidade_media_temporada": agrupado.to_dict(orient="records"),
        "distribuicao_boxplot": boxplot_data.to_dict(orient="records")
    }


@app.get("/animes/correlacoes")
def correlacoes():
    df = carregar_dados()
    colunas = ["favoritos", "completos", "planeja_assistir", "assistindo", "em_espera", "abandonados"]
    df_corr = df[colunas].corr()
    radar_data = df[colunas].mean().reset_index()
    radar_data.columns = ["status", "media"]
    return {
        "heatmap": df_corr.to_dict(),
        "radar": radar_data.to_dict(orient="records")
    }

@app.get("/animes/score-vs-popularidade")
def score_vs_popularidade():
    df = carregar_dados()
    df = df.dropna(subset=["nota", "popularidade", "membros"])
    df["nota"] = pd.to_numeric(df["nota"], errors="coerce")
    return df[["nome", "nome_ingles", "nota", "popularidade", "membros"]].dropna().to_dict(orient="records")

@app.get("/animes/comparar-tipos")
def comparar_tipos():
    df = carregar_dados()

    # Garante que as colunas estejam presentes
    colunas = ["tipo", "nota", "membros", "popularidade"]
    df = df.dropna(subset=colunas)

    # Converte colunas numéricas para float, ignorando strings inválidas (como "Unknown")
    df["nota"] = pd.to_numeric(df["nota"], errors="coerce")
    df["membros"] = pd.to_numeric(df["membros"], errors="coerce")
    df["popularidade"] = pd.to_numeric(df["popularidade"], errors="coerce")

    # Remove valores não numéricos que viraram NaN
    df = df.dropna(subset=["nota", "membros", "popularidade"])

    # Agrupamento e média
    agrupado = df.groupby("tipo").agg({
        "nota": "mean",
        "membros": "mean",
        "popularidade": "mean"
    }).reset_index()

    return agrupado.to_dict(orient="records")


@app.get("/animes/tabela")
def tabela():
    df = carregar_dados()
    colunas = ["nome", "nota", "popularidade", "classificacao", "generos", "tipo", "temporada", "assistindo", "completos"]
    return df[colunas].dropna().to_dict(orient="records")
