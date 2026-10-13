<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Survivors</title>
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #151515;
        }

        #game-frame {
            display: block;
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
    </style>
    <script>
        // Este áudio vive fora das telas PHP. O iframe pode navegar sem
        // destruir a instância, então a música segue do mesmo ponto.
        (function() {
            const nomeMusica =
                "Pokemon FireRed_LeafGreen Music- Wild Pokemon Battle [fbHBSDQ_UZ0].mp3";
            const musica = new Audio("assets/" + encodeURIComponent(nomeMusica));
            const volumeSalvoBruto = localStorage.getItem("pokemonSurvivorsVolume");
            const volumeSalvo = volumeSalvoBruto === null
                ? 0.45
                : Number(volumeSalvoBruto);

            musica.loop = true;
            musica.preload = "auto";
            musica.volume = Number.isFinite(volumeSalvo)
                ? Math.min(1, Math.max(0, volumeSalvo))
                : 0.45;

            window.pokemonSurvivorsMusic = musica;
        })();
    </script>
</head>
<body>
    <iframe
        id="game-frame"
        src="game.php"
        title="Pokémon Survivors"
        allow="autoplay"
    ></iframe>
</body>
</html>
