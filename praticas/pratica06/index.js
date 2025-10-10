const readline = require('readline-sync');
const controlador = require('./controlador');

function menu() {
    console.log("1 - Adicionar tarefa");
    console.log("2 - Buscar tarefa");
    console.log("3 - Atualizar tarefa");
    console.log("4 - Remover tarefa");
    console.log("5 - Sair.");
}

async function escolherOpcao(opcao) {
    switch (parseInt(opcao)) {
        case 1: {
            const nomeTarefa = readline.question('Escreva o nome da tarefa: ');
            await controlador.adicionarTarefa(nomeTarefa);
            break;
        }
        case 2: {
            const nomeTarefa = readline.question('Escreva o nome da tarefa: ');
            const resultado = await controlador.buscarTarefa(nomeTarefa);
            if (resultado) console.log(resultado);
            else console.log("Não encontrado");
            break;
        }
        case 3: {
            const nomeTarefa = readline.question('Escreva o nome da tarefa: ');
            const concluidaTarefa = readline.question('a tarefa foi concluída? [s/N]: ') == 's' ? true : false;
            await controlador.atualizarTarefa(nomeTarefa, concluidaTarefa);

            break;
        }
        case 4: {
            const nomeTarefa = readline.question('Escreva o nome da tarefa: ');
            await controlador.removerTarefa(nomeTarefa);
            break;
        }
        case 5: {
            process.exit();
        }
        default:
            break;
    }
}

async function main(){
    while (true) {
        menu();
        const op = readline.question('Digite a opção desejada [1-5]: ');
        await escolherOpcao(op);
    }
}

main();