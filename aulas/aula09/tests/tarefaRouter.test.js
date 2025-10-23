const st = require('supertest');
const app = require('../app');
const request = st(app);
const url = '/tarefas';

describe('Testes da rota /tarefas', () => {
    let id = null;
    const taskName = "Estudar Express";
    test('POST / deve criar um recurso e retorar 204', async () => {
        const response = await request.post(url)
            .send({ nome: taskName });

        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        id = response.body._id;
        expect(response.body.nome).toMatch(taskName);
        expect(response.body.concluida).toBeFalsy();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('POST / deve retornar 422', async () => {
        const response = await request.post(url);
        expect(response.status).toBe(422);
        expect(response.body.msg).toMatch("Nome da tarefa é obrigatório");
    });

    test('GET / deve retornar 200 e JSON', async () => {
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET /:id deve retornar 200 e um JSON', async () => {
        const response = await request.get(`${url}/${id}`);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toMatch(taskName);
        expect(response.body.concluida).toBeFalsy();
    });

    test('GET /:id deve retornar 404 se não encontrado', async () => {
        const response = await request.get(`${url}/999999999999999999999999`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toMatch("Tarefa não encontrada")
    });

    test('GET /:id deve retornar 400 se id incorreto', async () => {
        const response = await request.get(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toMatch("ID Inválido")
    });

    test('PUT /:id deve retornar 200 e JSON', async () => {
        const response = await request.put(`${url}/${id}`)
            .send({ nome: "Estudar Mongo", concluida: true });

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.nome).toMatch("Estudar Mongo");
        expect(response.body.concluida).toBeTruthy();
    });

    test('PUT /:id deve retornar 404 se não encontrado', async () => {
        const response = await request.put(`${url}/999999999999999999999999`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toMatch("Tarefa não encontrada")
    });

    test('PUT /:id deve retornar 422 se id incorreto', async () => {
        const response = await request.put(`${url}/${id}`).send({ nome: "", concluida: true });
        expect(response.status).toBe(422);
        expect(response.body.msg).toMatch("Nome da tarefa é obrigatório")
    });

    test('PUT /:id deve retornar 400 se id incorreto', async () => {
        const response = await request.put(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toMatch("ID Inválido")
    });

    test('DELETE /:id deve retornar 204 e JSON', async () => {
        const response = await request.delete(`${url}/${id}`);

        expect(response.status).toBe(204);
    });

    test('DELETE /:id deve retornar 404', async () => {
        const response = await request.delete(`${url}/${id}`);

        expect(response.status).toBe(404);
    });

    test('DELETE /:id deve retornar 400 se id incorreto', async () => {
        const response = await request.delete(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toMatch("ID Inválido")
    });
})