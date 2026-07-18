const header = document.querySelector('.nav-shell');
const menuButton = document.querySelector('.menu-button');
const hero = document.querySelector('.hero');

requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));

if (hero && matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
    hero.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
  });
}

menuButton?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});
