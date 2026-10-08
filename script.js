// ========================================
// MOVIMENTO — PESSOA 1
// ========================================

const teclas = {};

document.addEventListener("keydown", function(event) {
    teclas[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
    teclas[event.key.toLowerCase()] = false;
});

function moverPlayer() {
    if (typeof player === "undefined" || !player.podeMover) {
        return;
    }

    if (teclas["w"]) {
        player.y -= player.velocidade;
        player.direcao = "up";
    }
    if (teclas["s"]) {
        player.y += player.velocidade;
        player.direcao = "down";
    }
    if (teclas["a"]) {
        player.x -= player.velocidade;
        player.direcao = "left";
    }
    if (teclas["d"]) {
        player.x += player.velocidade;
        player.direcao = "right";
    }
}


// ========================================
// ELEMENTOS
// ========================================

const menu = document.getElementById("menu");
const comoJogar = document.getElementById("como-jogar");
const creditos = document.getElementById("creditos");
const jogo = document.getElementById("jogo");
const quiz = document.getElementById("quiz");
const evolucao = document.getElementById("evolucao");

const nivel = document.getElementById("nivel");
const quizNivel = document.getElementById("quiz-nivel");
const quizPergunta = document.getElementById("quiz-pergunta");
const quizOpcoes = document.querySelector(".quiz-opcoes");

const btnComoJogar = document.getElementById("btn-como-jogar");
const btnJogar = document.getElementById("btn-jogar");
const btnCreditos = document.getElementById("btn-creditos");
const btnVoltarComoJogar = document.getElementById("btn-voltar-como-jogar");
const btnVoltarCreditos = document.getElementById("btn-voltar-creditos");
const btnContinuarEvolucao = document.getElementById("btn-continuar-evolucao");
const jogadorSprite = document.querySelector(".charmander-jogo");


// ========================================
// MENU
// ========================================

btnComoJogar.addEventListener("click", function() {
    menu.style.display = "none";
    comoJogar.style.display = "flex";
});

btnCreditos.addEventListener("click", function() {
    menu.style.display = "none";
    creditos.style.display = "flex";
});

btnVoltarComoJogar.addEventListener("click", function() {
    comoJogar.style.display = "none";
    menu.style.display = "flex";
});

btnVoltarCreditos.addEventListener("click", function() {
    creditos.style.display = "none";
    menu.style.display = "flex";
});

btnJogar.addEventListener("click", function() {
    menu.style.display = "none";
    comoJogar.style.display = "none";
    creditos.style.display = "none";
    quiz.style.display = "none";
    evolucao.style.display = "none";
    jogo.style.display = "block";
});


// ========================================
// BANCO DE 20 PERGUNTAS
// 4 antigas + 16 novas
// ========================================

const perguntasQuiz = [
    // 4 perguntas que já existiam
    {
        pergunta: "Qual é o tipo do Charmander?",
        opcoes: ["A) Água", "B) Fogo", "C) Planta", "D) Elétrico"],
        correta: "B"
    },
    {
        pergunta: "Qual é a evolução do Charmander?",
        opcoes: ["A) Charizard", "B) Bulbasaur", "C) Charmeleon", "D) Squirtle"],
        correta: "C"
    },
    {
        pergunta: "Qual destes Pokémon também é do tipo Fogo?",
        opcoes: ["A) Pikachu", "B) Squirtle", "C) Bulbasaur", "D) Vulpix"],
        correta: "D"
    },
    {
        pergunta: "Quantas evoluções o Charmander possui na linha evolutiva normal?",
        opcoes: ["A) 1", "B) 2", "C) 3", "D) 4"],
        correta: "B"
    },

    // 16 perguntas novas
    {
        pergunta: "Qual é o nome da habilidade do Charmander que pode aumentar o poder de golpes de Fogo quando ele está com pouco HP?",
        opcoes: ["A) Blaze", "B) Torrent", "C) Overgrow", "D) Intimidate"],
        correta: "A"
    },
    {
        pergunta: "Qual é o tipo principal do Charmeleon?",
        opcoes: ["A) Fogo", "B) Água", "C) Dragão", "D) Voador"],
        correta: "A"
    },
    {
        pergunta: "Em qual nível o Charmander evolui para Charmeleon nos jogos principais?",
        opcoes: ["A) 12", "B) 14", "C) 16", "D) 18"],
        correta: "C"
    },
    {
        pergunta: "Em qual nível o Charmeleon evolui para Charizard nos jogos principais?",
        opcoes: ["A) 30", "B) 32", "C) 34", "D) 36"],
        correta: "D"
    },
    {
        pergunta: "Qual é o tipo secundário do Charizard?",
        opcoes: ["A) Pedra", "B) Voador", "C) Dragão", "D) Lutador"],
        correta: "B"
    },
    {
        pergunta: "Qual destes Pokémon é da região de Kanto?",
        opcoes: ["A) Charmander", "B) Treecko", "C) Froakie", "D) Scorbunny"],
        correta: "A"
    },
    {
        pergunta: "Qual é o número do Charmander na Pokédex Nacional?",
        opcoes: ["A) 004", "B) 005", "C) 006", "D) 025"],
        correta: "A"
    },
    {
        pergunta: "Qual é o número do Charmeleon na Pokédex Nacional?",
        opcoes: ["A) 003", "B) 004", "C) 005", "D) 006"],
        correta: "C"
    },
    {
        pergunta: "Qual é o número do Charizard na Pokédex Nacional?",
        opcoes: ["A) 004", "B) 005", "C) 006", "D) 007"],
        correta: "C"
    },
    {
        pergunta: "Qual Pokémon é conhecido como o Pokémon Lagarto?",
        opcoes: ["A) Charmander", "B) Squirtle", "C) Bulbasaur", "D) Pikachu"],
        correta: "A"
    },
    {
        pergunta: "Qual item pode ser usado para evoluir Charmander para Charmeleon?",
        opcoes: ["A) Pedra de Fogo", "B) Não precisa de item", "C) Pedra do Trovão", "D) Pedra da Água"],
        correta: "B"
    },
    {
        pergunta: "Qual destes é um golpe do tipo Fogo?",
        opcoes: ["A) Lança-Chamas", "B) Raio de Gelo", "C) Jato d'Água", "D) Folha Navalha"],
        correta: "A"
    },
    {
        pergunta: "Qual é a fraqueza de um Pokémon do tipo Fogo?",
        opcoes: ["A) Água", "B) Fogo", "C) Grama", "D) Gelo"],
        correta: "A"
    },
    {
        pergunta: "Qual destes Pokémon NÃO faz parte da linha evolutiva do Charmander?",
        opcoes: ["A) Charmander", "B) Charmeleon", "C) Charizard", "D) Dragonite"],
        correta: "D"
    },
    {
        pergunta: "Qual característica combina com o Charmeleon?",
        opcoes: ["A) É um Pokémon de Fogo", "B) É um Pokémon de Água", "C) É um Pokémon Elétrico", "D) É um Pokémon de Planta"],
        correta: "A"
    },
    {
        pergunta: "Qual é o nome da última evolução normal do Charmander?",
        opcoes: ["A) Charmeleon", "B) Charizard", "C) Charmander X", "D) Charcadet"],
        correta: "B"
    }
];


// ========================================
// QUIZ ALEATÓRIO
// ========================================

let perguntaAtual = null;
let respondendoQuiz = false;
let ultimaPergunta = -1;

function sortearPergunta() {
    if (perguntasQuiz.length === 1) {
        return 0;
    }

    let indice;

    do {
        indice = Math.floor(Math.random() * perguntasQuiz.length);
    } while (indice === ultimaPergunta);

    ultimaPergunta = indice;
    return indice;
}

function mostrarPergunta() {
    perguntaAtual = sortearPergunta();

    const pergunta = perguntasQuiz[perguntaAtual];

    quizNivel.textContent = "PERGUNTA ALEATÓRIA";
    quizPergunta.textContent = pergunta.pergunta;
    quizOpcoes.innerHTML = "";

    pergunta.opcoes.forEach(function(textoOpcao, indice) {
        const letra = String.fromCharCode(65 + indice);
        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.dataset.resposta = letra;
        botao.textContent = textoOpcao;
        botao.addEventListener("click", responderQuiz);

        quizOpcoes.appendChild(botao);
    });

    respondendoQuiz = true;
}

function responderQuiz(event) {
    if (!respondendoQuiz) return;

    respondendoQuiz = false;

    const botaoEscolhido = event.currentTarget;
    const resposta = botaoEscolhido.dataset.resposta;
    const pergunta = perguntasQuiz[perguntaAtual];
    const botoes = quizOpcoes.querySelectorAll(".opcao");

    botoes.forEach(function(botao) {
        botao.disabled = true;
    });

    if (resposta === pergunta.correta) {
        botaoEscolhido.classList.add("resposta-certa");
        botaoEscolhido.textContent += " ✓";

        setTimeout(function() {
            abrirEvolucao();
        }, 500);
    } else {
        botaoEscolhido.classList.add("resposta-errada");
        botaoEscolhido.textContent += " ✗";

        setTimeout(function() {
            quiz.style.display = "none";
            jogo.style.display = "block";
            alert("Resposta errada! A evolução foi cancelada.");
        }, 500);
    }
}

function abrirQuiz() {
    jogo.style.display = "none";
    evolucao.style.display = "none";
    quiz.style.display = "flex";
    mostrarPergunta();
}

function fecharQuiz() {
    quiz.style.display = "none";
    jogo.style.display = "block";
}


// ========================================
// EVOLUÇÃO
// ========================================

function aplicarEvolucao() {
    if (!jogadorSprite) return;

    jogadorSprite.classList.remove("charmander-jogo");
    jogadorSprite.classList.add("charmeleon-jogo");
}

function abrirEvolucao() {
    quiz.style.display = "none";
    jogo.style.display = "none";
    evolucao.style.display = "flex";

    aplicarEvolucao();

    if (nivel) {
        nivel.textContent = "2";
    }
}

if (btnContinuarEvolucao) {
    btnContinuarEvolucao.addEventListener("click", function() {
        evolucao.style.display = "none";
        jogo.style.display = "block";
    });
}
