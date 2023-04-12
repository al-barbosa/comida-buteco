from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from botecosAPI import Scrapper

app = FastAPI()
bares = Scrapper()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/bares/{cidade}')
async def get_bares_api(cidade):
    return bares.get_bares(cidade)

@app.get('/cidades/')
async def get_cidades():
    return bares.get_cidades()
