import { initMobileMenu } from './js/mobile-menu.js';
import { initCarousels } from './js/carousel.js';
import { initRentForm } from './js/rent-form.js';

initMobileMenu();
initCarousels();
initRentForm();

// Social destinations will be connected when their URLs are available.
document.querySelectorAll('[data-placeholder]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
