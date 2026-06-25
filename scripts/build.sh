#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/src/backend"

echo "==> Instalando dependencias do backend"
npm ci --prefix "$BACKEND_DIR"

echo "==> Validando sintaxe do backend"
node --check "$BACKEND_DIR/src/app.js"
node --check "$BACKEND_DIR/src/server.js"
node --check "$BACKEND_DIR/src/routes/auth.js"
node --check "$BACKEND_DIR/src/routes/cardapio.js"
node --check "$BACKEND_DIR/src/routes/pedidos.js"

echo "==> Validando sintaxe dos scripts"
node --check "$ROOT_DIR/scripts/db/seed.js"
node --check "$ROOT_DIR/scripts/db/migrations/001_create_users.js"

echo "==> Executando testes"
npm test --prefix "$BACKEND_DIR"

echo "==> Build local finalizado com sucesso"
