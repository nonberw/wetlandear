/* WetlandEar: orchestration. Motion has a job in every place it appears:
   hierarchy (hero, reveals), storytelling (pinned signal path), feedback (buttons, demo), state change (language swap). */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) { gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ ignoreMobileResize: true }); }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- Language ---------- */
  WE.apply();
  document.documentElement.classList.remove('i18n-pending');
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { WE.set(b.getAttribute('data-lang')); });
  });

  /* ---------- Nav state (no scroll listener: an observed sentinel) ---------- */
  var nav = $('#nav');
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(function (es) { nav.classList.toggle('scrolled', !es[0].isIntersecting); }).observe(sentinel);

  /* ---------- Reveal on scroll ---------- */
  var revealIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(function (el) { revealIO.observe(el); });
  /* Safety net for fast flicks on phones: anything already scrolled past is shown, never left invisible. */
  var revealTick = false;
  function revealPassed() {
    revealTick = false;
    $$('.reveal:not(.in)').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * .9) { el.classList.add('in'); revealIO.unobserve(el); }
    });
  }
  window.addEventListener('scroll', function () {
    if (!revealTick) { revealTick = true; requestAnimationFrame(revealPassed); }
  }, { passive: true });

  /* ---------- Problem statement: words light up as you read ---------- */
  var words = [], shown = -1;
  function splitStatement() {
    var el = $('#statement'); if (!el) return;
    var parts = WE.t('prob_statement').split(' ');
    el.textContent = '';
    parts.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w' + (reduce || !hasGsap ? ' on' : '');
      s.textContent = w + (i < parts.length - 1 ? ' ' : '');
      el.appendChild(s);
    });
    words = $$('.w', el); shown = -1;
  }
  splitStatement();
  if (hasGsap && !reduce) {
    ScrollTrigger.create({
      trigger: '#statement', start: 'top 82%', end: 'bottom 48%', scrub: true,
      onUpdate: function (self) {
        var n = Math.round(self.progress * words.length);
        if (n === shown) return; shown = n;
        words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
      }
    });
  }

  /* ---------- Hero spectrogram ---------- */
  var heroSpec = window.WESpectrogram ? WESpectrogram($('#heroCanvas'), { scale: window.innerWidth < 900 ? 3 : 2, speed: 60, hero: $('.hero') }) : null;

  /* ---------- Signal path ---------- */
  var steps = $$('.step'), descs = $$('.desc'), bar = $('#howBar'), pipe = null, cur = 0, howST = null;
  function setStageUI(i) {
    cur = i;
    steps.forEach(function (s, k) { s.classList.toggle('on', k === i); s.classList.toggle('done', k < i); });
    descs.forEach(function (d, k) { d.classList.toggle('on', k === i); });
  }
  if (window.WEPipeline) {
    pipe = WEPipeline($('#stage'), WE.t);
    var desktop = matchMedia('(min-width: 901px)');
    function runTimer() {
      if (bar) bar.style.transform = 'scaleX(' + ((cur + 1) / 5) + ')';
      pipe.play(cur, !reduce, function (i) { setStageUI(i); if (bar) bar.style.transform = 'scaleX(' + ((i + 1) / 5) + ')'; });
    }
    steps.forEach(function (s, i) {
      s.querySelector('button').addEventListener('click', function () {
        if (howST) {
          var y = howST.start + (i / 5 + .06) * (howST.end - howST.start);
          window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        } else { setStageUI(i); pipe.play(i, false); if (bar) bar.style.transform = 'scaleX(' + ((i + 1) / 5) + ')'; }
      });
    });
    if (hasGsap && !reduce) {
      var mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', function () {
        howST = ScrollTrigger.create({
          trigger: '#howPin', start: 'top top', end: '+=2600', pin: true, scrub: .35, refreshPriority: 3,
          onUpdate: function (self) {
            var p = self.progress;
            pipe.setProgress(p);
            var i = Math.min(4, Math.floor(p * 5));
            if (i !== cur) setStageUI(i);
            if (bar) bar.style.transform = 'scaleX(' + p + ')';
          }
        });
        return function () { howST = null; };
      });
      mm.add('(max-width: 900px)', function () { setStageUI(0); runTimer(); });
    } else { setStageUI(0); runTimer(); }
  }

  /* ---------- Demo block: grows from a card into the full-bleed dark section ---------- */
  if (hasGsap && !reduce) {
    gsap.fromTo('#demoShell',
      { clipPath: 'inset(8% 3% 8% 3% round 24px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
        scrollTrigger: { trigger: '#demo', start: 'top 92%', end: 'top 12%', scrub: true } });
  }

  /* ---------- Architecture: connectors draw as the section arrives ---------- */
  var archTriggers = [];
  function drawArch() {
    var arch = $('#arch'), svg = $('#archSvg');
    if (!arch || !svg) return;
    archTriggers.forEach(function (t) { t.kill(); }); archTriggers = [];
    svg.innerHTML = '';
    if (getComputedStyle(svg).display === 'none') return;
    var ar = arch.getBoundingClientRect(), NS = 'http://www.w3.org/2000/svg';
    svg.setAttribute('viewBox', '0 0 ' + ar.width + ' ' + ar.height);
    var db = $('#archDb').getBoundingClientRect(), dash = $('#archDash').getBoundingClientRect();
    var paths = [];
    function curve(x1, y1, x2, y2) {
      var p = document.createElementNS(NS, 'path'), dx = (x2 - x1) * .5;
      p.setAttribute('d', 'M' + x1 + ' ' + y1 + ' C' + (x1 + dx) + ' ' + y1 + ' ' + (x2 - dx) + ' ' + y2 + ' ' + x2 + ' ' + y2);
      svg.appendChild(p); paths.push(p);
    }
    var srcs = $$('.src', arch), n = srcs.length;
    srcs.forEach(function (s, i) {
      var r = s.getBoundingClientRect();
      var ty = db.top - ar.top + db.height * ((i + 1) / (n + 1));
      curve(r.right - ar.left, r.top - ar.top + r.height / 2, db.left - ar.left, ty);
    });
    curve(db.right - ar.left, db.top - ar.top + db.height / 2, dash.left - ar.left, dash.top - ar.top + dash.height / 2);
    paths.forEach(function (p, i) {
      var len = p.getTotalLength();
      if (reduce || !hasGsap) { p.style.strokeDasharray = 'none'; return; }
      p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      var tw = gsap.to(p, { strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: arch, start: 'top ' + (82 - i * 3) + '%', end: 'top ' + (46 - i * 3) + '%', scrub: true } });
      archTriggers.push(tw.scrollTrigger);
    });
    archPaths = paths; applySel();
  }

  /* Click a source: its line lights up and a packet travels source -> database -> dashboard */
  var archPaths = [], archSel = -1, archRaf = 0;
  function applySel() {
    archPaths.forEach(function (p, i) { p.classList.toggle('hot', archSel >= 0 && (i === archSel || i === archPaths.length - 1)); });
    $$('.src').forEach(function (s, i) { s.classList.toggle('act', i === archSel); });
  }
  function travel() {
    cancelAnimationFrame(archRaf);
    var svg = $('#archSvg');
    if (!svg || archSel < 0 || !archPaths.length || getComputedStyle(svg).display === 'none') return;
    var c = svg.querySelector('circle');
    if (!c) { c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '5.5'); c.style.fill = '#1F5BFF'; svg.appendChild(c); }
    var a = archPaths[archSel], b = archPaths[archPaths.length - 1], la = a.getTotalLength(), lb = b.getTotalLength(), t0 = performance.now();
    (function step(now) {
      var u = (now - t0) / 1900;
      if (u >= 1) { c.setAttribute('opacity', '0'); return; }
      var pt = u < .55 ? a.getPointAtLength(la * (u / .55)) : b.getPointAtLength(lb * ((u - .55) / .45));
      c.setAttribute('opacity', '1'); c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y);
      archRaf = requestAnimationFrame(step);
    })(t0);
  }
  $$('.src').forEach(function (s, i) {
    s.setAttribute('tabindex', '0'); s.setAttribute('role', 'button');
    function pick() { archSel = archSel === i ? -1 : i; applySel(); travel(); }
    s.addEventListener('click', pick);
    s.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
  });
  var archTimer = 0;
  function archSoon() { clearTimeout(archTimer); archTimer = setTimeout(drawArch, 120); }
  window.addEventListener('resize', archSoon);
  drawArch();

  /* ---------- Audiences accordion ---------- */
  var panels = $$('.acc-p');
  function activate(p) { panels.forEach(function (x) { x.classList.toggle('on', x === p); }); }
  var canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  panels.forEach(function (p) {
    p.addEventListener('click', function () { activate(p); });
    p.addEventListener('focus', function () { activate(p); });
    if (canHover) p.addEventListener('mouseenter', function () { activate(p); });
  });

  /* ---------- Plan timeline ---------- */
  var fill = $('#tlFill');
  if (fill) {
    if (hasGsap && !reduce) {
      ScrollTrigger.create({
        trigger: '#timeline', start: 'top 62%', end: 'bottom 62%', scrub: true,
        onUpdate: function (self) { fill.style.transform = 'scaleY(' + self.progress + ')'; }
      });
    } else fill.style.transform = 'scaleY(1)';
    var tlIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { rootMargin: '0px 0px -40% 0px' });
    $$('.tl-item').forEach(function (el) { tlIO.observe(el); });
  }

  /* ---------- Magnetic primary buttons (pointer devices only) ---------- */
  if (canHover && !reduce) {
    $$('.mag').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        b.style.setProperty('--mx', (dx * 14).toFixed(1) + 'px');
        b.style.setProperty('--my', (dy * 10).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', function () { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
    });
  }

  /* ---------- Reading progress bar ---------- */
  var prog = $('#progBar');
  if (prog && hasGsap) {
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) { prog.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')'; } });
  }

  /* ---------- Hero light follows the pointer ---------- */
  var heroEl = $('.hero'), aura = $('.aura');
  if (heroEl && aura && canHover && !reduce) {
    heroEl.addEventListener('pointermove', function (e) {
      var r = heroEl.getBoundingClientRect();
      aura.style.setProperty('--ax', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      aura.style.setProperty('--ay', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    }, { passive: true });
  }

  /* ---------- Hero: a click or tap makes the birds answer ---------- */
  if (heroEl && heroSpec && !reduce) {
    heroEl.addEventListener('pointerdown', function (e) {
      if (e.target.closest('a, button')) return;
      var r = heroEl.getBoundingClientRect(), c = $('.hero-canvas').getBoundingClientRect();
      var ring = document.createElement('span');
      ring.className = 'hero-ring';
      ring.style.left = (e.clientX - r.left) + 'px'; ring.style.top = (e.clientY - r.top) + 'px';
      heroEl.appendChild(ring); setTimeout(function () { ring.remove(); }, 1600);
      var y = Math.min(1, Math.max(0, (e.clientY - c.top) / c.height));
      for (var i = 0; i < 4; i++) setTimeout(function (k) { heroSpec.burst(Math.min(.95, Math.max(.05, y + (k - 1.5) * .12))); }.bind(null, i), i * 140);
    });
  }

  /* ---------- Manifesto: three words, one per stretch of scroll ---------- */
  var maniWords = $$('.mw'), maniIdx = 0;
  function setMani(i) { maniWords.forEach(function (w, k) { w.classList.toggle('on', k === i); w.classList.toggle('past', k < i); }); }
  if (hasGsap && !reduce && maniWords.length) {
    ScrollTrigger.create({
      trigger: '#maniPin', start: 'top top', end: '+=1500', pin: true, scrub: true, refreshPriority: 4,
      onUpdate: function (s) {
        var i = Math.min(2, Math.floor(s.progress * 3));
        if (i !== maniIdx) { maniIdx = i; setMani(i); }
      }
    });
  }

  /* ---------- Globe: spins in, settles on Kazakhstan, sends events to Astana ---------- */
  var gCanvas = $('#globeCanvas');
  if (gCanvas && window.WEGlobe) {
    var globe = WEGlobe(gCanvas, { astana: $('#lblAstana'), korg: $('#lblKorg') });
    if (globe) {
      if (hasGsap && !reduce) {
        ScrollTrigger.create({
          trigger: '#globePin', start: 'top top', end: '+=2400', pin: true, scrub: .4, refreshPriority: 2,
          onUpdate: function (s) { globe.setProgress(s.progress); }
        });
      } else globe.still();
    } else { gCanvas.style.display = 'none'; }
  }

  /* ---------- Spotlight that follows the pointer on panels ---------- */
  if (canHover) {
    $$('.b, .src').forEach(function (el) {
      el.classList.add('spot');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--sx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--sy', (e.clientY - r.top) + 'px');
      }, { passive: true });
    });
  }

  /* ---------- Ripple on every button ---------- */
  $$('.btn').forEach(function (b) {
    b.addEventListener('pointerdown', function (e) {
      if (reduce) return;
      var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2, s = document.createElement('span');
      s.className = 'ripple';
      s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
      b.appendChild(s); setTimeout(function () { s.remove(); }, 800);
    });
  });

  /* ---------- Language switch: the pill slides ---------- */
  var langBox = $('.lang');
  function langPos() { if (langBox) langBox.style.setProperty('--pos', WE.lang === 'ru' ? 0 : 1); }
  langPos();
  window.addEventListener('we:lang', function () { langPos(); var t = $('#toTop'); if (t) t.setAttribute('aria-label', WE.t('totop')); });

  /* ---------- Nav highlights the section you are in ---------- */
  var navLinks = $$('.nav-links a');
  var curIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.toggle('cur', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['how', 'product', 'parts', 'pilot'].forEach(function (id) { var s = document.getElementById(id); if (s) curIO.observe(s); });

  /* ---------- Back to top ---------- */
  var toTop = $('#toTop');
  if (toTop && heroEl) {
    new IntersectionObserver(function (es) { toTop.classList.toggle('show', !es[0].isIntersecting); }, { threshold: 0 }).observe(heroEl);
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  }

  /* ---------- Click the station: it chirps ---------- */
  var dev = $('.device');
  if (dev) dev.addEventListener('click', function () {
    for (var i = 0; i < 3; i++) setTimeout(function () {
      var r = document.createElement('span'); r.className = 'd-ring'; dev.appendChild(r); setTimeout(function () { r.remove(); }, 1800);
    }, i * 260);
  });

  /* ---------- Platform card: tabs that also play by themselves ---------- */
  var pvScenes = $$('.pv'), pvTabs = $$('.ptabs button'), pcap = $('#pcap'), pbar = $('#pbar'), pfill = $('#pbarFill');
  var pIdx = 0, pAuto = true, pTimer = 0, pSeen = false;
  function setPV(i, byUser) {
    pIdx = i;
    pvScenes.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    pvTabs.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    if (pcap) { pcap.setAttribute('data-i18n', 'plat_li' + (i + 1)); pcap.textContent = WE.t('plat_li' + (i + 1)); }
    if (pfill) { pfill.style.animation = 'none'; void pfill.offsetWidth; pfill.style.animation = ''; }
    if (byUser) { pAuto = false; clearTimeout(pTimer); if (pbar) pbar.classList.add('stop'); }
  }
  function pLoop() {
    clearTimeout(pTimer);
    if (!pAuto || !pSeen || reduce) return;
    pTimer = setTimeout(function () { setPV((pIdx + 1) % 4); pLoop(); }, 4600);
  }
  pvTabs.forEach(function (b, k) { b.addEventListener('click', function () { setPV(k, true); }); });
  var platCard = $('.b-plat');
  if (platCard) {
    new IntersectionObserver(function (es) { pSeen = es[0].isIntersecting; pLoop(); }, { threshold: .4 }).observe(platCard);
    var pview = $('#pview');
    if (pview && canHover && !reduce) {
      platCard.addEventListener('pointermove', function (e) {
        var r = pview.getBoundingClientRect(), x = (e.clientX - (r.left + r.width / 2)) / r.width, y = (e.clientY - (r.top + r.height / 2)) / r.height;
        pview.style.transform = 'perspective(800px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg)';
      }, { passive: true });
      platCard.addEventListener('pointerleave', function () { pview.style.transform = ''; });
    }
  }

  /* ---------- Refresh after language change and font load ---------- */
  window.addEventListener('we:lang', function () {
    splitStatement(); if (pipe) pipe.redraw(); drawArch();
    if (hasGsap) ScrollTrigger.refresh();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () {
    drawArch(); if (pipe) pipe.redraw(); if (hasGsap) ScrollTrigger.refresh();
  });
  window.addEventListener('load', function () { if (hasGsap) ScrollTrigger.refresh(); });
})();
