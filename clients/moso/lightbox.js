/* ============================================================
   MOSO BAMBOO CANADA — LIGHTBOX (Version 1 on GitHub)
   Click to view full screen:
     .img-lightbox on an Image element  = opens that image
     .bg-lightbox on a column / section = opens its background image
       (links, buttons and form fields inside still work normally)
   Click anywhere, the x, or press Esc to close.
   Loaded site-wide from the website's Body tracking code (after GTM noscript):
     <script src="https://northshorebuzz.github.io/clients/moso/lightbox.js" defer></script>
   V1 (Nov 28, 2026): copied word for word from the script that sat in the
   website's Head tracking code.
   ============================================================ */
(function () {
  if (window.__nsbLightbox) return;
  window.__nsbLightbox = true;

  var css = ''
    + '.img-lightbox, .img-lightbox img, .bg-lightbox { cursor: zoom-in; }'
    + '#nsb-lb { position: fixed; inset: 0; z-index: 999999; display: flex; align-items: center; justify-content: center;'
    + ' background: rgba(0,0,0,0.9); opacity: 0; visibility: hidden; transition: opacity .25s ease, visibility .25s ease; cursor: zoom-out; }'
    + '#nsb-lb.nsb-lb-open { opacity: 1; visibility: visible; }'
    + '#nsb-lb img { max-width: 94vw; max-height: 92vh; width: auto; height: auto; object-fit: contain;'
    + ' box-shadow: 0 10px 40px rgba(0,0,0,.5); transform: scale(.96); transition: transform .25s ease; }'
    + '#nsb-lb.nsb-lb-open img { transform: scale(1); }'
    + '#nsb-lb-close { position: absolute; top: 16px; right: 20px; background: none; border: 0; color: #fff;'
    + ' font-size: 40px; line-height: 1; cursor: pointer; padding: 4px 10px; }';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var box, pic;
  function build() {
    box = document.createElement('div');
    box.id = 'nsb-lb';
    box.innerHTML = '<button id="nsb-lb-close" aria-label="Close">&times;</button><img alt="">';
    pic = box.querySelector('img');
    box.addEventListener('click', close);
    document.body.appendChild(box);
  }
  function open(src, alt) {
    if (!box) build();
    pic.src = src;
    pic.alt = alt || '';
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(function () { box.classList.add('nsb-lb-open'); });
  }
  function close() {
    if (!box) return;
    box.classList.remove('nsb-lb-open');
    document.documentElement.style.overflow = '';
  }
  function bgUrl(el) {
    var bg = el && getComputedStyle(el).backgroundImage;
    var m = bg && bg.match(/url\(["']?(.*?)["']?\)/);
    return m ? m[1] : null;
  }
  function findSrc(el) {
    var img = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (img) return { src: img.currentSrc || img.src, alt: img.alt };
    var url = bgUrl(el);
    return url ? { src: url, alt: '' } : null;
  }
  /* Column background: checks the column itself, then anything inside it,
     then up to two wrappers above it (GHL puts the background on different
     layers depending on the element). */
  function findBg(el) {
    var url = bgUrl(el);
    if (url) return url;
    var kids = el.querySelectorAll('*');
    for (var i = 0; i < kids.length; i++) {
      url = bgUrl(kids[i]);
      if (url) return url;
    }
    var p = el.parentElement;
    for (var j = 0; j < 2 && p; j++, p = p.parentElement) {
      url = bgUrl(p);
      if (url) return url;
    }
    return null;
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest || e.target.closest('#nsb-lb')) return;

    /* Images: .img-lightbox */
    var el = e.target.closest('.img-lightbox');
    if (el) {
      var found = findSrc(e.target.tagName === 'IMG' ? e.target : el);
      if (!found || !found.src) return;
      e.preventDefault();
      e.stopPropagation();
      open(found.src, found.alt);
      return;
    }

    /* Columns with a background image: .bg-lightbox
       Buttons, links and form fields inside still work normally. */
    var col = e.target.closest('.bg-lightbox');
    if (!col || e.target.closest('a, button, input, select, textarea, label, form')) return;
    var src = findBg(col);
    if (!src) return;
    e.preventDefault();
    e.stopPropagation();
    open(src, '');
  }, true);

  /* Escape key closes the lightbox */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
