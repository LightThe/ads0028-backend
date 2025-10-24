const st = require('supertest');
const app = require('../app');
const request = st(app);
const url = '/produtos';

describe('testes para a rota ' + url, () => {
    let id = 0;
    const validJson = { "nome": "Laranja", "preco": 10.0 }

    describe('POST', () => {
        test('POST / retorna 201 e o recurso criado', async () => {
            const response = await request.post(url)
                .send(validJson);

            expect(response.status).toBe(201);

            expect(response.body._id).toBeDefined();
            id = response.body._id;

            expect(response.body.nome).toMatch(validJson.nome);
            expect(response.body.preco).toEqual(validJson.preco);
        });

        test('POST / retorna 422 se não houver campos obrigatórios', async () => {
            const response = await request.post(url);

            expect(response.status).toBe(422);
            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.body.msg).toMatch("Nome e preço do produto são obrigatórios");
        });
    });

    describe('GET', () => {
        test('GET / retorna 200 e um array de JSON', async () => {
            const response = await request.get(url);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(Array.isArray(response.body)).toBeTruthy();
        });

        test('GET /:id retorna 200 e um objeto ', async () => {
            const response = await request.get(`${url}/${id}`);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/application\/json/);

            expect(response.body._id).toBe(id);
            expect(response.body.nome).toMatch(validJson.nome);
            expect(response.body.preco).toEqual(validJson.preco);
        });

        test('GET /:id retorna 400 se ID inválido', async () => {
            const response = await request.get(`${url}/0`);

            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.status).toBe(400);
            expect(response.body.msg).toMatch("Parâmetro inválido");
        });

        test('GET /:id retorna 404 se ID não existe', async () => {
            const response = await request.get(`${url}/000000000000000000000000`);

            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.status).toBe(404);
            expect(response.body.msg).toMatch("Produto não encontrado")
        });
    });

    describe('PUT', () => {
        test('PUT /:id retorna 200 e o objeto alterado', async () => {
            const updateJson = { "nome": "Laranja Pera", "preco": 18.00 };
            const response = await request.put(`${url}/${id}`).send(updateJson);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/application\/json/);

            expect(response.body._id).toBe(id);
            expect(response.body.nome).toMatch(updateJson.nome);
            expect(response.body.preco).toEqual(updateJson.preco);
        });

        test('PUT /:id retorna 422 se não houver campo obrigatório', async () => {
            const response = await request.put(`${url}/${id}`);

            // Por algum motivo esse teste sempre retorna 200 mesmo quando o validator falha
            expect(response.status).toBe(422);
            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.body.msg).toMatch("Nome e preço do produto são obrigatórios");
        });

        test('PUT /:id retorna 400 se ID inválido', async () => {
            const response = await request.put(`${url}/0`);

            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.status).toBe(400);
            expect(response.body.msg).toMatch("Parâmetro inválido");
        });

        test('PUT /:id retorna 404 se ID não existe', async () => {
            const response = await request.put(`${url}/000000000000000000000000`);

            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.status).toBe(404);
            expect(response.body.msg).toMatch("Produto não encontrado")
        });
    });

    describe('DELETE', () => {
        test('DELETE /:id retorna 204 e nenhum conteúdo', async () => {
            const response = await request.delete(`${url}/${id}`);

            expect(response.status).toBe(204);
            expect(response.body).toStrictEqual({});
        });

        test('DELETE /:id retorna 400 se ID inválido', async () => {
            const response = await request.delete(`${url}/0`);

            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.status).toBe(400);
            expect(response.body.msg).toMatch("Parâmetro inválido");
        });

        test('DELETE /:id retorna 404 se ID não existe', async () => {
            const response = await request.delete(`${url}/${id}`);

            expect(response.headers['content-type']).toMatch(/application\/json/);
            expect(response.status).toBe(404);
            expect(response.body.msg).toMatch("Produto não encontrado")
        });
    });
});