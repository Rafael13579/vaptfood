const path = require('path');
const { createRequire } = require('module');

const backendRequire = createRequire(path.resolve(__dirname, '../../../src/backend/package.json'));
const mongoose = backendRequire('mongoose');

const USER_SCHEMA_VALIDATION = {
  bsonType: 'object',
  required: ['nome', 'email', 'senhaHash', 'perfil', 'createdAt', 'updatedAt'],
  properties: {
    nome: {
      bsonType: 'string',
      description: 'Nome completo do usuario',
    },
    email: {
      bsonType: 'string',
      description: 'Email unico usado para login',
    },
    senhaHash: {
      bsonType: 'string',
      description: 'Hash da senha do usuario',
    },
    perfil: {
      enum: ['cliente', 'admin'],
      description: 'Perfil de acesso do usuario',
    },
    telefone: {
      bsonType: 'string',
      description: 'Telefone de contato do usuario',
    },
    endereco: {
      bsonType: 'object',
      description: 'Endereco principal do usuario',
    },
    createdAt: {
      bsonType: 'date',
      description: 'Data de criacao do registro',
    },
    updatedAt: {
      bsonType: 'date',
      description: 'Data da ultima atualizacao do registro',
    },
  },
};

async function collectionExists(db, collectionName) {
  const collections = await db.listCollections({ name: collectionName }).toArray();
  return collections.length > 0;
}

async function up(db = mongoose.connection.db) {
  if (!db) {
    throw new Error('Conexao com o banco nao inicializada');
  }

  const exists = await collectionExists(db, 'users');

  if (!exists) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: USER_SCHEMA_VALIDATION,
      },
    });
  } else {
    await db.command({
      collMod: 'users',
      validator: {
        $jsonSchema: USER_SCHEMA_VALIDATION,
      },
    });
  }

  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('users').createIndex({ perfil: 1 });
}

async function down(db = mongoose.connection.db) {
  if (!db) {
    throw new Error('Conexao com o banco nao inicializada');
  }

  const exists = await collectionExists(db, 'users');

  if (exists) {
    await db.collection('users').drop();
  }
}

module.exports = {
  up,
  down,
};
