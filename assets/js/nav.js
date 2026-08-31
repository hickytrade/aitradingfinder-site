/**
 * AITradingFinder — shared mobile nav toggle.
 * Clones the desktop nav-links into a slide-down panel and wires the hamburger button.
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const toggle = nav.querySelector('.nav-toggle');
    const panel = document.getElementById('navMobilePanel');
    const links = nav.querySelector('.nav-links');
    if (!toggle || !panel || !links) return;

    panel.innerHTML = links.innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '');

    toggle.addEventListener('click', function () {
      panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', panel.classList.contains('open') ? 'true' : 'false');
    });

    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => panel.classList.remove('open'));
    });
  });
})();
