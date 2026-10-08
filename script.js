// ========================================
// MOVIMENTO — PESSOA 1
// ========================================

const teclas = {};

document.addEventListener("keydown", function(event) {
    const tecla = event.key.toLowerCase();

    if (["w", "a", "s", "d"].includes(tecla)) {
        teclas[tecla] = true;
        atualizarAnimacaoJogador();
    }
});

document.addEventListener("keyup", function(event) {
    const tecla = event.key.toLowerCase();

    if (["w", "a", "s", "d"].includes(tecla)) {
        teclas[tecla] = false;
        atualizarAnimacaoJogador();
    }
});

function atualizarAnimacaoJogador() {
    const sprite = document.querySelector(".jogador > div");

    if (!sprite) {
        return;
    }

    const andando =
        teclas["w"] ||
        teclas["a"] ||
        teclas["s"] ||
        teclas["d"];

    sprite.classList.toggle("andando", andando);
}

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
// CRONÔMETRO
// ========================================

const tempo = document.getElementById("tempo");

if (tempo) {
    const inicio = Date.now();

    function atualizarTempo() {
        const segundos = Math.floor((Date.now() - inicio) / 1000);
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        tempo.textContent =
            String(minutos).padStart(2, "0") +
            ":" +
            String(segundosRestantes).padStart(2, "0");
    }

    setInterval(atualizarTempo, 1000);
    atualizarTempo();
}


// ========================================
// PONTE COM O GAMEPLAY DA PESSOA 1
// O PHP controla o quiz e a evolução.
// ========================================

let ultimoNivel = Number(document.body.dataset.nivel || 1);

setInterval(function() {
    if (typeof player === "undefined") {
        return;
    }

    const nivelDoGameplay = Number(player.nivel || ultimoNivel);

    if (nivelDoGameplay > ultimoNivel) {
        ultimoNivel = nivelDoGameplay;
        window.location.href = "index.php?acao=quiz";
    }
}, 200);
