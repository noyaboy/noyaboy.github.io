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
      f.src = 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = b.getAttribute('aria-label') || 'YouTube video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
      f.focus();
    });
  });

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
