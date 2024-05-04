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
