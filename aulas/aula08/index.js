const conectar = require('./db');
const readline = require('readline-sync');


async function inserir(nomeTarefa) {
    const db = await conectar();
    const collection = db.collection('tarefas');
    const resultado = await collection.insertOne({ nome: nomeTarefa, concluido: false });
    console.log(resultado);
}

async function buscar(nomeTarefa) {
    const db = await conectar();
    const collection = db.collection('tarefas');
    const resultado = await collection.findOne({ nome: nomeTarefa });
    console.log(resultado);
}

const alterar = async (nomeTarefa, nomeAlterado, concluidaAlterado) => {
    const db = await conectar();
    const collection = db.collection('tarefas');
    const resultado = await collection.updateOne(
        { nome: nomeTarefa },
        { $set: { nome: nomeAlterado, concluido: concluidaAlterado } }
    );
    console.log(resultado);
}

const remover = async (nomeTarefa) => {
    const db = await conectar();
    const collection = db.collection('tarefas');
    const resultado = await collection.deleteOne({ nome: nomeTarefa },);
    console.log(resultado);
}
// const buscarTudo = async () => {
//     const db = await conectar();
//     const collection = db.collection('tarefas');
//     const resultado = collection.find({}).project({ _id: 0, nome: 1 });
//     console.log(resultado);
// }

async function main() {
    while (true) {
        console.log("É os menu");
        console.log("1: Criar tarefa");
        console.log("2: Buscar tarefa");
        console.log("3: Alterar tarefa");
        console.log("4: Remover tarefa");
        console.log("5: sair");
        // console.log("99: buscar tudo");
        const opcao = readline.question("Digite a opção: ");
        switch (parseInt(opcao)) {
            case 1: {
                const nome = readline.question("Informe o nome: ");
                await inserir(nome)
                break;
            }
            case 2: {
                const nome = readline.question("Informe o nome: ");
                await buscar(nome);
                break;
            }
            case 3: {
                const nome = readline.question("Informe o nome: ");
                const novoNome = readline.question("Informe o novo nome: ");
                const isConcluida = readline.question("Foi concluida? [s/N] ")
                await alterar(nome, novoNome, isConcluida == 's' ? true : false);
                break;
            }
            case 4: {
                const nome = readline.question("Informe o nome: ");
                await remover(nome);
                break;
            }
            // case 99: {
            //     await buscarTudo();
            //     break;
            // }

            default:
                process.exit(0);
        }
    }
}

main();