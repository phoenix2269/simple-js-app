let pokemonRepository = (function () {
    let pokemonList = [];
//    let apiUrl = 'https://imdb-api.com/en/API/MostPopularMovies/k_vfofrs3q';
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function addv(pokemon) {
        return (typeof pokemon === "object" && 'name' in pokemon && 'detailsUrl' in pokemon);
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

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function addListener (button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon); /* pokemon object currently */
        }); 
    }

    function addListItem(pokemon) {
        let ulList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('liButton');
        listItem.appendChild(button);
        ulList.appendChild(listItem);

        addListener(button, pokemon);
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
