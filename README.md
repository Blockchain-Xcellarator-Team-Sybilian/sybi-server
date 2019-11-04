# Educado Server

Server application of Educado. Made with ❤️ for UnionBank Blockchain Xcellerator Experts Program case study.

## Prerequisites

- Docker
- Node.js >= 8.0.0
- npm >= 3.0.0
- git

## Setup

Clone the repository.

```bash
git clone https://github.com/xcellerator-sybilian/educado-api-server.git && cd educado-api-server
```

Install dependencies.

```bash
npm install
```

Create Docker network.

```bash
docker network create --driver bridge --subnet 172.18.0.0/16 --gateway 172.18.0.1 educado-network
```

Pull PostgreSQL Docker image.

```bash
docker pull postgres:12.0
```

Create PostgreSQL Docker container. Mount `$HOME/.docker/volumes/postgres` on the host machine to the container side volume path `/var/lib/postgresql/data`. This ensures that postgres data persists even after the container is removed. Update this path if you have your own customized volume path.

```bash
docker run --restart=always --net educado-network --ip 172.18.0.3 --name educado-database-server -d -p 5432:5432 -v $HOME/.docker/volumes/postgres:/var/lib/postgresql/data -e POSTGRES_DB=educado -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret postgres:12.0
```

Pull Adonis Docker image.

```bash
docker pull stephenafamo/adonisjs:1.0.0
```

Create Adonis Docker container. Mount `$HOME/Projects/Educado/educado-api-server` on the host machine to the container side path `/var/www`. Update this path to your own project path.


```bash
docker run --restart=always --net educado-network --ip 172.18.0.4 --name educado-api-server -d -p 3333:3333 -v $HOME/Projects/Educado/educado-api-server:/var/www stephenafamo/adonisjs:1.0.0
```

Generate .env file.

```bash
cp .env.example .env
```

Generate app key.

```bash
adonis key:generate
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
