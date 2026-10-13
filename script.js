// ========================================
// MÚSICA DA PARTIDA
// ========================================

const nomeMusica =
    "Pokemon FireRed_LeafGreen Music- Wild Pokemon Battle [fbHBSDQ_UZ0].mp3";

const musicaJogo = new Audio(
    "assets/" + encodeURIComponent(nomeMusica)
);

const volumeSalvo = Number(localStorage.getItem("pokemonSurvivorsVolume"));
const volumeInicial = Number.isFinite(volumeSalvo)
    ? Math.min(1, Math.max(0, volumeSalvo))
    : 0.45;

musicaJogo.loop = true;
musicaJogo.volume = volumeInicial;
musicaJogo.preload = "auto";

const telaAtual = document.body.dataset.tela;
const musicaAtiva = sessionStorage.getItem("pokemonSurvivorsMusica") === "on";
const telasComMusica = new Set(["jogo", "quiz", "evolucao"]);

function iniciarMusica() {
    if (!musicaJogo.paused) {
        return;
    }

    musicaJogo.play().catch(function() {
        // O navegador pode bloquear a reprodução automática.
    });
}

function pararMusica() {
    musicaJogo.pause();
    musicaJogo.currentTime = 0;
}

// Ao entrar em qualquer tela durante a partida,
// tenta continuar a música em loop.
if (telasComMusica.has(telaAtual) && musicaAtiva) {
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
            sessionStorage.setItem("pokemonSurvivorsInicio", String(Date.now()));
            iniciarMusica();
        }

        if (acao.value === "menu") {
            sessionStorage.removeItem("pokemonSurvivorsMusica");
            sessionStorage.removeItem("pokemonSurvivorsInicio");
            pararMusica();
        }
    });
});

