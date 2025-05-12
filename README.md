# 🚀 Desafio Técnico - Desenvolvedor Pleno - NestJS
API RESTful para receber transações e retornar estatísticas em tempo real, construída com NestJS seguindo os princípios da Clean Architecture.

---

## Tecnologias

<p align="center" 
  style="display: flex; align-items: center; justify-content: center; gap: 10px;">
  <a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS" width="200"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="Typescript" width="50"/>
  </a>
  <a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg" alt="Jest" width="50"/>
  </a>
  <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="Docker" width="50"/>
  </a>
  
  <a href="https://socket.io/" target="_blank" rel="noopener noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg" alt="Socket.io" width="50"/>
  </a> 
</p>

---

## 🧑‍💻 Como rodar localmente
### Pré-requisitos 
- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [Yarn](https://yarnpkg.com/) (v1.22 ou superior)
- [Docker](https://www.docker.com/) (v28 ou superior)
- [Docker Compose](https://docs.docker.com/compose/) (v2 ou superior)


### 1. Clonar o repositório
```bash
$ git clone https://github.com/joseRibamar21/transactions-nest-api
```

### 2. Instalar as dependências
```bash
$ cd transactions-nest-api
$ yarn install
```

### 3. Configurar o ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
# .env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=http://localhost:3000
```


### 4. Inicie o servidor
```bash
$ yarn start:dev
```
--- 

## 🐋 Como rodar usando Docker-Compose
Para subir a aplicação com Docker Compose:
```bash
$ docker-compose up -d
```
Isso irá:
- Construir a imagem Docker com base no Dockerfile
- Iniciar o container
- Tornar a aplicação acessível em: http://localhost:3000
- Rodar o healthcheck no endpoint /health após 30s
  
--- 

## 📄 Documentação Swegger
A documentação da API está disponível em: [http://localhost:3000/api](http://localhost:3000/api) (após iniciar o servidor).
### Endpoints disponíveis
- `GET /health`: Verifica se a aplicação está rodando corretamente.
- `POST /transactions`: Recebe uma transação com os campos `amount` e `timestamp` e armazena na memória.
- `GET /statistics`: Retorna a estatística das transações armazenadas na memória, incluindo a soma, média, maior e menor valor, contagem e intervalo de tempo.
- `DELETE /transactions`: Remove todas as transações armazenadas no banco de dados.
- `SOCKET /statistics`: Recebe transações em tempo real e emite eventos para os clientes conectados.

--- 

## 📦 Testes
Para rodar os testes, você pode usar o comando abaixo. Ele executará todos os testes unitários e de integração.

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```