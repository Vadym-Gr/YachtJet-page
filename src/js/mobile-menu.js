export function initMobileMenu() {
  const menu = document.querySelector('#mobile-menu');
  const opener = document.querySelector('[data-menu-open]');
  const closer = menu?.querySelector('[data-menu-close]');
  if (!menu || !opener || !closer) return;

  const tablet = window.matchMedia('(min-width: 768px)');
  let scrollPosition = 0;

  function closeMenu({ restoreFocus = true } = {}) {
    if (!menu.open) return;
    menu.classList.remove('is-open');
    menu.close();
    opener.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.body.style.removeProperty('--menu-scroll-offset');
    window.scrollTo(0, scrollPosition);
    if (restoreFocus) {
      const target = tablet.matches
        ? document.querySelector('.header .logo')
        : opener;
      target?.focus({ preventScroll: true });
    }
  }

  opener.addEventListener('click', () => {
    if (tablet.matches || menu.open) return;
    scrollPosition = window.scrollY;
    document.body.style.setProperty(
      '--menu-scroll-offset',
      `-${scrollPosition}px`
    );
    document.body.classList.add('menu-open');
    menu.classList.add('is-open');
    opener.setAttribute('aria-expanded', 'true');
    menu.showModal();
    closer.focus({ preventScroll: true });
  });

  closer.addEventListener('click', () => closeMenu());
  menu.addEventListener('cancel', event => {
    event.preventDefault();
    closeMenu();
  });

  menu.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll('a[href], button')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  menu
    .querySelectorAll('a[href^="#"]:not([data-placeholder])')
    .forEach(link => {
      link.addEventListener('click', event => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        closeMenu({ restoreFocus: false });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: 'start' });
        window.history.pushState(null, '', link.getAttribute('href'));
      });
    });

  tablet.addEventListener('change', () => {
    if (tablet.matches) closeMenu();
  });
}
