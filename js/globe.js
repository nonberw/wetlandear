/* A dotted Earth that spins in, settles on Kazakhstan and sends events to Astana.
   Land is approximated from coarse outlines (no map files needed). Three.js is a local copy. */
(function () {
  var LAND = [
    [[-168,66],[-156,71],[-125,70],[-95,72],[-80,73],[-62,60],[-55,52],[-67,45],[-76,38],[-81,31],[-80,25],[-83,29],[-90,30],[-97,26],[-97,20],[-91,18],[-87,21],[-84,15],[-78,9],[-80,7],[-86,11],[-92,15],[-105,20],[-110,24],[-113,31],[-117,32],[-124,40],[-125,48],[-135,58],[-150,60],[-165,55],[-160,59]],
    [[-80,9],[-72,12],[-62,10],[-50,0],[-35,-6],[-39,-15],[-48,-26],[-58,-35],[-65,-42],[-68,-52],[-74,-50],[-73,-38],[-71,-20],[-76,-14],[-81,-5],[-80,0],[-77,8]],
    [[-55,60],[-45,60],[-20,70],[-20,82],[-60,82],[-72,76]],
    [[-17,21],[-10,30],[-6,36],[10,37],[20,32],[32,31],[35,25],[43,12],[51,11],[40,-5],[40,-15],[35,-24],[27,-34],[18,-34],[12,-18],[9,-1],[9,5],[-8,4],[-17,14]],
    [[-10,36],[-9,43],[-2,43],[-4,48],[2,51],[8,54],[10,57],[6,62],[14,68],[28,71],[40,67],[60,69],[70,73],[90,76],[110,77],[130,72],[150,71],[170,70],[180,66],[165,60],[155,52],[142,46],[135,43],[129,35],[125,40],[121,39],[122,30],[117,23],[108,21],[106,12],[100,13],[100,5],[104,1],[98,8],[97,17],[92,22],[88,22],[80,15],[77,8],[73,17],[68,23],[62,25],[57,26],[56,27],[49,30],[48,29],[51,25],[56,25],[59,22],[52,16],[44,12],[39,21],[35,29],[34,32],[36,36],[30,36],[27,37],[26,40],[23,40],[21,38],[19,42],[13,45],[16,41],[12,38],[8,44],[3,43],[-1,37]],
    [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-26],[150,-37],[141,-38],[135,-34],[129,-32],[115,-34]],
    [[-5,50],[1,51],[-2,57],[-5,58],[-6,54]],
    [[130,31],[141,36],[142,45],[140,40]],
    [[95,5],[106,-6],[119,-9],[110,-8],[100,-2]]
  ];
  var ASTANA = [51.17, 71.43], KORG = [50.6, 69.0];
  var NEXT = [[51.5, 64.2], [42.3, 70.5], [44.1, 78.5], [48.8, 85.8]];

  function inside(lon, lat, poly) {
    var c = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  function isLand(lon, lat) { for (var k = 0; k < LAND.length; k++) if (inside(lon, lat, LAND[k])) return true; return false; }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, u) { return a + (b - a) * u; }

  window.WEGlobe = function (canvas, labels) {
    if (!window.THREE) return null;
    var T = THREE, renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(30, 1, .1, 60);
    var group = new T.Group(); scene.add(group);

    function ll(lat, lon, r) {
      var a = lat * Math.PI / 180, b = lon * Math.PI / 180;
      return new T.Vector3(r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b));
    }

    /* ball with soft light, plus a thin blue atmosphere */
    group.add(new T.Mesh(new T.SphereGeometry(.995, 64, 48), new T.ShaderMaterial({
      vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vN; void main(){ float d = dot(vN, normalize(vec3(-0.5,0.6,0.7))) * 0.5 + 0.5; gl_FragColor = vec4(mix(vec3(0.78,0.86,1.0), vec3(0.98,0.99,1.0), d), 1.0); }'
    })));
    scene.add(new T.Mesh(new T.SphereGeometry(1.14, 48, 32), new T.ShaderMaterial({
      side: T.BackSide, transparent: true, depthWrite: false,
      vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vN; void main(){ float d = dot(vN, vec3(0.0,0.0,1.0)); float t = clamp(-d / 0.5, 0.0, 1.0); gl_FragColor = vec4(0.12, 0.36, 1.0, pow(t, 2.2) * 0.32); }'
    })));

    /* dots: land is strong blue, ocean is a faint grid of specks */
    var N = 15000, land = [], sea = [], gold = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < N; i++) {
      var y = 1 - (i + .5) / N * 2, rr = Math.sqrt(1 - y * y), ph = i * gold;
      var x = Math.cos(ph) * rr, z = Math.sin(ph) * rr;
      var lat = Math.asin(y) * 180 / Math.PI, lon = Math.atan2(x, z) * 180 / Math.PI;
      if (isLand(lon, lat)) land.push(x * 1.004, y * 1.004, z * 1.004);
      else if (i % 3 === 0) sea.push(x * 1.002, y * 1.002, z * 1.002);
    }
    function pts(arr, size, color, op) {
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(arr, 3));
      var p = new T.Points(g, new T.PointsMaterial({ color: color, size: size, sizeAttenuation: true, transparent: true, opacity: op, depthWrite: false }));
      group.add(p); return p;
    }
    pts(sea, .011, 0xA9BFEA, .75);
    pts(land, .024, 0x1F5BFF, 1);

    /* graticule */
    var lm = new T.LineBasicMaterial({ color: 0xB9CBF0, transparent: true, opacity: .55 });
    for (var la = -60; la <= 60; la += 30) {
      var a = []; for (var lo = 0; lo <= 360; lo += 6) { var v = ll(la, lo, 1.001); a.push(v.x, v.y, v.z); }
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(a, 3)); group.add(new T.Line(g, lm));
    }
    for (var lo2 = 0; lo2 < 360; lo2 += 30) {
      var b = []; for (var la2 = -90; la2 <= 90; la2 += 6) { var w = ll(la2, lo2, 1.001); b.push(w.x, w.y, w.z); }
      var g2 = new T.BufferGeometry(); g2.setAttribute('position', new T.Float32BufferAttribute(b, 3)); group.add(new T.Line(g2, lm));
    }

    /* markers with a pulsing ring */
    var markers = [];
    function marker(pos, color, size, ringColor) {
      var p = ll(pos[0], pos[1], 1.012);
      var m = new T.Mesh(new T.SphereGeometry(size, 20, 14), new T.MeshBasicMaterial({ color: color }));
      m.position.copy(p); group.add(m);
      var ring = new T.Mesh(new T.RingGeometry(size * 1.4, size * 1.9, 40), new T.MeshBasicMaterial({ color: ringColor, transparent: true, opacity: .6, side: T.DoubleSide, depthWrite: false }));
      ring.position.copy(p); ring.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), p.clone().normalize()); group.add(ring);
      var o = { mesh: m, ring: ring, size: size, pos: p }; markers.push(o); return o;
    }
    var mAst = marker(ASTANA, 0x0A1A3A, .03, 0x1F5BFF);
    var mKor = marker(KORG, 0x1F5BFF, .02, 0x1F5BFF);
    var mNext = NEXT.map(function (n) { var o = marker(n, 0x7FA4FF, .017, 0x7FA4FF); o.mesh.material.transparent = true; o.mesh.material.opacity = 0; o.ring.material.opacity = 0; return o; });

    /* arcs with a travelling packet */
    var arcs = [];
    function arc(from, to, lift, color) {
      var a = ll(from[0], from[1], 1).normalize(), b = ll(to[0], to[1], 1).normalize(), om = a.angleTo(b), n = 60, pts3 = [], arr = [];
      for (var k = 0; k <= n; k++) {
        var t = k / n, s = Math.sin(om);
        var p = a.clone().multiplyScalar(Math.sin((1 - t) * om) / s).add(b.clone().multiplyScalar(Math.sin(t * om) / s)).normalize().multiplyScalar(1.01 + lift * Math.sin(Math.PI * t));
        pts3.push(p); arr.push(p.x, p.y, p.z);
      }
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(arr, 3));
      var line = new T.Line(g, new T.LineBasicMaterial({ color: color, transparent: true, opacity: .85 })); group.add(line);
      var dot = new T.Mesh(new T.SphereGeometry(.012, 12, 10), new T.MeshBasicMaterial({ color: 0x1F5BFF })); group.add(dot);
      var o = { line: line, dot: dot, pts: pts3, n: n, off: Math.random() }; arcs.push(o); return o;
    }
    arc(KORG, ASTANA, .035, 0x1F5BFF);
    var arcNext = NEXT.map(function (n) { return arc(n, ASTANA, .12, 0x7FA4FF); });

    /* state */
    var S = { p: 0, visible: true, auto: false, t0: performance.now() };
    var aspect = 1, W = 1, H = 1;
    function resize() {
      var r = canvas.getBoundingClientRect(); if (!r.width) return;
      W = r.width; H = r.height; renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
    }
    function project(v, el, alpha) {
      var p = v.clone().applyMatrix4(group.matrixWorld);
      var facing = p.clone().normalize().dot(new T.Vector3(0, 0, 1)) > .22;
      var s = p.clone().project(camera);
      el.style.transform = 'translate(' + ((s.x * .5 + .5) * W).toFixed(1) + 'px,' + ((-s.y * .5 + .5) * H).toFixed(1) + 'px)';
      el.style.opacity = facing ? alpha.toFixed(2) : '0';
    }
    function frame(now) {
      requestAnimationFrame(frame);
      if (!S.visible) return;
      var t = now / 1000;
      var p = S.auto ? clamp((now - S.t0) / 6500, 0, 1) : S.p;
      var e = ease(clamp(p / .6, 0, 1));
      var rotYT = -ASTANA[1] * Math.PI / 180, rotXT = .82;
      group.rotation.set(lerp(.3, rotXT, e), rotYT - (1 - e) * Math.PI * 2.6 + (p >= 1 || reduce ? Math.sin(t * .4) * .03 : 0), 0);
      camera.position.z = lerp(7.6, 4.05, e);
      group.updateMatrixWorld(true);
      var arcP = clamp((p - .6) / .22, 0, 1), nextP = clamp((p - .7) / .2, 0, 1), lab = clamp((p - .55) / .18, 0, 1);
      markers.forEach(function (m) { var ph = (t * .8 + m.pos.x * 3) % 1; m.ring.scale.setScalar(1 + ph * 1.6); if (!m.ring.userData.fixed) m.ring.material.opacity = (1 - ph) * .6 * (mNext.indexOf(m) >= 0 ? nextP : 1); });
      mNext.forEach(function (m) { m.mesh.material.opacity = nextP; });
      arcs.forEach(function (a, i) {
        var isNext = i > 0, k = isNext ? nextP : arcP;
        a.line.geometry.setDrawRange(0, Math.floor((a.n + 1) * k));
        a.line.visible = k > 0.01;
        var u = ((t * .32 + a.off) % 1), idx = Math.min(a.n, Math.floor(u * a.n));
        a.dot.visible = k > .99; a.dot.position.copy(a.pts[idx]);
      });
      project(mAst.pos, labels.astana, lab); project(mKor.pos, labels.korg, lab);
      renderer.render(scene, camera);
    }
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(function (es) { S.visible = es[0].isIntersecting; if (S.visible && S.auto) S.t0 = performance.now(); }, { threshold: 0 }).observe(canvas);
    resize(); requestAnimationFrame(frame);
    return {
      setProgress: function (p) { S.auto = false; S.p = p; },
      autoplay: function () { S.auto = true; S.t0 = performance.now(); },
      still: function () { S.auto = false; S.p = 1; }
    };
  };
})();
