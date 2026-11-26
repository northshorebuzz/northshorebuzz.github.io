/*
  BIRG Contact iframe — child side (NSB CRM site homesonbowenisland.com)  · v3
  What: only acts when a page is shown inside bowenislandrealestate.com.
    1. Adds .nsb-in-iframe to <html> (brand.css hides our header/footer then).
    2. Sends the page height to WordPress so the iframe fits (no inner scrollbar).
    4. (v3) Links and buttons open in the full window, not inside the iframe.
    3. If the iframe lands on any other page (e.g. the thank-you page after the
       form), asks WordPress to open that page in the full window so GTM fires.
  Loaded site-wide from the website's Body tracking code:
    <script src="https://northshorebuzz.github.io/clients/birg/contact-child.js" defer></script>
  Pairs with: clients/birg/contact-embed.js (on WordPress)
*/
(function () {
  if (window.top === window.self) return;            // not in an iframe: do nothing

  var PARENT_RE = /^https:\/\/(www\.)?bowenislandrealestate\.com$/;
  var parentOrigin = '';
  try {
    var anc = window.location.ancestorOrigins;
    parentOrigin = anc && anc.length ? anc[0] : new URL(document.referrer).origin;
  } catch (e) {}
  if (!PARENT_RE.test(parentOrigin)) return;        // only talk to the BIRG site

  var EMBED_PATHS = ['/contact-us', '/about-us'];  // pages meant to live in an iframe (v2: + About Us)
  var path = window.location.pathname.replace(/\/+$/, '') || '/';

  // 3. Landed on another page (thank-you etc.): open it in the full window
  if (EMBED_PATHS.indexOf(path) === -1) {
    parent.postMessage({ type: 'nsb-redirect', url: window.location.href }, parentOrigin);
    return;
  }

  // 1. Iframe mode styling hook
  document.documentElement.classList.add('nsb-in-iframe');

  // 4. Links/buttons open in the full window (else e.g. a "Contact us" button
  //    would load the BIRG site inside its own iframe)
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/^(#|javascript:|mailto:|tel:)/i.test(href)) return;   // leave these alone
    if (a.target === '_blank') return;                          // new-tab links stay as they are
    ev.preventDefault();
    try { window.top.location.href = a.href; }                  // allowed: user clicked
    catch (e) { parent.postMessage({ type: 'nsb-redirect', url: a.href }, parentOrigin); }
  }, true);

  // 2. Report height whenever it changes
  var last = 0;
  function send() {
    // Measure the bottom of the visible sections, not the page box: the page box
    // never shrinks below the iframe's current height, so it could only grow.
    var h = 0;
    var secs = document.querySelectorAll('.c-section, section');
    for (var i = 0; i < secs.length; i++) {
      var r = secs[i].getBoundingClientRect();
      if (r.height > 0) h = Math.max(h, r.bottom + window.scrollY);
    }
    if (!h && document.body) h = document.body.scrollHeight;
    h = Math.ceil(h);
    if (h && Math.abs(h - last) > 2) {
      last = h;
      parent.postMessage({ type: 'nsb-height', height: h }, parentOrigin);
    }
  }
  function start() {
    send();
    if (window.ResizeObserver) new ResizeObserver(send).observe(document.body);
    window.addEventListener('load', send);
    setInterval(send, 1000);                         // catches late form/iframe loads
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
