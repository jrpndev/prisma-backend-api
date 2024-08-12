# Backend API

## Tecnologias Utilizadas

- Node.js
- Express
- Prisma
- TypeScript
- JWT para autenticação
- Bcrypt para hash de senhas
- PostgreSQL
- Docker

## Como Rodar

1. Clone o repositório:

    ```bash
    git clone https://github.com/fernandacodes/prisma-backend.git
    cd prisma-backend
    ```

2. execute o comando abaixo usando o docker:

    ```
    docker compose up postgres -d
    docker compose up backend -d
    ```

## Endpoints abaixo
## OBS : o projeto esta rodando na porta 5000

- `POST /users/create` - Cria um novo usuário
- `POST /auth/login` - Autentica um usuário e retorna um token
- `GET /users/me` - Retorna as informações do usuário autenticado (necessita token no header Authorization)
