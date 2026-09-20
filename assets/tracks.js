/* Background physics, beneath the page (z-index -1, pointer-events none,
   so the content never loses focus). One behavior:
   - Ambient drift: sparse pale specks rising glacially, like bubbles in a
     chamber — pure CSS compositor animations, no per-frame JavaScript.
   Respects reduced motion (everything off) and print (hidden). */
(function () {
  'use strict';
  if (window.__tracksLoaded) return;
  window.__tracksLoaded = true;
  var rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rmq.matches) return;

  var style = document.createElement('style');
  style.textContent = [
    '.tracks-layer{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;}',
    '.drift-field{position:absolute;inset:0;}',
    '.drift{position:absolute;top:0;animation:drift-rise linear infinite;}',
    '.drift i{display:block;border-radius:50%;background:var(--faint);animation:drift-sway ease-in-out infinite alternate;}',
    '@keyframes drift-rise{from{transform:translateY(calc(100vh + 24px));}to{transform:translateY(-24px);}}',
    '@keyframes drift-sway{from{transform:translateX(calc(var(--sway) * -1));}to{transform:translateX(var(--sway));}}',
    '@media print{.tracks-layer{display:none !important;}}',
    /* Covers the preference flipping on mid-session (load-time reduce never
       injects the layer at all) */
    '@media (prefers-reduced-motion:reduce){.tracks-layer{display:none !important;}}'
  ].join('\n');
  document.head.appendChild(style);

  var layer = document.createElement('div');
  layer.className = 'tracks-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  /* ---- Ambient drift: density scales with the viewport; each speck gets
     a depth that ties together its size, brightness, and rise speed, with
     a slow horizontal sway on a nested element so both transforms stay on
     the compositor. Negative delays scatter them mid-path from the start. */
  var field = document.createElement('div');
  field.className = 'drift-field';
  layer.appendChild(field);

  /* Sparser on the CV page — it reads like paper, so the air stays stiller. */
  var perPx = location.pathname.indexOf('/cv') === 0 ? 128000 : 64000;
  var count = Math.max(4, Math.min(24, Math.round(innerWidth * innerHeight / perPx)));
  for (var i = 0; i < count; i++) {
    var d = document.createElement('div');
    d.className = 'drift';
    var depth = 0.35 + Math.random() * 0.65;
    var rise = 46 + (1 - depth) * 70 + Math.random() * 18;
    var swayT = 6 + Math.random() * 7;
    d.style.left = (Math.random() * 100).toFixed(2) + '%';
    d.style.opacity = (0.16 + depth * 0.3).toFixed(2);
    d.style.animationDuration = rise.toFixed(1) + 's';
    d.style.animationDelay = (-Math.random() * rise).toFixed(1) + 's';
    var b = document.createElement('i');
    b.style.width = b.style.height = (1.4 + 2 * depth).toFixed(1) + 'px';
    b.style.setProperty('--sway', (6 + Math.random() * 18).toFixed(0) + 'px');
    b.style.animationDuration = swayT.toFixed(1) + 's';
    b.style.animationDelay = (-Math.random() * swayT).toFixed(1) + 's';
    d.appendChild(b);
    field.appendChild(d);
  }

})();
