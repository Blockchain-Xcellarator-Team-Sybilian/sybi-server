# Educado Server

Server application of Educado. Made with ❤️ for UnionBank Blockchain Xcellerator Experts Program.

## Prerequisites

- Docker
- Node.js >= 8.0.0
- npm >= 3.0.0
- git

## Setup

Clone the repository.

```bash
git clone https://github.com/xcellerator-sybilian/educado-server.git && cd educado-server
```

Install dependencies.

```bash
npm install
npm install -g @adonisjs/cli
```

Pull PostgreSQL Docker image.

```bash
docker pull postgres:12.0
```

Create PostgreSQL Docker container. Mount $HOME/.docker/volumes/postgres on the host machine to the container side volume path /var/lib/postgresql/data. This ensures that postgres data persists even after the container is removed. Feel free to update this path if you have your own customized volume path.

```bash
docker run --rm --name postgres-server -d -p 5432:5432 -v $HOME/.docker/volumes/postgres:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:12.0
```

Pull Adonis Docker image.

```bash
docker pull stephenafamo/adonisjs:1.0.0
```

Create Adonis Docker container. Mount $HOME/Projects/Educado/educado-server on the host machine to the container side path /var/www. Feel free to update this path if you have your own customized project path.


```bash
docker run --rm --name educado-server -d -p 3333:3333 -v $HOME/Projects/Educado/educado-server:/var/www stephenafamo/adonisjs:1.0.0
```

Create Docker network.

```bash
docker network create -d bridge educado-network
```

Add containers to Docker network.

```bash
docker network connect educado-network postgres-server
docker network connect educado-network educado-server
```

Generate .env file.

```bash
cp .env.example .env
```

Generate app key.

```bash
adonis key:generate
```

Get the IPv4 address of both containers.

```bash
docker network inspect educado-network
```

Update environment variables.

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

Run migrations.

```bash
adonis migration:run
```

Run tests.

```bash
adonis test
```
