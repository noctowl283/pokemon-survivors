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
    jogo.style.display = "block";

});


// ========================================
// QUIZ
// ========================================

const opcoesQuiz = document.querySelectorAll(".opcao");

opcoesQuiz.forEach(function(opcao) {

    opcao.addEventListener("click", function() {

        const resposta = opcao.dataset.resposta;

        if (resposta === "B") {

            alert("Resposta correta!");

        } else {

            alert("Resposta errada!");

        }

    });

});



// ========================================
// ABRIR QUIZ
// ========================================

function abrirQuiz() {

    jogo.style.display = "none";
    quiz.style.display = "flex";

}


// ========================================
// FECHAR QUIZ
// ========================================

function fecharQuiz() {

    quiz.style.display = "none";
    jogo.style.display = "block";

}