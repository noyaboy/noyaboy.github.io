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
