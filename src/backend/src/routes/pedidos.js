const express = require('express');

const router = express.Router();

const pedidos = [];

router.get('/', (req, res) => {
  res.json(pedidos);
});

router.get('/:id', (req, res) => {
  const pedido = pedidos.find((item) => item.id === req.params.id);

  if (!pedido) {
    return res.status(404).json({
      message: 'Pedido nao encontrado',
    });
  }

  return res.json(pedido);
});

router.post('/', (req, res) => {
  const { cliente, itens, enderecoEntrega, formaPagamento } = req.body;

  if (!cliente || !Array.isArray(itens) || itens.length === 0 || !enderecoEntrega) {
    return res.status(400).json({
      message: 'Cliente, itens e endereco de entrega sao obrigatorios',
    });
  }

  const total = itens.reduce((soma, item) => {
    const quantidade = Number(item.quantidade || 1);
    const preco = Number(item.preco || 0);

    return soma + quantidade * preco;
  }, 0);

  const pedido = {
    id: Date.now().toString(),
    cliente,
    itens,
    enderecoEntrega,
    formaPagamento: formaPagamento || 'nao informado',
    status: 'recebido',
    total,
    criadoEm: new Date().toISOString(),
  };

  pedidos.push(pedido);

  return res.status(201).json(pedido);
});

router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const pedido = pedidos.find((item) => item.id === req.params.id);

  if (!pedido) {
    return res.status(404).json({
      message: 'Pedido nao encontrado',
    });
  }

  if (!status) {
    return res.status(400).json({
      message: 'Status e obrigatorio',
    });
  }

  pedido.status = status;
  pedido.atualizadoEm = new Date().toISOString();

  return res.json(pedido);
});

module.exports = router;
