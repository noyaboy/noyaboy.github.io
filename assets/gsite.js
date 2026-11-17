/* Header behavior for the Google Sites-style theme: a shadow once the page
   scrolls, the mobile menu toggle, and the Experience dropdown (hover or
   focus opens it on desktop; the chevron button toggles it everywhere).
   Self-contained, no dependencies. */
(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var groups = nav ? nav.querySelectorAll('.nav-group') : [];

  function setGroup(group, open) {
    group.classList.toggle('is-open', open);
    var btn = group.querySelector('.sub-toggle');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeGroups(except) {
    Array.prototype.forEach.call(groups, function (g) {
      if (g !== except) setGroup(g, false);
    });
  }

  Array.prototype.forEach.call(groups, function (g) {
    var btn = g.querySelector('.sub-toggle');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !g.classList.contains('is-open');
        closeGroups(g);
        setGroup(g, open);
      });
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.nav-group')) closeGroups(null);
  });

  // Home spotlight carousel: auto-advance, dots jump, pauses on hover/focus
  Array.prototype.forEach.call(document.querySelectorAll('.carousel'), function (c) {
    var slides = c.querySelectorAll('.slide');
    var dots = c.querySelectorAll('.dot');
    if (slides.length < 2) return;
    var i = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var GAP = 28, SIDE = 0.86;
    function layout() {
      var N = slides.length, w = function (k) { return slides[(k + N) % N].offsetWidth; };
      Array.prototype.forEach.call(slides, function (s, k) {
        var d = ((k - i) % N + N) % N; if (d > N / 2) d -= N;
        var x = 0, sc = 1;
        if (d !== 0) {
          var dir = d < 0 ? -1 : 1, acc = w(i) / 2;
          for (var t = 1; t <= Math.abs(d); t++) {
            var wk = w(i + dir * t) * SIDE;
            acc += GAP + wk / 2 + (t < Math.abs(d) ? wk / 2 : 0);
          }
          x = dir * acc; sc = SIDE;
        }
        s.style.transform = 'translateX(calc(-50% + ' + Math.round(x) + 'px)) scale(' + sc + ')';
        s.classList.toggle('is-prev', d === -1);
        s.classList.toggle('is-next', d === 1);
      });
    }
    function show(n) {
      i = (n + slides.length) % slides.length;
      Array.prototype.forEach.call(slides, function (s, k) { s.classList.toggle('is-active', k === i); });
      layout();
      Array.prototype.forEach.call(dots, function (d, k) {
        d.classList.toggle('is-active', k === i);
        if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function start() {
      if (reduce || timer) return;
      timer = setInterval(function () { show(i + 1); }, +c.getAttribute('data-interval') || 5000);
    }
    function stop() { clearInterval(timer); timer = null; }
    Array.prototype.forEach.call(dots, function (d, k) {
      d.addEventListener('click', function () { show(k); stop(); start(); });
    });
    Array.prototype.forEach.call(slides, function (s, k) {
      s.addEventListener('click', function () {
        if (s.classList.contains('is-prev') || s.classList.contains('is-next')) { show(k); stop(); start(); }
      });
      var im = s.querySelector('img');
      if (im) { im.loading = 'eager'; if (!im.complete) im.addEventListener('load', layout); }
    });
    window.addEventListener('resize', layout);
    layout();
    var prev = c.querySelector('.car-prev'), next = c.querySelector('.car-next');
    if (prev) prev.addEventListener('click', function () { show(i - 1); stop(); start(); });
    if (next) next.addEventListener('click', function () { show(i + 1); stop(); start(); });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { show(i - 1); stop(); }
      else if (e.key === 'ArrowRight') { show(i + 1); stop(); }
    });
    c.addEventListener('mouseenter', stop);
    c.addEventListener('mouseleave', start);
    c.addEventListener('focusin', stop);
    c.addEventListener('focusout', start);
    start();
  });

  // YouTube facades: show the thumbnail, load the player only on click
  Array.prototype.forEach.call(document.querySelectorAll('.yt-facade'), function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      var list = b.getAttribute('data-yt-list');
      f.src = list
        ? 'https://www.youtube-nocookie.com/embed/videoseries?list=' + list + '&autoplay=1&rel=0'
        : 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = b.getAttribute('aria-label') || 'YouTube video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
      f.focus();
    });
  });

  // No orphans: keep the last 4 CJK characters, or the last two words,
  // of each paragraph, list item and caption together on one line.
  // CSS text-wrap: pretty does little for Chinese and is missing in some
  // browsers, so this does the job everywhere.
  (function () {
    var CJK = /[⺀-鿿＀-￯]/;
    var sel = 'main p, main li, main .sub, main figcaption';
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      if (el.textContent.trim().length < 12) return;
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          var p = n.parentNode;
          while (p && p !== el) {
            if (p.classList && (p.classList.contains('chips') || p.classList.contains('nobr') || p.classList.contains('sub'))) {
              return p.classList.contains('sub') && el.classList.contains('sub') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
            p = p.parentNode;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var last = null, n;
      while ((n = w.nextNode())) last = n;
      if (!last) return;
      var t = last.nodeValue.replace(/\s+$/, '');
      var tail = last.nodeValue.slice(t.length);
      if (CJK.test(t.slice(-2))) {
        if (t.length < 6) return;
        var keep = t.slice(-4);
        last.nodeValue = t.slice(0, -4);
        var span = document.createElement('span');
        span.className = 'nobr';
        span.textContent = keep + tail;
        last.parentNode.insertBefore(span, last.nextSibling);
      } else {
        var i = t.lastIndexOf(' ');
        if (i > 0 && t.length - i < 16) last.nodeValue = t.slice(0, i) + ' ' + t.slice(i + 1) + tail;
      }
    });
  })();

  // No short last lines (owner ruling): a block whose last line fills less
  // than a third of its width is re-set, at every window size. First try a
  // barely visible tightening so the tail climbs onto the line above, then
  // balanced lines for short left-aligned blocks, then a barely visible
  // loosening (mostly word spacing) so more words carry down, and only then
  // balanced lines (left-aligned, so justify cannot stretch them).
  (function () {
    var MIN = 0.34;
    var TIGHT = [[-0.004, -0.03], [-0.008, -0.06], [-0.012, -0.09], [-0.016, -0.12]];
    var LOOSE = [[0, 0.05], [0.003, 0.1], [0.006, 0.15], [0.01, 0.2]];
    var BLOCK = /^(block|list-item|flex|grid|table)/;
    var sel = 'main p, main li, main .sub, main figcaption, .identity p, .site-footer .contact p, .site-footer .copyright';

    function leaf(el) {
      if (el.closest('.site-nav, .chips, .slide, .hero')) return false;
      for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
        if (BLOCK.test(getComputedStyle(c).display)) return false;
      }
      return true;
    }
    // Line boxes of el: [{left, right}] top to bottom.
    function lines(el) {
      var r = document.createRange();
      r.selectNodeContents(el);
      var rows = [];
      Array.prototype.forEach.call(r.getClientRects(), function (b) {
        if (b.width < 1) return;
        var row = null;
        for (var i = 0; i < rows.length; i++) {
          if (Math.abs(rows[i].mid - (b.top + b.bottom) / 2) < b.height / 2) { row = rows[i]; break; }
        }
        if (!row) rows.push({ mid: (b.top + b.bottom) / 2, left: b.left, right: b.right });
        else { row.left = Math.min(row.left, b.left); row.right = Math.max(row.right, b.right); }
      });
      rows.sort(function (a, b) { return a.mid - b.mid; });
      return rows;
    }
    function measure(el) {
      var cs = getComputedStyle(el), box = el.getBoundingClientRect();
      var left = box.left + parseFloat(cs.paddingLeft), width = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var ls = lines(el);
      if (ls.length < 2 || width <= 0) return { n: ls.length, ok: true };
      var tail = (ls[ls.length - 1].right - left) / width;
      return { n: ls.length, ok: tail >= MIN };
    }
    function setSpacing(el, base, d) {
      var fs = parseFloat(getComputedStyle(el).fontSize);
      el.style.letterSpacing = (base + d[0] * fs) + 'px';
      el.style.wordSpacing = (d[1] * fs) + 'px';
    }
    function reset(el) {
      el.style.letterSpacing = el.style.wordSpacing = el.style.textWrap = el.style.textAlign = '';
    }
    function fix(el, m) {
      var ls0 = parseFloat(getComputedStyle(el).letterSpacing) || 0, i, t;
      for (i = 0; i < TIGHT.length; i++) {
        setSpacing(el, ls0, TIGHT[i]);
        t = measure(el);
        if (t.n < m.n && t.ok) return;
      }
      // Left-aligned blocks of a few lines look most natural balanced
      var justified = getComputedStyle(el).textAlign === 'justify';
      if (!justified && m.n <= 4) {
        el.style.letterSpacing = el.style.wordSpacing = '';
        el.style.textWrap = 'balance';
        if (measure(el).ok) return;
        el.style.textWrap = '';
      }
      for (i = 0; i < LOOSE.length; i++) {
        setSpacing(el, ls0, LOOSE[i]);
        t = measure(el);
        if (t.ok && t.n <= m.n + 1) return;
      }
      el.style.letterSpacing = el.style.wordSpacing = '';
      el.style.textWrap = 'balance';
      if (getComputedStyle(el).textAlign === 'justify') el.style.textAlign = 'start';
    }
    // Reset everything, then measure everything: one layout for the whole
    // page instead of one per block. Only the few failing blocks iterate.
    var done = '';
    function run() {
      var loaded = 0, f = document.fonts;
      if (f && f.forEach) f.forEach(function (x) { if (x.status === 'loaded') loaded++; });
      var key = innerWidth + '|' + loaded;
      if (key === done) return;
      done = key;
      var els = Array.prototype.filter.call(document.querySelectorAll(sel), leaf);
      els.forEach(reset);
      var ms = els.map(measure);
      els.forEach(function (el, k) { if (!ms[k].ok) fix(el, ms[k]); });
    }
    // Phones fire resize when the address bar slides; only width matters.
    var timer;
    function later() { clearTimeout(timer); timer = setTimeout(run, 120); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run); else run();
    window.addEventListener('load', run);
    window.addEventListener('resize', later);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', later);
  })();

  // Lightbox: photos and PDFs open in a dialog over the dimmed page.
  // Galleries get previous/next; PDFs open normally on phones, where
  // inline PDF viewing is unreliable.
  (function () {
    if (!window.HTMLDialogElement) return;
    var IMG = /\.(jpe?g|png|webp|gif)(\?|#|$)/i, PDF = /\.pdf(\?|#|$)/i;
    var zh = document.documentElement.lang.indexOf('zh') === 0;
    var T = zh ? { close: '關閉', prev: '上一張', next: '下一張', open: '在新分頁開啟' }
               : { close: 'Close', prev: 'Previous', next: 'Next', open: 'Open in new tab' };
    var dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.innerHTML =
      '<div class="lb-frame"><div class="lb-body"></div><p class="lb-cap"></p></div>' +
      '<button type="button" class="lb-btn lb-close" aria-label="' + T.close + '">&times;</button>' +
      '<button type="button" class="lb-btn lb-prev" aria-label="' + T.prev + '">&#8249;</button>' +
      '<button type="button" class="lb-btn lb-next" aria-label="' + T.next + '">&#8250;</button>' +
      '<a class="lb-open" target="_blank" rel="noopener">' + T.open + ' &#8599;</a>';
    document.body.appendChild(dlg);
    var body = dlg.querySelector('.lb-body'), cap = dlg.querySelector('.lb-cap'),
        prev = dlg.querySelector('.lb-prev'), next = dlg.querySelector('.lb-next'),
        open = dlg.querySelector('.lb-open'), set = [], at = 0;
    function caption(a) {
      var fig = a.closest('figure'), fc = fig && fig.querySelector('figcaption');
      if (fc) return fc.textContent.trim();
      var img = a.querySelector('img');
      if (img && img.alt) return img.alt;
      var li = a.closest('li');
      if (li) {
        var c = li.cloneNode(true);
        Array.prototype.forEach.call(c.querySelectorAll('.chips, .when'), function (x) { x.remove(); });
        return c.textContent.replace(/\s+/g, ' ').trim();
      }
      return a.getAttribute('aria-label') || '';
    }
    function show(i) {
      at = (i + set.length) % set.length;
      var a = set[at], href = a.getAttribute('href');
      body.innerHTML = '';
      if (PDF.test(href)) {
        var f = document.createElement('iframe');
        f.src = href; f.title = caption(a) || 'PDF';
        body.appendChild(f); dlg.classList.add('is-pdf');
      } else {
        var im = document.createElement('img');
        im.src = href; im.alt = caption(a);
        body.appendChild(im); dlg.classList.remove('is-pdf');
      }
      cap.textContent = caption(a);
      open.href = href;
      var many = set.length > 1;
      prev.hidden = next.hidden = !many;
    }
    function close() { dlg.close(); body.innerHTML = ''; }
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('main a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var href = a.getAttribute('href');
      var isImg = IMG.test(href), isPdf = PDF.test(href);
      if (!isImg && !isPdf) return;
      if (isPdf && (window.innerWidth < 760 || /iPhone|iPad|Android/i.test(navigator.userAgent))) return;
      if (/resume\.pdf/.test(href)) return;
      e.preventDefault();
      var g = a.closest('.gallery');
      set = g ? Array.prototype.slice.call(g.querySelectorAll('a[href]')) : [a];
      show(set.indexOf(a));
      dlg.showModal();
    });
    dlg.querySelector('.lb-close').addEventListener('click', close);
    prev.addEventListener('click', function () { show(at - 1); });
    next.addEventListener('click', function () { show(at + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === body) close(); });
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    dlg.addEventListener('keydown', function (e) {
      if (set.length < 2) return;
      if (e.key === 'ArrowLeft') show(at - 1);
      else if (e.key === 'ArrowRight') show(at + 1);
    });
    var x0 = null;
    dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', function (e) {
      if (x0 === null || set.length < 2) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    });
  })();

  if (nav && toggle) {
    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); closeGroups(null); }
    });
  }
})();
