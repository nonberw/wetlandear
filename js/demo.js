/* Live preview of the ranger interface. Simulated events, clearly labelled as demo data. */
(function () {
  var feed = document.getElementById('feed');
  if (!feed) return;
  var empty = document.getElementById('feedEmpty');
  var toast = document.getElementById('toast');
  var toggle = document.getElementById('demoToggle');
  var section = document.getElementById('demo');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var EVENTS = [
    { kind: 'bird', key: 'ev_flamingo', st: 0, conf: 'high' },
    { kind: 'bird', key: 'ev_crane', st: 1, conf: 'medium' },
    { kind: 'bird', key: 'ev_lapwing', st: 0, conf: 'high' },
    { kind: 'threat', key: 'ev_gunshot', st: 2, conf: 'check' },
    { kind: 'threat', key: 'ev_engine', st: 2, conf: 'check' },
    { kind: 'bird', key: 'ev_flamingo', st: 1, conf: 'high' }
  ];
  var filter = 'all', paused = false, visible = false, timer = 0, lastIdx = -1, toastTimer = 0;

  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function clock(offsetMs) { var d = new Date(Date.now() - (offsetMs || 0)); return p2(d.getHours()) + ':' + p2(d.getMinutes()) + ':' + p2(d.getSeconds()); }
  function stName(i) { return WE.t('st_' + (i + 1)); }

  function paint(li) {
    var ev = EVENTS[+li.dataset.ev];
    li.querySelector('.ev-t').textContent = WE.t(ev.key);
    li.querySelector('.ev-s').textContent = stName(ev.st) + '  ' + li.dataset.time;
    li.querySelector('.ev-c').textContent = WE.t('c_' + ev.conf);
  }
  function ping(st, threat) {
    var pin = document.querySelector('.st[data-st="' + st + '"] .pin');
    if (!pin) return;
    var s = document.createElement('span');
    s.className = 'ping' + (threat ? ' threat' : '');
    pin.appendChild(s);
    setTimeout(function () { s.remove(); }, 1600);
  }
  function showToast(ev) {
    toast.textContent = WE.t('tg_sent') + ': ' + WE.t(ev.key) + ', ' + stName(ev.st);
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3600);
  }
  function syncEmpty() {
    var any = feed.querySelector(filter === 'all' ? 'li' : 'li[data-kind="' + filter + '"]');
    empty.hidden = !!any;
  }
  function add(idx, instant, ageMs) {
    var ev = EVENTS[idx];
    var li = document.createElement('li');
    li.dataset.ev = idx; li.dataset.kind = ev.kind; li.dataset.time = clock(ageMs || 0);
    li.innerHTML = '<span class="ev-k" aria-hidden="true"></span><div><div class="ev-t"></div><div class="ev-s"></div></div><span class="ev-c"></span>';
    paint(li);
    li.addEventListener('click', function () {
      feed.querySelectorAll('li.sel').forEach(function (x) { x.classList.remove('sel'); });
      li.classList.add('sel'); ping(ev.st, ev.kind === 'threat');
    });
    if (!instant && !reduce) {
      li.classList.add('new');
      feed.prepend(li);
      requestAnimationFrame(function () { requestAnimationFrame(function () { li.classList.remove('new'); }); });
    } else feed.prepend(li);
    while (feed.children.length > 7) {
      var old = feed.lastElementChild;
      if (reduce) old.remove(); else { old.classList.add('out'); setTimeout(function (o) { o.remove(); }.bind(null, old), 460); break; }
    }
    if (!instant) {
      ping(ev.st, ev.kind === 'threat');
      if (ev.kind === 'threat') showToast(ev);
    }
    syncEmpty();
  }
  function pick() {
    var pool = [];
    EVENTS.forEach(function (e, i) { if ((filter === 'all' || e.kind === filter) && i !== lastIdx) pool.push(i); });
    if (!pool.length) pool = [0];
    lastIdx = pool[Math.floor(Math.random() * pool.length)];
    return lastIdx;
  }
  function schedule(delay) {
    clearTimeout(timer);
    if (paused || !visible) return;
    timer = setTimeout(function () { add(pick()); schedule(); }, delay || (2200 + Math.random() * 2200));
  }

  add(2, true, 14000); add(1, true, 7000); add(0, true, 0);

  document.querySelectorAll('.chips button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.chips button').forEach(function (x) { x.classList.toggle('on', x === b); });
      filter = b.dataset.f; feed.dataset.f = filter; syncEmpty();
      if (empty.hidden === false) schedule(500);
    });
  });
  toggle.addEventListener('click', function () {
    paused = !paused;
    toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
    toggle.textContent = WE.t(paused ? 'demo_resume' : 'demo_pause');
    toggle.setAttribute('data-i18n', paused ? 'demo_resume' : 'demo_pause');
    schedule();
  });
  document.querySelectorAll('.st').forEach(function (b) {
    b.addEventListener('click', function () { ping(+b.dataset.st, +b.dataset.st === 2); });
  });
  new IntersectionObserver(function (es) { visible = es[0].isIntersecting; schedule(); }, { threshold: .25 }).observe(section);
  window.addEventListener('we:lang', function () { feed.querySelectorAll('li').forEach(paint); });
})();