// Se a tela atual for o menu, garante que não exista
// uma marcação antiga de partida com música ativa.
if (telaAtual === "menu") {
    sessionStorage.removeItem("pokemonSurvivorsMusica");
    sessionStorage.removeItem("pokemonSurvivorsInicio");
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
// ========================================
// GAMEPLAY — MOVIMENTO, MAPA E COMBATE
// Configuração, mapa, quiz e evolução ficam no PHP.
// As ações em tempo real continuam no navegador.
// ========================================

const gameplayAtivo = document.getElementById("world") !== null;
const playerElement = document.getElementById("player");
const world = document.getElementById("world");
const objectsElement = document.getElementById("objects");
const heartElement = document.getElementById("heart");
const hpElement = document.getElementById("hp");
const TAMANHO_MAPA = 10000;

const player = {
    x: 5000,
    y: 5000,
    vida: 5,
    vidaMaxima: 5,
    pokemon: document.body.dataset.pokemon || "charmander",
    direcao: "down",
    largura: 70,
    altura: 70,
    velocidade: 5,
    nivel: Number(document.body.dataset.nivel || 1),
    podeMover: false
};

// A posição e as vidas ficam no navegador para não reiniciarem
// quando a partida abre o quiz PHP e depois retorna ao mapa.
if (gameplayAtivo && sessionStorage.getItem("pokemonSurvivorsMusica") === "on") {
    try {
        const posicaoSalva = JSON.parse(
            sessionStorage.getItem("pokemonSurvivorsPosicao") || "null"
        );

        if (
            posicaoSalva &&
            Number.isFinite(posicaoSalva.x) &&
            Number.isFinite(posicaoSalva.y)
        ) {
            player.x = Math.min(9900, Math.max(100, posicaoSalva.x));
            player.y = Math.min(9900, Math.max(100, posicaoSalva.y));
        }
    } catch (erro) {
        sessionStorage.removeItem("pokemonSurvivorsPosicao");
    }
}

const vidasSalvas = sessionStorage.getItem("pokemonSurvivorsVidas");
let coracoes = gameplayAtivo && vidasSalvas !== null
    ? Math.min(5, Math.max(0, Number(vidasSalvas) || 0))
    : 5;

const objetos = gameplayAtivo
    ? Array.from(document.querySelectorAll("#objects [data-tipo]")).map(function(elemento) {
        return {
            x: Number(elemento.dataset.x),
            y: Number(elemento.dataset.y),
            largura: Number(elemento.dataset.largura),
            altura: Number(elemento.dataset.altura),
            elemento: elemento
        };
    })
    : [];

const teclas = {};
const teclasMovimento = new Set([
    "w", "a", "s", "d",
    "arrowup", "arrowdown", "arrowleft", "arrowright"
]);
let podeAtacar = true;
let podeReceberDano = true;

function atualizarVida() {
    if (heartElement) {
        heartElement.style.width = (coracoes * 35) + "px";
        heartElement.setAttribute("aria-label", coracoes + " vidas restantes");
    }

    if (hpElement) {
        hpElement.textContent = String(coracoes);
    }

    sessionStorage.setItem("pokemonSurvivorsVidas", String(coracoes));
}

function atualizarDirecaoSprite(direcao) {
    if (!playerElement || !direcao) {
        return;
    }

    player.direcao = direcao;
    playerElement.dataset.direcao = direcao;
    playerElement.classList.remove(
        "direcao-up",
        "direcao-down",
        "direcao-left",
        "direcao-right"
    );
    playerElement.classList.add("direcao-" + direcao);
}

function atualizarAnimacaoJogador() {
    if (!playerElement) {
        return;
    }

    const andando = Array.from(teclasMovimento).some(function(tecla) {
        return teclas[tecla];
    });

    playerElement.classList.toggle("andando", andando);
}

document.addEventListener("keydown", function(event) {
    const tecla = event.key.toLowerCase();

    if (teclasMovimento.has(tecla)) {
        teclas[tecla] = true;

        const direcoes = {
            w: "up",
            arrowup: "up",
            s: "down",
            arrowdown: "down",
            a: "left",
            arrowleft: "left",
            d: "right",
            arrowright: "right"
        };

        atualizarDirecaoSprite(direcoes[tecla]);
        atualizarAnimacaoJogador();
    }

    if (
        gameplayAtivo &&
        event.code === "Space" &&
        !event.repeat &&
        player.podeMover &&
        podeAtacar
    ) {
        event.preventDefault();
        criarFireBall();
        podeAtacar = false;

        setTimeout(function() {
            podeAtacar = true;
        }, 300);
    }
});

document.addEventListener("keyup", function(event) {
    const tecla = event.key.toLowerCase();

    if (teclasMovimento.has(tecla)) {
        teclas[tecla] = false;
        atualizarAnimacaoJogador();
    }
});

function posicaoLivre(x, y, largura, altura) {
    const margem = 40;

    if (
        x < player.x + 200 &&
        x + largura > player.x - 200 &&
        y < player.y + 200 &&
        y + altura > player.y - 200
    ) {
        return false;
    }

    return !objetos.some(function(objeto) {
        return (
            x < objeto.x + objeto.largura + margem &&
            x + largura + margem > objeto.x &&
            y < objeto.y + objeto.altura + margem &&
            y + altura + margem > objeto.y
        );
    });
}

function colidiuComObjeto(x, y) {
    const margem = 8;
    const jogador = {
        x: x - player.largura / 2 + margem,
        y: y - player.altura / 2 + margem,
        largura: player.largura - margem * 2,
        altura: player.altura - margem * 2
    };

    return objetos.some(function(objeto) {
        return (
            jogador.x < objeto.x + objeto.largura &&
            jogador.x + jogador.largura > objeto.x &&
            jogador.y < objeto.y + objeto.altura &&
            jogador.y + jogador.altura > objeto.y
        );
    });
}

function moverPlayer() {
    if (!player.podeMover) {
        return;
    }

    if (teclas["w"] || teclas["arrowup"]) {
        const novoY = player.y - player.velocidade;
        if (!colidiuComObjeto(player.x, novoY)) {
            player.y = novoY;
        }
        atualizarDirecaoSprite("up");
    }

    if (teclas["s"] || teclas["arrowdown"]) {
        const novoY = player.y + player.velocidade;
        if (!colidiuComObjeto(player.x, novoY)) {
            player.y = novoY;
        }
        atualizarDirecaoSprite("down");
    }

    if (teclas["a"] || teclas["arrowleft"]) {
        const novoX = player.x - player.velocidade;
        if (!colidiuComObjeto(novoX, player.y)) {
            player.x = novoX;
        }
        atualizarDirecaoSprite("left");
    }

    if (teclas["d"] || teclas["arrowright"]) {
        const novoX = player.x + player.velocidade;
        if (!colidiuComObjeto(novoX, player.y)) {
            player.x = novoX;
        }
        atualizarDirecaoSprite("right");
    }

    const limite = 100;
    player.x = Math.min(TAMANHO_MAPA - limite, Math.max(limite, player.x));
    player.y = Math.min(TAMANHO_MAPA - limite, Math.max(limite, player.y));
}

function atualizarPlayer() {
    if (!playerElement) {
        return;
    }

    playerElement.style.left = (player.x - player.largura / 2) + "px";
    playerElement.style.top = (player.y - player.altura / 2) + "px";
}

function atualizarCamera() {
    if (!world) {
        return;
    }

    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight / 2;

    world.style.left = (centroX - player.x) + "px";
    world.style.top = (centroY - player.y) + "px";
}

function criarFireBall() {
    const fireball = document.createElement("div");
    fireball.classList.add("fireball", player.direcao);
    world.appendChild(fireball);

    let x = player.x - 15;
    let y = player.y - 15;
    const velocidade = 10;
    let direcaoX = 0;
    let direcaoY = 0;

    if (player.direcao === "up") direcaoY = -1;
    if (player.direcao === "down") direcaoY = 1;
    if (player.direcao === "left") direcaoX = -1;
    if (player.direcao === "right") direcaoX = 1;

    function moverFireBall() {
        if (!fireball.isConnected) {
            return;
        }

        x += direcaoX * velocidade;
        y += direcaoY * velocidade;
        fireball.style.left = x + "px";
        fireball.style.top = y + "px";

        const monstros = document.querySelectorAll(".zubat");

        for (const monstro of monstros) {
            const monstroX = Number.parseFloat(monstro.style.left);
            const monstroY = Number.parseFloat(monstro.style.top);

            if (
                x < monstroX + 70 &&
                x + 45 > monstroX &&
                y < monstroY + 70 &&
                y + 45 > monstroY
            ) {
                monstro.remove();
                fireball.remove();
                return;
            }
        }

        if (x < 0 || y < 0 || x > TAMANHO_MAPA || y > TAMANHO_MAPA) {
            fireball.remove();
            return;
        }

        requestAnimationFrame(moverFireBall);
    }

    moverFireBall();
}

const pokemonIntro = document.getElementById("pokemon-intro");
const pokebolaIntro = document.getElementById("pokebola");
const charmanderIntro = document.getElementById("charmander-intro");

function iniciarPlayer() {
    atualizarPlayer();
    atualizarDirecaoSprite("down");
}

function iniciarIntro() {
    if (!gameplayAtivo || !pokemonIntro) {
        return;
    }

    // A introdução acontece uma vez por partida, não ao retornar do quiz.
    if (sessionStorage.getItem("pokemonSurvivorsIntroVisto") === "on") {
        pokemonIntro.remove();
        player.podeMover = true;
        return;
    }

    player.podeMover = false;

    if (pokebolaIntro) {
        pokebolaIntro.style.display = "block";
        pokebolaIntro.style.backgroundPosition = "0 0";
    }

    setTimeout(function() {
        if (pokebolaIntro) pokebolaIntro.style.backgroundPosition = "-75px 0";
    }, 800);

    setTimeout(function() {
        if (pokebolaIntro) pokebolaIntro.style.backgroundPosition = "-150px 0";
    }, 1200);

    setTimeout(function() {
        if (pokebolaIntro) pokebolaIntro.style.display = "none";

        if (charmanderIntro) {
            charmanderIntro.classList.add("aparecer");
        }

        const somCharmander = new Audio("assets/myinstants.mp3");
        somCharmander.volume = 0.3;
        somCharmander.play().catch(function() {});
    }, 1500);

    setTimeout(function() {
        if (pokemonIntro) pokemonIntro.classList.add("finalizar");
    }, 2800);

    setTimeout(function() {
        if (pokemonIntro) pokemonIntro.remove();
        player.podeMover = true;
        sessionStorage.setItem("pokemonSurvivorsIntroVisto", "on");
    }, 3400);
}

function spawnMonster() {
    if (!gameplayAtivo || !world) {
        return;
    }

    const modelo = document.getElementById("monster");
    if (!modelo) {
        return;
    }

    const novoMonster = modelo.cloneNode(true);
    novoMonster.removeAttribute("id");
    novoMonster.classList.add("zubat");

    const distanciaSpawn = 1500;
    let x = player.x + (Math.random() * distanciaSpawn * 2 - distanciaSpawn);
    let y = player.y + (Math.random() * distanciaSpawn * 2 - distanciaSpawn);

    x = Math.min(TAMANHO_MAPA - 100, Math.max(100, x));
    y = Math.min(TAMANHO_MAPA - 100, Math.max(100, y));

    novoMonster.style.left = x + "px";
    novoMonster.style.top = y + "px";
    world.appendChild(novoMonster);

    const velocidade = 3;

    function seguirPlayer() {
        if (!novoMonster.isConnected) {
            return;
        }

        const dx = player.x - x;
        const dy = player.y - y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia > 0) {
            x += (dx / distancia) * velocidade;
            y += (dy / distancia) * velocidade;

            novoMonster.style.left = x + "px";
            novoMonster.style.top = y + "px";
            verificarDano(novoMonster);
        }

        requestAnimationFrame(seguirPlayer);
    }

    seguirPlayer();
}

