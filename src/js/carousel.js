export function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(root => {
    const viewport = root.querySelector('[data-carousel-viewport]');
    const track = root.querySelector('[data-carousel-track]');
    const previous = root.querySelector('[data-carousel-previous]');
    const next = root.querySelector('[data-carousel-next]');
    const status = root.querySelector('[data-carousel-status]');
    if (!viewport || !track || !previous || !next) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let destination = null;
    let settleTimer;

    function stepSize() {
      const slide = track.firstElementChild;
      return slide
        ? slide.getBoundingClientRect().width +
            parseFloat(getComputedStyle(track).gap)
        : viewport.clientWidth;
    }

    function update() {
      const max = viewport.scrollWidth - viewport.clientWidth;
      previous.disabled = viewport.scrollLeft <= 2;
      next.disabled = viewport.scrollLeft >= max - 2;
      const step = stepSize();
      const count = track.children.length;
      const visible = Math.max(
        1,
        Math.round(
          (viewport.clientWidth + parseFloat(getComputedStyle(track).gap)) /
            step
        )
      );
      const first = Math.min(
        Math.round(viewport.scrollLeft / step),
        Math.max(0, count - visible)
      );
      const message = `${root.dataset.carouselLabel || 'Cards'} ${first + 1}–${Math.min(first + visible, count)} of ${count}`;
      if (status && status.textContent !== message)
        status.textContent = message;
    }

    function goTo(position) {
      destination = Math.max(
        0,
        Math.min(position, viewport.scrollWidth - viewport.clientWidth)
      );
      viewport.scrollTo({
        left: destination,
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      });
      update();
    }

    function move(direction) {
      goTo((destination ?? viewport.scrollLeft) + direction * stepSize());
    }

    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    viewport.addEventListener('keydown', event => {
      if (event.target !== viewport) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
        return;
      event.preventDefault();
      if (event.key === 'Home') goTo(0);
      else if (event.key === 'End') goTo(viewport.scrollWidth);
      else move(event.key === 'ArrowLeft' ? -1 : 1);
    });

    viewport.addEventListener(
      'scroll',
      () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          destination = null;
          update();
        }, 120);
      },
      { passive: true }
    );

    new ResizeObserver(() => {
      destination = null;
      update();
    }).observe(viewport);

    root.classList.add('carousel--ready');
    update();
  });
}
