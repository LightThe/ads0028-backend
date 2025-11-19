const st = require('supertest');
const app = require('../app');
const request = st(app);

describe('Testes do recurso /usuarios', () => {
    let userId = null;
    let token = null;

    test('POST /usuarios deve criar um usuário e retornar 201', async () => {
        const response = await request.post('/usuarios')
            .send({ 
                email: 'usuario@email.com', 
                senha: 'abcd1234' 
            });

        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toBe('usuario@email.com');
        
        userId = response.body._id;
    });

    test('POST /usuarios deve retornar 422 sem dados', async () => {
        const response = await request.post('/usuarios');

        expect(response.status).toBe(422);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe('Email e Senha são obrigatórios');
    });

    test('POST /usuarios/login deve retornar token válido', async () => {
        const response = await request.post('/usuarios/login')
            .send({
                usuario: 'usuario@email.com',
                senha: 'abcd1234'
            });

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.token).toBeDefined();
        
        token = response.body.token;
    });

    test('POST /usuarios/login deve retornar 401 sem credenciais', async () => {
        const response = await request.post('/usuarios/login');

        expect(response.status).toBe(401);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe('Credenciais inválidas');
    });

    test('POST /usuarios/renovar deve renovar o token', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.token).toBeDefined();
        
        token = response.body.token;
    });

    test('POST /usuarios/renovar deve retornar 401 com token inválido', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('authorization', 'Bearer 123456789');

        expect(response.status).toBe(401);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe('Token inválido');
    });

    test('DELETE /usuarios/:id deve retornar 204', async () => {
        const response = await request.delete(`/usuarios/${userId}`)
            .set('authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });
});