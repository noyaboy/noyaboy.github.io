/* Click sparks: each click inks a tiny collider event onto the paper —
   charged-particle tracks curving out of the vertex, with detector hits
   sampled along the arcs (a nod to the owner's tracking research). The
   layer sits beneath the content (z-index -1, pointer-events none) so the
   page never loses focus; there is no idle animation loop — bursts live
   ~2.5s after a click and are removed. Respects reduced motion. */
(function () {
  'use strict';
  if (window.__tracksLoaded) return;
  window.__tracksLoaded = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var NS = 'http://www.w3.org/2000/svg';
  var MAX_LIVE = 6;
  var LIFE_MS = 2600;

  var style = document.createElement('style');
  style.textContent = [
    '.tracks-layer{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;}',
    '.tracks-layer svg{width:100%;height:100%;display:block;}',
    '.tracks-burst{animation:tracks-fade 2.5s ease-out forwards;}',
    '.tracks-burst path{fill:none;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:tracks-draw .7s cubic-bezier(.3,.6,.3,1) forwards;}',
    '.tracks-burst circle{opacity:0;animation:tracks-hit .35s ease-out forwards;}',
    '@keyframes tracks-draw{to{stroke-dashoffset:0;}}',
    '@keyframes tracks-hit{to{opacity:1;}}',
    '@keyframes tracks-fade{0%,52%{opacity:.45;}100%{opacity:0;}}',
    '@media print{.tracks-layer{display:none !important;}}'
  ].join('\n');
  document.head.appendChild(style);

  var layer = document.createElement('div');
  layer.className = 'tracks-layer';
  layer.setAttribute('aria-hidden', 'true');
  var svg = document.createElementNS(NS, 'svg');
  layer.appendChild(svg);
  document.body.appendChild(layer);

  var live = [];

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* One charged track: a circular arc leaving the vertex at angle theta,
     bending toward the chosen side with radius r (larger r = straighter,
     "higher momentum"). Points along the arc come from rotating the
     vertex around the curvature center. */
  function track(g, theta, accent) {
    var r = 60 + Math.random() * 150;
    var side = Math.random() < 0.5 ? 1 : -1;
    var len = 55 + Math.random() * 85;
    var phi = len / r;
    var cx = -Math.sin(theta) * r * side;
    var cy = Math.cos(theta) * r * side;

    function at(f) {
      var a = side * phi * f, cos = Math.cos(a), sin = Math.sin(a);
      return [cx - cos * cx + sin * cy, cy - sin * cx - cos * cy];
    }

    var e = at(1);
    g.appendChild(el('path', {
      d: 'M0 0A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 ' + (side === 1 ? 1 : 0) +
         ' ' + e[0].toFixed(1) + ' ' + e[1].toFixed(1),
      pathLength: 1,
      stroke: accent ? 'var(--accent)' : 'var(--muted)',
      'stroke-width': accent ? 1.5 : 1.1
    }));

    if (accent || Math.random() < 0.55) {
      var hits = 2 + (Math.random() * 3 | 0);
      for (var h = 1; h <= hits; h++) {
        var f = h / (hits + 0.3);
        var p = at(f);
        var dot = el('circle', {
          cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: accent ? 2 : 1.6,
          fill: accent ? 'var(--accent)' : 'var(--muted)'
        });
        dot.style.animationDelay = (0.08 + f * 0.55).toFixed(2) + 's';
        g.appendChild(dot);
      }
    }
  }

  function burst(x, y) {
    var g = el('g', { class: 'tracks-burst', transform: 'translate(' + x + ' ' + y + ')' });
    g.appendChild(el('circle', { cx: 0, cy: 0, r: 2.2, fill: 'var(--accent)' }));
    var n = 6 + (Math.random() * 3 | 0);
    var accentAt = Math.random() * n | 0;
    var base = Math.random() * 6.283;
    for (var i = 0; i < n; i++) {
      track(g, base + (i / n) * 6.283 + (Math.random() - 0.5) * 0.55, i === accentAt);
    }
    svg.appendChild(g);
    live.push(g);
    if (live.length > MAX_LIVE) live.shift().remove();
    setTimeout(function () {
      var ix = live.indexOf(g);
      if (ix !== -1) live.splice(ix, 1);
      g.remove();
    }, LIFE_MS);
  }

  /* Pointer events instead of click: taps on non-interactive elements
     reliably fire everywhere (iOS included), and drags/scrolls/selections
     are told apart by movement. Interactive targets keep their focus. */
  var down = null;

  document.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) { down = null; return; }
    down = { x: e.clientX, y: e.clientY, id: e.pointerId, t: performance.now() };
  }, { passive: true });

  document.addEventListener('pointerup', function (e) {
    var d = down;
    down = null;
    if (!d || e.pointerId !== d.id) return;
    if (performance.now() - d.t > 600) return;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 12) return;
    var t = e.target;
    if (t && t.closest && t.closest('a,button,summary,input,textarea,select,label,.pet')) return;
    burst(e.clientX, e.clientY);
  }, { passive: true });
})();
