/* Synthetic bird-call spectrogram that scrolls like a real recording.
   Decorative and explanatory: it is what the station "sees". Pointer movement adds calls (feedback). */
(function () {
  var PAL = {
    light: [[0, 214, 228, 255], [.3, 150, 185, 255], [.6, 70, 120, 255], [.85, 31, 91, 255], [1, 10, 26, 58]],
    dark: [[0, 38, 66, 140], [.3, 70, 110, 215], [.6, 120, 165, 255], [.85, 200, 222, 255], [1, 255, 255, 255]]
  };
  function palette(S) {
    var P = [];
    for (var i = 0; i < 256; i++) {
      var t = i / 255, k = 1;
      while (k < S.length - 1 && t > S[k][0]) k++;
      var a = S[k - 1], b = S[k], u = (t - a[0]) / (b[0] - a[0]);
      P.push([a[1] + (b[1] - a[1]) * u | 0, a[2] + (b[2] - a[2]) * u | 0, a[3] + (b[3] - a[3]) * u | 0]);
    }
    return P;
  }

  window.WESpectrogram = function (canvas, opts) {
    opts = opts || {};
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dm = matchMedia('(prefers-color-scheme: dark)');
    var g = canvas.getContext('2d');
    var SP = opts.speed || 60, SCALE = opts.scale || 2;
    var W = 0, H = 0, P, ev = [], nx = -16, T = 0, im, last = 0, acc = 0, raf = 0, visible = true, ready = false;
    var R = Math.random;

    function spawn(t) {
      /* a call is a short phrase of whistles: each one sweeps up or down along an arch */
      var n = 2 + (R() * 4 | 0), f0 = .16 + R() * .5, f1 = f0 + (R() - .45) * .34, d = .22 + R() * .4,
        gp = d + .05 + R() * .12, amp = .6 + R() * .4, w = .014 + R() * .012, h = R() * .55, c = (R() - .5) * .22;
      for (var i = 0; i < n; i++) ev.push({ t: t + i * gp, d: d, a: f0, b: f1, c: c, w: w, m: amp * (.8 + .2 * Math.sin(i * 1.3)), h: h });
    }
    function step(t) {
      while (t + .6 >= nx) { spawn(nx); nx += .35 + R() * 1.3; }
      for (var i = ev.length - 1; i >= 0; i--) if (t > ev[i].t + ev[i].d + .2) ev.splice(i, 1);
    }
    function col(t) {
      var d = im.data;
      for (var y = 0; y < H; y++) {
        var f = 1 - y / H;
        var v = .03 * R() + .08 * Math.exp(-Math.pow((f - .05) / .05, 2)) + .04 * Math.exp(-Math.pow((f - .3) / .2, 2)) * (.6 + .4 * Math.sin(t * .9));
        for (var j = 0; j < ev.length; j++) {
          var e = ev[j], p = (t - e.t) / e.d;
          if (p < 0 || p > 1) continue;
          var en = Math.pow(Math.sin(Math.PI * p), .7), fe = e.a + (e.b - e.a) * p + (e.c || 0) * Math.sin(Math.PI * p), q = (f - fe) / e.w;
          v += e.m * en * Math.exp(-q * q);
          if (2 * fe < 1) { var q2 = (f - 2 * fe) / (e.w * 1.6); v += e.m * e.h * en * Math.exp(-q2 * q2); }
        }
        if (v > 1) v = 1;
        var cc = P[v * 255 | 0], o = y * 4;
        d[o] = cc[0]; d[o + 1] = cc[1]; d[o + 2] = cc[2]; d[o + 3] = Math.min(255, v * 520) | 0;
      }
    }
    function setup() {
      var r = canvas.getBoundingClientRect();
      if (r.width < 20 || r.height < 20) return;
      W = Math.max(240, Math.min(960, Math.round(r.width / SCALE)));
      H = Math.max(60, Math.round(r.height / SCALE));
      canvas.width = W; canvas.height = H;
      P = palette(PAL.light); /* the site is white and blue only */
      ev = []; nx = -16; im = g.createImageData(1, H);
      var T0 = -W / SP;
      for (var x = 0; x < W; x++) { var tt = T0 + x / SP; step(tt); col(tt); g.putImageData(im, x, 0); }
      T = 0; last = performance.now(); acc = 0; ready = true;
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!ready || !visible) { last = now; return; }
      var dt = Math.min(.1, (now - last) / 1000); last = now;
      acc += dt * SP;
      var n = acc | 0;
      if (n > 0) {
        acc -= n; if (n > W) n = W;
        g.globalCompositeOperation = 'copy'; g.drawImage(canvas, -n, 0); g.globalCompositeOperation = 'source-over';
        for (var i = 0; i < n; i++) { T += 1 / SP; step(T); col(T); g.putImageData(im, W - n + i, 0); }
      }
    }
    function burst(yNorm) {
      if (!ready || reduce) return;
      var f0 = Math.max(.08, Math.min(.92, 1 - yNorm));
      var t0 = T + .05;
      for (var i = 0; i < 2; i++) ev.push({ t: t0 + i * .26, d: .22, a: f0, b: f0 + (R() - .5) * .16, c: (R() - .5) * .1, w: .016, m: 1, h: .5 });
    }

    new ResizeObserver(function () { setup(); }).observe(canvas);
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(canvas);
    dm.addEventListener && dm.addEventListener('change', function () { setup(); });
    setup();
    if (!reduce) raf = requestAnimationFrame(frame);

    if (opts.hero && !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var lastBurst = 0;
      opts.hero.addEventListener('pointermove', function (e) {
        var now = performance.now();
        if (now - lastBurst < 110) return;
        var r = canvas.getBoundingClientRect();
        if (e.clientY < r.top || e.clientY > r.bottom) return;
        lastBurst = now;
        burst((e.clientY - r.top) / r.height);
      }, { passive: true });
    }
    return { burst: burst };
  };
})();