function tocarSomDano() {
    const somDano = new Audio("assets/roblox-death-sound-effect.mp3");
    somDano.play().catch(function() {});
}

function verificarDano(monstro) {
    if (!monstro.isConnected) {
        return;
    }

    const monstroX = Number.parseFloat(monstro.style.left) + 35;
    const monstroY = Number.parseFloat(monstro.style.top) + 35;
    const dx = player.x - monstroX;
    const dy = player.y - monstroY;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < 60 && podeReceberDano) {
        podeReceberDano = false;

        if (coracoes > 0) {
            coracoes--;
            atualizarVida();
        }

        if (playerElement) {
            playerElement.classList.add("dano");
        }

        tocarSomDano();

        let vermelho = true;
        const intervalo = setInterval(function() {
            vermelho = !vermelho;
            if (playerElement) {
                playerElement.classList.toggle("dano", vermelho);
            }
        }, 300);

        setTimeout(function() {
            clearInterval(intervalo);
            if (playerElement) {
                playerElement.classList.remove("dano");
            }
            podeReceberDano = true;
        }, 600);
    }
}

// O cronômetro continua contando durante as telas PHP de quiz/evolução.
const tempo = document.getElementById("tempo");

if (tempo) {
    let inicio = Number(sessionStorage.getItem("pokemonSurvivorsInicio"));

    if (!Number.isFinite(inicio) || inicio <= 0) {
        inicio = Date.now();
        sessionStorage.setItem("pokemonSurvivorsInicio", String(inicio));
    }

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

// Os formulários de início/menu redefinem somente o estado de uma nova partida.
document.querySelectorAll("form").forEach(function(form) {
    const acao = form.querySelector('input[name="acao"]');

    if (!acao) {
        return;
    }

    form.addEventListener("submit", function() {
        if (acao.value === "jogar") {
            sessionStorage.removeItem("pokemonSurvivorsPosicao");
            sessionStorage.setItem("pokemonSurvivorsVidas", "5");
            sessionStorage.removeItem("pokemonSurvivorsIntroVisto");
        }

        if (acao.value === "menu") {
            sessionStorage.removeItem("pokemonSurvivorsPosicao");
            sessionStorage.removeItem("pokemonSurvivorsVidas");
            sessionStorage.removeItem("pokemonSurvivorsIntroVisto");
        }
    });
});

if (telaAtual === "menu") {
    sessionStorage.removeItem("pokemonSurvivorsPosicao");
    sessionStorage.removeItem("pokemonSurvivorsVidas");
    sessionStorage.removeItem("pokemonSurvivorsIntroVisto");
}

if (gameplayAtivo) {
    atualizarVida();
    iniciarPlayer();
    iniciarIntro();

    function gameLoop() {
        moverPlayer();
        atualizarPlayer();
        atualizarCamera();

        sessionStorage.setItem(
            "pokemonSurvivorsPosicao",
            JSON.stringify({ x: player.x, y: player.y })
        );

        requestAnimationFrame(gameLoop);
    }

    setInterval(spawnMonster, 3000);
    gameLoop();
}

// Mantém a integração com qualquer sistema futuro que aumente player.nivel.
let ultimoNivel = Number(document.body.dataset.nivel || 1);

setInterval(function() {
    if (!gameplayAtivo) {
        return;
    }

    const nivelDoGameplay = Number(player.nivel || ultimoNivel);

    if (nivelDoGameplay > ultimoNivel) {
        ultimoNivel = nivelDoGameplay;
        window.location.href = "index.php?acao=quiz";
    }
}, 200);
