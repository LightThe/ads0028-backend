const st = require('supertest');
const app = require('../app');

const rqsc = st(app);
const baseUrl = '/tarefas';

describe('Testes para a rota /tarefas', () => {
    let idTarefa;

    test('GET / retorna 200 e um JSON', async () => {
        const response = await rqsc.get(baseUrl);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('POST / retorna 201 e um JSON', async () => {
        const response = await rqsc.post(baseUrl).send({ nome: "Estudar Node", concluida: false });

        expect(response.status).toBe(201);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);

        expect(response.body.id).toBeDefined();
        idTarefa = response.body.id;
    });

    test('GET /:id retorna 200 e um JSON', async () => {
        const response = await rqsc.get(`${baseUrl}/${idTarefa}`);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('GET /1 retorna 404', async () => {
        const response = await rqsc.get(`${baseUrl}/1`);

        expect(response.status).toBe(404);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('PUT /:id retorna 200 e um JSON', async () => {
        const response = await rqsc.put(`${baseUrl}/${idTarefa}`).send({ nome: "Estudar Node e Express", concluida: true });

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);

        expect(response.body.id).toBe(idTarefa);
    });

    test('PUT /1 retorna 404', async () => {
        const response = await rqsc.put(`${baseUrl}/1`);

        expect(response.status).toBe(404);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('DELETE /:id retorna 204 sem conteúdo', async () => {
        const response = await rqsc.delete(`${baseUrl}/${idTarefa}`);

        expect(response.status).toBe(204);
        expect(response.body).toStrictEqual({});
    });

    test('DELETE /1 retorna 404', async () => {
        const response = await rqsc.delete(`${baseUrl}/1`);

        expect(response.status).toBe(404);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });
});
