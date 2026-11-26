/*
  BIRG page iframes — parent side (WordPress)  · v5
  What: builds the white wrapper + NSB CRM page iframe inside each .birg-embed,
        resizes it to its content (no inner scrollbar), and follows the thank-you
        redirect in the top window so GTM fires.
  Everything about the embed (URL, width, spacing) lives here, so changes are a
  push to GitHub — the WordPress block never needs editing.
  WordPress Custom HTML block (the whole block). data-page = the NSB CRM page path:
    <div class="birg-embed" data-page="about-us"></div>
    <script src="https://northshorebuzz.github.io/clients/birg/contact-embed.js" defer></script>
  The Contact page's older <div id="birg-contact"></div> still works (= contact-us).
  v3: one script for any page (Contact, About Us, ...).
  v5: if a BIRG page ever loads inside one of these iframes, it jumps out to the full window.
  v4: never follows a redirect to a page that is itself embedded (guards against an old cached child script).
  Pairs with: clients/birg/contact-child.js (on the NSB CRM site)
*/
(function () {
  // v5 safety net: this BIRG page is showing inside another BIRG page's iframe
  // (e.g. a link clicked inside the embed) — open it in the full window instead.
  try {
    if (window.top !== window.self && window.top.location.host === window.location.host) {
      window.top.location.href = window.location.href;
      return;
    }
  } catch (e) {}

  var CONFIG = {
    origin: 'https://homesonbowenisland.com',
    maxWidth: '1170px',          // keep above 768px so the page uses its desktop layout
    startHeight: '1100px',       // used until the page reports its real height
    outerPadding: '0 16px 40px',
    background: '#ffffff'
  };

  function buildOne(host, page) {
    if (host.querySelector('iframe')) return;
    var outer = document.createElement('div');
    outer.style.cssText = 'background:' + CONFIG.background + ';padding:' + CONFIG.outerPadding + ';';
    var inner = document.createElement('div');
    inner.style.cssText = 'max-width:' + CONFIG.maxWidth + ';margin:0 auto;';

    var frame = document.createElement('iframe');
    frame.className = 'birg-embed-iframe';
    if (page === 'contact-us') frame.id = 'birg-contact-iframe';
    frame.src = CONFIG.origin + '/' + page;
    frame.title = 'Bowen Island Real Estate Group';
    frame.setAttribute('scrolling', 'no');
    frame.style.cssText = 'width:100%;height:' + CONFIG.startHeight +
      ';border:0;border-radius:0;display:block;overflow:hidden;';

    inner.appendChild(frame);
    outer.appendChild(inner);
    host.appendChild(outer);
  }

  function build() {
    var old = document.getElementById('birg-contact');
    if (old) buildOne(old, 'contact-us');
    var hosts = document.querySelectorAll('.birg-embed[data-page]');
    for (var i = 0; i < hosts.length; i++) {
      var page = hosts[i].getAttribute('data-page').replace(/^\/+|\/+$/g, '');
      if (/^[a-z0-9-]+$/.test(page)) buildOne(hosts[i], page);
    }
  }

  window.addEventListener('message', function (e) {
    if (e.origin !== CONFIG.origin || !e.data || typeof e.data !== 'object') return;
    // Find the iframe that sent this message
    var frames = document.querySelectorAll('iframe');
    var frame = null;
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) { frame = frames[i]; break; }
    }
    if (!frame) return;

    if (e.data.type === 'nsb-height' && e.data.height > 0) {
      frame.style.height = Math.ceil(e.data.height) + 'px';
    }

    if (e.data.type === 'nsb-redirect' && typeof e.data.url === 'string') {
      // Ignore redirects to pages that are meant to stay in an iframe
      try {
        var path = new URL(e.data.url).pathname.replace(/^\/+|\/+$/g, '');
        if (path === 'contact-us' || document.querySelector('.birg-embed[data-page="' + path + '"]')) return;
      } catch (err) { return; }
      // Only follow https links on BIRG's own sites
      if (/^https:\/\/(www\.)?(bowenislandrealestate\.com|homesonbowenisland\.com)\//.test(e.data.url)) {
        window.location.href = e.data.url;
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
