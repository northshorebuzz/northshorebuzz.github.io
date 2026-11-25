/* ============================================================
   NSB LISTING CARDS (Version 1)
   Shared by every realtor client. Loaded site-wide from the Body
   tracking code with ONE line:
     <script src="https://northshorebuzz.github.io/templates/realtor/v1/listing-cards.js" defer></script>

   Draws the home page listing cards from each slot's custom values.
   The page holds one Custom Code block per row:
     <div class="lc" data-lc="active">  ...  </div>   Currently on the Market
     <div class="lc" data-lc="sold">    ...  </div>   Recently Sold
   Each block carries a hidden <template class="lc-src"> with one <i> per
   slot (01-29) holding that slot's merge tags. Styles: master.css (.lc-*).

   Status per slot (custom value listing_NN_status):
     active = shows in "Currently on the Market"
     sold   = shows in "Recently Sold" with a SOLD tag
     off    = shows nowhere (withdrawn / expired / cancelled)
   Slots with no address, or a status that isn't set, are skipped.
   A row with no cards hides its whole section (data-hide-empty="1").
   ============================================================ */
(function(){
  if (window.__nsbListingCards) return; window.__nsbListingCards = true;

  var CDN = 'https://assets.cdn.filesafe.space/';
  function sized(u, w){ return u.indexOf(CDN) === 0 ? 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_' + w + '/u_' + u : u; }
  function val(el, k){ var v = (el.getAttribute('data-' + k) || '').trim(); return v.indexOf('{{') >= 0 ? '' : v; }
  function txt(tag, cls, s){ var e = document.createElement(tag); if (cls) e.className = cls; if (s) e.textContent = s; return e; }

  function card(d, mode){
    var a = document.createElement('a');
    a.className = 'lc-card'; a.href = d.url || '#';
    var pic = txt('div', 'lc-pic');
    if (d.photo){ var img = document.createElement('img'); img.loading = 'lazy'; img.alt = d.address; img.src = sized(d.photo, 900); pic.appendChild(img); }
    if (mode === 'sold') pic.appendChild(txt('span', 'lc-tag', 'Sold'));
    a.appendChild(pic);
    var body = txt('div', 'lc-body');
    if (d.city) body.appendChild(txt('p', 'lc-area', d.city));
    body.appendChild(txt('h3', 'lc-address', d.address));
    body.appendChild(txt('p', 'lc-price', mode === 'sold' ? 'Sold' : d.price));
    body.appendChild(txt('hr', 'lc-rule'));
    var specs = [];
    if (d.beds) specs.push(d.beds + (d.beds === '1' ? ' Bedroom' : ' Bedrooms'));
    if (d.baths) specs.push(d.baths + (d.baths === '1' ? ' Bathroom' : ' Bathrooms'));
    if (d.sqft) specs.push(d.sqft + ' sq ft');
    if (specs.length) body.appendChild(txt('p', 'lc-specs', specs.join('  |  ')));
    body.appendChild(txt('span', 'lc-btn', 'View property'));
    a.appendChild(body);
    return a;
  }

  function init(root){
    if (root.getAttribute('data-lc-ready')) return; root.setAttribute('data-lc-ready', '1');
    var mode = (root.getAttribute('data-lc') || 'active').toLowerCase();
    var tpl = root.querySelector('.lc-src'); if (!tpl) return;
    var holder = document.createElement('div'); holder.innerHTML = tpl.innerHTML;
    var rows = [].map.call(holder.querySelectorAll('i[data-slot]'), function(el){
      return {
        slot: el.getAttribute('data-slot'),
        status: val(el, 'status').toLowerCase(),
        address: val(el, 'address'), city: val(el, 'city'), price: val(el, 'price'),
        beds: val(el, 'beds'), baths: val(el, 'baths'), sqft: val(el, 'sqft'),
        photo: val(el, 'photo'), url: val(el, 'url')
      };
    }).filter(function(d){ return d.address && d.status === mode; });
    rows.sort(function(x, y){ return y.slot.localeCompare(x.slot); }); // newest slot first
    var grid = txt('div', 'lc-grid');
    rows.forEach(function(d){ grid.appendChild(card(d, mode)); });
    root.appendChild(grid);
    if (!rows.length && root.getAttribute('data-hide-empty') === '1'){
      var sec = root.closest('.c-section'); (sec || root).style.display = 'none';
    }
  }

  function run(){ [].forEach.call(document.querySelectorAll('.lc[data-lc]'), init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
