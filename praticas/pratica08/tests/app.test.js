const st = require('supertest');
const app = require('../app');
const request = st(app);

describe('Testes da API REST', () => {
    let token = null;

    test('GET /produtos deve retornar 401 sem autorização', async () => {
        const response = await request.get('/produtos');
        
        expect(response.status).toBe(401);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe('Não autorizado');
    });

    test('GET /produtos deve retornar 401 com token inválido', async () => {
        const response = await request
            .get('/produtos')
            .set('authorization', '123456789');
        
        expect(response.status).toBe(401);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe('Token inválido');
    });

    test('POST /usuarios/login deve retornar token válido', async () => {
        const response = await request
            .post('/usuarios/login')
            .send({
                usuario: 'email@exemplo.com',
                senha: 'abcd1234'
            });
        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.token).toBeDefined();
        
        token = response.body.token;
    });

    test('GET /produtos deve retornar 200 com token válido', async () => {
        const response = await request
            .get('/produtos')
            .set('authorization', token);
        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('POST /usuarios/renovar deve renovar o token', async () => {
        const response = await request
            .post('/usuarios/renovar')
            .set('authorization', token);
        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.token).toBeDefined();
        
        token = response.body.token;
    });

    test('GET /produtos deve retornar 200 com novo token', async () => {
        const response = await request
            .get('/produtos')
            .set('authorization', token);
        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });
});