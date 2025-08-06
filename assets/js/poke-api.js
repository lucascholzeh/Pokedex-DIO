const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types // mesma coisa do pokemon.types.get(0)

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Função para obter os detalhes de um Pokémon específico

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json()) // pega a url do .then que pegamos no jsonBody.results e nomeamos de pokemons abaixo
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) // Busca a lista de Pokémon na API
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((jsonBody) => jsonBody.results) // Extrai a lista de resultados com o .results
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia a lista de Pokémon para obter os detalhes de cada um
        .then((detailRequests) => Promise.all(detailRequests)) // Esperando que todas as requisicoes terminem
        .then((pokemonsDetails) => pokemonsDetails) // Apos todas terminarem, volta uma lista de detalhes dos pokemons
}
