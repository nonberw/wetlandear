/* WetlandEar: the nature layer, behaviour. Birds that fly across the sky, a V of cranes, reeds that move a little with the pointer and the scroll,
   translated alt texts. Decorative only. Does nothing that needs the network. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var small = innerWidth < 760;
  var TPL = '<span class="bob"><svg viewBox="0 0 60 30" aria-hidden="true" focusable="false">' +
    '<g class="wl"><path d="M30 15C26 8 16 4 3 8c10 1 18 5 27 9z"/></g><g class="wr"><path d="M30 15c4-7 14-11 27-7-10 1-18 5-27 9z"/></g>' +
    '<ellipse cx="30" cy="16" rx="3.3" ry="2.1"/><path d="M33 15.2l5.2-1.3-4.6 2.5z"/></svg></span>';
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function between(a, b) { return a + (b - a) * rnd(); }

  function bird(o) {
    var b = document.createElement('div');
    b.className = 'bird' + (o.back ? ' back' : '');
    b.style.cssText = '--s:' + o.size.toFixed(0) + 'px;--o:' + o.op.toFixed(2) + ';--y:' + o.y.toFixed(1) + '%;--x:' + o.x.toFixed(0) + '%;--dur:' + o.dur.toFixed(0) + 's;--del:' + o.del.toFixed(1) + 's;--dy:' + o.dy.toFixed(0) + 'px;--fp:' + o.fp.toFixed(2) + 's;--fd:' + o.fd.toFixed(2) + 's';
    b.innerHTML = TPL; return b;
  }

  /* n single birds in the band (y from lo to hi percent), far ones small, pale and slow */
  function singles(host, n, lo, hi) {
    for (var i = 0; i < n; i++) {
      var depth = rnd(); // 0 far, 1 near
      host.appendChild(bird({ size: 18 + depth * 34, op: .45 + depth * .45, y: between(lo, hi), x: between(8, 90), dur: 110 - depth * 60, del: -between(0, 100), dy: between(-70, 30), fp: .5 + (1 - depth) * .35 + rnd() * .1, fd: -rnd() * 2, back: rnd() < .2 }));
    }
  }
  /* a V of cranes: the leader in front, the others behind on both sides */
  function vee(host, n, y, size, dur, del) {
    var g = document.createElement('div'); g.className = 'vee'; g.style.cssText = '--y:' + y + '%;--x:34%;--dur:' + dur + 's;--del:' + del + 's;--dy:-40px';
    for (var i = 0; i < n; i++) {
      var side = i === 0 ? 0 : (i % 2 ? -1 : 1), rank = Math.ceil(i / 2);
      var b = bird({ size: size, op: .78, y: 0, x: 0, dur: 0, del: 0, dy: 0, fp: .72 + rnd() * .12, fd: -rnd() * 1.2 });
      b.style.setProperty('--vx', (-side * rank * size * .95).toFixed(0) + 'px'); b.style.setProperty('--vy', (rank * size * .55).toFixed(0) + 'px'); g.appendChild(b);
    }
    host.appendChild(g);
  }

  var hero = document.getElementById('flock');
  if (hero) {
    singles(hero, small ? 5 : 9, 8, 46);
    vee(hero, small ? 5 : 7, 16, small ? 30 : 46, 96, -30);
  }
  [].forEach.call(document.querySelectorAll('.flock[data-birds]'), function (h) {
    var band = (h.getAttribute('data-band') || '4,36').split(',');
    singles(h, small ? Math.ceil(+h.getAttribute('data-birds') / 2) : +h.getAttribute('data-birds'), +band[0], +band[1]);
  });

  /* reeds: a little parallax with the pointer and with the scroll (transform only, set on the layers themselves) */
  var layers = [].slice.call(document.querySelectorAll('.reeds[data-depth]'));
  var sun = document.querySelector('.sun');
  var tx = 0, px = 0, sy = 0, queued = false;
  function paint() {
    queued = false; px += (tx - px) * .09;
    for (var i = 0; i < layers.length; i++) {
      var d = +layers[i].getAttribute('data-depth');
      layers[i].style.transform = 'translate3d(' + (px * d * -20).toFixed(1) + 'px,' + (sy * d * .09).toFixed(1) + 'px,0)';
    }
    if (sun && !reduce) sun.style.translate = '0 ' + (sy * .16).toFixed(1) + 'px';
    if (Math.abs(tx - px) > .003) ask();
  }
  function ask() { if (!queued) { queued = true; requestAnimationFrame(paint); } }
  if (layers.length && !reduce) {
    if (fine) window.addEventListener('pointermove', function (e) { tx = (e.clientX / innerWidth - .5) * 2; ask(); }, { passive: true });
    window.addEventListener('scroll', function () { sy = Math.min(scrollY, innerHeight * 1.2); ask(); }, { passive: true });
  }

  /* alt texts follow the language (the dictionary of i18n.js fills only text) */
  var ALT = {
    en: { alt_pelican: 'A Dalmatian pelican standing on ice, its curly head feathers and orange bill in profile', alt_flamingos: 'A flock of pink flamingos standing in the shallow water of a steppe lake', alt_cranes: 'Demoiselle cranes feeding on the steppe of the Taukum desert', alt_dawn: 'A flamingo in silhouette and its reflection under a low orange sun over Korgalzhyn lake' },
    ru: { alt_pelican: 'Кудрявый пеликан на льду, в профиль видны кудрявые перья на голове и оранжевый клюв', alt_flamingos: 'Стая розовых фламинго на мелководье степного озера', alt_cranes: 'Журавли-красавки кормятся в степи в песках Таукум', alt_dawn: 'Силуэт фламинго и его отражение под низким оранжевым солнцем над озером Коргалжын' },
    kk: { alt_pelican: 'Мұзда тұрған бұйра бірқазан, жартылай бұрылған басындағы бұйра қауырсындары мен қызғылт сары тұмсығы көрінеді', alt_flamingos: 'Дала көлінің таяз суында тұрған қызғылт фламинго үйірі', alt_cranes: 'Тауқұм құмындағы далада жем жеп жүрген сұлу тырналар', alt_dawn: 'Қорғалжың көлінің үстіндегі аласа қызғылт сары күн астындағы фламингоның силуэті мен оның көлеңкесі' }
  };
  function alts() {
    var l = document.documentElement.lang; l = ALT[l] ? l : 'en';
    [].forEach.call(document.querySelectorAll('[data-alt]'), function (el) { el.setAttribute('alt', ALT[l][el.getAttribute('data-alt')] || ''); });
  }
  alts(); window.addEventListener('we:lang', alts); document.addEventListener('DOMContentLoaded', alts);

  /* the join card reveals like the other blocks */
  var jc = document.querySelector('.join-card');
  if (jc && 'IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { jc.classList.add('in'); io.disconnect(); } }); }, { threshold: .25 }); io.observe(jc); } else if (jc) jc.classList.add('in');
})();
