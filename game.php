<?php
session_start();

$perguntasQuiz = [
    [
        "pergunta" => "Qual é o tipo do Charmander?",
        "opcoes" => ["A) Água", "B) Fogo", "C) Planta", "D) Elétrico"],
        "correta" => "B"
    ],
    [
        "pergunta" => "Qual é a evolução do Charmander?",
        "opcoes" => ["A) Charizard", "B) Bulbasaur", "C) Charmeleon", "D) Squirtle"],
        "correta" => "C"
    ],
    [
        "pergunta" => "Qual destes Pokémon também é do tipo Fogo?",
        "opcoes" => ["A) Pikachu", "B) Squirtle", "C) Bulbasaur", "D) Vulpix"],
        "correta" => "D"
    ],
    [
        "pergunta" => "Quantas evoluções o Charmander possui na linha evolutiva normal?",
        "opcoes" => ["A) 1", "B) 2", "C) 3", "D) 4"],
        "correta" => "B"
    ],
    [
        "pergunta" => "Qual é o nome da habilidade do Charmander que pode aumentar o poder de golpes de Fogo quando ele está com pouco HP?",
        "opcoes" => ["A) Blaze", "B) Torrent", "C) Overgrow", "D) Intimidate"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Qual é o tipo principal do Charmeleon?",
        "opcoes" => ["A) Fogo", "B) Água", "C) Dragão", "D) Voador"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Em qual nível o Charmander evolui para Charmeleon nos jogos principais?",
        "opcoes" => ["A) 12", "B) 14", "C) 16", "D) 18"],
        "correta" => "C"
    ],
    [
        "pergunta" => "Em qual nível o Charmeleon evolui para Charizard nos jogos principais?",
        "opcoes" => ["A) 30", "B) 32", "C) 34", "D) 36"],
        "correta" => "D"
    ],
    [
        "pergunta" => "Qual é o tipo secundário do Charizard?",
        "opcoes" => ["A) Pedra", "B) Voador", "C) Dragão", "D) Lutador"],
        "correta" => "B"
    ],
    [
        "pergunta" => "Qual destes Pokémon é da região de Kanto?",
        "opcoes" => ["A) Charmander", "B) Treecko", "C) Froakie", "D) Scorbunny"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Qual é o número do Charmander na Pokédex Nacional?",
        "opcoes" => ["A) 004", "B) 005", "C) 006", "D) 025"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Qual é o número do Charmeleon na Pokédex Nacional?",
        "opcoes" => ["A) 003", "B) 004", "C) 005", "D) 006"],
        "correta" => "C"
    ],
    [
        "pergunta" => "Qual é o número do Charizard na Pokédex Nacional?",
        "opcoes" => ["A) 004", "B) 005", "C) 006", "D) 007"],
        "correta" => "C"
    ],
    [
        "pergunta" => "Qual Pokémon é conhecido como o Pokémon Lagarto?",
        "opcoes" => ["A) Charmander", "B) Squirtle", "C) Bulbasaur", "D) Pikachu"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Qual item pode ser usado para evoluir Charmander para Charmeleon?",
        "opcoes" => ["A) Pedra de Fogo", "B) Não precisa de item", "C) Pedra do Trovão", "D) Pedra da Água"],
        "correta" => "B"
    ],
    [
        "pergunta" => "Qual destes é um golpe do tipo Fogo?",
        "opcoes" => ["A) Lança-Chamas", "B) Raio de Gelo", "C) Jato d'Água", "D) Folha Navalha"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Qual é a fraqueza de um Pokémon do tipo Fogo?",
        "opcoes" => ["A) Água", "B) Fogo", "C) Grama", "D) Gelo"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Qual destes Pokémon NÃO faz parte da linha evolutiva do Charmander?",
        "opcoes" => ["A) Charmander", "B) Charmeleon", "C) Charizard", "D) Dragonite"],
        "correta" => "D"
    ],
    [
        "pergunta" => "Qual característica combina com o Charmeleon?",
        "opcoes" => ["A) É um Pokémon de Fogo", "B) É um Pokémon de Água", "C) É um Pokémon Elétrico", "D) É um Pokémon de Planta"],
        "correta" => "A"
    ],
    [
        "pergunta" => "Qual é o nome da última evolução normal do Charmander?",
        "opcoes" => ["A) Charmeleon", "B) Charizard", "C) Charmander X", "D) Charcadet"],
        "correta" => "B"
    ]
];

$pokemons = [
    "charmander" => [
        "nome" => "CHARMANDER",
        "classe" => "charmander-jogo",
        "sprite" => "charmander-evolucao",
        "proxima" => "charmeleon"
    ],
    "charmeleon" => [
        "nome" => "CHARMELEON",
        "classe" => "charmeleon-jogo",
        "sprite" => "charmeleon-evolucao",
        "proxima" => "charizard"
    ],
    "charizard" => [
        "nome" => "CHARIZARD",
        "classe" => "charizard-jogo",
        "sprite" => "charizard-evolucao",
        "proxima" => "megacharizard"
    ],
    "megacharizard" => [
        "nome" => "MEGA CHARIZARD X",
        "classe" => "megacharizard-jogo",
        "sprite" => "megacharizard-evolucao",
        "proxima" => null
    ]
];

$ordemEvolucao = [
    "charmander",
    "charmeleon",
    "charizard",
    "megacharizard"
];

if (!isset($_SESSION["tela"])) {
    $_SESSION["tela"] = "menu";
}

if (!isset($_SESSION["nivel"])) {
    $_SESSION["nivel"] = 1;
}

if (!isset($_SESSION["pokemon"])) {
    $_SESSION["pokemon"] = "charmander";
}


function gerarObjetosMapa(): array
{
    $objetos = [];
    $arvores = ["arvore1.png", "arvore2.png", "arvore3.png", "arvore4.png", "arvore5.png"];
    $configuracoes = [
        ["tipo" => "tree", "quantidade" => 70, "largura_visual" => 90, "altura_visual" => 96, "deslocamento_x" => 25, "deslocamento_y" => 60, "largura_colisao" => 40, "altura_colisao" => 30],
        ["tipo" => "rock", "quantidade" => 90, "largura_visual" => 46, "altura_visual" => 41, "deslocamento_x" => 6, "deslocamento_y" => 8, "largura_colisao" => 34, "altura_colisao" => 29]
    ];

    foreach ($configuracoes as $configuracao) {
        $criados = 0;
        $tentativas = 0;
        $maxTentativas = $configuracao["quantidade"] * 500;

        while ($criados < $configuracao["quantidade"] && $tentativas < $maxTentativas) {
            $tentativas++;
            $x = random_int(200, 9800);
            $y = random_int(200, 9800);
            $largura = $configuracao["largura_visual"];
            $altura = $configuracao["altura_visual"];

            if (
                $x < 5300 && $x + $largura > 4700
                && $y < 5300 && $y + $altura > 4700
            ) {
                continue;
            }

            $colisaoX = $x + $configuracao["deslocamento_x"];
            $colisaoY = $y + $configuracao["deslocamento_y"];
            $sobreposto = false;

            foreach ($objetos as $existente) {
                $margem = 32;
                if (
                    $colisaoX < $existente["colisao_x"] + $existente["largura_colisao"] + $margem
                    && $colisaoX + $configuracao["largura_colisao"] + $margem > $existente["colisao_x"]
                    && $colisaoY < $existente["colisao_y"] + $existente["altura_colisao"] + $margem
                    && $colisaoY + $configuracao["altura_colisao"] + $margem > $existente["colisao_y"]
                ) {
                    $sobreposto = true;
                    break;
                }
            }

            if ($sobreposto) {
                continue;
            }

            $sprite = $configuracao["tipo"] === "tree"
                ? $arvores[random_int(0, count($arvores) - 1)]
                : "pedra.png";

            $objetos[] = [
                "tipo" => $configuracao["tipo"],
                "sprite" => $sprite,
                "x" => $x,
                "y" => $y,
                "largura_visual" => $configuracao["largura_visual"],
                "altura_visual" => $configuracao["altura_visual"],
                "colisao_x" => $colisaoX,
                "colisao_y" => $colisaoY,
                "largura_colisao" => $configuracao["largura_colisao"],
                "altura_colisao" => $configuracao["altura_colisao"]
            ];
            $criados++;
        }
    }
    return $objetos;
}

function sortearPergunta(array $perguntas): int
{
    $ultima = $_SESSION["ultima_pergunta"] ?? -1;

    do {
        $indice = random_int(0, count($perguntas) - 1);
    } while (count($perguntas) > 1 && $indice === $ultima);

    $_SESSION["ultima_pergunta"] = $indice;

    return $indice;
}

function redirecionar(): void
{
    header("Location: game.php?continuar=1");
    exit;
}

function resetarPartida(): void
{
    $_SESSION["tela"] = "menu";
    $_SESSION["nivel"] = 1;
    $_SESSION["pokemon"] = "charmander";
    $_SESSION["pergunta_atual"] = null;
    $_SESSION["ultima_pergunta"] = -1;
    $_SESSION["mensagem"] = "";
    unset($_SESSION["pergunta_falha"], $_SESSION["resposta_correta_falha"]);
    $_SESSION["evolucao_de"] = "charmander";
    $_SESSION["evolucao_para"] = "charmeleon";
    unset($_SESSION["objetos_mapa"], $_SESSION["inicio_partida"], $_SESSION["motivo_gameover"]);
}

function iniciarPartida(): void
{
    resetarPartida();
    $_SESSION["tela"] = "jogo";
    $_SESSION["inicio_partida"] = time();
}

if ($_SERVER["REQUEST_METHOD"] === "GET"
    && !isset($_GET["acao"])
    && !isset($_GET["continuar"])) {
    $_SESSION["tela"] = "menu";
    $_SESSION["nivel"] = 1;
    $_SESSION["pokemon"] = "charmander";
    $_SESSION["pergunta_atual"] = null;
    $_SESSION["ultima_pergunta"] = -1;
    $_SESSION["mensagem"] = "";
    unset($_SESSION["objetos_mapa"]);
}

$acao = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $acao = $_POST["acao"] ?? "";
} elseif (isset($_GET["acao"])) {
    $acao = $_GET["acao"];
}

// O limite de cinco minutos também é validado no servidor.
$telaServidor = $_SESSION["tela"] ?? "menu";
if (
    isset($_SESSION["inicio_partida"])
    && !in_array($telaServidor, ["menu", "gameover"], true)
    && !in_array($acao, ["jogar", "menu", "gameover"], true)
    && time() - (int) $_SESSION["inicio_partida"] >= 300
) {
    $_SESSION["tela"] = "gameover";
    $_SESSION["motivo_gameover"] = "tempo";
    $_SESSION["mensagem"] = "";
    redirecionar();
}

if ($acao !== "") {

    switch ($acao) {
        case "jogar":
            iniciarPartida();
            redirecionar();

        case "como-jogar":
            $_SESSION["tela"] = "como-jogar";
            redirecionar();

        case "creditos":
            $_SESSION["tela"] = "creditos";
            redirecionar();

        case "menu":
            // Voltar ao menu encerra a partida e apaga todo o progresso.
            resetarPartida();
            redirecionar();

        case "gameover":
            $_SESSION["tela"] = "gameover";
            $motivoGameover = $_GET["motivo"] ?? $_POST["motivo"] ?? "vida";
            $_SESSION["motivo_gameover"] = $motivoGameover === "tempo" ? "tempo" : "vida";
            $_SESSION["mensagem"] = "";
            redirecionar();

        case "quiz":
            $_SESSION["pergunta_atual"] = sortearPergunta($perguntasQuiz);
            $_SESSION["tela"] = "quiz";
            redirecionar();

        case "responder_quiz":
            $indice = $_SESSION["pergunta_atual"] ?? null;
            $resposta = $_POST["resposta"] ?? "";

            if ($indice === null || !isset($perguntasQuiz[$indice])) {
                $_SESSION["mensagem"] = "Não foi possível carregar a pergunta.";
                $_SESSION["tela"] = "jogo";
                redirecionar();
            }

            if ($resposta === $perguntasQuiz[$indice]["correta"]) {
                $pokemonAtual = $_SESSION["pokemon"];
                $posicaoAtual = array_search($pokemonAtual, $ordemEvolucao, true);

                if ($posicaoAtual !== false && $posicaoAtual < count($ordemEvolucao) - 1) {
                    $proximoPokemon = $ordemEvolucao[$posicaoAtual + 1];

                    $_SESSION["nivel"] = $posicaoAtual + 2;
                    $_SESSION["evolucao_de"] = $pokemonAtual;
                    $_SESSION["evolucao_para"] = $proximoPokemon;
                    $_SESSION["pokemon"] = $proximoPokemon;
                    $_SESSION["tela"] = "evolucao";
                    $_SESSION["mensagem"] = "";
                } else {
                    $_SESSION["tela"] = "jogo";
                    $_SESSION["mensagem"] = "Você já alcançou a forma máxima!";
                }
            } else {
                $letraCorreta = $perguntasQuiz[$indice]["correta"];
                $indiceCorreto = ord($letraCorreta) - ord("A");

                $_SESSION["pergunta_falha"] = $perguntasQuiz[$indice]["pergunta"];
                $_SESSION["resposta_correta_falha"] =
                    $perguntasQuiz[$indice]["opcoes"][$indiceCorreto] ?? $letraCorreta;
                $_SESSION["tela"] = "falha_evolucao";
                $_SESSION["mensagem"] = "";
            }

            $_SESSION["pergunta_atual"] = null;
            redirecionar();

        case "continuar_falha":
            $_SESSION["tela"] = "jogo";
            unset($_SESSION["pergunta_falha"], $_SESSION["resposta_correta_falha"]);
            redirecionar();

        case "continuar_evolucao":
            $_SESSION["tela"] = "jogo";
            redirecionar();
    }
}

$tela = $_SESSION["tela"];
$pokemonAtual = $pokemons[$_SESSION["pokemon"]];
$mensagem = $_SESSION["mensagem"] ?? "";
$_SESSION["mensagem"] = "";

$perguntaAtual = $_SESSION["pergunta_atual"] ?? null;

$evolucaoDeId = $_SESSION["evolucao_de"] ?? "charmander";
$evolucaoParaId = $_SESSION["evolucao_para"] ?? "charmeleon";
$evolucaoDe = $pokemons[$evolucaoDeId];
$evolucaoPara = $pokemons[$evolucaoParaId];

// O PHP gera e guarda o mapa uma vez por partida para que o cenário
// continue igual quando o jogador abre o quiz e volta ao jogo.
if (
    $tela === "jogo"
    && (
        !isset($_SESSION["objetos_mapa"])
        || empty($_SESSION["objetos_mapa"])
        || !isset($_SESSION["objetos_mapa"][0]["sprite"])
        || !isset($_SESSION["objetos_mapa"][0]["largura_visual"])
    )
) {
    $_SESSION["objetos_mapa"] = gerarObjetosMapa();
}
$objetosMapa = $_SESSION["objetos_mapa"] ?? [];
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Survivors</title>
    <link rel="stylesheet" href="style.css">
</head>

<body
    data-nivel="<?= (int) $_SESSION["nivel"] ?>"
    data-pokemon="<?= htmlspecialchars($_SESSION["pokemon"], ENT_QUOTES, "UTF-8") ?>"
    data-tela="<?= htmlspecialchars($tela, ENT_QUOTES, "UTF-8") ?>"
>

<?php if ($tela === "menu"): ?>

    <main class="tela menu">
        <div class="titulo">
            <h1>POKÉMON</h1>
            <h2>SURVIVORS</h2>
        </div>

        <div class="pokemon-menu">
            <div class="charmander"></div>
        </div>

        <div class="botoes-menu">
            <form method="post">
                <input type="hidden" name="acao" value="jogar">
                <button class="botao" type="submit">JOGAR</button>
            </form>

            <form method="post">
                <input type="hidden" name="acao" value="como-jogar">
                <button class="botao" type="submit">COMO JOGAR</button>
            </form>

            <form method="post">
                <input type="hidden" name="acao" value="creditos">
                <button class="botao" type="submit">CRÉDITOS</button>
            </form>
        </div>

        <p class="versao">Versão 1.0</p>
    </main>

<?php elseif ($tela === "como-jogar"): ?>

    <main class="tela tela-secundaria">
        <h1>COMO JOGAR</h1>

        <div class="caixa-informacao">
            <h2>🎮 CONTROLES</h2>
            <p>Use as teclas <strong>W A S D</strong> para movimentar seu Pokémon.</p>
            <p>Pressione <strong>ESPAÇO</strong> para disparar bolas de fogo.</p>

            <br>

            <h2>🔥 OBJETIVO</h2>
            <p>Derrote Zubats com bolas de fogo. Eles deixam esferas azuis que dão experiência quando recolhidas.</p>
            <p>A cada nível, a quantidade de EXP necessária aumenta.</p>
            <p>Sobreviva por até <strong>5 minutos</strong>: perder todas as vidas ou o tempo causa GAME OVER.</p>

            <br>

            <h2>⭐ EVOLUÇÃO</h2>
            <p>Ao subir de nível, você deverá responder perguntas sobre Pokémon.</p>
            <p>Se acertar, seu Pokémon evolui!</p>

            <br>

            <h2>🧠 QUIZ</h2>
            <p>A cada evolução aparecerá uma pergunta aleatória.</p>
            <p>Escolha a resposta correta para continuar sua evolução.</p>
        </div>

        <form method="post">
            <input type="hidden" name="acao" value="menu">
            <button class="botao" type="submit">VOLTAR</button>
        </form>
    </main>

<?php elseif ($tela === "creditos"): ?>

    <main class="tela tela-secundaria">
        <h1>CRÉDITOS</h1>

        <div class="caixa-informacao">
            <h2>POKÉMON SURVIVORS</h2>
            <p>2°DS A - Etec Philadelpho Gouvea Netto</p>

            <br>

            <p><strong>Desenvolvedores</strong></p>
            <p>Renan R. I. de Melo</p>
            <p>Murilo Ramos Lamana Figueiredo</p>

            <br>

            <p>Projeto desenvolvido utilizando:</p>
            <p>PHP • HTML • CSS • JavaScript</p>
        </div>

        <form method="post">
            <input type="hidden" name="acao" value="menu">
            <button class="botao" type="submit">VOLTAR</button>
        </form>
    </main>

<?php elseif ($tela === "jogo"): ?>

    <main class="tela-jogo">
        <div class="hud">
            <div class="hud-item">
                ❤️ HP: <span id="hp">5</span>/5
            </div>

            <div class="hud-item">
                ⭐ NÍVEL: <span id="nivel"><?= (int) $_SESSION["nivel"] ?></span>
            </div>

            <div class="exp-hud" aria-label="Barra de experiência">
                <div class="exp-legenda">
                    <span>🔵 EXP</span>
                    <span><strong id="exp-valor">0</strong>/<strong id="exp-total"><?= 100 + max(0, ((int) $_SESSION["nivel"]) - 1) * 50 ?></strong></span>
                </div>
                <div class="exp-trilho">
                    <div id="exp-preenchimento" class="exp-preenchimento"></div>
                </div>
            </div>

            <div class="hud-item">
                ⏱ <span id="tempo">00:00</span>
            </div>

            <button class="botao-menu-jogo" id="abrir-menu-jogo" type="button">
                MENU
            </button>
        </div>

        <div class="menu-overlay" id="menu-overlay" hidden>
            <div class="menu-painel">
                <h2>MENU</h2>

                <div class="controle-volume">
                    <label for="controle-volume">🔊 VOLUME DA MÚSICA</label>

                    <div class="volume-linha">
                        <span>0%</span>
                        <input
                            id="controle-volume"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value="0.45"
                        >
                        <span>100%</span>
                    </div>

                    <strong id="valor-volume">45%</strong>
                </div>

                <button class="botao" id="fechar-menu-jogo" type="button">
                    CONTINUAR
                </button>

                <form method="post">
                    <input type="hidden" name="acao" value="menu">
                    <button class="botao botao-voltar-menu" type="submit">
                        VOLTAR AO MENU
                    </button>
                </form>
            </div>
        </div>

        <div id="game" aria-label="Mapa do Pokémon Survivors">
            <div id="world">
                <div id="objects">
                    <?php foreach ($objetosMapa as $objeto): ?>
                        <div
                            class="<?= htmlspecialchars($objeto["tipo"], ENT_QUOTES, "UTF-8") ?>"
                            data-tipo="<?= htmlspecialchars($objeto["tipo"], ENT_QUOTES, "UTF-8") ?>"
                            data-x="<?= (int) $objeto["colisao_x"] ?>"
                            data-y="<?= (int) $objeto["colisao_y"] ?>"
                            data-largura="<?= (int) $objeto["largura_colisao"] ?>"
                            data-altura="<?= (int) $objeto["altura_colisao"] ?>"
                            style="left: <?= (int) $objeto["x"] ?>px; top: <?= (int) $objeto["y"] ?>px;"
                            aria-hidden="true"
                        >
                            <img
                                class="cenario-sprite"
                                src="assets/arvores-pedras/<?= htmlspecialchars($objeto["sprite"], ENT_QUOTES, "UTF-8") ?>"
                                alt=""
                                width="<?= (int) $objeto["largura_visual"] ?>"
                                height="<?= (int) $objeto["altura_visual"] ?>"
                            >
                        </div>
                    <?php endforeach; ?>
                </div>

                <div
                    id="player"
                    class="<?= htmlspecialchars($pokemonAtual["classe"], ENT_QUOTES, "UTF-8") ?> direcao-down"
                    data-direcao="down"
                    role="img"
                    aria-label="<?= htmlspecialchars($pokemonAtual["nome"], ENT_QUOTES, "UTF-8") ?>"
                ></div>

                <div id="monster" aria-hidden="true"></div>
            </div>
        </div>

        <div id="heart" aria-label="Vidas restantes"></div>

        <div id="pokemon-intro" aria-hidden="true">
            <div id="pokebola"></div>
            <div id="charmander-intro"></div>
        </div>

        <?php if ($mensagem !== ""): ?>
            <div class="mensagem-jogo">
                <?= htmlspecialchars($mensagem) ?>
            </div>
        <?php endif; ?>

        <!-- Botão de teste para abrir o quiz manualmente durante o jogo. -->
        <form method="post" class="form-teste-quiz">
            <input type="hidden" name="acao" value="quiz">
            <button class="botao-teste-quiz" type="submit">
                TESTAR QUIZ
            </button>
        </form>

        <!-- Ponte para o código de gameplay da Pessoa 1. -->
        <form method="post" id="form-quiz" class="quiz-integracao">
            <input type="hidden" name="acao" value="quiz">
        </form>
    </main>

<?php elseif ($tela === "quiz"): ?>

    <main class="tela-quiz">
        <div class="quiz-caixa">
            <h1>⭐ HORA DO QUIZ!</h1>
            <h2>PERGUNTA ALEATÓRIA</h2>

            <?php if ($perguntaAtual !== null && isset($perguntasQuiz[$perguntaAtual])): ?>
                <p id="quiz-pergunta">
                    <?= htmlspecialchars($perguntasQuiz[$perguntaAtual]["pergunta"]) ?>
                </p>

                <form method="post" class="quiz-opcoes">
                    <input type="hidden" name="acao" value="responder_quiz">

                    <?php foreach ($perguntasQuiz[$perguntaAtual]["opcoes"] as $indice => $opcao): ?>
                        <button
                            class="opcao"
                            type="submit"
                            name="resposta"
                            value="<?= chr(65 + $indice) ?>">
                            <?= htmlspecialchars($opcao) ?>
                        </button>
                    <?php endforeach; ?>
                </form>
            <?php endif; ?>
        </div>
    </main>

<?php elseif ($tela === "gameover"): ?>

    <main class="tela-gameover">
        <div class="gameover-caixa">
            <h1>GAME OVER</h1>
            <?php if (($_SESSION["motivo_gameover"] ?? "vida") === "tempo"): ?>
                <h2>⏱ O tempo acabou!</h2>
                <p>Você sobreviveu por 5 minutos. A partida terminou.</p>
            <?php else: ?>
                <h2>❤️ Suas vidas acabaram!</h2>
                <p>Os Pokémon inimigos venceram desta vez. Tente sobreviver por mais tempo.</p>
            <?php endif; ?>
            <p class="gameover-nivel">Nível alcançado: <?= (int) $_SESSION["nivel"] ?></p>
            <form method="post">
                <input type="hidden" name="acao" value="menu">
                <button class="botao" type="submit">VOLTAR AO MENU</button>
            </form>
        </div>
    </main>

<?php elseif ($tela === "falha_evolucao"): ?>

    <main class="tela-falha-evolucao">
        <div class="falha-caixa">
            <h1>❌ EVOLUÇÃO FALHOU!</h1>
            <p class="falha-intro">Você errou a resposta e desta vez a evolução não aconteceu.</p>

            <?php if (!empty($_SESSION["pergunta_falha"])): ?>
                <p class="falha-pergunta">
                    <?= htmlspecialchars($_SESSION["pergunta_falha"], ENT_QUOTES, "UTF-8") ?>
                </p>
            <?php endif; ?>

            <div class="falha-resposta">
                <strong>Resposta correta:</strong>
                <span>
                    <?= htmlspecialchars($_SESSION["resposta_correta_falha"] ?? "Resposta não disponível", ENT_QUOTES, "UTF-8") ?>
                </span>
            </div>

            <p class="falha-dica">Junte experiência e tente novamente no próximo nível.</p>

            <form method="post">
                <input type="hidden" name="acao" value="continuar_falha">
                <button class="botao" type="submit">VOLTAR AO JOGO</button>
            </form>
        </div>
    </main>

<?php elseif ($tela === "evolucao"): ?>

    <main class="tela-evolucao">
        <div class="evolucao-caixa">
            <h1>⭐ EVOLUÇÃO! ⭐</h1>

            <div class="evolucao-animacao">
                <div class="sprite-evolucao <?= htmlspecialchars($evolucaoDe["sprite"]) ?> pokemon-saida"></div>

                <div class="bola-evolucao"></div>

                <?php if ($evolucaoParaId === "megacharizard"): ?>
                    <div class="pedra-evolucao"></div>
                <?php endif; ?>

                <div class="sprite-evolucao <?= htmlspecialchars($evolucaoPara["sprite"]) ?> pokemon-entrada"></div>
            </div>

            <p class="texto-evolucao">
                <?= htmlspecialchars($evolucaoDe["nome"]) ?>
                →
                <?= htmlspecialchars($evolucaoPara["nome"]) ?>
            </p>

            <form method="post" class="form-continuar-evolucao">
                <input type="hidden" name="acao" value="continuar_evolucao">
                <button class="botao" type="submit">CONTINUAR</button>
            </form>
        </div>
    </main>

<?php endif; ?>

<script src="script.js"></script>

</body>
</html>
