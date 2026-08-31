/**
 * AITradingFinder — shared nav: active-page detection + mobile toggle.
 * ------------------------------------------------------------
 * Step 21: active-state is now derived from location.pathname instead of
 * a hardcoded class="active" on each page's <nav> markup — the hardcoded
 * version was a known maintenance risk (must remember to set it correctly
 * on every page, and on every future page added in Step 22). This never
 * reads FACT/Agent data and never touches propfirms.js / matchscore.js /
 * businessscore.js.
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const toggle = nav.querySelector('.nav-toggle');
    const panel = document.getElementById('navMobilePanel');
    const links = nav.querySelector('.nav-links');
    if (!toggle || !panel || !links) return;

    const currentFile = (location.pathname.split('/').pop() || 'index.html');
    links.querySelectorAll('a').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === currentFile) a.classList.add('active');
    });

    const inner = document.createElement('div');
    inner.innerHTML = links.innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '');
    panel.innerHTML = '';
    panel.appendChild(inner);

    toggle.addEventListener('click', function () {
      panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', panel.classList.contains('open') ? 'true' : 'false');
    });

    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { panel.classList.remove('open'); });
    });
  });
})();
