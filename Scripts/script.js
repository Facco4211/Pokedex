var containerPokemon = document.getElementById("container-pokemon");
var botaoAnterior = document.getElementById("anterior");
var botaoProximo = document.getElementById("proximo");

var deslocamentoAtual = 0;
var limite = 3;

// Função para exibir os Pokémon
function exibirPokemon(listaPokemon) {
    containerPokemon.innerHTML = "";

    listaPokemon.forEach((pokemon) => {
        // Cria o card
        var card = document.createElement("div");
        card.classList.add("cartao-pokemon");

        // Buscar detalhes do Pokémon para pegar TODOS os dados
        fetch(pokemon.url)
            .then((res) => res.json())
            .then((dadosPokemon) => {
                // Nome
                var nomePokemon = document.createElement("h2");
                nomePokemon.classList.add("nome-pokemon");
                nomePokemon.textContent =
                    dadosPokemon.name.charAt(0).toUpperCase() + dadosPokemon.name.slice(1);

                // Imagem
                var imagemPokemon = document.createElement("img");
                imagemPokemon.classList.add("imagem-pokemon");
                imagemPokemon.alt = dadosPokemon.name;
                imagemPokemon.src =
                    dadosPokemon.sprites.front_default ||
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

                // Tipos (cada um com fundo colorido)
                var tiposContainer = document.createElement("div");
                tiposContainer.textContent = "Tipos: ";

                dadosPokemon.types.forEach((t) => {
                    var spanTipo = document.createElement("span");
                    spanTipo.textContent = t.type.name;
                    spanTipo.classList.add("tipo", "tipo-" + t.type.name); // ex: "tipo tipo-fire"
                    tiposContainer.appendChild(spanTipo);
                });

                // Altura e peso
                var altura = document.createElement("p");
                altura.textContent = "Altura: " + dadosPokemon.height;

                var peso = document.createElement("p");
                peso.textContent = "Peso: " + dadosPokemon.weight;

                // Habilidades
                var habilidades = document.createElement("p");
                habilidades.textContent =
                    "Habilidades: " +
                    dadosPokemon.abilities.map((h) => h.ability.name).join(", ");

                // Stats
                var stats = document.createElement("ul");
                stats.textContent = "Stats:";
                dadosPokemon.stats.forEach((s) => {
                    var li = document.createElement("li");
                    li.textContent = `${s.stat.name}: ${s.base_stat}`;
                    stats.appendChild(li);
                });

                // Ataques (limitar por ex. aos 5 primeiros)
                var ataques = document.createElement("ul");
                ataques.textContent = "Ataques:";
                dadosPokemon.moves.slice(0, 4).forEach((m) => {
                    var li = document.createElement("li");
                    li.textContent = m.move.name;
                    ataques.appendChild(li);
                });
                        // Faz o card virar um "link"
card.addEventListener("click", () => {
    window.location.href = `detalhes.html?pokemon=${dadosPokemon.name}`;
});

                // Monta o card
                card.appendChild(imagemPokemon);
                card.appendChild(nomePokemon);
                card.appendChild(tiposContainer);
                // card.appendChild(altura);
                // card.appendChild(peso);
                // card.appendChild(habilidades);
                // card.appendChild(stats);
                // card.appendChild(ataques);

                containerPokemon.appendChild(card);
            });
    });
}

// Função para buscar lista de Pokémon
function buscarPokemon(deslocamento) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${deslocamento}&limit=${limite}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            exibirPokemon(dados.results);
            alternarBotoes(deslocamento > 0, dados.next != null);
        })
        .catch((erro) => console.error("Erro ao buscar Pokémon:", erro));
}

// Habilita ou desabilita botões
function alternarBotoes(anterior, proximo) {
    botaoAnterior.disabled = !anterior;
    botaoProximo.disabled = !proximo;
}

// Botões de navegação
botaoAnterior.addEventListener("click", () => {
    deslocamentoAtual -= limite;
    buscarPokemon(deslocamentoAtual);
});

botaoProximo.addEventListener("click", () => {
    deslocamentoAtual += limite;
    buscarPokemon(deslocamentoAtual);
});

// Inicializa a lista
buscarPokemon(deslocamentoAtual);
