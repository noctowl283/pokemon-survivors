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

if (!isset($_SESSION["tela"])) {
    $_SESSION["tela"] = "menu";
}

if (!isset($_SESSION["nivel"])) {
    $_SESSION["nivel"] = 1;
}

if (!isset($_SESSION["pokemon"])) {
    $_SESSION["pokemon"] = "charmander";
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
    header("Location: index.php?continuar=1");
    exit;
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
}

$acao = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $acao = $_POST["acao"] ?? "";
} elseif (isset($_GET["acao"])) {
    $acao = $_GET["acao"];
}

if ($acao !== "") {

    switch ($acao) {
        case "jogar":
            $_SESSION["tela"] = "jogo";
            $_SESSION["nivel"] = 1;
            $_SESSION["pokemon"] = "charmander";
            $_SESSION["pergunta_atual"] = null;
            $_SESSION["ultima_pergunta"] = -1;
            $_SESSION["mensagem"] = "";
            $_SESSION["evolucao_de"] = "charmander";
            $_SESSION["evolucao_para"] = "charmeleon";
            redirecionar();

        case "como-jogar":
            $_SESSION["tela"] = "como-jogar";
            redirecionar();

        case "creditos":
            $_SESSION["tela"] = "creditos";
            redirecionar();

        case "menu":
            // Voltar ao menu encerra a partida e apaga todo o progresso.
            $_SESSION["tela"] = "menu";
            $_SESSION["nivel"] = 1;
            $_SESSION["pokemon"] = "charmander";
            $_SESSION["pergunta_atual"] = null;
            $_SESSION["ultima_pergunta"] = -1;
            $_SESSION["mensagem"] = "";
            $_SESSION["evolucao_de"] = "charmander";
            $_SESSION["evolucao_para"] = "charmeleon";
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
                $ordemEvolucao = [
                    "charmander",
                    "charmeleon",
                    "charizard",
                    "megacharizard"
                ];

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
                $_SESSION["tela"] = "jogo";
                $_SESSION["mensagem"] = "Resposta errada! A evolução foi cancelada.";
            }

            $_SESSION["pergunta_atual"] = null;
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
            <p>Use as teclas <strong>W A S D</strong> para movimentar o Charmander.</p>

            <br>

            <h2>🔥 OBJETIVO</h2>
            <p>Derrote os Pokémon inimigos e sobreviva o máximo de tempo possível.</p>

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
                ❤️ HP: <span id="hp">100</span>/100
            </div>

            <div class="hud-item">
                ⭐ NÍVEL: <span id="nivel"><?= (int) $_SESSION["nivel"] ?></span>
            </div>

            <div class="hud-item">
                ⏱ <span id="tempo">00:00</span>
            </div>

            <form method="post" class="form-menu-jogo">
                <input type="hidden" name="acao" value="menu">
                <button class="botao-menu-jogo" type="submit">MENU</button>
            </form>
        </div>

        <div class="arena">
            <div class="jogador" id="jogador">
                <div class="<?= htmlspecialchars($pokemonAtual["classe"]) ?>"></div>
            </div>

            <div class="inimigo inimigo-1">👾</div>
            <div class="inimigo inimigo-2">👾</div>
            <div class="inimigo inimigo-3">👾</div>
        </div>

        <?php if ($mensagem !== ""): ?>
            <div class="mensagem-jogo">
                <?= htmlspecialchars($mensagem) ?>
            </div>
        <?php endif; ?>

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
