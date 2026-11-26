/*
  BIRG Contact iframe — parent side (WordPress)  · v1
  What: resizes the NSB CRM contact iframe to its content (no inner scrollbar)
        and follows the thank-you redirect in the top window so GTM fires.
  Loaded by (WordPress Contact page, Custom HTML block):
  <script src="https://northshorebuzz.github.io/clients/birg/contact-embed.js" defer></script>
  Pairs with: clients/birg/contact-child.js (on the NSB CRM site)
*/
(function () {
  var ORIGIN = 'https://homesonbowenisland.com';

  window.addEventListener('message', function (e) {
    if (e.origin !== ORIGIN || !e.data || typeof e.data !== 'object') return;
    var frame = document.getElementById('birg-contact-iframe');
    if (!frame) return;

    if (e.data.type === 'nsb-height' && e.data.height > 0) {
      frame.style.height = Math.ceil(e.data.height) + 'px';
    }

    if (e.data.type === 'nsb-redirect' && typeof e.data.url === 'string') {
      var url = e.data.url;
      // Only follow https links on BIRG's own sites
      if (/^https:\/\/(www\.)?(bowenislandrealestate\.com|homesonbowenisland\.com)\//.test(url)) {
        window.location.href = url;
      }
    }
  });
})();
