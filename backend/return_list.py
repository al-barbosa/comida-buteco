from api_key import API_KEY
from bs4 import BeautifulSoup
from urllib.request import urlopen
from geopy import Point, distance
from flask import Flask, jsonify
import requests
import pandas as pd
import re
import math


class Scrapper():

    def get_bares(self, cidade):
        cidade = cidade.replace('_','-')
        cidade = cidade.replace(' ','-')

        url = f'https://comidadibuteco.com.br/category/butecos/{cidade}/'
        response = urlopen(url)
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        total_bares = re.findall(r'\d+', soup.h5.getText())
        total_bares = int(total_bares[0])
        total_paginas = math.ceil(total_bares / 12)

        i = 0
        lista_bares = []

        while i < total_paginas:
            response = urlopen(url)
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            lista_bares.extend(soup.findAll('div', {'class': 'result-inner text-left'}))
            i += 1
            if i < total_paginas:
                url = soup.find('div', {'class': 'navigation'}).find('div', {'class': 'alignright'}).a['href']
                
                
        bar_detalhes = []

        for bar in lista_bares:
            bar_atual = {}
            bar_atual['nome'] = (bar.h2.getText())
            endereco = bar.p.getText()
            endereco_limpo = re.sub(r'\s+', ' ', endereco.strip()).replace(' |', ',')
            bar_atual['endereco'] = endereco_limpo
            
            bar_detalhes.append(bar_atual)
            
        bar_df = pd.DataFrame(bar_detalhes)

        def obter_lat_long(endereco):
            url = 'https://maps.googleapis.com/maps/api/geocode/json'
            params = {'address': endereco, 'key': API_KEY}
            resposta = requests.get(url, params=params).json()
            try:
                lat = resposta['results'][0]['geometry']['location']['lat']
                long = resposta['results'][0]['geometry']['location']['lng']
                return pd.Series({'latitude': lat, 'longitude': long})
            except:
                return pd.Series({'latitude': None, 'longitude': None})
            
        bar_df[['latitude', 'longitude']] = bar_df['endereco'].apply(obter_lat_long)
        bar_df.dropna(inplace=True)

        distancias = []

        for bar in bar_df['nome']:
            bar_distancia = {'nome': bar}
            latidute = bar_df.query(f'nome == "{bar}"')['latitude']
            longitude = bar_df.query(f'nome == "{bar}"')['longitude']
            ponto = (float(latidute), float(longitude))
            resultados = {}
            
            for outro_bar in bar_df['nome']:
                if outro_bar != bar:
                    latidute2 = bar_df.query(f'nome == "{outro_bar}"')['latitude']
                    longitude2 = bar_df.query(f'nome == "{outro_bar}"')['longitude']
                    ponto2 = (float(latidute2), float(longitude2))
                    distancia = distance.distance(ponto, ponto2).m
                    resultados[outro_bar] = round(distancia, 2)
                    
            resultados = dict(sorted(resultados.items(), key=lambda item: item[1]))
            
            bar_distancia['4proximos'] = dict(list(resultados.items())[:4])
            bar_distancia['3proximos'] = dict(list(resultados.items())[:3])
            distancias.append(bar_distancia)
            
        bar_df = pd.merge(bar_df, pd.DataFrame(distancias), how='left', on='nome')

        raios = []

        for bar in bar_df['nome']:
            bar_raios = {'nome': bar}
            latidute = bar_df.query(f'nome == "{bar}"')['latitude']
            longitude = bar_df.query(f'nome == "{bar}"')['longitude']
            ponto = (float(latidute), float(longitude))
            ate500 = []
            ate750 = []
            for outro_bar in bar_df['nome']:
                if outro_bar != bar:
                    latidute2 = bar_df.query(f'nome == "{outro_bar}"')['latitude']
                    longitude2 = bar_df.query(f'nome == "{outro_bar}"')['longitude']
                    ponto2 = (float(latidute2), float(longitude2))
                    distancia = distance.distance(ponto, ponto2).m
                    if distancia <= 500:
                        ate500.append(outro_bar)
                    if distancia <= 750:
                        ate750.append(outro_bar)
            
            bar_raios['500m'] = ate500
            bar_raios['750m'] = ate750
            raios.append(bar_raios)
            
        bar_df = pd.merge(bar_df, pd.DataFrame(raios), how='left', on='nome')
        return bar_df.to_dict('records')