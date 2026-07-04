/* Light/dark toggle. The system preference applies by default; clicking the
   header button pins an explicit choice in localStorage, which the inline
   head snippet restores before first paint on every page. */
(function () {
  'use strict';
  var root = document.documentElement;
  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    var t = root.getAttribute('data-theme');
    return t === 'light' || t === 'dark' ? t : (mql.matches ? 'dark' : 'light');
  }

  function syncChrome(theme) {
    var color = theme === 'dark' ? '#1a1815' : '#faf7f1';
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', color);
  }

  function init() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    function relabel() {
      var next = current() === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('title', 'Switch to ' + next + ' theme');
    }

    relabel();
    if (root.hasAttribute('data-theme')) syncChrome(current());

    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      syncChrome(next);
      relabel();
    });

    mql.addEventListener('change', function () {
      if (!root.hasAttribute('data-theme')) relabel();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
