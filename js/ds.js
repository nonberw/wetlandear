/* WetlandEar: behaviour of the design layer (css/ds.css). The station-log intro, the hero name pulled up letter by letter,
   the hero video control, a spotlight under the pointer on surfaces. No libraries; everything else on the page keeps its own scripts. */
(function () {
  'use strict';
  var d = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function t(k, fb) { try { return window.WE && WE.t ? WE.t(k) || fb : fb; } catch (e) { return fb; } }

  /* ---------- hero: letters of the name, then the side column ---------- */
  var hv = $('.hv'), word = $('.hv-word');
  var chars = [];
  if (word) {
    var text = word.textContent.trim(); word.textContent = '';
    chars = text.split('').map(function (ch) { var s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; word.appendChild(s); return s; });
  }
  if (hv) hv.classList.add('pre');
  var started = false;
  function startHero() {
    if (started) return; started = true;
    setTimeout(function () {   /* a timer, not requestAnimationFrame: it also runs in throttled or embedded views */
      chars.forEach(function (s, i) { setTimeout(function () { s.classList.add('in'); }, reduce ? 0 : 60 + i * 55); });
      setTimeout(function () { if (hv) hv.classList.remove('pre'); }, reduce ? 0 : 380);
    }, 30);
  }

  /* ---------- intro: a station log types a few lines (once per visit, skippable, never for reduced motion or deep links) ---------- */
  var intro = $('#intro'), seen = false;
  try { seen = sessionStorage.getItem('we.intro') === '1'; } catch (e) { }
  if (intro && !reduce && !seen && !location.hash) {
    var LINES = [
      [['t-c', '05:42:10'], ['', '  mic     '], ['t-k', 'listening'], ['', ', 48 kHz']],
      [['t-c', '05:42:13'], ['', '  model   '], ['t-h', 'Grus grus'], ['t-n', '  0.94']],
      [['t-c', '05:42:13'], ['', '  lora    '], ['', 'sent: species, time, confidence']],
      [['t-c', '05:42:14'], ['', '  map     '], ['t-k', 'new event'], ['', ', station north']],
      [['t-c', '// the recording itself never leaves the device']]
    ];
    var box = $('#introLines'), state = $('#introState'), skip = $('#introSkip'), timers = [], ended = false, caret = document.createElement('span');
    caret.className = 'caret'; intro.hidden = false; d.style.overflow = 'hidden';
    var finish = function () {
      if (ended) return; ended = true; timers.forEach(clearTimeout);
      try { sessionStorage.setItem('we.intro', '1'); } catch (e) { }
      intro.classList.add('out'); d.style.overflow = '';
      setTimeout(startHero, 300); setTimeout(function () { intro.hidden = true; }, 900);
      removeEventListener('keydown', finish);
    };
    var at = 260;
    LINES.forEach(function (line) {
      var li = document.createElement('li');
      timers.push(setTimeout(function () { box.appendChild(li); li.appendChild(caret); }, at));
      line.forEach(function (tok) {
        var span = document.createElement('span'); if (tok[0]) span.className = tok[0];
        timers.push(setTimeout(function () { li.insertBefore(span, caret); }, at));
        tok[1].split('').forEach(function (ch) { at += 15; timers.push(setTimeout(function () { span.textContent += ch; }, at)); });
      });
      at += 170;
    });
    timers.push(setTimeout(function () { for (var i = 0; i < 2; i++) { var tl = document.createElement('li'); tl.className = 'tilde'; box.appendChild(tl); } state.textContent = 'event sent'; }, at));
    timers.push(setTimeout(finish, at + 700));
    skip.addEventListener('click', finish); addEventListener('keydown', finish);
    try { skip.focus({ preventScroll: true }); } catch (e) { }
  } else startHero();

  /* ---------- hero video: pause button, still for reduced motion, paused off screen ---------- */
  var v = $('#heroVideo'), b = $('#heroVideoBtn');
  if (v && b) {
    var userPaused = reduce;
    var sync = function () { var p = v.paused; b.setAttribute('aria-pressed', p ? 'true' : 'false'); b.setAttribute('aria-label', p ? t('vid_play', 'Play the background video') : t('vid_pause', 'Pause the background video')); };
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); }
    b.addEventListener('click', function () { if (v.paused) { userPaused = false; v.play(); } else { userPaused = true; v.pause(); } });
    v.addEventListener('play', sync); v.addEventListener('pause', sync); addEventListener('we:lang', sync); sync();
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { if (es[0].isIntersecting) { if (!userPaused) v.play().catch(function () { }); } else v.pause(); }).observe(v);
  }

  /* ---------- spotlight under the pointer on plain surfaces ---------- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.src, .how-stage').forEach(function (c) {
      c.classList.add('spot');
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--sx', (e.clientX - r.left).toFixed(0) + 'px'); c.style.setProperty('--sy', (e.clientY - r.top).toFixed(0) + 'px');
      });
      c.addEventListener('pointerleave', function () { c.style.setProperty('--sx', '-500px'); });
    });
  }
})();
