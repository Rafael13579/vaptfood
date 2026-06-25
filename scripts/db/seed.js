const path = require('path');
const { createRequire } = require('module');

const backendRequire = createRequire(path.resolve(__dirname, '../../src/backend/package.json'));
const bcrypt = backendRequire('bcryptjs');
const dotenv = backendRequire('dotenv');
const mongoose = backendRequire('mongoose');

const createUsersMigration = require('./migrations/001_create_users');

dotenv.config({ path: path.resolve(__dirname, '../../src/backend/.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vaptfood';

const cardapio = [
  {
    nome: 'X-Burger Vapt',
    descricao: 'Hamburguer artesanal com queijo, salada e molho da casa',
    preco: 24.9,
    categoria: 'Lanches',
    disponivel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: 'Pizza Margherita',
    descricao: 'Pizza com mussarela, tomate e manjericao',
    preco: 42.9,
    categoria: 'Pizzas',
    disponivel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: 'Suco Natural',
    descricao: 'Suco de fruta natural 500ml',
    preco: 9.9,
    categoria: 'Bebidas',
    disponivel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const pedidos = [
  {
    clienteEmail: 'cliente@vaptfood.local',
    itens: [
      {
        nome: 'X-Burger Vapt',
        quantidade: 2,
        preco: 24.9,
      },
      {
        nome: 'Suco Natural',
        quantidade: 1,
        preco: 9.9,
      },
    ],
    enderecoEntrega: {
      rua: 'Rua das Entregas',
      numero: '100',
      bairro: 'Centro',
      cidade: 'Sao Paulo',
      uf: 'SP',
    },
    formaPagamento: 'cartao',
    status: 'recebido',
    total: 59.7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedUsers(db) {
  const users = db.collection('users');
  const senhaHash = await bcrypt.hash('123456', 10);
  const now = new Date();

  const usuarios = [
    {
      nome: 'Administrador VaptFood',
      email: 'admin@vaptfood.local',
      senhaHash,
      perfil: 'admin',
      telefone: '11999990000',
      createdAt: now,
      updatedAt: now,
    },
    {
      nome: 'Cliente VaptFood',
      email: 'cliente@vaptfood.local',
      senhaHash,
      perfil: 'cliente',
      telefone: '11988880000',
      endereco: {
        rua: 'Rua das Entregas',
        numero: '100',
        bairro: 'Centro',
        cidade: 'Sao Paulo',
        uf: 'SP',
      },
      createdAt: now,
      updatedAt: now,
    },
  ];

  for (const usuario of usuarios) {
    await users.updateOne(
      { email: usuario.email },
      { $setOnInsert: usuario },
      { upsert: true },
    );
  }
}

async function seedCollection(db, collectionName, data, uniqueField) {
  const collection = db.collection(collectionName);

  for (const item of data) {
    await collection.updateOne(
      { [uniqueField]: item[uniqueField] },
      { $setOnInsert: item },
      { upsert: true },
    );
  }
}

async function run() {
  await mongoose.connect(MONGODB_URI);

  const db = mongoose.connection.db;

  await createUsersMigration.up(db);
  await seedUsers(db);
  await seedCollection(db, 'cardapio', cardapio, 'nome');
  await seedCollection(db, 'pedidos', pedidos, 'clienteEmail');

  console.log('Seed executado com sucesso');
}

run()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
