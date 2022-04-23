const SITE_HEADER = document.querySelector('.site-header');
const BURGER = document.querySelector('.burger');
const BURGER_LINKS = document.querySelectorAll('.burger__link');
const BURGER_BUTTON = document.querySelector('.burger-button');
const MOBILE_MENU = document.querySelector('.mobile-menu');

let isMobileMenuOpen = false;

const openMenu = () => {
    document.body.classList.add('mobile-menu__opened');
    SITE_HEADER.classList.add('header--hidden');
    MOBILE_MENU.classList.add('mobile-menu--open');
    BURGER.classList.add('burger--open');
    BURGER_BUTTON.classList.add('burger-button--open', 'burger-button--primary')
    isMobileMenuOpen = true;
}

const closeMenu = () => {
    document.body.classList.remove('mobile-menu__opened');
    SITE_HEADER.classList.remove('header--hidden');
    MOBILE_MENU.classList.remove('mobile-menu--open');
    BURGER.classList.remove('burger--open');
    BURGER_BUTTON.classList.remove('burger-button--open', 'burger-button--primary');
    isMobileMenuOpen = false;
}

BURGER.addEventListener('click', (evt) => evt.stopPropagation());
BURGER_BUTTON.addEventListener('click', () => isMobileMenuOpen ? closeMenu() : openMenu());
BURGER_LINKS.forEach((link) => link.addEventListener('click', () => closeMenu()));
MOBILE_MENU.addEventListener('click', () => closeMenu())