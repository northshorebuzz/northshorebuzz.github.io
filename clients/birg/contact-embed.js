/*
  BIRG Contact iframe — parent side (WordPress)  · v2
  What: builds the white wrapper + NSB CRM Contact Us iframe inside #birg-contact,
        resizes it to its content (no inner scrollbar), and follows the thank-you
        redirect in the top window so GTM fires.
  Everything about the embed (URL, width, spacing) lives here, so changes are a
  push to GitHub — the WordPress block never needs editing.
  WordPress Contact page, Custom HTML block (the whole block):
    <div id="birg-contact"></div>
    <script src="https://northshorebuzz.github.io/clients/birg/contact-embed.js" defer></script>
  Pairs with: clients/birg/contact-child.js (on the NSB CRM site)
*/
(function () {
  var CONFIG = {
    src: 'https://homesonbowenisland.com/contact-us',
    origin: 'https://homesonbowenisland.com',
    title: 'Contact Bowen Island Real Estate Group',
    maxWidth: '1170px',          // keep above 768px so the page uses its desktop layout
    startHeight: '1100px',       // used until the page reports its real height
    outerPadding: '0 16px 40px',
    background: '#ffffff'
  };

  function build() {
    var host = document.getElementById('birg-contact');
    var frame = document.getElementById('birg-contact-iframe');
    if (frame || !host) return frame;

    var outer = document.createElement('div');
    outer.style.cssText = 'background:' + CONFIG.background + ';padding:' + CONFIG.outerPadding + ';';
    var inner = document.createElement('div');
    inner.style.cssText = 'max-width:' + CONFIG.maxWidth + ';margin:0 auto;';

    frame = document.createElement('iframe');
    frame.id = 'birg-contact-iframe';
    frame.src = CONFIG.src;
    frame.title = CONFIG.title;
    frame.setAttribute('scrolling', 'no');
    frame.style.cssText = 'width:100%;height:' + CONFIG.startHeight +
      ';border:0;border-radius:0;display:block;overflow:hidden;';

    inner.appendChild(frame);
    outer.appendChild(inner);
    host.appendChild(outer);
    return frame;
  }

  window.addEventListener('message', function (e) {
    if (e.origin !== CONFIG.origin || !e.data || typeof e.data !== 'object') return;
    var frame = document.getElementById('birg-contact-iframe');
    if (!frame) return;

    if (e.data.type === 'nsb-height' && e.data.height > 0) {
      frame.style.height = Math.ceil(e.data.height) + 'px';
    }

    if (e.data.type === 'nsb-redirect' && typeof e.data.url === 'string') {
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
