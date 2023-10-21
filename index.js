// burger
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.navigation');

if (iconMenu) {
  iconMenu.addEventListener('click', (e) => {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

const menuLinks = document.querySelectorAll('.menu__link');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick)
  })
}

function onMenuLinkClick(e) {
  const menuLink = e.target;
  if (iconMenu.classList.contains('_active')) {
    document.body.classList.remove('_lock');
    iconMenu.classList.remove('_active');
    menuBody.classList.remove('_active');
  }

}



