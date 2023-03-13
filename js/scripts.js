let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: "Noctowl",
            height: 5,
            type: ['Normal','Flying'],
            abilities: ['Keen Eye','Insomnia']

        },
        {
            name: "Charizard",
            height: 5,
            type: ['Fire','Flying'],
            abilities: ['Blaze']
        },
        {
            name: "Arcanine",
            height: 6,
            type: ['Fire'],
            abilities: ['Intimidate','Flash Fire']
        },
        {
            name: "Moltres",
            height: 6,
            type: ['Fire', 'Flying'],
            abilities: ['Pressure']
        }
    ];

    function addv(userInput) {
        return (typeof userInput === "object" && Object.keys(userInput) === Object.keys(pokemonList));
    }

    function add(pokemon) {
        if (addv(pokemon)) {
            pokemonList.push(pokemon);
        } else {
            document.write("Input is not a valid object!");
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add,
        getAll
    };
})();

/* Opening/creating a div element */
document.write('<div>');

/* Iterating over the array and displaying the name and height of each */
/* for (let i = 0; i < pokemonList.length; i++) {
    let name = pokemonList[i].name;
    let height = pokemonList[i].height;
    if (height > 5) {
        document.write(`<li>${name} (height: ${height}) - Wow, that's big!</li>`);
    } else {
        document.write(`<li>${name} (height: ${height})</li>`);
    }
} */
/* old version of the forEach loop */
/* pokemonRepository.getAll().forEach(function(pokemon) {
    let name = pokemon.name;
    let height = pokemon.height;
    if (height > 5) {
        document.write(`<li>${name} (height: ${height}) - Wow, that's big!</li>`);
    } else {
        document.write(`<li>${name} (height: ${height})</li>`);
    }
}); */

pokemonRepository.getAll().forEach(function(pokemon) {
    let ulList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('liButton');
    listItem.appendChild(button);
    ulList.appendChild(listItem);
});

/* Closing the div element */
document.write('</div>');