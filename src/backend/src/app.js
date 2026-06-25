const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const cardapioRoutes = require('./routes/cardapio');
const pedidosRoutes = require('./routes/pedidos');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'vaptfood-backend',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/cardapio', cardapioRoutes);
app.use('/api/pedidos', pedidosRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota nao encontrada',
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Erro interno do servidor',
  });
});

module.exports = app;
