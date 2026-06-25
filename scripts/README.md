# Scripts

Scripts auxiliares para operacoes de banco de dados do projeto VaptFood.

## Estrutura

- `db/seed.js`: popula o banco com dados iniciais.
- `db/migrations/001_create_users.js`: cria ou atualiza a collection `users` com validacao e indices.

## Pre-requisitos

- Node.js instalado.
- Dependencias do backend instaladas em `src/backend`.
- MongoDB acessivel pela variavel `MONGODB_URI`.

## Variaveis de ambiente

Os scripts carregam `src/backend/.env` quando o arquivo existir.

Exemplo:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/vaptfood
```

Se `MONGODB_URI` nao estiver definida, sera usado:

```text
mongodb://127.0.0.1:27017/vaptfood
```

## Executar seed

A partir da raiz do repositorio:

```bash
node scripts/db/seed.js
```

O seed cria:

- usuario administrador: `admin@vaptfood.local`
- usuario cliente: `cliente@vaptfood.local`
- senha inicial dos usuarios: `123456`
- itens iniciais de cardapio
- um pedido de exemplo

## Executar migration manualmente

A migration exporta as funcoes `up` e `down` para ser usada por scripts de automacao.
O `seed.js` ja executa `up` antes de inserir os dados iniciais.
