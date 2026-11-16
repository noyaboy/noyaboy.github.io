/* Header behavior for the Google Sites-style theme: a shadow once the page
   scrolls, the mobile menu toggle, and the active-section highlight in the
   navigation. Self-contained, no dependencies. */
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
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Bold the nav link of the section currently in view (homepage only).
  if (!nav || !('IntersectionObserver' in window)) return;
  var links = {};
  Array.prototype.forEach.call(nav.querySelectorAll('a[href^="/#"]'), function (a) {
    links[a.getAttribute('href').slice(2)] = a;
  });
  var targets = Object.keys(links).map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  if (!targets.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle('is-active', id === en.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  targets.forEach(function (t) { io.observe(t); });
})();
