# Projeto: Comida di Buteco - Bares Próximos

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

Este projeto visa fornecer uma plataforma que ajuda os usuários a encontrar bares participantes de um concurso culinário e seus bares vizinhos mais próximos em uma determinada cidade. Através do uso de WebScraping e APIs do Google Maps, o projeto extrai informações sobre os bares participantes, calcula as distâncias entre eles e apresenta os resultados em uma interface web simples e amigável.

## Funcionalidades

-   WebScraping de bares e cidades participantes usando BeautifulSoup4
-   Cálculo de distância entre bares usando a API do Google Maps
-   API desenvolvida em FastAPI para realizar automaticamente raspagem e cálculos de distância conforme requisições
-   Interface FrontEnd desenvolvida em React para interação com a API
-   Lista de cidades participantes obtida por raspagem de dados
-   Tabela apresentando a lista de bares e seus vizinhos participantes mais próximos

## Estrutura do Projeto

O projeto é dividido em duas partes principais: BackEnd e FrontEnd.

### Backend

O BackEnd do projeto é responsável pela raspagem de dados dos bares participantes e pela utilização da API do Google Maps para calcular a distância entre os bares. Além disso, é responsável pela criação e gerenciamento da API FastAPI.

Também está presente nele um notebook Jupyter que foi usado para realizar as primeiras raspagens e conferência de dados.

Consulte o arquivo README na pasta BackEnd para obter mais informações e instruções detalhadas sobre como configurar e executar o BackEnd.

### Frontend

O FrontEnd do projeto é responsável por fornecer uma interface amigável ao usuário para interagir com a API do BackEnd. Os usuários podem selecionar uma cidade a partir de uma lista de cidades participantes e visualizar a lista de bares e seus vizinhos mais próximos em uma tabela.

Consulte o arquivo README na pasta FrontEnd para obter mais informações e instruções detalhadas sobre como configurar e executar o FrontEnd.
