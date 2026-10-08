/* The signal path, drawn live: microphone -> on-device model -> LoRa -> gateway -> map.
   Driven either by scroll progress (desktop, pinned) or by a timer (phones, clicks). */
(function () {
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, u) { return a + (b - a) * u; }

  window.WEPipeline = function (canvas, t) {
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, dpr = 1, C = {}, fs = 14, raf = 0, visible = true;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var S = { stage: 0, local: 0, mode: 'time', t0: performance.now() };
    var auto = false, onStage = null;

    function colors() {
      var cs = getComputedStyle(document.documentElement);
      function g(n) { return cs.getPropertyValue(n).trim(); }
      C = { ink: g('--ink'), soft: g('--soft'), line: g('--line'), blue: g('--blue'), surface: g('--surface'), sky: g('--sky'), acc: g('--accent-text') };
    }
    function rr(x, y, ww, hh, r) {
      ctx.beginPath(); ctx.moveTo(x + r, y);
      ctx.arcTo(x + ww, y, x + ww, y + hh, r); ctx.arcTo(x + ww, y + hh, x, y + hh, r);
      ctx.arcTo(x, y + hh, x, y, r); ctx.arcTo(x, y, x + ww, y, r); ctx.closePath();
    }
    function txt(s, x, y, size, weight, color, align) {
      ctx.font = weight + ' ' + size + 'px Manrope, system-ui, sans-serif';
      ctx.fillStyle = color; ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(s, x, y);
    }
    function chipW(s, size) { ctx.font = '700 ' + size + 'px Manrope, system-ui, sans-serif'; return ctx.measureText(s).width + size * 1.6; }
    function chip(s, x, y, bg, fg, size) {
      var pw = chipW(s, size), ph = size * 2.1;
      rr(x, y - ph / 2, pw, ph, ph / 2); ctx.fillStyle = bg; ctx.fill();
      txt(s, x + size * .8, y + 1, size, '700', fg);
      return pw;
    }

    /* 0 Listen: a waveform with bird-call bursts travelling along it */
    function sListen(tt, l) {
      var pad = w * .08, cy = h * .5, amp = h * .2;
      txt(t('st_mic'), pad, h * .11, fs, '700', C.soft);
      ctx.globalAlpha = ease(clamp(l * 4, 0, 1)) * .9 + .1;
      ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      for (var x = pad; x <= w - pad; x += 3) {
        var u = (x - pad) / (w - pad * 2);
        var env = Math.pow(Math.max(0, Math.sin(u * 9 - tt * 3)), 2) * .8 + .1;
        var y = cy + Math.sin(u * 70 + tt * 8) * amp * env * (.6 + .4 * Math.sin(u * 23 - tt * 5));
        if (x === pad) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    /* 1 Understand: a spectrogram patch, a scanner, and the species label */
    function sUnderstand(tt, l) {
      var pad = w * .08, bx = pad, by = h * .22, bw = w - pad * 2, bh = h * .5;
      var cols = Math.round(bw / 9), rows = Math.round(bh / 9), cw = bw / cols, ch = bh / rows;
      txt('ESP32-S3', pad, h * .11, fs, '700', C.soft);
      ctx.fillStyle = C.blue;
      for (var c = 0; c < cols; c++) {
        for (var r = 0; r < rows; r++) {
          var u = c / cols, v = 1 - r / rows, a = 0;
          for (var k = 0; k < 3; k++) {
            var cu = u - (.12 + .3 * k) - .02 * Math.sin(tt * .7 + k);
            if (cu < 0 || cu > .22) continue;
            var env = Math.sin(cu / .22 * Math.PI), fc = .3 + .12 * k + (cu / .22) * (.22 - .08 * k);
            var d = (v - fc) / .05; a = Math.max(a, env * Math.exp(-d * d));
            if (2 * fc < 1) { var d2 = (v - 2 * fc) / .07; a = Math.max(a, env * .5 * Math.exp(-d2 * d2)); }
          }
          var n = (Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1; a += Math.abs(n) * .05;
          ctx.globalAlpha = clamp(a, .05, 1) * .95;
          ctx.fillRect(bx + c * cw + 1, by + r * ch + 1, cw - 2, ch - 2);
        }
      }
      ctx.globalAlpha = 1;
      var sw = bw * .28, sx = bx + ease(clamp(l / .8, 0, 1)) * (bw - sw);
      ctx.fillStyle = C.blue; ctx.globalAlpha = .1; rr(sx, by - 6, sw, bh + 12, 12); ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2; rr(sx, by - 6, sw, bh + 12, 12); ctx.stroke();
      if (l > .5) {
        var label = t('st_species') + '  ' + t('st_conf');
        var cwid = chipW(label, fs), cx = clamp(sx, pad, w - pad - cwid);
        ctx.globalAlpha = ease(clamp((l - .5) / .25, 0, 1));
        chip(label, cx, by + bh + h * .1, C.blue, '#fff', fs);
        ctx.globalAlpha = 1;
      }
    }

    /* 2 Send: only a tiny packet travels. The audio stays on the station */
    function sSend(tt, l) {
      var pad = w * .09, y = h * .46, x1 = pad + w * .2, x2 = w - pad;
      ctx.fillStyle = C.soft; ctx.globalAlpha = .55;
      for (var i = 0; i < 9; i++) {
        var bh = h * (.06 + .09 * Math.abs(Math.sin(tt * 3 + i * 1.7)));
        rr(pad + i * 11, y - bh / 2, 6, bh, 3); ctx.fill();
      }
      ctx.globalAlpha = 1;
      txt(t('st_audio'), pad, y + h * .17, fs, '600', C.soft);
      ctx.setLineDash([6, 9]); ctx.strokeStyle = C.soft; ctx.globalAlpha = .5; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      txt('LoRa', (x1 + x2) / 2, y - h * .14, fs, '700', C.acc, 'center');
      txt(t('st_noaudio'), (x1 + x2) / 2, y + h * .14, fs * .95, '600', C.soft, 'center');
      var label = t('st_link'), pw = chipW(label, fs), u = ease(l);
      chip(label, lerp(x1 + 8, x2 - pw, u), y, C.blue, '#fff', fs);
    }

    /* 3 Collect: packets land in the gateway's local database */
    function sCollect(tt, l) {
      var pad = w * .08, gx = w * .5, gy = h * .2, gw = w * .42, gh = h * .6;
      txt(t('st_gateway'), gx, gy - fs * 1.1, fs, '700', C.soft);
      rr(gx, gy, gw, gh, 16); ctx.fillStyle = C.sky; ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
      txt(t('st_db'), gx + 18, gy + 24, fs * .92, '600', C.soft);
      var rows = [[t('st_species'), '05:42'], [t('ev_crane'), '06:10'], [t('ev_lapwing'), '06:31']];
      for (var i = 0; i < 3; i++) {
        var p = clamp((l - i * .22) / .22, 0, 1), ry = gy + gh * (.34 + i * .22);
        if (p > 0 && p < 1) chip('+', lerp(pad, gx - 10, ease(p)), ry, C.blue, '#fff', fs * .9);
        if (p >= 1) {
          ctx.globalAlpha = ease(clamp((l - i * .22 - .22) / .12, 0, 1));
          rr(gx + 14, ry - fs * 1.3, gw - 28, fs * 2.6, 12); ctx.fillStyle = C.surface; ctx.fill();
          txt(rows[i][0], gx + 28, ry, fs, '700', C.ink);
          txt(rows[i][1], gx + gw - 28, ry, fs * .92, '500', C.soft, 'right');
          ctx.globalAlpha = 1;
        }
      }
    }

    /* 4 Show: stations on a map, a Telegram alert slides in */
    function sShow(tt, l) {
      var pad = w * .07, mx = pad, my = h * .16, mw = w - pad * 2, mh = h * .62;
      txt(t('st_map'), pad, h * .09, fs, '700', C.soft);
      rr(mx, my, mw, mh, 16); ctx.fillStyle = C.sky; ctx.fill();
      ctx.fillStyle = C.blue; ctx.globalAlpha = .16;
      [[.06, .14, .44, .44], [.58, .5, .34, .34], [.62, .1, .22, .22]].forEach(function (e) {
        ctx.beginPath(); ctx.ellipse(mx + mw * (e[0] + e[2] / 2), my + mh * (e[1] + e[3] / 2), mw * e[2] / 2, mh * e[3] / 2, 0, 0, 6.2832); ctx.fill();
      });
      ctx.globalAlpha = 1;
      var pts = [[.3, .42, 0], [.72, .64, 0], [.44, .76, 1]];
      pts.forEach(function (p, i) {
        var x = mx + mw * p[0], y = my + mh * p[1], col = p[2] ? '#FF6B3D' : C.blue;
        var ph = ((tt * .7 + i * .33) % 1);
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.globalAlpha = (1 - ph) * .6;
        ctx.beginPath(); ctx.arc(x, y, 8 + ph * 26, 0, 6.2832); ctx.stroke(); ctx.globalAlpha = 1;
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.2832); ctx.fill();
      });
      var a = ease(clamp((l - .3) / .3, 0, 1));
      if (a > 0) {
        var msg = t('ev_gunshot'), bwid = Math.max(chipW(msg, fs), chipW('Telegram', fs * .85)) + 24, bh = fs * 4.2;
        var bx = mx + mw - bwid - 16, by = my + mh - bh - 16 + (1 - a) * 18;
        ctx.globalAlpha = a;
        rr(bx, by, bwid, bh, 14); ctx.fillStyle = C.surface; ctx.fill(); ctx.strokeStyle = '#FF6B3D'; ctx.lineWidth = 2; ctx.stroke();
        txt(t('st_tg'), bx + 16, by + bh * .32, fs * .85, '700', C.soft);
        txt(msg, bx + 16, by + bh * .68, fs, '800', C.ink);
        ctx.globalAlpha = 1;
      }
    }

    function draw(now) {
      if (!w) return;
      var tt = now / 1000;
      ctx.clearRect(0, 0, w, h);
      var l = S.local;
      if (S.stage === 0) sListen(tt, l);
      else if (S.stage === 1) sUnderstand(tt, l);
      else if (S.stage === 2) sSend(tt, l);
      else if (S.stage === 3) sCollect(tt, l);
      else sShow(tt, l);
    }
    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      if (S.mode === 'time') {
        var el = now - S.t0;
        S.local = clamp(el / 3000, 0, 1);
        if (auto && el > 3900) { S.stage = (S.stage + 1) % 5; S.t0 = now; if (onStage) onStage(S.stage); }
      }
      draw(now);
    }
    function resize() {
      var r = canvas.getBoundingClientRect();
      if (!r.width) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height; fs = clamp(w / 34, 12, 17);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    }

    colors();
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(canvas);
    matchMedia('(prefers-color-scheme: dark)').addEventListener && matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { colors(); draw(performance.now()); });
    resize();
    if (!reduce) raf = requestAnimationFrame(tick);

    return {
      /* scroll mode: p from 0 to 1 over the whole pinned section */
      setProgress: function (p) {
        S.mode = 'scroll';
        var raw = clamp(p, 0, 1) * 5;
        S.stage = Math.min(4, Math.floor(raw));
        S.local = clamp(raw - S.stage, 0, 1);
        if (reduce) draw(performance.now());
      },
      /* time mode: show a stage and let it play out; optionally move on by itself */
      play: function (stage, autoAdvance, cb) {
        S.mode = 'time'; S.stage = stage; S.t0 = performance.now(); auto = !!autoAdvance; onStage = cb || null;
        if (reduce) { S.local = .85; draw(performance.now()); }
      },
      stopAuto: function () { auto = false; },
      redraw: function () { colors(); draw(performance.now()); }
    };
  };
})();
