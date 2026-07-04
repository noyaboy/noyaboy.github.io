/* Site pets: a Bichon Frise and an orange tabby that live on the floor
   of every page. They walk, stand, sit and lie down; click one for a heart.
   Self-contained: injects its own CSS and SVG. Respects reduced motion. */
(function () {
  'use strict';
  if (window.__petsLoaded) return;
  window.__petsLoaded = true;

  var CSS = [
    '.pet-layer{position:fixed;inset:auto 0 0 0;height:0;z-index:30;}',
    '.pet{position:fixed;bottom:0;left:0;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;}',
    '.pet svg{display:block;width:100%;height:auto;overflow:visible;}',
    '.pet .pose{display:none;}',
    '.pet[data-state="walk"] .pose-stand,.pet[data-state="stand"] .pose-stand{display:inline;}',
    '.pet[data-state="sit"] .pose-sit{display:inline;}',
    '.pet[data-state="lie"] .pose-lie{display:inline;}',
    '.pet .leg{transform-box:fill-box;transform-origin:50% 12%;}',
    '.pet[data-state="walk"] .leg-a{animation:pet-step .45s ease-in-out infinite alternate;}',
    '.pet[data-state="walk"] .leg-b{animation:pet-step .45s ease-in-out infinite alternate-reverse;}',
    '@keyframes pet-step{from{transform:rotate(15deg);}to{transform:rotate(-15deg);}}',
    '.pet .torso{transform-box:fill-box;}',
    '.pet[data-state="walk"] .torso{animation:pet-bob .45s ease-in-out infinite alternate;}',
    '@keyframes pet-bob{from{transform:translateY(0);}to{transform:translateY(-1.6px);}}',
    '.pet .tail-wag{transform-box:fill-box;transform-origin:85% 85%;animation:pet-wag 1.5s ease-in-out infinite;}',
    '@keyframes pet-wag{0%,100%{transform:rotate(-5deg);}50%{transform:rotate(7deg);}}',
    '.pet-heart{position:fixed;z-index:60;font-size:15px;color:#e2607a;pointer-events:none;transform:translate(-50%,0);animation:pet-heart 1.1s ease-out forwards;}',
    '@keyframes pet-heart{from{opacity:0;transform:translate(-50%,4px) scale(.7);}20%{opacity:1;}to{opacity:0;transform:translate(-50%,-44px) scale(1.15);}}',
    '@media (prefers-reduced-motion:reduce){.pet *{animation:none !important;}}',
    '@media print{.pet-layer,.pet,.pet-heart{display:none !important;}}'
  ].join('\n');

  /* ---- Bichon Frise (faces right, floor at y=100) ---- */
  var DOG =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="dog-head">' +
        '<ellipse cx="-13" cy="4" rx="8" ry="12" fill="#efe8da" stroke="#d3c8b4" stroke-width="1.3"/>' +
        '<circle cx="0" cy="0" r="18" fill="#f7f3ea" stroke="#d3c8b4" stroke-width="1.3"/>' +
        '<circle cx="-8" cy="-14" r="7.5" fill="#f7f3ea" stroke="#d3c8b4" stroke-width="1.3"/>' +
        '<circle cx="2" cy="-17" r="8.5" fill="#f7f3ea" stroke="#d3c8b4" stroke-width="1.3"/>' +
        '<circle cx="11" cy="-12" r="7" fill="#f7f3ea" stroke="#d3c8b4" stroke-width="1.3"/>' +
        '<ellipse cx="8" cy="8" rx="9.5" ry="7.5" fill="#f7f3ea" stroke="#d3c8b4" stroke-width="1.3"/>' +
        '<ellipse cx="15" cy="5" rx="4" ry="3.4" fill="#33302b"/>' +
        '<circle cx="2" cy="-2" r="2.6" fill="#33302b"/>' +
        '<path d="M10,12 q4,3.5 8,.5" fill="none" stroke="#33302b" stroke-width="1.6" stroke-linecap="round"/>' +
      '</g>' +
    '</defs>' +
    '<ellipse cx="62" cy="101" rx="40" ry="3" fill="var(--pet-shadow,rgba(0,0,0,.10))"/>' +
    '<g class="pose pose-stand" stroke-width="1.3">' +
      '<g transform="translate(44,72)"><g class="leg leg-a"><rect x="-4.5" y="0" width="9" height="28" rx="4.5" fill="#efe8da" stroke="#d3c8b4"/></g></g>' +
      '<g transform="translate(84,72)"><g class="leg leg-b"><rect x="-4.5" y="0" width="9" height="28" rx="4.5" fill="#efe8da" stroke="#d3c8b4"/></g></g>' +
      '<g transform="translate(54,72)"><g class="leg leg-b"><rect x="-4.5" y="0" width="9" height="28" rx="4.5" fill="#f7f3ea" stroke="#d3c8b4"/></g></g>' +
      '<g transform="translate(74,72)"><g class="leg leg-a"><rect x="-4.5" y="0" width="9" height="28" rx="4.5" fill="#f7f3ea" stroke="#d3c8b4"/></g></g>' +
      '<g class="torso">' +
        '<g class="tail-wag"><circle cx="30" cy="44" r="10" fill="#f7f3ea" stroke="#d3c8b4"/><circle cx="24" cy="37" r="6.5" fill="#f7f3ea" stroke="#d3c8b4"/></g>' +
        '<ellipse cx="62" cy="60" rx="30" ry="21" fill="#f7f3ea" stroke="#d3c8b4"/>' +
        '<circle cx="46" cy="43" r="9" fill="#f7f3ea" stroke="#d3c8b4"/>' +
        '<circle cx="60" cy="40" r="10" fill="#f7f3ea" stroke="#d3c8b4"/>' +
        '<circle cx="74" cy="43" r="9" fill="#f7f3ea" stroke="#d3c8b4"/>' +
        '<circle cx="86" cy="50" r="11" fill="#f7f3ea" stroke="#d3c8b4"/>' +
        '<use href="#dog-head" x="95" y="36"/>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit" stroke-width="1.3">' +
      '<circle cx="22" cy="90" r="8" fill="#f7f3ea" stroke="#d3c8b4"/><circle cx="16" cy="94" r="5.5" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<circle cx="48" cy="75" r="24" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<circle cx="38" cy="57" r="8" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<circle cx="50" cy="52" r="9" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<g transform="translate(66,72)"><rect x="-4.5" y="0" width="9" height="28" rx="4.5" fill="#efe8da" stroke="#d3c8b4"/></g>' +
      '<ellipse cx="72" cy="62" rx="18" ry="24" fill="#f7f3ea" stroke="#d3c8b4" transform="rotate(-14 72 62)"/>' +
      '<g transform="translate(80,74)"><rect x="-4.5" y="0" width="9" height="26" rx="4.5" fill="#f7f3ea" stroke="#d3c8b4"/></g>' +
      '<circle cx="80" cy="42" r="10" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<use href="#dog-head" x="88" y="28"/>' +
    '</g>' +
    '<g class="pose pose-lie" stroke-width="1.3">' +
      '<circle cx="20" cy="88" r="8" fill="#f7f3ea" stroke="#d3c8b4"/><circle cx="14" cy="92" r="5" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<ellipse cx="58" cy="84" rx="33" ry="15" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<circle cx="42" cy="72" r="8" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<circle cx="57" cy="68" r="9" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<circle cx="80" cy="72" r="10" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<rect x="82" y="90" width="20" height="9" rx="4.5" fill="#f7f3ea" stroke="#d3c8b4"/>' +
      '<use href="#dog-head" x="92" y="56"/>' +
    '</g>' +
  '</svg>';

  /* ---- Orange tabby (faces right, floor at y=100) ---- */
  var CAT =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="cat-head">' +
        '<path d="M-13,-6 L-17,-22 L-4,-12 Z" fill="#e08a3c" stroke="#a75418" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<path d="M3,-13 L10,-24 L15,-8 Z" fill="#e08a3c" stroke="#a75418" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<path d="M-12,-9 L-14.5,-18 L-6,-12 Z" fill="#f0b184"/>' +
        '<path d="M5,-13 L9.5,-20 L12.5,-10 Z" fill="#f0b184"/>' +
        '<circle cx="0" cy="0" r="14.5" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/>' +
        '<rect x="-3" y="-15" width="4" height="7" rx="2" fill="#b5601f"/>' +
        '<ellipse cx="5" cy="7" rx="8.5" ry="6" fill="#fdf6ec"/>' +
        '<path d="M9,3.5 l3.4,0 l-1.7,3 z" fill="#d96a63"/>' +
        '<circle cx="1" cy="-2" r="2.3" fill="#302c28"/>' +
        '<path d="M13,6 L26,3 M13,8.5 L26,9.5" stroke="rgba(0,0,0,.28)" stroke-width="1" stroke-linecap="round"/>' +
      '</g>' +
    '</defs>' +
    '<ellipse cx="64" cy="101" rx="38" ry="3" fill="var(--pet-shadow,rgba(0,0,0,.10))"/>' +
    '<g class="pose pose-stand">' +
      '<g transform="translate(48,74)"><g class="leg leg-a"><rect x="-3.5" y="0" width="7" height="26" rx="3.5" fill="#c9752c" stroke="#a75418" stroke-width="1.2"/></g></g>' +
      '<g transform="translate(86,74)"><g class="leg leg-b"><rect x="-3.5" y="0" width="7" height="26" rx="3.5" fill="#c9752c" stroke="#a75418" stroke-width="1.2"/></g></g>' +
      '<g transform="translate(58,74)"><g class="leg leg-b"><rect x="-3.5" y="0" width="7" height="26" rx="3.5" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/></g></g>' +
      '<g transform="translate(94,74)"><g class="leg leg-a"><rect x="-3.5" y="0" width="7" height="26" rx="3.5" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/></g></g>' +
      '<g class="torso">' +
        '<g class="tail-wag"><path d="M41,58 C30,54 24,44 27,32" fill="none" stroke="#e08a3c" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M28.5,38 C27,35.5 26.8,33.8 27,32" fill="none" stroke="#b5601f" stroke-width="8" stroke-linecap="round"/></g>' +
        '<ellipse cx="68" cy="62" rx="29" ry="16" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/>' +
        '<rect x="52" y="47" width="6" height="13" rx="3" fill="#b5601f" transform="rotate(8 55 53)"/>' +
        '<rect x="64" y="45" width="6" height="14" rx="3" fill="#b5601f"/>' +
        '<rect x="76" y="47" width="6" height="13" rx="3" fill="#b5601f" transform="rotate(-8 79 53)"/>' +
        '<use href="#cat-head" x="97" y="40"/>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit">' +
      '<path d="M33,96 C40,99.5 58,99.5 72,96" fill="none" stroke="#e08a3c" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M64,97.6 C67,97.4 70,96.9 72,96" fill="none" stroke="#b5601f" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="52" cy="78" r="21" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/>' +
      '<path d="M38,70 q4,-8 14,-10" fill="none" stroke="#b5601f" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M36,80 q3,-7 11,-10" fill="none" stroke="#b5601f" stroke-width="5" stroke-linecap="round"/>' +
      '<g transform="translate(66,74)"><rect x="-3.5" y="0" width="7" height="26" rx="3.5" fill="#c9752c" stroke="#a75418" stroke-width="1.2"/></g>' +
      '<ellipse cx="70" cy="60" rx="15" ry="24" fill="#e08a3c" stroke="#a75418" stroke-width="1.2" transform="rotate(-8 70 60)"/>' +
      '<g transform="translate(76,74)"><rect x="-3.5" y="0" width="7" height="26" rx="3.5" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/></g>' +
      '<use href="#cat-head" x="82" y="28"/>' +
    '</g>' +
    '<g class="pose pose-lie">' +
      '<path d="M34,94 C42,98 58,98 66,95" fill="none" stroke="#e08a3c" stroke-width="6" stroke-linecap="round"/>' +
      '<ellipse cx="62" cy="85" rx="30" ry="14" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/>' +
      '<rect x="48" y="73" width="6" height="11" rx="3" fill="#b5601f"/>' +
      '<rect x="60" y="71" width="6" height="12" rx="3" fill="#b5601f"/>' +
      '<rect x="72" y="73" width="6" height="11" rx="3" fill="#b5601f"/>' +
      '<circle cx="86" cy="96" r="5" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/>' +
      '<circle cx="94" cy="96" r="4.5" fill="#e08a3c" stroke="#a75418" stroke-width="1.2"/>' +
      '<use href="#cat-head" x="90" y="64"/>' +
    '</g>' +
  '</svg>';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var layer = document.createElement('div');
  layer.className = 'pet-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML =
    '<div class="pet pet-dog" data-state="walk" style="width:92px" title="woof">' + DOG + '</div>' +
    '<div class="pet pet-cat" data-state="sit" style="width:84px" title="meow">' + CAT + '</div>';
  document.body.appendChild(layer);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var pets = [
    { el: layer.children[0], x: Math.max(8, innerWidth * 0.12), dir: 1, speed: 40, w: 92,
      state: 'walk', until: performance.now() + 4200, rest: ['stand', 'sit', 'sit', 'lie'] },
    { el: layer.children[1], x: Math.min(innerWidth - 92, innerWidth * 0.68), dir: -1, speed: 52, w: 84,
      state: 'sit', until: performance.now() + 3200, rest: ['sit', 'lie', 'lie', 'stand'] }
  ];

  function render(p) {
    p.el.style.transform = 'translateX(' + p.x + 'px) scaleX(' + p.dir + ')';
  }

  if (reduce) {
    pets[0].state = 'lie';
    pets[1].state = 'sit';
    pets.forEach(function (p) { p.el.dataset.state = p.state; render(p); });
    return;
  }

  function pick(p, now) {
    if (p.state === 'walk') {
      p.state = p.rest[(Math.random() * p.rest.length) | 0];
      p.until = now + 2000 + Math.random() * (p.state === 'lie' ? 9000 : 5000);
    } else {
      p.state = 'walk';
      if (Math.random() < 0.45) p.dir *= -1;
      p.until = now + 2500 + Math.random() * 6500;
    }
    p.el.dataset.state = p.state;
  }

  var last = performance.now();
  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (var i = 0; i < pets.length; i++) {
      var p = pets[i];
      if (now >= p.until) pick(p, now);
      if (p.state === 'walk') {
        p.x += p.dir * p.speed * dt;
        var max = innerWidth - p.w - 6;
        if (p.x <= 6) { p.x = 6; p.dir = 1; }
        else if (p.x >= max) { p.x = max; p.dir = -1; }
      }
      render(p);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  layer.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('.pet') : null;
    if (!el) return;
    var r = el.getBoundingClientRect();
    var h = document.createElement('div');
    h.className = 'pet-heart';
    h.textContent = '❤';
    h.style.left = (r.left + r.width / 2) + 'px';
    h.style.top = (r.top - 2) + 'px';
    document.body.appendChild(h);
    setTimeout(function () { h.remove(); }, 1200);
    for (var i = 0; i < pets.length; i++) {
      if (pets[i].el === el) {
        pets[i].state = 'stand';
        pets[i].el.dataset.state = 'stand';
        pets[i].until = performance.now() + 1600;
      }
    }
  });
})();
