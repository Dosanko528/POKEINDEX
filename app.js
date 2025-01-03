const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
    
    //非同期処理を追加
    const promises = [];
    
    for (let i =1; i<=150;i++) { 
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
                name:data.name,
                id:data.id,
                image:data.sprites['front_default'],
                type:data.types.map(type => type.type.name).join(', ')
            }));
            displayPokemon(pokemon);
        });
            
};

//　htmlでポケモンを表示
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(pokeman => `
        <li>
            <img src="${pokeman.image}"/>
            <h2>${pokeman.id}. ${pokeman.name}</h2>
            <p>Type: ${pokeman.type}</p>
        </li>
        ` )

   
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();