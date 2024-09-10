var containerPokemon = document.getElementById("container-pokemon");
var botaoAnterior = document.getElementById("anterior");
var botaoProximo = document.getElementById("proximo");

var deslocamentoAtual =0;
var limite = 12;

function exibirPokemon(listaPokemon) {
containerPokemon.innerHTML = "";
listaPokemon.forEach((pokemon)=> {
    var nomePokemon = document.createElement("p");
    nomePokemon.classList.add("nome-pokemon");
    nomePokemon.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    containerPokemon.appendChild(nomePokemon);
});
}


function buscarPokemon(deslocamento) {
    fetch(`http://pokeapi.co/api/v2/pokemon?offset=${deslocamento}&limit=${limite}`)
    .then((resposta)=> resposta.json())
    .then((dados) => {
        exibirPokemon(dados.results);
        alternarBotoes(deslocamento > 0, dados.next != null);
    });
}
function alternarBotoes(anterior, proximo) {
    botaoAnterior.disabled = !anterior;
    botaoProximo.disabled = !proximo;
}
botaoAnterior.addEventListener("click", () => {
    deslocamentoAtual -= limite;
    buscarPokemon(deslocamentoAtual);
});

botaoProximo.addEventListener("click", () => {
    deslocamentoAtual += limite;
    buscarPokemon(deslocamentoAtual);
});

buscarPokemon(deslocamentoAtual);