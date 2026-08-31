/**
 * AITradingFinder — Analytics (STEP 24)
 * ------------------------------------------------------------
 * Minimal, dependency-free event tracking layer for the
 * Finder -> Result -> Review -> Affiliate click conversion path.
 *
 * NOT YET CONNECTED to GA4: no Measurement ID has been issued yet (STEP 24
 * explicit instruction). This file only calls window.gtag(...) IF gtag has
 * already been loaded and defined by a page (it currently isn't, anywhere
 * — see the <!-- GA4: ... --> head comment on every page). Until a
 * Measurement ID is set and the gtag.js snippet is uncommented, every
 * track() call here is a safe no-op against GA4 and only appends to the
 * local in-memory AITF_ANALYTICS.getLog() array (used by this project's own
 * test suite to verify events fire correctly before GA4 is ever wired in).
 *
 * ABSOLUTE RULES:
 *  - Never reads or sends any PII (no form inputs, no names/emails — this
 *    site collects none in the first place).
 *  - Never reads/writes assets/data/propfirms.js, Match Score, or Business
 *    Score. This module only observes DOM click events and page-level
 *    milestones already happening in each page's own inline script.
 *  - Never touches an element's href/rel — it only reads them to label an
 *    event. It cannot alter which link a click navigates to.
 *  - outbound_affiliate_click fires only for elements whose rel attribute
 *    already contains "sponsored" — i.e. only for links the page itself
 *    already decided were an APPROVED affiliate link (see comparison.html /
 *    finder.html / best-prop-firms.html / fintokei-review.html CTA gating
 *    logic). This module makes no APPROVED/PLACEHOLDER decisions of its
 *    own; it only labels clicks on links other code already rendered.
 */
window.AITF_ANALYTICS = (function () {
  var log = [];

  function track(eventName, params) {
    params = params || {};
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    log.push({ event: eventName, params: params, at: Date.now() });
    // Also console.log synchronously: some tracked events (e.g. review_click)
    // fire on a same-tab-navigating link, where the in-memory `log` array
    // above is destroyed by the browser before anything can read it back.
    // A synchronous console message, by contrast, is still observable
    // (e.g. by this project's own Playwright test suite, or by a human
    // checking devtools) even though the page unloads immediately after.
    // This has no effect on real GA4 delivery once a Measurement ID is set
    // — gtag.js handles the same-tab-navigation case internally.
    console.log('[AITF_ANALYTICS]', eventName, JSON.stringify(params));
  }

  function getLog() {
    return log.slice();
  }

  function sourcePage() {
    var el = document.body;
    return (el && el.getAttribute('data-page')) || location.pathname.split('/').pop() || 'unknown';
  }

  function wireDelegatedClicks() {
    document.addEventListener('click', function (e) {
      var reviewEl = e.target.closest ? e.target.closest('a[data-track="review_click"]') : null;
      if (reviewEl) {
        track('review_click', {
          firm_id: reviewEl.getAttribute('data-firm-id') || null,
          source_page: sourcePage()
        });
        return;
      }

      var affiliateEl = e.target.closest ? e.target.closest('a[rel*="sponsored"]') : null;
      if (affiliateEl) {
        track('outbound_affiliate_click', {
          firm_id: affiliateEl.getAttribute('data-firm-id') || null,
          source_page: sourcePage()
        });
      }
    });
  }

  wireDelegatedClicks();

  return { track: track, getLog: getLog };
})();
