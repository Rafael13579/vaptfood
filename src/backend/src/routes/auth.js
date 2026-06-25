const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const usuarios = [];

function gerarToken(usuario) {
  return jwt.sign(
    {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
    },
    process.env.JWT_SECRET || 'vaptfood-dev-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
  );
}

router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      message: 'Nome, email e senha sao obrigatorios',
    });
  }

  const usuarioExistente = usuarios.find((usuario) => usuario.email === email);

  if (usuarioExistente) {
    return res.status(409).json({
      message: 'Email ja cadastrado',
    });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = {
    id: Date.now().toString(),
    nome,
    email,
    senhaHash,
  };

  usuarios.push(usuario);

  return res.status(201).json({
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    token: gerarToken(usuario),
  });
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      message: 'Email e senha sao obrigatorios',
    });
  }

  const usuario = usuarios.find((item) => item.email === email);

  if (!usuario) {
    return res.status(401).json({
      message: 'Credenciais invalidas',
    });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaValida) {
    return res.status(401).json({
      message: 'Credenciais invalidas',
    });
  }

  return res.json({
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    token: gerarToken(usuario),
  });
});

module.exports = router;
