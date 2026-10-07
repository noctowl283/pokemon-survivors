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
// QUIZ — UMA PERGUNTA POR EVOLUÇÃO
// ========================================

const perguntasQuiz = [
    {
        pergunta: "Qual é o tipo do Charmander?",
        opcoes: ["A) Água", "B) Fogo", "C) Planta", "D) Elétrico"],
        correta: "B"
    }
];

let respondendoQuiz = false;

function mostrarPergunta() {
    const pergunta = perguntasQuiz[0];

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
    const pergunta = perguntasQuiz[0];
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

function abrirEvolucao() {
    quiz.style.display = "none";
    jogo.style.display = "none";
    evolucao.style.display = "flex";

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
