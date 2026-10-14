import { initMobileMenu } from './js/mobile-menu.js';

initMobileMenu();

// Social destinations will be connected when their URLs are available.
document.querySelectorAll('[data-placeholder]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
