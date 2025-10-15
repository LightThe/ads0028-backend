const st = require('supertest');
const app = require('../app');
const request = st(app);
const url = '/tarefas';

describe('Testes da rota /tarefas', () => {
    let id = null;
    test('POST / deve criar um recurso e retorar 204', async () => {
        const response = await request.post(url)
            .send({ nome: "Estudar Express" });

        expect(response.status).toBe(201);
        id = response.body.id;
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('GET / deve retornar 200 e JSON', async () => {
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('GET /:id deve retornar 200 e um JSON', async () => {
        const response = await request.get(`${url}/${id}`);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('PUT /:id deve retornar 200 e JSON', async () => {
        const response = await request.put(`${url}/${id}`)
            .send({ nome: "Estudar Express", concluida: true });

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('DELETE /:id deve retornar 204 e JSON', async () => {
        const response = await request.delete(`${url}/${id}`);

        expect(response.status).toBe(204);
    });
})