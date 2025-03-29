import pandas as pd
import pymongo
import urllib.parse

# Definir o caminho do arquivo CSV
csv_path = r"C:\Users\sergy\OneDrive\Documentos\Configuração e Conexão ao MongoDB Atlas com Python\sales_data_sample.csv"

# Ler o CSV usando Pandas
df = pd.read_csv(csv_path)

# Exibir as 5 primeiras linhas
print(df.head())