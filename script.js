// ========================================
// MÚSICA DA PARTIDA
// ========================================

const nomeMusica =
    "Pokemon FireRed_LeafGreen Music- Wild Pokemon Battle [fbHBSDQ_UZ0].mp3";

const musicaJogo = new Audio(
    "assets/" + encodeURIComponent(nomeMusica)
);

const volumeSalvo = localStorage.getItem("pokemonSurvivorsVolume");
const volumeInicial = volumeSalvo !== null ? Number(volumeSalvo) : 0.45;

musicaJogo.loop = true;
musicaJogo.volume = Math.min(1, Math.max(0, volumeInicial));
musicaJogo.preload = "auto";

const telaAtual = document.body.dataset.tela;
const musicaAtiva = sessionStorage.getItem("pokemonSurvivorsMusica") === "on";

function iniciarMusica() {
    musicaJogo.play().catch(function() {
        // O navegador pode bloquear a reprodução automática.
        // O próximo clique/tecla do usuário poderá liberar a música.
    });
}

function pararMusica() {
    musicaJogo.pause();
    musicaJogo.currentTime = 0;
}

// Ao entrar em qualquer tela durante a partida,
// tenta continuar a música em loop.
if (telaAtual !== "menu" && musicaAtiva) {
    iniciarMusica();
}

// Se o navegador bloquear o autoplay depois de uma mudança de tela,
// o primeiro clique ou tecla do jogador libera a reprodução.
document.addEventListener("pointerdown", function() {
    if (sessionStorage.getItem("pokemonSurvivorsMusica") === "on") {
        iniciarMusica();
    }
});

document.addEventListener("keydown", function() {
    if (sessionStorage.getItem("pokemonSurvivorsMusica") === "on") {
        iniciarMusica();
    }
});

// Apertar JOGAR inicia a música e marca a partida como ativa.
document.querySelectorAll("form").forEach(function(form) {
    const acao = form.querySelector('input[name="acao"]');

    if (!acao) {
        return;
    }

    form.addEventListener("submit", function() {
        if (acao.value === "jogar") {
            sessionStorage.setItem("pokemonSurvivorsMusica", "on");
            iniciarMusica();
        }

        if (acao.value === "menu") {
            sessionStorage.removeItem("pokemonSurvivorsMusica");
            pararMusica();
        }
    });
});

// Se a tela atual for o menu, garante que não exista
// uma marcação antiga de partida com música ativa.
if (telaAtual === "menu") {
    sessionStorage.removeItem("pokemonSurvivorsMusica");
    pararMusica();
}


// ========================================
// MENU DA PARTIDA E VOLUME
// ========================================

const abrirMenuJogo = document.getElementById("abrir-menu-jogo");
const fecharMenuJogo = document.getElementById("fechar-menu-jogo");
const menuOverlay = document.getElementById("menu-overlay");
const controleVolume = document.getElementById("controle-volume");
const valorVolume = document.getElementById("valor-volume");

function atualizarValorVolume() {
    if (!controleVolume || !valorVolume) {
        return;
    }

    const percentual = Math.round(Number(controleVolume.value) * 100);
    valorVolume.textContent = percentual + "%";
}

if (controleVolume) {
    controleVolume.value = String(musicaJogo.volume);
    atualizarValorVolume();

    controleVolume.addEventListener("input", function() {
        const volume = Number(controleVolume.value);

        musicaJogo.volume = Math.min(1, Math.max(0, volume));
        localStorage.setItem("pokemonSurvivorsVolume", String(musicaJogo.volume));

        atualizarValorVolume();
    });
}

function abrirMenuPartida() {
    if (menuOverlay) {
        menuOverlay.hidden = false;
    }
}

function fecharMenuPartida() {
    if (menuOverlay) {
        menuOverlay.hidden = true;
    }
}

if (abrirMenuJogo) {
    abrirMenuJogo.addEventListener("click", abrirMenuPartida);
}

if (fecharMenuJogo) {
    fecharMenuJogo.addEventListener("click", fecharMenuPartida);
}

// Clicar na área escura fora do painel também fecha o menu.
if (menuOverlay) {
    menuOverlay.addEventListener("click", function(event) {
        if (event.target === menuOverlay) {
            fecharMenuPartida();
        }
    });
}

// ESC fecha o menu, sem sair da partida.
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        fecharMenuPartida();
    }
});


// ========================================
// MOVIMENTO — PESSOA 1
// ========================================

const teclas = {};

document.addEventListener("keydown", function(event) {
    const tecla = event.key.toLowerCase();

    if (["w", "a", "s", "d"].includes(tecla)) {
        teclas[tecla] = true;

        const direcoes = {
            w: "up",
            s: "down",
            a: "left",
            d: "right"
        };

        atualizarDirecaoSprite(direcoes[tecla]);
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

function atualizarDirecaoSprite(direcao) {
    const sprite = document.querySelector(".jogador > div");

    if (!sprite || !direcao) {
        return;
    }

    sprite.classList.remove(
        "direcao-up",
        "direcao-down",
        "direcao-left",
        "direcao-right"
    );

    sprite.classList.add("direcao-" + direcao);
}

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

// Começa olhando para baixo, usando o frame central.
atualizarDirecaoSprite("down");

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

    atualizarDirecaoSprite(player.direcao);
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
