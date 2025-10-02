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

        // Nome formatado
        var nomePokemon = document.createElement("p");
        nomePokemon.classList.add("nome-pokemon");
        nomePokemon.textContent =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        // Imagem
        var imagemPokemon = document.createElement("img");
        imagemPokemon.classList.add("imagem-pokemon");
        imagemPokemon.alt = pokemon.name;

        // Buscar detalhes do Pokémon para pegar a imagem
        fetch(pokemon.url)
            .then((res) => res.json())
            .then((dadosPokemon) => {
                // Define sprite padrão (front_default ou fallback)
                imagemPokemon.src =
                    dadosPokemon.sprites.front_default ||
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
            });

        // Monta o card
        card.appendChild(imagemPokemon);
        card.appendChild(nomePokemon);
        containerPokemon.appendChild(card);
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
