const perguntas = [ //uma array de objetos
    {//objetos
        pergunta: "Qual é a finalidade do comando 'console.log()' em JavaScript?",
        respostas: [
            "Exibir uma mensagem de erro",
            "Imprimir dados no console",
            "Criar uma variável"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é a função do operador '===' em comparações em JavaScript?",
        respostas: [
            "Comparação de valores sem considerar o tipo",
            "Atribuição de valores",
            "Comparação estrita de valores e tipos"
        ],
        correta: 2
    },
    {
        pergunta: "Como se declara uma variável em JavaScript?",
        respostas: [
            "let myVar;",
            "const myVar = 10;",
            "ambas as opções acima estão corretas"
        ],
        correta: 2
    },
    {
        pergunta: "O que é uma função em JavaScript?",
        respostas: [
            "Um tipo de dado",
            "Um bloco de código reutilizável",
            "Uma variável global"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é a diferença entre 'let' e 'const' na declaração de variáveis?",
        respostas: [
            "Nenhuma, são sinônimos",
            "let é usado para valores constantes, const para variáveis",
            "let permite reatribuição, const cria variáveis imutáveis"
        ],
        correta: 2
    },
    {
        pergunta: "O que é o DOM em JavaScript?",
        respostas: [
            "Um método de criptografia",
            "Um modelo de objeto para manipular documentos HTML",
            "Uma linguagem de programação"
        ],
        correta: 1
    },
    {
        pergunta: "Como se realiza uma iteração sobre os elementos de um array em JavaScript?",
        respostas: [
            "Usando a estrutura 'if-else'",
            "Com a declaração 'switch'",
            "Utilizando loops como 'for' ou 'forEach'"
        ],
        correta: 2
    },
    {
        pergunta: "O que é o JSON em JavaScript?",
        respostas: [
            "Um método de formatação de texto",
            "Uma linguagem de estilização",
            "Um formato de dados leve e intercambiável"
        ],
        correta: 2
    },
    {
        pergunta: "Qual é a diferença entre 'null' e 'undefined' em JavaScript?",
        respostas: [
            "São iguais, usados de forma intercambiável",
            "'null' representa a ausência de valor, 'undefined' é atribuído explicitamente",
            "Ambos representam valores vazios"
        ],
        correta: 1
    },
    {
        pergunta: "Como se adiciona um evento a um elemento HTML usando JavaScript?",
        respostas: [
            "Apenas com CSS",
            "Usando o atributo 'event'",
            "Através do método 'addEventListener'"
        ],
        correta: 2
    },
  ]

const quiz = document.querySelector('#quiz')
const template = document.querySelector('template')

const corretas = new Set()//set() guarda informação sem precisar repitindo ela
const totalDePerguntas = perguntas.length//pega o número total de questões
const mostrarTotal = document.querySelector('#acertos span')//seleciona a query que está em 'span'
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas//Exibe o tptal de perguntas que foram acertadas

for(const item of perguntas){//foreach, lê-se: Para cada item de perguntas, faça!
    const quizItem = template.content.cloneNode(true) //clona o nó (elementos) dentro de uma estrutura de elementos HTML
    quizItem.querySelector('h3').textContent = item.pergunta //atribui ao elemento 'h3' um novo valor, fornecido pelo item pergunta do objeto perguntas: Modifica os titulos de cada questão apresentada

    for(let resposta of item.respostas){
        const dt = quizItem.querySelector('dl dt').cloneNode(true) //clona todos os nós (elementos) presentes em 'dt': Essa linha é quem cria o numero de alternativas de cada questão
        dt.querySelector('span').textContent = resposta //atribui ao elemento 'span' um novo valor, fornecido pelo item resposta do objeto item.perguntas
        dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))//seleciona o elemento input e renomeia o valor do atributo 'name' para 'pergunta-' + a 
                                                                                             //posição do vetor 
        dt.querySelector('input').value = item.respostas.indexOf(resposta)//adiciona ao atributo do elemento 'input' o valor do indice
        dt.querySelector('input').onchange = (event) => {//permite gerar uma mudança: Quando um 'input' é acionado, essa função é acionada
            const estaCorreta = event.target.value == item.correta

            corretas.delete(item)//delete é uma função de set que serve para tirar itens, nesse caso, se o usuário escolher uma opção errada e quiser mudar, delete subtraí a computação em -1 daquela alternativa
            if(estaCorreta) {
                corretas.add(item)//add é uma função de Set que adiciona itens, nesse caso, está computando as opções corretas
            }

            mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
        }


        quizItem.querySelector('dl').appendChild(dt) //seleciona todos os elementos 'dl' e gera um 'filho' (un novo elemento) de quizItem
    }

    quizItem.querySelector('dl dt').remove()    //remove elementos originais que já foram clonados

    quiz.appendChild(quizItem)//cria um novo "filho" (um novo elemento) de quiz: Cria todas as questões no HTML
}  