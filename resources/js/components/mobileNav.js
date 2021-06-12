const mobileNav = document.querySelector('[data-mobile-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenuIcon = document.querySelector('[data-nav-menu-icon]');
const navCloseIcon = document.querySelector('[data-nav-close-icon]');
const main = document.querySelector('.main');

let isNavOpen = true; 

const toggleNav = () => {
    if (isNavOpen == true) {
        mobileNav.classList.add('hidden')
        navCloseIcon.classList.add('hidden');
        navMenuIcon.classList.remove('hidden');
        navToggle.setAttribute("aria-expanded", "false");
        isNavOpen = false;
    } else {
        mobileNav.classList.remove('hidden')
        navCloseIcon.classList.remove('hidden');
        navMenuIcon.classList.add('hidden');
        navToggle.setAttribute("aria-expanded", "true");
        isNavOpen = true;
    }
}

navToggle.addEventListener('click', () => {
    toggleNav();
})

toggleNav();