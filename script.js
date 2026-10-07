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

    if (!player.podeMover) {
        return;
    }

    let andando = false;

    if (teclas["w"]) {
        player.y -= player.velocidade;
        player.direcao = "up";
        andando = true;
    }

    if (teclas["s"]) {
        player.y += player.velocidade;
        player.direcao = "down";
        andando = true;
    }

    if (teclas["a"]) {
        player.x -= player.velocidade;
        player.direcao = "left";
        andando = true;
    }

    if (teclas["d"]) {
        player.x += player.velocidade;
        player.direcao = "right";
        andando = true;
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


// ========================================
// BOTÕES
// ========================================

const btnComoJogar = document.getElementById("btn-como-jogar");
const btnJogar = document.getElementById("btn-jogar");
const btnCreditos = document.getElementById("btn-creditos");

const btnVoltarComoJogar =
    document.getElementById("btn-voltar-como-jogar");

const btnVoltarCreditos =
    document.getElementById("btn-voltar-creditos");

const btnContinuarEvolucao =
    document.getElementById("btn-continuar-evolucao");


// ========================================
// ABRIR COMO JOGAR
// ========================================

btnComoJogar.addEventListener("click", function() {

    menu.style.display = "none";
    comoJogar.style.display = "flex";

});


// ========================================
// ABRIR CRÉDITOS
// ========================================

btnCreditos.addEventListener("click", function() {

    menu.style.display = "none";
    creditos.style.display = "flex";

});


// ========================================
// VOLTAR DO COMO JOGAR
// ========================================

btnVoltarComoJogar.addEventListener("click", function() {

    comoJogar.style.display = "none";
    menu.style.display = "flex";

});


// ========================================
// VOLTAR DOS CRÉDITOS
// ========================================

btnVoltarCreditos.addEventListener("click", function() {

    creditos.style.display = "none";
    menu.style.display = "flex";

});


// ========================================
// ABRIR O JOGO
// ========================================

btnJogar.addEventListener("click", function() {

    menu.style.display = "none";
    quiz.style.display = "none";
    evolucao.style.display = "none";
    jogo.style.display = "block";

});


// ========================================
// BANCO DE PERGUNTAS DO QUIZ
// ========================================

const perguntasQuiz = [
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
    }
];

let perguntaAtual = 0;
let acertosQuiz = 0;
let respondendoQuiz = false;


// ========================================
// PREPARAR O QUIZ
// ========================================

function prepararQuiz() {

    perguntaAtual = 0;
    acertosQuiz = 0;

    mostrarPergunta();
}


// ========================================
// MOSTRAR PERGUNTA
// ========================================

function mostrarPergunta() {

    const pergunta = perguntasQuiz[perguntaAtual];

    quizNivel.textContent = "PERGUNTA " + (perguntaAtual + 1) + " DE " + perguntasQuiz.length;
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


// ========================================
// RESPONDER QUIZ
// ========================================

function responderQuiz(event) {

    if (!respondendoQuiz) {
        return;
    }

    respondendoQuiz = false;

    const botaoEscolhido = event.currentTarget;
    const resposta = botaoEscolhido.dataset.resposta;
    const pergunta = perguntasQuiz[perguntaAtual];

    const botoes = quizOpcoes.querySelectorAll(".opcao");

    botoes.forEach(function(botao) {
        botao.disabled = true;
    });

    if (resposta === pergunta.correta) {

        acertosQuiz++;

        botaoEscolhido.textContent += " ✓";
        botaoEscolhido.classList.add("resposta-certa");

    } else {

        botaoEscolhido.textContent += " ✗";
        botaoEscolhido.classList.add("resposta-errada");

        botoes.forEach(function(botao) {

            if (botao.dataset.resposta === pergunta.correta) {
                botao.textContent += " ✓";
                botao.classList.add("resposta-certa");
            }

        });
    }

    setTimeout(function() {

        perguntaAtual++;

        if (perguntaAtual < perguntasQuiz.length) {

            mostrarPergunta();

        } else {

            finalizarQuiz();

        }

    }, 900);
}


// ========================================
// FINALIZAR QUIZ
// ========================================

function finalizarQuiz() {

    if (acertosQuiz === perguntasQuiz.length) {

        abrirEvolucao();

    } else {

        jogo.style.display = "block";
        quiz.style.display = "none";

        alert(
            "Você acertou " +
            acertosQuiz +
            " de " +
            perguntasQuiz.length +
            " perguntas. Tente novamente na próxima evolução!"
        );
    }
}


// ========================================
// ABRIR QUIZ
// ========================================

function abrirQuiz() {

    jogo.style.display = "none";
    evolucao.style.display = "none";
    quiz.style.display = "flex";

    prepararQuiz();
}


// ========================================
// FECHAR QUIZ
// ========================================

function fecharQuiz() {

    quiz.style.display = "none";
    jogo.style.display = "block";

}


// ========================================
// EVOLUÇÃO
// ========================================

function abrirEvolucao() {

    quiz.style.display = "none";
    jogo.style.display = "none";
    evolucao.style.display = "flex";

    if (nivel) {
        nivel.textContent = "2";
    }
}


// ========================================
// CONTINUAR DEPOIS DA EVOLUÇÃO
// ========================================

btnContinuarEvolucao.addEventListener("click", function() {

    evolucao.style.display = "none";
    jogo.style.display = "block";

});// ========================================
// QUIZ — UMA PERGUNTA POR EVOLUÇÃO
// ========================================

const perguntasQuiz = [
    {
        pergunta: "Qual é o tipo do Charmander?",
        opcoes: ["A) Água", "B) Fogo", "C) Planta", "D) Elétrico"],
        correta: "B"
    }
];

let perguntaAtual = 0;
let respondendoQuiz = false;

const quizNivel = document.getElementById("quiz-nivel");
const quizPergunta = document.getElementById("quiz-pergunta");
const quizOpcoes = document.querySelector(".quiz-opcoes");
const evolucao = document.getElementById("evolucao");
const nivel = document.getElementById("nivel");

function mostrarPergunta() {
    const pergunta = perguntasQuiz[perguntaAtual];

    quizNivel.textContent = "PERGUNTA 1 DE 1";
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

        // Acertou: fecha o quiz e mostra a evolução imediatamente.
        setTimeout(function() {
            abrirEvolucao();
        }, 500);

    } else {
        botaoEscolhido.classList.add("resposta-errada");
        botaoEscolhido.textContent += " ✗";

        // Errou: cancela a evolução e volta para o jogo.
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

function abrirEvolucao() {
    quiz.style.display = "none";
    jogo.style.display = "none";
    evolucao.style.display = "flex";

    if (nivel) {
        nivel.textContent = "2";
    }
}

const btnContinuarEvolucao = document.getElementById("btn-continuar-evolucao");

if (btnContinuarEvolucao) {
    btnContinuarEvolucao.addEventListener("click", function() {
        evolucao.style.display = "none";
        jogo.style.display = "block";
    });
}
