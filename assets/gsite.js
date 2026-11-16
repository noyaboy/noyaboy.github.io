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
    function show(n) {
      i = (n + slides.length) % slides.length;
      Array.prototype.forEach.call(slides, function (s, k) { s.classList.toggle('is-active', k === i); });
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
