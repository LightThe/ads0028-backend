const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const url = '/tarefas';
describe('Testes da rota /tarefas', () => {
    let id;
    const rq = {
        nome: "Testar a API",
        concluida: false
    };
    test("GET / deve retornar 200", async () => {
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test("POST / deve retornar 201", async () => {
        const response = await request.post(url).send(rq);

        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);

        expect(response.body.id).toBeDefined();
        id = response.body.id;
        expect(response.body.nome).toMatch(rq.nome);
        expect(response.body.concluida).toBeFalsy();
    });

    test('get /:id deve retornar a tarefa cadastrada', async () => {
        const response = await request.get(`${url}/${id}`);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);

        expect(response.body.id).toBe(id);
        expect(response.body.nome).toMatch(rq.nome);
        expect(response.body.concluida).toBeFalsy();
    });

    test('get /:id deve retornar 404 se não existe', async () => {
        const response = await request.get(`${url}/999`);

        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe("Tarefa não encontrada");
    });
});

