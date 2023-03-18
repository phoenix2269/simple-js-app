let pokemonRepository = (function () {
    let pokemonList = [];
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
            modalRepository.showModal(pokemon);
        });
    }

    function addListener (button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
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

let modalRepository = (function () {
    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {

        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Need to change the below code to work with the pokemon buttons
        // Add the new modal content
/*         let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
 */
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = `Height: ${pokemon.height}`;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        // modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    return {
        showModal,
        hideModal
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
