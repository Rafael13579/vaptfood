const authRouter = require('../src/backend/src/routes/auth');

function getHandler(method, path) {
  const layer = authRouter.stack.find(
    (item) => item.route && item.route.path === path && item.route.methods[method],
  );

  return layer.route.stack[0].handle;
}

async function request(method, path, body = {}) {
  const handler = getHandler(method, path);
  const req = { body };
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

  await handler(req, res);

  return {
    status: res.statusCode,
    body: res.body,
  };
}

describe('rotas de autenticacao', () => {
  test('cadastra um novo usuario com token JWT', async () => {
    const email = `novo-${Date.now()}@vaptfood.local`;

    const response = await request('post', '/cadastro', {
      nome: 'Novo Usuario',
      email,
      senha: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body.usuario).toMatchObject({
      nome: 'Novo Usuario',
      email,
    });
    expect(response.body.usuario.senhaHash).toBeUndefined();
    expect(response.body.token).toEqual(expect.any(String));
  });

  test('bloqueia cadastro com email duplicado', async () => {
    const email = `duplicado-${Date.now()}@vaptfood.local`;
    const payload = {
      nome: 'Usuario Duplicado',
      email,
      senha: '123456',
    };

    await request('post', '/cadastro', payload);
    const response = await request('post', '/cadastro', payload);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Email ja cadastrado');
  });

  test('realiza login com credenciais validas', async () => {
    const email = `login-${Date.now()}@vaptfood.local`;

    await request('post', '/cadastro', {
      nome: 'Usuario Login',
      email,
      senha: '123456',
    });

    const response = await request('post', '/login', {
      email,
      senha: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body.usuario).toMatchObject({
      nome: 'Usuario Login',
      email,
    });
    expect(response.body.token).toEqual(expect.any(String));
  });

  test('rejeita login com credenciais invalidas', async () => {
    const response = await request('post', '/login', {
      email: 'inexistente@vaptfood.local',
      senha: 'senha-errada',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Credenciais invalidas');
  });
});
