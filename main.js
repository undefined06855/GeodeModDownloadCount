// URL de donde se obtendrán los mods
var url = 'https://geode-sdk.org/mods/';

// Obtenemos el contenedor de los mods y el campo de búsqueda
var modsContainer = document.getElementById('mods-container');
var searchInput = document.getElementById('search-input');

// Realizamos la solicitud HTTP para obtener los mods
fetch(url)
.then(response => response.text())
.then(html => {
    // Creamos un elemento temporal para inyectar el HTML y acceder a sus elementos
    var tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    // Extraemos los elementos de los mods
    var modCards = tempElement.querySelectorAll('.mod-card');

    // Función para filtrar los mods basados en el texto de búsqueda
    function filterMods() {
        var searchTerm = searchInput.value.toLowerCase();

        modCards.forEach(modCard => {
            var modName = modCard.dataset.name.toLowerCase();
            var modDescription = modCard.dataset.description.toLowerCase();

            if (modName.includes(searchTerm) || modDescription.includes(searchTerm)) {
                modCard.style.display = 'block';
            } else {
                modCard.style.display = 'none';
            }
        });
    }
        
    // Agregamos un evento de escucha al campo de búsqueda para filtrar los mods en tiempo real
    searchInput.addEventListener('input', filterMods);

    // Agregamos los elementos filtrados al contenedor principal
    modCards.forEach(modCard => {
        modsContainer.appendChild(modCard);
    });

    // Agregamos evento de clic a los enlaces "View"
    var viewLinks = document.querySelectorAll('.mod-card .buttons a');
    viewLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar comportamiento predeterminado del enlace
            var modUrl = link.getAttribute('href'); // Obtener la URL del enlace "View"
            var nname = link.parentElement.parentElement.querySelector('h1').textContent.trim(); 
            localStorage.setItem('realname', nname); // Almacenar la versión en el almacenamiento local
            var modVersion = link.parentElement.parentElement.querySelector('.version').textContent.trim(); // Obtener la versión del mod
            localStorage.setItem('modVersion', modVersion); // Almacenar la versión en el almacenamiento local
            window.location.href = 'view.html?url=' + encodeURIComponent(modUrl); // Redirigir a view.html con el parámetro URL
        });
    });
})
.catch(error => {
    console.error('Error fetching mods:', error);
});