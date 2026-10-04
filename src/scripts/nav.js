// OWASP Day — menú móvil accesible + header compacto al hacer scroll. Sin dependencias.
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  if (!header || !toggle || !nav) return;
  var label = toggle.querySelector('.visually-hidden');
  // While the full-screen menu is open, the rest of the page is inert (no focus, no scroll).
  var outside = [document.getElementById('contenido'), document.querySelector('.site-footer'), document.querySelector('.skip-link')];

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    outside.forEach(function (el) {
      if (!el) return;
      if (open) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
    if (label) label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
    if (mq.matches) setOpen(false);
  });

  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
