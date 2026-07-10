/* Site pets: a Bichon Frise and an orange tabby (modeled on the owner's real
   pets). They live on a lawn at the very bottom of the document — anchored to
   the page, not the viewport, so they never cover text while a visitor reads.
   They walk, stand, sit and lie down; click one for a heart. The cat crouches
   before it darts at the cursor, tails overshoot and settle when they stop,
   everything alive breathes and blinks. Self-contained; respects reduced
   motion. */
(function () {
  'use strict';
  if (window.__petsLoaded) return;
  window.__petsLoaded = true;

  var CSS = [
    'body{position:relative;}',
    '.pet-layer{position:absolute;left:0;right:0;bottom:0;height:0;z-index:30;}',
    '.pet{position:absolute;bottom:0;left:0;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;}',
    '.pet svg{display:block;width:100%;height:auto;overflow:visible;}',
    '.pet .pose{display:none;transform-box:fill-box;transform-origin:50% 100%;}',
    '.pet[data-state="walk"] .pose-stand,.pet[data-state="stand"] .pose-stand,.pet[data-state="run"] .pose-stand{display:inline;}',
    '.pet[data-state="sit"] .pose-sit{display:inline;}',
    '.pet[data-state="lie"] .pose-lie{display:inline;}',
    /* Gait. Legs sit out the run\'s wind-up (delay matches the crouch). */
    '.pet .leg{transform-box:fill-box;transform-origin:50% 12%;}',
    '.pet[data-state="walk"] .leg-a{animation:pet-step .45s ease-in-out infinite alternate;}',
    '.pet[data-state="walk"] .leg-b{animation:pet-step .45s ease-in-out infinite alternate-reverse;}',
    '.pet[data-state="run"] .leg-a{animation:pet-step .2s ease-in-out .38s infinite alternate;}',
    '.pet[data-state="run"] .leg-b{animation:pet-step .2s ease-in-out .38s infinite alternate-reverse;}',
    '@keyframes pet-step{from{transform:rotate(13deg);}to{transform:rotate(-13deg);}}',
    /* Torso: walk bob carries a whisper of squash (weight), run opens with an
       anticipation crouch, and every rest state breathes. */
    '.pet .torso{transform-box:fill-box;transform-origin:50% 100%;}',
    '.pet[data-state="walk"] .torso{animation:pet-bob .45s ease-in-out infinite alternate;}',
    '.pet[data-state="run"] .torso{animation:pet-crouch .38s ease-in 1,pet-bob .2s ease-in-out .38s infinite alternate;}',
    '@keyframes pet-bob{from{transform:translateY(0) scaleY(.988);}to{transform:translateY(-1.8px) scaleY(1.012);}}',
    '@keyframes pet-crouch{0%{transform:none;}55%{transform:translateY(2.5px) scaleY(.9) scaleX(1.06);}100%{transform:translateY(-1.5px) scaleY(1.05) scaleX(.97);}}',
    '.pet[data-state="stand"] .torso{animation:pet-breathe 2.3s ease-in-out infinite alternate;}',
    '.pet-cat[data-state="stand"] .torso{animation-duration:3.2s;}',
    /* Arrival: a soft plop (squash, volume kept), then settle into breathing. */
    '.pet[data-state="stand"] .pose-stand{animation:pet-plop .45s cubic-bezier(.3,1.5,.5,1) 1;}',
    '.pet[data-state="sit"] .pose-sit{animation:pet-plop .5s cubic-bezier(.3,1.5,.5,1) 1,pet-breathe 2.6s ease-in-out .5s infinite alternate;}',
    '.pet-cat[data-state="sit"] .pose-sit{animation:pet-plop .55s cubic-bezier(.3,1.5,.5,1) 1,pet-breathe 3.6s ease-in-out .55s infinite alternate;}',
    '.pet[data-state="lie"] .pose-lie{animation:pet-flop .6s cubic-bezier(.3,1.4,.5,1) 1,pet-breathe-deep 3.8s ease-in-out .6s infinite alternate;}',
    '@keyframes pet-plop{0%{transform:scaleY(1.04) scaleX(.98);}45%{transform:scaleY(.955) scaleX(1.025);}100%{transform:none;}}',
    '@keyframes pet-flop{0%{transform:scaleY(1.05) scaleX(.97);}40%{transform:scaleY(.93) scaleX(1.04);}70%{transform:scaleY(1.02) scaleX(.99);}100%{transform:none;}}',
    '@keyframes pet-breathe{from{transform:none;}to{transform:scaleY(1.02) scaleX(.993);}}',
    '@keyframes pet-breathe-deep{from{transform:none;}to{transform:scaleY(1.035) scaleX(.988);}}',
    /* Tails: stream flat at a run, overshoot and settle on stopping, then wag
       at each animal\'s own tempo — the dog eager, the cat a lazy flick. */
    '.pet .tail-wag{transform-box:fill-box;transform-origin:85% 85%;}',
    '.pet[data-state="walk"] .tail-wag{animation:pet-wag .9s ease-in-out infinite;}',
    '.pet[data-state="run"] .tail-wag{animation:pet-stream .35s ease-in-out infinite;}',
    '.pet[data-state="stand"] .tail-wag,.pet[data-state="sit"] .tail-wag{animation:pet-tail-settle .85s cubic-bezier(.3,1.5,.55,1) 1,pet-wag 1.05s ease-in-out .85s infinite;}',
    '.pet-cat[data-state="stand"] .tail-wag,.pet-cat[data-state="sit"] .tail-wag{animation:pet-tail-settle .9s cubic-bezier(.3,1.5,.55,1) 1,pet-wag-lazy 2.5s ease-in-out .9s infinite;}',
    '@keyframes pet-wag{0%,100%{transform:rotate(-5deg);}50%{transform:rotate(7deg);}}',
    '@keyframes pet-wag-lazy{0%,100%{transform:rotate(-2deg);}50%{transform:rotate(4deg);}}',
    '@keyframes pet-stream{0%,100%{transform:rotate(-2deg);}50%{transform:rotate(5deg);}}',
    '@keyframes pet-tail-settle{0%{transform:rotate(16deg);}40%{transform:rotate(-9deg);}70%{transform:rotate(4deg);}100%{transform:rotate(-5deg);}}',
    /* Blinks: the eyes live inside <defs> where neither CSS nor SMIL
       animation reliably reaches <use> instances, so each pose overlays
       fur-colored .lids that unfold from the eye top for ~140ms. */
    '.pet .lids{transform-box:fill-box;transform-origin:50% 0%;transform:scaleY(0);animation:pet-blink 5.2s linear infinite;}',
    '.pet-cat .lids{animation-duration:7.4s;animation-delay:1.3s;}',
    '@keyframes pet-blink{0%,95.5%,99.2%,100%{transform:scaleY(0);}97.3%{transform:scaleY(1);}}',
    '.pet .zzz{display:none;position:absolute;top:-6px;left:60%;color:#9a9a9a;font:700 13px/1 Lato,Verdana,sans-serif;pointer-events:none;}',
    '.pet[data-state="lie"] .zzz{display:block;animation:pet-zzz 2.6s ease-in 3s infinite;opacity:0;}',
    '@keyframes pet-zzz{0%{opacity:0;transform:translateY(0);}25%{opacity:.85;}100%{opacity:0;transform:translateY(-16px);}}',
    /* Hearts rise on an arc, not a rail. */
    '.pet-heart{position:fixed;z-index:60;font-size:15px;color:#e2607a;pointer-events:none;transform:translate(-50%,0);animation:pet-heart 1.1s ease-out forwards;}',
    '@keyframes pet-heart{0%{opacity:0;transform:translate(-50%,4px) scale(.7) rotate(0deg);}20%{opacity:1;}55%{transform:translate(calc(-50% + var(--sw,7px)),-22px) scale(1) rotate(7deg);}100%{opacity:0;transform:translate(calc(-50% - var(--sw,7px)/2),-46px) scale(1.15) rotate(-5deg);}}',
    '.pet .ground{fill:rgba(60,50,30,.10);}',
    '@media (prefers-reduced-motion:reduce){.pet *{animation:none !important;}}',
    '@media print{.pet-layer,.pet,.pet-heart{display:none !important;}}'
  ].join('\n');

  /* ---- Bichon Frise (drawn from the owner's photo): giant powder-puff
         head facing the visitor — wider than tall, crown and cheeks all
         floof — black button eyes that blink, apricot curly beard around
         a black nose, cotton-ball body. Floor at y=100. ---- */
  var DOG =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="dog-head">' +
        '<circle cx="-6" cy="-23" r="9" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="6" cy="-23" r="9" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="0" cy="-20" r="10" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="-13" cy="-16" r="9.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="13" cy="-16" r="9.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="-21" cy="-5" r="9" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="21" cy="-5" r="9" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="-24" cy="3" r="8" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="24" cy="3" r="8" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="-17" cy="8" r="8.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="17" cy="8" r="8.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="-9" cy="14" r="8" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="9" cy="14" r="8" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="0" cy="0" r="22" fill="#fcfaf5"/>' +
        '<ellipse cx="-8" cy="0" rx="4.2" ry="4.6" fill="#e6dcd2"/>' +
        '<ellipse cx="8" cy="0" rx="4.2" ry="4.6" fill="#e6dcd2"/>' +
        '<g class="blink">' +
          '<circle cx="-8" cy="0" r="3.1" fill="#211d1a"/>' +
          '<circle cx="8" cy="0" r="3.1" fill="#211d1a"/>' +
          '<circle cx="-7" cy="-1.1" r="1" fill="#ffffff"/>' +
          '<circle cx="9" cy="-1.1" r="1" fill="#ffffff"/>' +
        '</g>' +
        '<circle cx="-8" cy="11.5" r="5.2" fill="#edd5a5" stroke="#dcc190" stroke-width="0.9"/>' +
        '<circle cx="8" cy="11.5" r="5.2" fill="#edd5a5" stroke="#dcc190" stroke-width="0.9"/>' +
        '<circle cx="-3.5" cy="15" r="4.3" fill="#edd5a5" stroke="#dcc190" stroke-width="0.9"/>' +
        '<circle cx="3.5" cy="15" r="4.3" fill="#edd5a5" stroke="#dcc190" stroke-width="0.9"/>' +
        '<ellipse cx="0" cy="11" rx="5.6" ry="5" fill="#f4e5c0"/>' +
        '<ellipse cx="0" cy="6" rx="3.7" ry="3.2" fill="#26221f"/>' +
        '<circle cx="-1.2" cy="5" r="0.9" fill="#5a534c"/>' +
        '<path d="M0,9.2 l0,2.2" fill="none" stroke="#4b4238" stroke-width="1.1" stroke-linecap="round"/>' +
        '<path d="M-4.5,12 q4.5,3.4 9,0" fill="none" stroke="#4b4238" stroke-width="1.3" stroke-linecap="round"/>' +
      '</g>' +
    '</defs>' +
    '<ellipse class="ground" cx="62" cy="101" rx="42" ry="3"/>' +
    '<g class="pose pose-stand">' +
      '<g transform="translate(48,82)"><g class="leg leg-a"><rect x="-5.5" y="0" width="11" height="18" rx="5.5" fill="#efe8d8" stroke="#dbd2c3" stroke-width="1.1"/></g></g>' +
      '<g transform="translate(74,82)"><g class="leg leg-b"><rect x="-5.5" y="0" width="11" height="18" rx="5.5" fill="#efe8d8" stroke="#dbd2c3" stroke-width="1.1"/></g></g>' +
      '<g transform="translate(58,82)"><g class="leg leg-b"><rect x="-5.5" y="0" width="11" height="18" rx="5.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.1"/></g></g>' +
      '<g transform="translate(84,82)"><g class="leg leg-a"><rect x="-5.5" y="0" width="11" height="18" rx="5.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.1"/></g></g>' +
      '<g class="torso">' +
        '<g class="tail-wag"><circle cx="30" cy="52" r="9" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/><circle cx="24" cy="45" r="6" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/></g>' +
        '<circle cx="44" cy="56" r="10" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<ellipse cx="62" cy="68" rx="28" ry="18" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="56" cy="52" r="11" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<circle cx="72" cy="54" r="10" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
        '<use href="#dog-head" x="92" y="34"/>' +
        '<g transform="translate(92,34)"><g class="lids"><circle cx="-8" cy="0" r="3.5" fill="#fcfaf5"/><circle cx="8" cy="0" r="3.5" fill="#fcfaf5"/></g></g>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit">' +
      '<g class="tail-wag"><circle cx="34" cy="92" r="8" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/><circle cx="27" cy="88" r="5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/></g>' +
      '<ellipse cx="65" cy="82" rx="23" ry="16" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
      '<ellipse cx="52" cy="94" rx="9" ry="5.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
      '<ellipse cx="78" cy="94" rx="9" ry="5.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
      '<use href="#dog-head" x="65" y="42"/>' +
      '<g transform="translate(65,42)"><g class="lids"><circle cx="-8" cy="0" r="3.5" fill="#fcfaf5"/><circle cx="8" cy="0" r="3.5" fill="#fcfaf5"/></g></g>' +
    '</g>' +
    '<g class="pose pose-lie">' +
      '<circle cx="24" cy="90" r="8" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/><circle cx="18" cy="94" r="5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
      '<ellipse cx="56" cy="87" rx="30" ry="13" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
      '<ellipse cx="52" cy="96" rx="10" ry="4.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
      '<ellipse cx="76" cy="96" rx="10" ry="4.5" fill="#fcfaf5" stroke="#dbd2c3" stroke-width="1.2"/>' +
      '<use href="#dog-head" x="86" y="60"/>' +
      '<g transform="translate(86,60)"><g class="lids"><circle cx="-8" cy="0" r="3.5" fill="#fcfaf5"/><circle cx="8" cy="0" r="3.5" fill="#fcfaf5"/></g></g>' +
    '</g>' +
  '</svg>';

  /* ---- Orange mackerel tabby (drawn from the owner's photo): properly
         chunky — big round belly, bold flank stripes, ringed tail — with
         the photo's half-lidded, faintly unimpressed stare: pale green
         eyes under flat fur-colored lids, white muzzle and chest, pink
         inner ears, cream paw tips. Floor at y=100. ---- */
  var CAT =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="cat-paw"><rect x="-4" y="0" width="8" height="20" rx="4" fill="#e8933d" stroke="#b25715" stroke-width="1.1"/><rect x="-4" y="14" width="8" height="6" rx="3" fill="#f6e8d2" stroke="#b25715" stroke-width="1.1"/></g>' +
      '<g id="cat-paw-far"><rect x="-4" y="0" width="8" height="20" rx="4" fill="#d1762a" stroke="#b25715" stroke-width="1.1"/><rect x="-4" y="14" width="8" height="6" rx="3" fill="#e8d6bd" stroke="#b25715" stroke-width="1.1"/></g>' +
      '<g id="cat-head">' +
        '<path d="M-4,-12 L-11,-21.5 L-16.5,-7 Z" fill="#e8933d" stroke="#b25715" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M4,-12 L11,-21.5 L16.5,-7 Z" fill="#e8933d" stroke="#b25715" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M-7,-12.6 L-10.8,-18.2 L-13.4,-9.4 Z" fill="#f0aca0"/>' +
        '<path d="M7,-12.6 L10.8,-18.2 L13.4,-9.4 Z" fill="#f0aca0"/>' +
        '<circle cx="0" cy="0" r="15.5" fill="#e8933d" stroke="#b25715" stroke-width="1.1"/>' +
        '<path d="M-5.5,-13.5 q1.4,3.8 1,6 M-0.3,-15 q0.4,4.4 0.2,6.6 M5,-13.5 q-1.4,3.8 -1,6" fill="none" stroke="#c9711f" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M-13.5,-6.5 l4.6,2.4 M13.5,-6.5 l-4.6,2.4" fill="none" stroke="#c9711f" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M-15.3,2 l5,0.8 M15.3,2 l-5,0.8" fill="none" stroke="#c9711f" stroke-width="1.8" stroke-linecap="round"/>' +
        '<ellipse cx="0" cy="7.8" rx="7.2" ry="5.4" fill="#fdf5e9"/>' +
        '<g class="blink">' +
          '<ellipse cx="-5.8" cy="-1.6" rx="3.1" ry="3.5" fill="#bcc97b" stroke="#8a7a3c" stroke-width="0.4"/>' +
          '<ellipse cx="5.8" cy="-1.6" rx="3.1" ry="3.5" fill="#bcc97b" stroke="#8a7a3c" stroke-width="0.4"/>' +
          '<ellipse cx="-5.8" cy="-1.6" rx="1.15" ry="2.7" fill="#2c2a26"/>' +
          '<ellipse cx="5.8" cy="-1.6" rx="1.15" ry="2.7" fill="#2c2a26"/>' +
          '<circle cx="-5" cy="-2.8" r="0.85" fill="#ffffff"/>' +
          '<circle cx="6.6" cy="-2.8" r="0.85" fill="#ffffff"/>' +
        '</g>' +
        '<path d="M-9,-3.4 l6.4,-1 M2.6,-4.4 l6.4,1" fill="none" stroke="#e8933d" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M-2,3.8 L2,3.8 L0,6.6 Z" fill="#d5876b" stroke="#b25715" stroke-width="0.6" stroke-linejoin="round"/>' +
        '<path d="M0,6.6 q0,1.9 -2.6,2.7 M0,6.6 q0,1.9 2.6,2.7" fill="none" stroke="#a67b52" stroke-width="1" stroke-linecap="round"/>' +
        '<path d="M-8.5,4 L-24,1.5 M-8.5,7.5 L-24,8.5 M8.5,4 L24,1.5 M8.5,7.5 L24,8.5" fill="none" stroke="rgba(94,70,42,.32)" stroke-width="1" stroke-linecap="round"/>' +
      '</g>' +
    '</defs>' +
    '<ellipse class="ground" cx="66" cy="101" rx="42" ry="3"/>' +
    '<g class="pose pose-stand">' +
      '<g transform="translate(50,80)"><g class="leg leg-a"><use href="#cat-paw-far"/></g></g>' +
      '<g transform="translate(86,80)"><g class="leg leg-b"><use href="#cat-paw-far"/></g></g>' +
      '<g transform="translate(60,80)"><g class="leg leg-b"><use href="#cat-paw"/></g></g>' +
      '<g transform="translate(96,80)"><g class="leg leg-a"><use href="#cat-paw"/></g></g>' +
      '<g class="torso">' +
        '<g class="tail-wag">' +
          '<path d="M40,60 C27,56 20,43 25,30" fill="none" stroke="#e8933d" stroke-width="10" stroke-linecap="round"/>' +
          '<path d="M30.5,48.5 C28.8,45.5 27.8,42.5 27.4,40.5" fill="none" stroke="#c9711f" stroke-width="10" stroke-linecap="round"/>' +
          '<path d="M25.6,34 C25.3,32.7 25.1,31.3 25,30" fill="none" stroke="#c9711f" stroke-width="10" stroke-linecap="round"/>' +
        '</g>' +
        '<ellipse cx="68" cy="62" rx="35.5" ry="23" fill="#e8933d" stroke="#b25715" stroke-width="1.1"/>' +
        '<ellipse cx="61" cy="77" rx="19" ry="8" fill="#f6e8d2"/>' +
        '<path d="M46,46 q3,12 0,19 M57,42 q3,15 0,22 M69,41 q3,15 0,22 M81,43 q3,13 0,19 M91,49 q3,9 0,13" fill="none" stroke="#c9711f" stroke-width="5.5" stroke-linecap="round"/>' +
        '<use href="#cat-head" x="100" y="40"/>' +
        '<g transform="translate(100,40)"><g class="lids"><ellipse cx="-5.8" cy="-1.6" rx="3.5" ry="3.9" fill="#e8933d"/><ellipse cx="5.8" cy="-1.6" rx="3.5" ry="3.9" fill="#e8933d"/></g></g>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit">' +
      '<path d="M36,96 C44,99.6 62,99.6 76,96" fill="none" stroke="#e8933d" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M58,98.9 C62,98.8 65,98.4 68,97.8" fill="none" stroke="#c9711f" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M73,96.7 C74,96.5 75,96.3 76,96" fill="none" stroke="#c9711f" stroke-width="8" stroke-linecap="round"/>' +
      '<circle cx="56" cy="76" r="23" fill="#e8933d" stroke="#b25715" stroke-width="1.1"/>' +
      '<path d="M40,66 q5,-9 17,-12 M38,79 q4,-8 14,-10 M41,90 q4,-6 11,-8" fill="none" stroke="#c9711f" stroke-width="5" stroke-linecap="round"/>' +
      '<ellipse cx="73" cy="62" rx="16.5" ry="24" fill="#e8933d" stroke="#b25715" stroke-width="1.1" transform="rotate(-7 73 62)"/>' +
      '<path d="M64,52 q10,-4 18,0 M63,62 q10,-4 20,0" fill="none" stroke="#c9711f" stroke-width="4.5" stroke-linecap="round"/>' +
      '<ellipse cx="77" cy="73" rx="6.5" ry="9" fill="#f6e8d2" transform="rotate(-7 77 73)"/>' +
      '<g transform="translate(66,82)"><use href="#cat-paw-far"/></g>' +
      '<g transform="translate(80,82)"><use href="#cat-paw"/></g>' +
      '<use href="#cat-head" x="75" y="30"/>' +
      '<g transform="translate(75,30)"><g class="lids"><ellipse cx="-5.8" cy="-1.6" rx="3.5" ry="3.9" fill="#e8933d"/><ellipse cx="5.8" cy="-1.6" rx="3.5" ry="3.9" fill="#e8933d"/></g></g>' +
    '</g>' +
    '<g class="pose pose-lie">' +
      '<path d="M28,92 C34,97 46,98.5 58,96" fill="none" stroke="#e8933d" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M50,97.6 C53,97.3 56,96.8 58,96" fill="none" stroke="#c9711f" stroke-width="7" stroke-linecap="round"/>' +
      '<ellipse cx="56" cy="85" rx="34" ry="15" fill="#e8933d" stroke="#b25715" stroke-width="1.1"/>' +
      '<path d="M40,72 q3,11 0,16 M53,70 q3,12 0,17 M66,71 q3,11 0,16 M77,74 q3,9 0,13" fill="none" stroke="#c9711f" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="80" y="91" width="24" height="8" rx="4" fill="#e8933d" stroke="#b25715" stroke-width="1.1"/>' +
      '<rect x="85" y="91.6" width="4" height="6.8" fill="#c9711f"/>' +
      '<rect x="91.5" y="91.6" width="4" height="6.8" fill="#c9711f"/>' +
      '<rect x="97" y="91" width="8" height="8" rx="4" fill="#f6e8d2" stroke="#b25715" stroke-width="1.1"/>' +
      '<use href="#cat-head" x="88" y="61"/>' +
      '<g transform="translate(88,61)"><g class="lids"><ellipse cx="-5.8" cy="-1.6" rx="3.5" ry="3.9" fill="#e8933d"/><ellipse cx="5.8" cy="-1.6" rx="3.5" ry="3.9" fill="#e8933d"/></g></g>' +
    '</g>' +
  '</svg>';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var layer = document.createElement('div');
  layer.className = 'pet-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML =
    '<div class="pet pet-dog" data-state="walk" style="width:104px" title="woof">' + DOG + '<div class="zzz">z z</div></div>' +
    '<div class="pet pet-cat" data-state="sit" style="width:100px" title="meow">' + CAT + '<div class="zzz">z z</div></div>';
  document.body.appendChild(layer);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Personal tempo: the dog trots eagerly; the chunky cat strolls, but is
     shockingly quick when it decides the cursor matters. */
  var pets = [
    { el: layer.children[0], x: Math.max(8, innerWidth * 0.12), dir: 1, speed: 44, run: 115, w: 104,
      state: 'walk', until: performance.now() + 4200, chase: null, go: 0, rest: ['stand', 'sit', 'sit', 'lie'] },
    { el: layer.children[1], x: Math.min(innerWidth - 108, innerWidth * 0.68), dir: -1, speed: 38, run: 150, w: 100,
      state: 'sit', until: performance.now() + 3200, chase: null, go: 0, rest: ['sit', 'lie', 'lie', 'stand'] }
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
      // The cat sometimes darts after the cursor; the dog sometimes chases the
      // cat. A dart begins with a crouch (see pet-crouch): the body winds up
      // for ~.38s, already facing its target, before any ground is covered.
      if (p === cat && mouse.x !== null && now - mouse.t < 8000 &&
          Math.abs(mouse.x - (p.x + p.w / 2)) > 180 && Math.random() < 0.5) {
        p.chase = 'mouse';
        p.dir = mouse.x > p.x + p.w / 2 ? 1 : -1;
        p.go = now + 380;
        setState(p, 'run', now + 7000);
        return;
      }
      if (p === dog && Math.random() < 0.3 && Math.abs(cat.x - p.x) > 220) {
        p.chase = 'cat';
        p.dir = cat.x > p.x ? 1 : -1;
        p.go = now + 380;
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
    h.style.setProperty('--sw', ((4 + Math.random() * 7) * (Math.random() < 0.5 ? -1 : 1)).toFixed(1) + 'px');
    document.body.appendChild(h);
    setTimeout(function () { h.remove(); }, 1200);
  }

  /* The loop only takes animation frames while a pet is actually moving.
     When both are resting, it parks on a single setTimeout aimed at the
     earliest state deadline, and stops entirely while the tab is hidden —
     so an idle page spends nothing on the pets. */
  var last = performance.now();
  var rafId = null;
  var timerId = null;

  function moving(p) { return p.state === 'walk' || p.state === 'run'; }

  function tick(now) {
    rafId = null;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (var i = 0; i < pets.length; i++) {
      var p = pets[i];
      if (now >= p.until) pick(p, now);
      var max = innerWidth - p.w - 6;
      if (p.state === 'run') {
        if (now >= p.go) {
          var target = p.chase === 'mouse' ? mouse.x - p.w / 2 : cat.x;
          target = Math.max(6, Math.min(max, target));
          var gap = target - p.x;
          var arrive = p.chase === 'cat' ? 96 : 16;
          if (Math.abs(gap) <= arrive) {
            p.dir = gap === 0 ? p.dir : (gap > 0 ? 1 : -1);
            if (p.chase === 'cat') {
              var pr = p.el.getBoundingClientRect();
              heartAt(pr.left + pr.width / 2, pr.top - 4);
            }
            p.chase = null;
            setState(p, p === cat ? 'sit' : 'stand', now + 2600);
          } else {
            p.dir = gap > 0 ? 1 : -1;
            p.x += p.dir * p.run * dt;
            p.x = Math.max(6, Math.min(max, p.x));
          }
        }
      } else if (p.state === 'walk') {
        p.x += p.dir * p.speed * dt;
        if (p.x <= 6) { p.x = 6; p.dir = 1; }
        else if (p.x >= max) { p.x = max; p.dir = -1; }
      }
      render(p);
    }
    schedule(now);
  }

  function schedule(now) {
    if (document.hidden) return;
    if (moving(dog) || moving(cat)) {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    } else {
      var delay = Math.max(16, Math.min(dog.until, cat.until) - now);
      if (timerId !== null) clearTimeout(timerId);
      timerId = setTimeout(function () {
        timerId = null;
        last = performance.now();
        tick(performance.now());
      }, delay);
    }
  }

  /* Cancel whatever is parked and take a fresh frame — used after any
     out-of-band state change (pet clicks, tab becoming visible again). */
  function kick() {
    if (timerId !== null) { clearTimeout(timerId); timerId = null; }
    if (rafId === null && !document.hidden) {
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      if (timerId !== null) { clearTimeout(timerId); timerId = null; }
    } else {
      kick();
    }
  });

  kick();

  layer.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('.pet') : null;
    if (!el) return;
    var r = el.getBoundingClientRect();
    heartAt(r.left + r.width / 2, r.top - 2);
    for (var i = 0; i < pets.length; i++) {
      if (pets[i].el === el) {
        pets[i].state = 'stand';
        pets[i].el.dataset.state = 'stand';
        pets[i].until = performance.now() + 1600;
      }
    }
    kick();
  });
})();
