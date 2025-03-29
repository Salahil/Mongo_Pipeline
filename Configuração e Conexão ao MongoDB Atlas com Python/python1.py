import pymongo
import urllib.parse
import pandas as pd

# Definir usuário e senha
username = "Juliokawahata"
password = "Essasenhaehboa"

# Codificar a senha (caso tenha caracteres especiais)
password_encoded = urllib.parse.quote_plus(password)

# Criar a URI corretamente formatada
MONGO_URI = f"mongodb+srv://{username}:{password_encoded}@clustersuspeito.twhb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSuspeito"

# Conectar ao MongoDB Atlas
client = pymongo.MongoClient(MONGO_URI)

# Acessar o banco e a coleção
db = client["filmes"]
collection = db["filmes-series"]

print("Conexão com MongoDB Atlas estabelecida!")
