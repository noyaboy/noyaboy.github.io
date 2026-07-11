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
    '.pet-alpaca[data-state="stand"] .torso{animation-duration:3.8s;}',
    '.pet-bear[data-state="stand"] .torso{animation-duration:4.4s;}',
    /* Arrival: a soft plop (squash, volume kept), then settle into breathing. */
    '.pet[data-state="stand"] .pose-stand{animation:pet-plop .45s cubic-bezier(.3,1.5,.5,1) 1;}',
    '.pet[data-state="sit"] .pose-sit{animation:pet-plop .5s cubic-bezier(.3,1.5,.5,1) 1,pet-breathe 2.6s ease-in-out .5s infinite alternate;}',
    '.pet-cat[data-state="sit"] .pose-sit{animation:pet-plop .55s cubic-bezier(.3,1.5,.5,1) 1,pet-breathe 3.6s ease-in-out .55s infinite alternate;}',
    '.pet-alpaca[data-state="sit"] .pose-sit{animation:pet-plop .55s cubic-bezier(.3,1.5,.5,1) 1,pet-breathe 4s ease-in-out .55s infinite alternate;}',
    '.pet-bear[data-state="sit"] .pose-sit{animation:pet-plop .6s cubic-bezier(.3,1.5,.5,1) 1,pet-breathe 4.8s ease-in-out .6s infinite alternate;}',
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
    /* Plush follow-through: the alpaca topknot (and any .fluff overlay) lags
       the walk bob a beat — same overlay-outside-defs trick as the lids. */
    '.pet .fluff{transform-box:fill-box;transform-origin:50% 100%;}',
    '.pet[data-state="walk"] .fluff{animation:pet-fluff .45s ease-in-out .08s infinite alternate;}',
    '.pet[data-state="run"] .fluff{animation:pet-fluff .2s ease-in-out .46s infinite alternate;}',
    '@keyframes pet-fluff{from{transform:translateY(0) rotate(1.5deg);}to{transform:translateY(-1.6px) rotate(-2deg);}}',
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
    '@media (prefers-reduced-motion:reduce){.pet *{animation:none !important;}.pet-heart{display:none !important;}}',
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

  /* ---- Orange-and-white bicolor cat (drawn from the owner's 橘貓 photo):
         white base with orange patches — orange caps over both ears, an
         orange saddle with bold tabby stripes, ringed orange tail — pale
         aqua eyes with a calm alert stare, pink nose, and the photo's
         collar with a little red tag. Sit pose is the photo's loaf: paws
         tucked, tail wrapped. Floor at y=100. ---- */
  var CAT =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="cat-paw"><rect x="-4" y="0" width="8" height="20" rx="4" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1.1"/><rect x="-4" y="14" width="8" height="6" rx="3" fill="#f6ead2" stroke="#c9b9a4" stroke-width="1.1"/></g>' +
      '<g id="cat-paw-far"><rect x="-4" y="0" width="8" height="20" rx="4" fill="#efe6d6" stroke="#c9b9a4" stroke-width="1.1"/><rect x="-4" y="14" width="8" height="6" rx="3" fill="#e8dcc4" stroke="#c9b9a4" stroke-width="1.1"/></g>' +
      '<g id="cat-head">' +
        '<path d="M-4,-12 L-11,-21.5 L-16.5,-7 Z" fill="#e8933d" stroke="#b25715" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M4,-12 L11,-21.5 L16.5,-7 Z" fill="#e8933d" stroke="#b25715" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M-7,-12.6 L-10.8,-18.2 L-13.4,-9.4 Z" fill="#f0aca0"/>' +
        '<path d="M7,-12.6 L10.8,-18.2 L13.4,-9.4 Z" fill="#f0aca0"/>' +
        '<circle cx="0" cy="0" r="15.5" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1.1"/>' +
        '<ellipse cx="-8.6" cy="-8.6" rx="7.6" ry="6.6" fill="#e8933d"/>' +
        '<ellipse cx="8.6" cy="-8.6" rx="7.6" ry="6.6" fill="#e8933d"/>' +
        '<path d="M-11.5,-13 q1.2,3 0.9,4.8 M-6.4,-13.6 q0.5,3.2 0.3,5 M11.5,-13 q-1.2,3 -0.9,4.8 M6.4,-13.6 q-0.5,3.2 -0.3,5" fill="none" stroke="#c9711f" stroke-width="1.8" stroke-linecap="round"/>' +
        '<g class="blink">' +
          '<ellipse cx="-5.8" cy="-1.4" rx="3.2" ry="3.6" fill="#a8cfc4" stroke="#7fa39a" stroke-width="0.5"/>' +
          '<ellipse cx="5.8" cy="-1.4" rx="3.2" ry="3.6" fill="#a8cfc4" stroke="#7fa39a" stroke-width="0.5"/>' +
          '<ellipse cx="-5.8" cy="-1.2" rx="1.35" ry="2.6" fill="#2c2a26"/>' +
          '<ellipse cx="5.8" cy="-1.2" rx="1.35" ry="2.6" fill="#2c2a26"/>' +
          '<circle cx="-5" cy="-2.6" r="0.85" fill="#ffffff"/>' +
          '<circle cx="6.6" cy="-2.6" r="0.85" fill="#ffffff"/>' +
        '</g>' +
        '<path d="M-2,3.8 L2,3.8 L0,6.6 Z" fill="#e08a7e" stroke="#b25715" stroke-width="0.6" stroke-linejoin="round"/>' +
        '<path d="M0,6.6 q0,1.9 -2.6,2.7 M0,6.6 q0,1.9 2.6,2.7" fill="none" stroke="#a67b52" stroke-width="1" stroke-linecap="round"/>' +
        '<path d="M-8.5,4 L-24,1.5 M-8.5,7.5 L-24,8.5 M8.5,4 L24,1.5 M8.5,7.5 L24,8.5" fill="none" stroke="rgba(94,70,42,.32)" stroke-width="1" stroke-linecap="round"/>' +
        '<path d="M-10,12.2 Q0,17.5 10,12.2" fill="none" stroke="#4a4650" stroke-width="2.6"/>' +
        '<circle cx="0" cy="17.6" r="2.7" fill="#c2453f" stroke="#8f2f2a" stroke-width="0.7"/>' +
        '<circle cx="-0.8" cy="16.9" r="0.7" fill="#e8938c"/>' +
      '</g>' +
    '</defs>' +
    '<ellipse class="ground" cx="66" cy="101" rx="42" ry="3"/>' +
    '<g class="pose pose-stand">' +
      '<g transform="translate(50,80)"><g class="leg leg-a"><use href="#cat-paw-far"/></g></g>' +
      '<g transform="translate(86,80)"><g class="leg leg-b"><use href="#cat-paw-far"/></g></g>' +
      '<g transform="translate(60,80)"><g class="leg leg-b"><use href="#cat-paw"/></g></g>' +
      '<g transform="translate(96,80)"><g class="leg leg-a"><use href="#cat-paw"/></g></g>' +
      '<g transform="translate(0,4)">' +
      '<g class="torso">' +
        '<g class="tail-wag">' +
          '<path d="M40,60 C27,56 20,43 25,30" fill="none" stroke="#e8933d" stroke-width="10" stroke-linecap="round"/>' +
          '<path d="M30.5,48.5 C28.8,45.5 27.8,42.5 27.4,40.5" fill="none" stroke="#c9711f" stroke-width="10" stroke-linecap="round"/>' +
          '<path d="M25.6,34 C25.3,32.7 25.1,31.3 25,30" fill="none" stroke="#c9711f" stroke-width="10" stroke-linecap="round"/>' +
        '</g>' +
        '<ellipse cx="68" cy="62" rx="35.5" ry="23" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1.1"/>' +
        '<path d="M34,57 Q40,43 68,40.5 Q94,42 101,55 Q88,60 66,58.5 Q46,60 34,57 Z" fill="#e8933d"/>' +
        '<path d="M46,45 q3,9 0,14 M57,42.5 q3,11 0,16 M69,42 q3,11 0,16 M81,44 q3,9 0,13 M91,49 q2.5,6 0,9" fill="none" stroke="#c9711f" stroke-width="5" stroke-linecap="round"/>' +
        '<ellipse cx="61" cy="77" rx="19" ry="8" fill="#fdf8ee"/>' +
        '<use href="#cat-head" x="100" y="40"/>' +
        '<g transform="translate(100,40)"><g class="lids"><ellipse cx="-5.8" cy="-1.4" rx="3.6" ry="4" fill="#e8933d"/><ellipse cx="5.8" cy="-1.4" rx="3.6" ry="4" fill="#e8933d"/></g></g>' +
      '</g>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit">' +
      '<ellipse cx="60" cy="81" rx="30" ry="18.5" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1.1"/>' +
      '<path d="M31,76 Q38,62 60,60.5 Q83,62 89,74 Q78,79 59,78 Q40,79 31,76 Z" fill="#e8933d"/>' +
      '<path d="M41,65 q3,8 0,12 M51,62.5 q3,9 0,14 M62,62.5 q3,9 0,14 M73,64.5 q3,8 0,11" fill="none" stroke="#c9711f" stroke-width="4.6" stroke-linecap="round"/>' +
      '<path d="M32,93 C40,98 56,99.5 74,96.5" fill="none" stroke="#e8933d" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M52,98.4 C56,98.3 60,98 63,97.6 M70,97.1 C71.5,97 73,96.8 74,96.5" fill="none" stroke="#c9711f" stroke-width="8" stroke-linecap="round"/>' +
      '<ellipse cx="52" cy="96" rx="7.5" ry="4.5" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1"/>' +
      '<ellipse cx="69" cy="96" rx="7.5" ry="4.5" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1"/>' +
      '<use href="#cat-head" x="72" y="47"/>' +
      '<g transform="translate(72,47)"><g class="lids"><ellipse cx="-5.8" cy="-1.4" rx="3.6" ry="4" fill="#e8933d"/><ellipse cx="5.8" cy="-1.4" rx="3.6" ry="4" fill="#e8933d"/></g></g>' +
    '</g>' +
    '<g class="pose pose-lie">' +
      '<path d="M28,92 C34,97 46,98.5 58,96" fill="none" stroke="#e8933d" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M50,97.6 C53,97.3 56,96.8 58,96" fill="none" stroke="#c9711f" stroke-width="7" stroke-linecap="round"/>' +
      '<ellipse cx="56" cy="85" rx="34" ry="15" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1.1"/>' +
      '<path d="M23,84 Q32,71 56,70 Q80,71 88,82 Q74,87 55,85.5 Q37,87 23,84 Z" fill="#e8933d"/>' +
      '<path d="M36,74 q3,8 0,12 M48,72 q3,9 0,13 M61,72 q3,9 0,13 M73,74.5 q2.5,7 0,10" fill="none" stroke="#c9711f" stroke-width="4.6" stroke-linecap="round"/>' +
      '<rect x="80" y="91" width="24" height="8" rx="4" fill="#fdf8ee" stroke="#c9b9a4" stroke-width="1.1"/>' +
      '<rect x="97" y="91" width="8" height="8" rx="4" fill="#f6ead2" stroke="#c9b9a4" stroke-width="1.1"/>' +
      '<use href="#cat-head" x="88" y="61"/>' +
      '<g transform="translate(88,61)"><g class="lids"><ellipse cx="-5.8" cy="-1.4" rx="3.6" ry="4" fill="#e8933d"/><ellipse cx="5.8" cy="-1.4" rx="3.6" ry="4" fill="#e8933d"/></g></g>' +
    '</g>' +
  '</svg>';

  /* ---- Alpaca (drawn from the owner's 草尼馬 plush): cream shag built
         from stroked circles, smooth oval face patch, black button eyes
         (plush toys don't blink — no lids), stitched Y mouth, little felt
         ears poking sideways, proud vertical neck, stubby legs on smooth
         pads. The topknot is a .fluff overlay so it lags the walk bob.
         Floor at y=100. ---- */
  var ALPACA =
  '<svg viewBox="0 0 110 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="alp-head">' +
        '<path d="M-8.5,-7.5 Q-16,-10.5 -17,-17.5 Q-11,-15.5 -7,-10 Z" fill="#ecdfc2" stroke="#d6c6a5" stroke-width="1" stroke-linejoin="round"/>' +
        '<path d="M8.5,-7.5 Q16,-10.5 17,-17.5 Q11,-15.5 7,-10 Z" fill="#ecdfc2" stroke="#d6c6a5" stroke-width="1" stroke-linejoin="round"/>' +
        '<circle cx="-7" cy="-8" r="7" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="7" cy="-8" r="7" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="0" cy="-11" r="7.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="-11" cy="-1" r="6.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="11" cy="-1" r="6.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="-8" cy="6" r="6" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="8" cy="6" r="6" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="0" cy="0" r="12.5" fill="#f3ead6"/>' +
        '<ellipse cx="0" cy="1.5" rx="8" ry="9.5" fill="#faf3e3"/>' +
        '<circle cx="-4.4" cy="-1" r="2.1" fill="#26221f"/>' +
        '<circle cx="4.4" cy="-1" r="2.1" fill="#26221f"/>' +
        '<circle cx="-3.7" cy="-1.8" r="0.75" fill="#ffffff"/>' +
        '<circle cx="5.1" cy="-1.8" r="0.75" fill="#ffffff"/>' +
        '<path d="M-1.5,4 L1.5,4 M0,4 l0,2.2 M0,6.2 q-1.8,1.8 -3.2,1.5 M0,6.2 q1.8,1.8 3.2,1.5" fill="none" stroke="#a98d63" stroke-width="1" stroke-linecap="round"/>' +
      '</g>' +
      '<g id="alp-leg"><rect x="-4" y="0" width="8" height="16" rx="4" fill="#f3ead6" stroke="#d6c6a5" stroke-width="1"/><rect x="-4" y="11" width="8" height="5" rx="2.5" fill="#faf3e3" stroke="#d6c6a5" stroke-width="1"/></g>' +
      '<g id="alp-leg-far"><rect x="-4" y="0" width="8" height="16" rx="4" fill="#e6dabd" stroke="#d6c6a5" stroke-width="1"/><rect x="-4" y="11" width="8" height="5" rx="2.5" fill="#eee3cb" stroke="#d6c6a5" stroke-width="1"/></g>' +
    '</defs>' +
    '<ellipse class="ground" cx="56" cy="101" rx="34" ry="3"/>' +
    '<g class="pose pose-stand">' +
      '<g transform="translate(40,84)"><g class="leg leg-a"><use href="#alp-leg-far"/></g></g>' +
      '<g transform="translate(66,84)"><g class="leg leg-b"><use href="#alp-leg-far"/></g></g>' +
      '<g transform="translate(50,84)"><g class="leg leg-b"><use href="#alp-leg"/></g></g>' +
      '<g transform="translate(76,84)"><g class="leg leg-a"><use href="#alp-leg"/></g></g>' +
      '<g transform="translate(0,4)">' +
      '<g class="torso">' +
        '<g class="tail-wag"><circle cx="30" cy="66" r="6" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/><circle cx="26.5" cy="62" r="4" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/></g>' +
        '<circle cx="42" cy="62" r="8" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="56" cy="58" r="9" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="47" cy="74" r="8" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<ellipse cx="56" cy="70" rx="24" ry="16" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="70" cy="52" r="8" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<rect x="66" y="33" width="18" height="29" rx="9" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
        '<circle cx="70" cy="58" r="6.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1"/>' +
        '<use href="#alp-head" x="75" y="27"/>' +
      '</g>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit">' +
      '<ellipse cx="50" cy="85" rx="28" ry="14" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<circle cx="30" cy="78" r="7" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<circle cx="46" cy="74" r="8" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<circle cx="64" cy="76" r="7.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<ellipse cx="60" cy="96" rx="7" ry="4" fill="#faf3e3" stroke="#d6c6a5" stroke-width="1"/>' +
      '<ellipse cx="42" cy="97" rx="7" ry="4" fill="#faf3e3" stroke="#d6c6a5" stroke-width="1"/>' +
      '<g class="tail-wag"><circle cx="25" cy="86" r="5.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/></g>' +
      '<rect x="62" y="55" width="18" height="25" rx="9" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<circle cx="67" cy="74" r="6.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1"/>' +
      '<use href="#alp-head" x="71" y="47"/>' +
    '</g>' +
    '<g class="pose pose-lie">' +
      '<ellipse cx="50" cy="89" rx="30" ry="11.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<circle cx="28" cy="84" r="6.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<circle cx="44" cy="80" r="7" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<circle cx="60" cy="82" r="6.5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/>' +
      '<ellipse cx="42" cy="98" rx="8" ry="3.5" fill="#faf3e3" stroke="#d6c6a5" stroke-width="1"/>' +
      '<g class="tail-wag"><circle cx="23" cy="90" r="5" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1"/></g>' +
      '<rect x="60" y="62" width="16" height="26" rx="8" fill="#f3ead6" stroke="#ddcfb2" stroke-width="1.1" transform="rotate(24 68 75)"/>' +
      '<use href="#alp-head" x="78" y="58"/>' +
    '</g>' +
  '</svg>';

  /* ---- Horned bear (the owner's 角熊 — a shaggy grey plush rhino):
         fluffy taupe fur, one big ivory horn on the snout and a smaller
         one on the forehead, floppy ears with pale inners, stitched
         nostrils and mouth, corduroy cream foot pads. Its signature pose
         is the photo's slouched teddy sit. Button eyes — no lids.
         Floor at y=100. ---- */
  var BEAR =
  '<svg viewBox="0 0 130 104" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<g id="bear-head">' +
        '<circle cx="-13.5" cy="-12" r="6.5" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="13.5" cy="-12" r="6.5" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="-8" cy="-8" r="8" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="8" cy="-8" r="8" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="0" cy="-4" r="14.5" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="-12" cy="1" r="7" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="12" cy="1" r="7" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="-7" cy="8" r="7" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="7" cy="8" r="7" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<circle cx="0" cy="0" r="15" fill="#b4a493"/>' +
        '<circle cx="-13.5" cy="-12.5" r="3.1" fill="#d9cdbb"/>' +
        '<circle cx="13.5" cy="-12.5" r="3.1" fill="#d9cdbb"/>' +
        '<ellipse cx="0" cy="8" rx="10" ry="7.5" fill="#c3b4a1"/>' +
        '<path d="M-3.4,9 Q-2.6,0.5 -0.6,-4.5 Q2.2,0.5 2.8,9 Z" fill="#efe8d4" stroke="#cfc2a4" stroke-width="1" stroke-linejoin="round"/>' +
        '<path d="M0.6,-7.5 Q1.9,-12.5 3,-14 Q4.4,-10.5 3.8,-6.5 Z" fill="#efe8d4" stroke="#cfc2a4" stroke-width="0.9" stroke-linejoin="round"/>' +
        '<circle cx="-8" cy="-2.5" r="2.6" fill="#332e28"/>' +
        '<circle cx="8" cy="-2.5" r="2.6" fill="#332e28"/>' +
        '<circle cx="-7.1" cy="-3.4" r="0.85" fill="#cfc4b2"/>' +
        '<circle cx="8.9" cy="-3.4" r="0.85" fill="#cfc4b2"/>' +
        '<path d="M-5,10.5 q1,1.4 2.2,1.4 M2.8,11.9 q1.2,0 2.2,-1.4" fill="none" stroke="#9c8b76" stroke-width="1" stroke-linecap="round"/>' +
        '<path d="M-2.5,13.5 q2.5,1.6 5,0" fill="none" stroke="#9c8b76" stroke-width="1" stroke-linecap="round"/>' +
      '</g>' +
      '<g id="bear-leg"><rect x="-6" y="0" width="12" height="18" rx="6" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/><rect x="-6" y="12" width="12" height="6" rx="3" fill="#ece2cd" stroke="#8a7c6c" stroke-width="1"/></g>' +
      '<g id="bear-leg-far"><rect x="-6" y="0" width="12" height="18" rx="6" fill="#a08f7e" stroke="#8a7c6c" stroke-width="1.1"/><rect x="-6" y="12" width="12" height="6" rx="3" fill="#e0d5c0" stroke="#8a7c6c" stroke-width="1"/></g>' +
    '</defs>' +
    '<ellipse class="ground" cx="66" cy="101" rx="44" ry="3"/>' +
    '<g class="pose pose-stand">' +
      '<g transform="translate(46,82)"><g class="leg leg-a"><use href="#bear-leg-far"/></g></g>' +
      '<g transform="translate(72,82)"><g class="leg leg-b"><use href="#bear-leg-far"/></g></g>' +
      '<g transform="translate(56,82)"><g class="leg leg-b"><use href="#bear-leg"/></g></g>' +
      '<g transform="translate(82,82)"><g class="leg leg-a"><use href="#bear-leg"/></g></g>' +
      '<g class="torso">' +
        '<g class="tail-wag"><path d="M36,62 q-7,-1 -10,-6 M36,63 q-8,1 -11,-2 M36,64 q-6,4 -10,3" fill="none" stroke="#3a332b" stroke-width="2" stroke-linecap="round"/></g>' +
        '<ellipse cx="64" cy="66" rx="31" ry="20" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
        '<ellipse cx="60" cy="75" rx="17" ry="9" fill="#c3b4a1"/>' +
        '<use href="#bear-head" x="94" y="42"/>' +
      '</g>' +
    '</g>' +
    '<g class="pose pose-sit">' +
      '<ellipse cx="60" cy="72" rx="29" ry="24" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
      '<circle cx="38" cy="60" r="8" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
      '<circle cx="82" cy="60" r="8" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
      '<ellipse cx="58" cy="79" rx="18" ry="13" fill="#c3b4a1"/>' +
      '<g transform="rotate(14 34 80)"><ellipse cx="34" cy="80" rx="8" ry="12" fill="#a08f7e" stroke="#8a7c6c" stroke-width="1.1"/><ellipse cx="34" cy="89.5" rx="5.2" ry="3.9" fill="#ece2cd" stroke="#8a7c6c" stroke-width="1"/><path d="M32.3,87 l0,5 M35.7,87 l0,5" stroke="#d8cbb2" stroke-width="1" fill="none"/></g>' +
      '<g transform="rotate(-14 86 80)"><ellipse cx="86" cy="80" rx="8" ry="12" fill="#a08f7e" stroke="#8a7c6c" stroke-width="1.1"/><ellipse cx="86" cy="89.5" rx="5.2" ry="3.9" fill="#ece2cd" stroke="#8a7c6c" stroke-width="1"/><path d="M84.3,87 l0,5 M87.7,87 l0,5" stroke="#d8cbb2" stroke-width="1" fill="none"/></g>' +
      '<ellipse cx="42" cy="93" rx="9" ry="6.5" fill="#ece2cd" stroke="#8a7c6c" stroke-width="1.1"/>' +
      '<path d="M39,88.5 l0,9 M42,88 l0,10 M45,88.5 l0,9" stroke="#d8cbb2" stroke-width="1" fill="none"/>' +
      '<ellipse cx="78" cy="93" rx="9" ry="6.5" fill="#ece2cd" stroke="#8a7c6c" stroke-width="1.1"/>' +
      '<path d="M75,88.5 l0,9 M78,88 l0,10 M81,88.5 l0,9" stroke="#d8cbb2" stroke-width="1" fill="none"/>' +
      '<use href="#bear-head" x="60" y="34"/>' +
    '</g>' +
    '<g class="pose pose-lie">' +
      '<ellipse cx="58" cy="86" rx="33" ry="13.5" fill="#b4a493" stroke="#8a7c6c" stroke-width="1.1"/>' +
      '<rect x="80" y="90" width="22" height="9" rx="4.5" fill="#a08f7e" stroke="#8a7c6c" stroke-width="1.1"/>' +
      '<rect x="95" y="90" width="9" height="9" rx="4.5" fill="#ece2cd" stroke="#8a7c6c" stroke-width="1"/>' +
      '<g class="tail-wag"><path d="M29,88 q-6,-3 -7,-8 M29,90 q-8,-1 -10,-4 M29,92 q-7,2 -9,0" fill="none" stroke="#3a332b" stroke-width="2" stroke-linecap="round"/></g>' +
      '<use href="#bear-head" x="90" y="62"/>' +
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
    '<div class="pet pet-cat" data-state="sit" style="width:100px" title="meow">' + CAT + '<div class="zzz">z z</div></div>' +
    '<div class="pet pet-alpaca" data-state="stand" style="width:84px" title="hum">' + ALPACA + '<div class="zzz">z z</div></div>' +
    '<div class="pet pet-bear" data-state="sit" style="width:106px" title="snuffle">' + BEAR + '<div class="zzz">z z</div></div>';
  document.body.appendChild(layer);

  var rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduce = rmq.matches;

  /* Personal tempo: the dog trots eagerly; the chunky cat strolls, but is
     shockingly quick when it decides the cursor matters; the alpaca ambles
     and stands around dreaming; the bear mostly just sits, like the plush
     it is. Rest deadlines are staggered so the four never sync up. */
  var pets = [
    { el: layer.children[0], x: Math.max(8, innerWidth * 0.12), dir: 1, speed: 44, run: 115, w: 104,
      state: 'walk', until: performance.now() + 4200, chase: null, go: 0, rest: ['stand', 'sit', 'sit', 'lie'] },
    { el: layer.children[1], x: Math.min(innerWidth - 108, innerWidth * 0.68), dir: -1, speed: 38, run: 150, w: 100,
      state: 'sit', until: performance.now() + 3200, chase: null, go: 0, rest: ['sit', 'lie', 'lie', 'stand'] },
    { el: layer.children[2], x: Math.max(8, innerWidth * 0.36), dir: 1, speed: 24, run: 70, w: 84,
      state: 'stand', until: performance.now() + 5600, chase: null, go: 0, rest: ['stand', 'sit', 'stand', 'lie'] },
    { el: layer.children[3], x: Math.min(innerWidth - 114, innerWidth * 0.88), dir: -1, speed: 17, run: 55, w: 106,
      state: 'sit', until: performance.now() + 7200, chase: null, go: 0, rest: ['sit', 'sit', 'lie', 'stand'] }
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
    pets[2].state = 'sit';
    pets[3].state = 'sit';
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
    h.setAttribute('aria-hidden', 'true');
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
    if (pets.some(moving)) {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    } else {
      var next = Infinity;
      for (var i = 0; i < pets.length; i++) next = Math.min(next, pets[i].until);
      var delay = Math.max(16, next - now);
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

  /* If the visitor turns reduced motion on mid-session, park both pets in a
     rest pose far into the future (the CSS media query kills the keyframes,
     this stops the JS walking). Turning it back off leaves them parked —
     conservative, and a reload restores the usual life. */
  if (rmq.addEventListener) {
    rmq.addEventListener('change', function (e) {
      if (!e.matches) return;
      pets.forEach(function (p) {
        p.chase = null;
        p.state = p === dog ? 'lie' : 'sit';
        p.el.dataset.state = p.state;
        p.until = performance.now() + 1e9;
        render(p);
      });
    });
  }

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
