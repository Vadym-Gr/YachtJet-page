import { initMobileMenu } from './js/mobile-menu.js';
import { initCarousels } from './js/carousel.js';

initMobileMenu();
initCarousels();

// Social destinations will be connected when their URLs are available.
document.querySelectorAll('[data-placeholder]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
