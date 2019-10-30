# Educado Server

Server application of Educado.

## Pre

## Local Development Setup

Clone the repository.

```bash
git clone https://github.com/xcellerator-sybilian/educado-server.git
```

Install dependecies 

```bash
npm install
```

Pull PostgreSQL Docker image

```bash
docker pull stephenafamo/adonisjs:1.0.0
```

Create PostgresSQL Docker container

```bash
docker run --rm --name postgres-server -d -p 5432:5432 -v $HOME/.docker/volumes/postgres:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres
```

Pull Adonis Docker image

```bash
docker pull stephenafamo/adonisjs:1.0.0
```

Create Adonis Docker container

```bash
docker run --rm --name educado-server -d -p 3333:3333 -v $HOME/Projects/Educado/educado-server:/var/www stephenafamo/adonisjs:1.0.0
```

Create Docker network

```bash
docker network create -d bridge educado-network
```

Add containers to Docker network

```bash
docker network connect educado-network postgres-server
docker network connect educado-network educado-server
```

Get the IP address of both containers

```bash
docker network inspect educado-network
```

Generate .env file

```bash
cp .env.example .env
```

Generate app key

```bash
adonis key:generate
```

Update environment variables

```
HOST=EDUCADO_SERVER_IP_ADDRESS
PORT=3333
.
.
.
DB_CONNECTION=pg
DB_HOST=POSTGRESQL_SERVER_IP_ADDRESS
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=DATABASE_PASSWORD
DB_DATABASE=DATABASE_NAME
```

Run migrations

```bash
adonis migration:run
```
