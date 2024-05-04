 // LOCALIZAÇÃO DE LOJA
const savedCoordinates = [
  { latitude: -15.831637, longitude: -48.037909 },
  { latitude: -15.843737, longitude: -47.917118 },
];

// Definindo a função showSavedCoordinates
function showSavedCoordinates(inputId) {
  const inputElement = document.getElementById(inputId);

  // Remover as opções anteriores, se houver
  const optionsContainer = document.querySelector('.options-container');
  if (optionsContainer) {
    optionsContainer.remove();
  }

  // Criar o container para as opções
  const container = document.createElement('div');
  container.classList.add('options-container');

  // Adicionar uma opção para cada coordenada salva
  savedCoordinates.forEach(coord => {
    const option = document.createElement('div');
    option.classList.add('option');
    option.textContent = `Latitude: ${coord.latitude}, Longitude: ${coord.longitude}`;
    option.addEventListener('click', () => {
      inputElement.value = `Latitude: ${coord.latitude}, Longitude: ${coord.longitude}`;
      container.remove();
    });
    container.appendChild(option);
  });

  // Posicionar o container próximo ao input
  const inputRect = inputElement.getBoundingClientRect();
  container.style.top = `${inputRect.bottom}px`;
  container.style.left = `${inputRect.left}px`;

  // Adicionar o container ao corpo do documento
  document.body.appendChild(container);

  /// Adicionando eventos de clique aos inputs local-retirada e local-devolucao
  document.getElementById('local-retirada').addEventListener('click', function () {
    showSavedCoordinates('local-retirada');
  });

  document.getElementById('local-devolucao').addEventListener('click', function () {
    showSavedCoordinates('local-devolucao');
  });
}

if ('geolocation' in navigator) {
  const watcher = navigator.geolocation.watchPosition(function (position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    // Função para calcular a distância entre duas coordenadas (fórmula de Haversine)
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Raio da Terra em quilômetros
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distância em quilômetros
      return d;
    }

    // Função para converter coordenadas em endereço
    function convertToAddress(latitude, longitude) {
      // Chamada para o serviço de geocodificação reversa do Google Maps
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCGkUcQ85T7UKSJ7fLsn7EqbkqGoAr8Yo0`)
        .then(response => response.json())
        .then(data => {
          // Extrai o endereço do resultado da geocodificação
          const address = data.results[0].formatted_address;
          console.log("Endereço da coordenada:");
          console.log(address);
        })
        .catch(error => {
          console.log(error);
        });
    }

    // Obtendo referência ao input local-retirada
    const inputLocalRetirada = document.getElementById('local-retirada');

    // Atribuindo a função showSavedCoordinates ao evento de clique do input local-retirada
    inputLocalRetirada.addEventListener('click', function () {
      showSavedCoordinates('local-retirada');
    });

    // Encontrar a coordenada salva mais próxima
    let closestCoordinate = savedCoordinates[0];
    let closestDistance = calculateDistance(userLatitude, userLongitude, closestCoordinate.latitude, closestCoordinate.longitude);

    for (let i = 1; i < savedCoordinates.length; i++) {
      const distance = calculateDistance(userLatitude, userLongitude, savedCoordinates[i].latitude, savedCoordinates[i].longitude);
      if (distance < closestDistance) {
        closestCoordinate = savedCoordinates[i];
        closestDistance = distance;
      }
    }

    console.log("Coordenada salva mais próxima:");
    console.log(closestCoordinate);
    console.log("Distância em quilômetros:");
    console.log(closestDistance);

    // Converter coordenada mais próxima para endereço
    convertToAddress(closestCoordinate.latitude, closestCoordinate.longitude);
  }, function (error) {
    console.log(error);
  });
}
// FIM LOCALIZAÇÃO DE LOJAS



// SIDE BAR MENU MOBILE
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', () => {
  menu.classList.add('abrir-menu')
})

menu.addEventListener('click', () => {
  menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', () => {
  menu.classList.remove('abrir-menu')
})

// CARROSSEL ALUGAR
var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

// SIDE BAR ALUGAR
document.addEventListener("DOMContentLoaded", function () {
  const openSidebarButtons = document.querySelectorAll(".open-sidebar-btn");
  const closeSidebarButton = document.querySelector(".close-sidebar-btn");
  const sidebar = document.getElementById("sidebar");
  const overlaySidebar = document.getElementById("overlay-sidebar");

  openSidebarButtons.forEach(function (button) {
    button.addEventListener('click', () => {
      sidebar.classList.add("open");
    });
  });

  closeSidebarButton.addEventListener('click', () => {
    sidebar.classList.remove("open");
  });

  closeSidebarButton.addEventListener('click', () => {
    sidebar.classList.remove("open");
    overlaySidebar.style.display = "none";
  });
});
