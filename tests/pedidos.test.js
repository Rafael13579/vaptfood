const pedidosRouter = require('../src/backend/src/routes/pedidos');

function getHandler(method, path) {
  const layer = pedidosRouter.stack.find(
    (item) => item.route && item.route.path === path && item.route.methods[method],
  );

  return layer.route.stack[0].handle;
}

function request(method, path, options = {}) {
  const handler = getHandler(method, path);
  const req = {
    body: options.body || {},
    params: options.params || {},
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

describe('rotas de pedidos', () => {
  test('lista pedidos cadastrados', async () => {
    const response = request('get', '/');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('cria um novo pedido calculando o total', async () => {
    const response = request('post', '/', {
      body: {
        cliente: {
          nome: 'Cliente Teste',
          email: 'cliente.teste@vaptfood.local',
        },
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
          rua: 'Rua Teste',
          numero: '123',
          bairro: 'Centro',
          cidade: 'Sao Paulo',
          uf: 'SP',
        },
        formaPagamento: 'cartao',
      },
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: 'recebido',
      formaPagamento: 'cartao',
    });
    expect(response.body.total).toBeCloseTo(59.7);
    expect(response.body.id).toEqual(expect.any(String));
    expect(response.body.criadoEm).toEqual(expect.any(String));
  });

  test('valida campos obrigatorios ao criar pedido', async () => {
    const response = request('post', '/', {
      body: {
        cliente: {
          nome: 'Cliente Teste',
        },
      },
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cliente, itens e endereco de entrega sao obrigatorios');
  });

  test('busca pedido por id e atualiza status', async () => {
    const created = request('post', '/', {
      body: {
        cliente: {
          nome: 'Cliente Status',
          email: 'status@vaptfood.local',
        },
        itens: [
          {
            nome: 'Pizza Margherita',
            quantidade: 1,
            preco: 42.9,
          },
        ],
        enderecoEntrega: {
          rua: 'Rua Status',
          numero: '456',
          bairro: 'Centro',
          cidade: 'Sao Paulo',
          uf: 'SP',
        },
      },
    });

    const found = request('get', '/:id', {
      params: {
        id: created.body.id,
      },
    });
    const updated = request('patch', '/:id/status', {
      params: {
        id: created.body.id,
      },
      body: {
        status: 'em preparo',
      },
    });

    expect(found.status).toBe(200);
    expect(found.body.id).toBe(created.body.id);
    expect(updated.status).toBe(200);
    expect(updated.body.status).toBe('em preparo');
    expect(updated.body.atualizadoEm).toEqual(expect.any(String));
  });

  test('retorna 404 para pedido inexistente', async () => {
    const response = request('get', '/:id', {
      params: {
        id: 'inexistente',
      },
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Pedido nao encontrado');
  });
});
