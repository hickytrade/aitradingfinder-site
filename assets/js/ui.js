/**
 * AITradingFinder — shared UI micro-interactions (Step 21)
 * ------------------------------------------------------------
 * Presentation-only helpers. Never reads FACT/business/provider score
 * data and never computes anything — it only animates CSS custom
 * properties that the Match Score gauge (assets/css/style.css .gauge)
 * already uses for its conic-gradient fill. Does not touch
 * matchscore.js / businessscore.js / propfirms.js.
 */
window.AITF_UI = {
  /**
   * Animates every .gauge[data-pct] under `root` from 0 to its target
   * percentage. Call this AFTER injecting gauge markup into the DOM.
   */
  animateGauges: function (root) {
    var scope = root || document;
    var gauges = scope.querySelectorAll('.gauge[data-pct]');
    gauges.forEach(function (el) {
      var target = Number(el.getAttribute('data-pct')) || 0;
      el.style.setProperty('--pct', 0);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.setProperty('--pct', target);
        });
      });
    });
  }
};
