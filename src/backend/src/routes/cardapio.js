const express = require('express');

const router = express.Router();

const itensCardapio = [
  {
    id: '1',
    nome: 'X-Burger Vapt',
    descricao: 'Hamburguer artesanal com queijo, salada e molho da casa',
    preco: 24.9,
    categoria: 'Lanches',
    disponivel: true,
  },
  {
    id: '2',
    nome: 'Pizza Margherita',
    descricao: 'Pizza com mussarela, tomate e manjericao',
    preco: 42.9,
    categoria: 'Pizzas',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Suco Natural',
    descricao: 'Suco de fruta natural 500ml',
    preco: 9.9,
    categoria: 'Bebidas',
    disponivel: true,
  },
];

router.get('/', (req, res) => {
  const { categoria } = req.query;

  const resultado = categoria
    ? itensCardapio.filter((item) => item.categoria.toLowerCase() === categoria.toLowerCase())
    : itensCardapio;

  res.json(resultado);
});

router.get('/:id', (req, res) => {
  const item = itensCardapio.find((cardapioItem) => cardapioItem.id === req.params.id);

  if (!item) {
    return res.status(404).json({
      message: 'Item do cardapio nao encontrado',
    });
  }

  return res.json(item);
});

module.exports = router;
