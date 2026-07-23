const header = document.querySelector('.nav-shell');
const menuButton = document.querySelector('.menu-button');
const hero = document.querySelector('.hero');

requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));

if (hero && matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  let motionFrame = 0;
  let nextX = 0;
  let nextY = 0;
  let glowX = 0;
  let glowY = 0;

  const renderMotion = () => {
    hero.style.setProperty('--depth-x', `${nextX}px`);
    hero.style.setProperty('--depth-y', `${nextY}px`);
    hero.style.setProperty('--glow-x', `${glowX}px`);
    hero.style.setProperty('--glow-y', `${glowY}px`);
    motionFrame = 0;
  };

  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    nextX = normalizedX * -8;
    nextY = normalizedY * -5;
    glowX = event.clientX - bounds.left;
    glowY = event.clientY - bounds.top;
    if (!motionFrame) motionFrame = requestAnimationFrame(renderMotion);
  });

  hero.addEventListener('pointerleave', () => {
    nextX = 0;
    nextY = 0;
    if (!motionFrame) motionFrame = requestAnimationFrame(renderMotion);
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
