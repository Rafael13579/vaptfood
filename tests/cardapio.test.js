const cardapioRouter = require('../src/backend/src/routes/cardapio');

function getHandler(method, path) {
  const layer = cardapioRouter.stack.find(
    (item) => item.route && item.route.path === path && item.route.methods[method],
  );

  return layer.route.stack[0].handle;
}

function request(method, path, options = {}) {
  const handler = getHandler(method, path);
  const req = {
    params: options.params || {},
    query: options.query || {},
  };
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  handler(req, res);

  return {
    status: res.statusCode,
    body: res.body,
  };
}

describe('rotas de cardapio', () => {
  test('lista os itens disponiveis no cardapio', async () => {
    const response = request('get', '/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '1',
          nome: 'X-Burger Vapt',
          categoria: 'Lanches',
          disponivel: true,
        }),
      ]),
    );
  });

  test('filtra itens por categoria', async () => {
    const response = request('get', '/', {
      query: {
        categoria: 'Bebidas',
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      nome: 'Suco Natural',
      categoria: 'Bebidas',
    });
  });

  test('busca item do cardapio por id', async () => {
    const response = request('get', '/:id', {
      params: {
        id: '2',
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: '2',
      nome: 'Pizza Margherita',
      categoria: 'Pizzas',
    });
  });

  test('retorna 404 para item inexistente', async () => {
    const response = request('get', '/:id', {
      params: {
        id: 'inexistente',
      },
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Item do cardapio nao encontrado');
  });
});
