let pokemonList = [];
pokemonList = [
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
]

/* Opening/creating a div element, and opening/creating an unordered list */
document.write('<div><ul>');

/* Iterating over the array and displaying the name and height of each */
for (let i = 0; i < pokemonList.length; i++) {
    let name = pokemonList[i].name;
    let height = pokemonList[i].height;
    if (height > 5) {
        document.write(`<li>${name} (height: ${height}) - Wow, that's big!</li>`);
    } else {
        document.write(`<li>${name} (height: ${height})</li>`);
    }
}

/* Closing the unordered list and div elements */
document.write('</ul></div>');