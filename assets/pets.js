/* Site pets: a Bichon Frise and an orange tabby (modeled on the owner's real
   pets) that live on the floor of every page. They walk, stand, sit and lie
   down; click one for a heart. Self-contained; respects reduced motion. */
(function () {
  'use strict';
  if (window.__petsLoaded) return;
  window.__petsLoaded = true;

  var CSS = [
    '.pet-layer{position:fixed;inset:auto 0 0 0;height:0;z-index:30;}',
    '.pet{position:fixed;bottom:0;left:0;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;}',
    '.pet svg{display:block;width:100%;height:auto;overflow:visible;}',
    '.pet .pose{display:none;}',
    '.pet[data-state="walk"] .pose-stand,.pet[data-state="stand"] .pose-stand,.pet[data-state="run"] .pose-stand{display:inline;}',
    '.pet[data-state="sit"] .pose-sit{display:inline;}',
    '.pet[data-state="lie"] .pose-lie{display:inline;}',
    '.pet .leg{transform-box:fill-box;transform-origin:50% 12%;}',
    '.pet[data-state="walk"] .leg-a{animation:pet-step .45s ease-in-out infinite alternate;}',
    '.pet[data-state="walk"] .leg-b{animation:pet-step .45s ease-in-out infinite alternate-reverse;}',
    '.pet[data-state="run"] .leg-a{animation:pet-step .2s ease-in-out infinite alternate;}',
    '.pet[data-state="run"] .leg-b{animation:pet-step .2s ease-in-out infinite alternate-reverse;}',
    '@keyframes pet-step{from{transform:rotate(13deg);}to{transform:rotate(-13deg);}}',
    '.pet .torso{transform-box:fill-box;}',
    '.pet[data-state="walk"] .torso{animation:pet-bob .45s ease-in-out infinite alternate;}',
    '.pet[data-state="run"] .torso{animation:pet-bob .2s ease-in-out infinite alternate;}',
    '@keyframes pet-bob{from{transform:translateY(0);}to{transform:translateY(-1.6px);}}',
    '.pet .zzz{display:none;position:absolute;top:-6px;left:60%;color:#9a9a9a;font:700 13px/1 Lato,Verdana,sans-serif;pointer-events:none;}',
    '.pet[data-state="lie"] .zzz{display:block;animation:pet-zzz 2.6s ease-in 3s infinite;opacity:0;}',
    '@keyframes pet-zzz{0%{opacity:0;transform:translateY(0);}25%{opacity:.85;}100%{opacity:0;transform:translateY(-16px);}}',
    '.pet .tail-wag{transform-box:fill-box;transform-origin:85% 85%;animation:pet-wag 1.5s ease-in-out infinite;}',
    '@keyframes pet-wag{0%,100%{transform:rotate(-5deg);}50%{transform:rotate(7deg);}}',
    '.pet-heart{position:fixed;z-index:60;font-size:15px;color:#e2607a;pointer-events:none;transform:translate(-50%,0);animation:pet-heart 1.1s ease-out forwards;}',
    '@keyframes pet-heart{from{opacity:0;transform:translate(-50%,4px) scale(.7);}20%{opacity:1;}to{opacity:0;transform:translate(-50%,-44px) scale(1.15);}}',
    '@media (prefers-reduced-motion:reduce){.pet *{animation:none !important;}}',
    '@media print{.pet-layer,.pet,.pet-heart{display:none !important;}}'
  ].join('\n');

  /* ---- Bichon Frise: giant powder-puff head, apricot muzzle, stubby legs.
         Faces right; floor at y=100. ---- */
  var DOG =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="dog-head">' +
        '<circle cx="-16" cy="-10" r="10" fill="#f9f6ef" stroke="#ddd3c0" stroke-width="1.2"/>' +
        '<circle cx="-6" cy="-19" r="11" fill="#f9f6ef" stroke="#ddd3c0" stroke-width="1.2"/>' +
        '<circle cx="7" cy="-19" r="11" fill="#f9f6ef" stroke="#ddd3c0" stroke-width="1.2"/>' +
        '<circle cx="17" cy="-9" r="10" fill="#f9f6ef" stroke="#ddd3c0" stroke-width="1.2"/>' +
        '<circle cx="21" cy="3" r="9" fill="#f9f6ef" stroke="#ddd3c0" stroke-width="1.2"/>' +
        '<circle cx="-20" cy="2" r="9" fill="#f9f6ef" stroke="#ddd3c0" stroke-width="1.2"/>' +
        '<circle cx="0" cy="0" r="22" fill="#f9f6ef" stroke="#ddd3c0" stroke-width="1.2"/>' +
        '<ellipse cx="12" cy="10" rx="9.5" ry="8" fill="#eed7ab" stroke="#dcc08a" stroke-width="1.1"/>' +
        '<ellipse cx="17" cy="3" rx="4.2" ry="3.6" fill="#2e2b27"/>' +
        '<circle cx="3" cy="-2" r="3" fill="#2e2b27"/>' +
        '<circle cx="4.2" cy="-3.2" r="1" fill="#ffffff"/>' +
        '<path d="M13,15 q4,3 8,0" fill="none" stroke="#6b5f4e" stroke-width="1.5" stroke-linecap="round"/>' +
      '</g>' +
    '</defs>' +
    '<ellipse cx="60" cy="101" rx="42" ry="3" fill="rgba(60,50,30,.10)"/>' +
    '<g class="pose pose-stand" stroke-width="1.2">' +
      '<g transform="translate(46,80)"><g class="leg leg-a"><rect x="-5" y="0" width="10" height="20" rx="5" fill="#efe8d8" stroke="#ddd3c0"/></g></g>' +
      '<g transform="translate(76,80)"><g class="leg leg-b"><rect x="-5" y="0" width="10" height="20" rx="5" fill="#efe8d8" stroke="#ddd3c0"/></g></g>' +
      '<g transform="translate(56,80)"><g class="leg leg-b"><rect x="-5" y="0" width="10" height="20" rx="5" fill="#f9f6ef" stroke="#ddd3c0"/></g></g>' +
      '<g transform="translate(86,80)"><g class="leg leg-a"><rect x="-5" y="0" width="10" height="20" rx="5" fill="#f9f6ef" stroke="#ddd3c0"/></g></g>' +
      '<g class="torso">' +
        '<g class="tail-wag"><circle cx="24" cy="46" r="9" fill="#f9f6ef" stroke="#ddd3c0"/><circle cx="19" cy="40" r="6" fill="#f9f6ef" stroke="#ddd3c0"/></g>' +
        '<circle cx="30" cy="58" r="10" fill="#f9f6ef" stroke="#ddd3c0"/>' +
        '<ellipse cx="56" cy="66" rx="30" ry="20" fill="#f9f6ef" stroke="#ddd3c0"/>' +
        '<circle cx="40" cy="50" r="10" fill="#f9f6ef" stroke="#ddd3c0"/>' +
        '<circle cx="56" cy="46" r="11" fill="#f9f6ef" stroke="#ddd3c0"/>' +
        '<circle cx="72" cy="50" r="10" fill="#f9f6ef" stroke="#ddd3c0"/>' +
        '<circle cx="78" cy="52" r="11" fill="#f9f6ef" stroke="#ddd3c0"/>' +
        '<use href="#dog-head" x="90" y="36"/>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit" stroke-width="1.2">' +
      '<circle cx="18" cy="90" r="8" fill="#f9f6ef" stroke="#ddd3c0"/><circle cx="13" cy="94" r="5" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<circle cx="46" cy="74" r="25" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<circle cx="34" cy="56" r="9" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<circle cx="48" cy="50" r="10" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<g transform="translate(64,82)"><rect x="-5" y="0" width="10" height="18" rx="5" fill="#efe8d8" stroke="#ddd3c0"/></g>' +
      '<ellipse cx="70" cy="60" rx="19" ry="25" fill="#f9f6ef" stroke="#ddd3c0" transform="rotate(-12 70 60)"/>' +
      '<g transform="translate(78,84)"><rect x="-5" y="0" width="10" height="16" rx="5" fill="#f9f6ef" stroke="#ddd3c0"/></g>' +
      '<circle cx="76" cy="44" r="11" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<use href="#dog-head" x="86" y="26"/>' +
    '</g>' +
    '<g class="pose pose-lie" stroke-width="1.2">' +
      '<circle cx="16" cy="88" r="8" fill="#f9f6ef" stroke="#ddd3c0"/><circle cx="11" cy="92" r="5" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<ellipse cx="54" cy="84" rx="34" ry="15" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<circle cx="38" cy="72" r="9" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<circle cx="54" cy="68" r="10" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<circle cx="78" cy="74" r="10" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<rect x="78" y="90" width="22" height="9" rx="4.5" fill="#f9f6ef" stroke="#ddd3c0"/>' +
      '<use href="#dog-head" x="90" y="56"/>' +
    '</g>' +
  '</svg>';

  /* ---- Orange tabby: chunky, ringed tail, white muzzle and paws,
         green eyes, forehead tabby marks. Faces right; floor at y=100. ---- */
  var CAT =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="cat-paw"><rect x="-4" y="0" width="8" height="20" rx="4" fill="#e6913c" stroke="#b25715" stroke-width="1.1"/><rect x="-4" y="14" width="8" height="6" rx="3" fill="#f6ead6" stroke="#b25715" stroke-width="1.1"/></g>' +
      '<g id="cat-paw-far"><rect x="-4" y="0" width="8" height="20" rx="4" fill="#d1762a" stroke="#b25715" stroke-width="1.1"/><rect x="-4" y="14" width="8" height="6" rx="3" fill="#e8d6bd" stroke="#b25715" stroke-width="1.1"/></g>' +
      '<g id="cat-head">' +
        '<path d="M-14,-7 L-19,-24 L-4,-13 Z" fill="#e6913c" stroke="#b25715" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M4,-14 L12,-26 L17,-9 Z" fill="#e6913c" stroke="#b25715" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M-13,-10 L-16,-19 L-7,-13 Z" fill="#f0a9a2"/>' +
        '<path d="M6,-14 L10.5,-21.5 L14,-11 Z" fill="#f0a9a2"/>' +
        '<circle cx="0" cy="0" r="16" fill="#e6913c" stroke="#b25715" stroke-width="1.1"/>' +
        '<path d="M-6,-14 l1.5,6 M-1,-15.5 l1,6.5 M4,-14.5 l-.5,6" fill="none" stroke="#c96a1e" stroke-width="2.2" stroke-linecap="round"/>' +
        '<ellipse cx="6" cy="8" rx="9.5" ry="7" fill="#fdf6ec"/>' +
        '<path d="M10,3.5 l3.6,0 l-1.8,3.2 z" fill="#e58f96"/>' +
        '<circle cx="2" cy="-2.5" r="3" fill="#9db43f"/>' +
        '<ellipse cx="2.6" cy="-2.5" rx="1.2" ry="2.4" fill="#2c2a26"/>' +
        '<path d="M14,6 L27,3 M14,9 L27,10" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1" stroke-linecap="round"/>' +
      '</g>' +
    '</defs>' +
    '<ellipse cx="64" cy="101" rx="40" ry="3" fill="rgba(60,50,30,.10)"/>' +
    '<g class="pose pose-stand">' +
      '<g transform="translate(48,80)"><g class="leg leg-a"><use href="#cat-paw-far"/></g></g>' +
      '<g transform="translate(84,80)"><g class="leg leg-b"><use href="#cat-paw-far"/></g></g>' +
      '<g transform="translate(58,80)"><g class="leg leg-b"><use href="#cat-paw"/></g></g>' +
      '<g transform="translate(94,80)"><g class="leg leg-a"><use href="#cat-paw"/></g></g>' +
      '<g class="torso">' +
        '<g class="tail-wag">' +
          '<path d="M38,58 C26,54 20,42 24,30" fill="none" stroke="#e6913c" stroke-width="9" stroke-linecap="round"/>' +
          '<path d="M29,47 C27.4,44 26.4,41 26,39" fill="none" stroke="#c96a1e" stroke-width="9" stroke-linecap="round"/>' +
          '<path d="M24.6,33.5 C24.3,32.3 24.1,31.1 24,30" fill="none" stroke="#c96a1e" stroke-width="9" stroke-linecap="round"/>' +
        '</g>' +
        '<ellipse cx="66" cy="64" rx="31" ry="19" fill="#e6913c" stroke="#b25715" stroke-width="1.1"/>' +
        '<ellipse cx="58" cy="76" rx="16" ry="7" fill="#f4e0c2"/>' +
        '<path d="M50,48 q2,9 0,13 M62,45 q2,10 0,15 M74,46 q2,9 0,13 M85,50 q2,7 0,10" fill="none" stroke="#c96a1e" stroke-width="5" stroke-linecap="round"/>' +
        '<use href="#cat-head" x="98" y="42"/>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit">' +
      '<path d="M34,96 C42,99.6 60,99.6 74,96" fill="none" stroke="#e6913c" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M56,98.9 C60,98.8 63,98.4 66,97.8" fill="none" stroke="#c96a1e" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M71,96.7 C72,96.5 73,96.3 74,96" fill="none" stroke="#c96a1e" stroke-width="8" stroke-linecap="round"/>' +
      '<circle cx="52" cy="77" r="22" fill="#e6913c" stroke="#b25715" stroke-width="1.1"/>' +
      '<path d="M38,68 q5,-9 16,-11 M36,79 q4,-8 13,-10" fill="none" stroke="#c96a1e" stroke-width="5" stroke-linecap="round"/>' +
      '<g transform="translate(66,80)"><use href="#cat-paw-far"/></g>' +
      '<ellipse cx="70" cy="58" rx="16" ry="26" fill="#e6913c" stroke="#b25715" stroke-width="1.1" transform="rotate(-8 70 58)"/>' +
      '<g transform="translate(78,80)"><use href="#cat-paw"/></g>' +
      '<use href="#cat-head" x="84" y="27"/>' +
    '</g>' +
    '<g class="pose pose-lie">' +
      '<path d="M30,92 C36,97 48,98.5 60,96" fill="none" stroke="#e6913c" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M52,97.6 C55,97.3 58,96.8 60,96" fill="none" stroke="#c96a1e" stroke-width="7" stroke-linecap="round"/>' +
      '<ellipse cx="58" cy="85" rx="32" ry="14" fill="#e6913c" stroke="#b25715" stroke-width="1.1"/>' +
      '<path d="M44,74 q2,8 0,11 M56,72 q2,9 0,12 M68,73 q2,8 0,11" fill="none" stroke="#c96a1e" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="80" y="91" width="24" height="8" rx="4" fill="#e6913c" stroke="#b25715" stroke-width="1.1"/>' +
      '<rect x="98" y="91" width="8" height="8" rx="4" fill="#f6ead6" stroke="#b25715" stroke-width="1.1"/>' +
      '<use href="#cat-head" x="90" y="58"/>' +
    '</g>' +
  '</svg>';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var layer = document.createElement('div');
  layer.className = 'pet-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML =
    '<div class="pet pet-dog" data-state="walk" style="width:96px" title="woof">' + DOG + '<div class="zzz">z z</div></div>' +
    '<div class="pet pet-cat" data-state="sit" style="width:92px" title="meow">' + CAT + '<div class="zzz">z z</div></div>';
  document.body.appendChild(layer);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var pets = [
    { el: layer.children[0], x: Math.max(8, innerWidth * 0.12), dir: 1, speed: 40, run: 115, w: 96,
      state: 'walk', until: performance.now() + 4200, chase: null, rest: ['stand', 'sit', 'sit', 'lie'] },
    { el: layer.children[1], x: Math.min(innerWidth - 100, innerWidth * 0.68), dir: -1, speed: 52, run: 140, w: 92,
      state: 'sit', until: performance.now() + 3200, chase: null, rest: ['sit', 'lie', 'lie', 'stand'] }
  ];
  var dog = pets[0], cat = pets[1];
  pets.forEach(function (p) { p.svg = p.el.querySelector('svg'); });

  /* Flip the svg (not the container) so the floating "z z" stays readable. */
  function render(p) {
    p.el.style.transform = 'translateX(' + p.x + 'px)';
    p.svg.style.transform = 'scaleX(' + p.dir + ')';
  }

  if (reduce) {
    dog.state = 'lie';
    cat.state = 'sit';
    pets.forEach(function (p) { p.el.dataset.state = p.state; render(p); });
    return;
  }

  /* oneko-style: the cat chases the visitor's cursor along the floor. */
  var mouse = { x: null, t: 0 };
  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.t = performance.now();
  }, { passive: true });

  function setState(p, state, until) {
    p.state = state;
    p.until = until;
    p.el.dataset.state = state === 'run' ? 'run' : state;
  }

  function pick(p, now) {
    if (p.state === 'walk' || p.state === 'run') {
      p.chase = null;
      p.state = p.rest[(Math.random() * p.rest.length) | 0];
      p.until = now + 2000 + Math.random() * (p.state === 'lie' ? 9000 : 5000);
    } else {
      // The cat sometimes darts after the cursor; the dog sometimes chases the cat.
      if (p === cat && mouse.x !== null && now - mouse.t < 8000 &&
          Math.abs(mouse.x - (p.x + p.w / 2)) > 180 && Math.random() < 0.5) {
        p.chase = 'mouse';
        setState(p, 'run', now + 7000);
        return;
      }
      if (p === dog && Math.random() < 0.3 && Math.abs(cat.x - p.x) > 220) {
        p.chase = 'cat';
        setState(p, 'run', now + 7000);
        return;
      }
      p.state = 'walk';
      if (Math.random() < 0.45) p.dir *= -1;
      p.until = now + 2500 + Math.random() * 6500;
    }
    p.el.dataset.state = p.state;
  }

  function heartAt(px, py) {
    var h = document.createElement('div');
    h.className = 'pet-heart';
    h.textContent = '❤';
    h.style.left = px + 'px';
    h.style.top = py + 'px';
    document.body.appendChild(h);
    setTimeout(function () { h.remove(); }, 1200);
  }

  var last = performance.now();
  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (var i = 0; i < pets.length; i++) {
      var p = pets[i];
      if (now >= p.until) pick(p, now);
      var max = innerWidth - p.w - 6;
      if (p.state === 'run') {
        var target = p.chase === 'mouse' ? mouse.x - p.w / 2 : cat.x;
        target = Math.max(6, Math.min(max, target));
        var gap = target - p.x;
        var arrive = p.chase === 'cat' ? 96 : 16;
        if (Math.abs(gap) <= arrive) {
          p.dir = gap === 0 ? p.dir : (gap > 0 ? 1 : -1);
          if (p.chase === 'cat') heartAt(p.x + p.w / 2, innerHeight - p.w - 8);
          p.chase = null;
          setState(p, p === cat ? 'sit' : 'stand', now + 2600);
        } else {
          p.dir = gap > 0 ? 1 : -1;
          p.x += p.dir * p.run * dt;
          p.x = Math.max(6, Math.min(max, p.x));
        }
      } else if (p.state === 'walk') {
        p.x += p.dir * p.speed * dt;
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
