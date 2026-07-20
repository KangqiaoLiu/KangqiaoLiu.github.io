(function () {
  "use strict";

  var body = document.body;
  if (!body.classList.contains("is-research")) return;

  var archive = document.querySelector(".archive");
  if (!archive) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isZh = body.classList.contains("is-zh");
  var canvas = document.createElement("canvas");
  var indicator = document.createElement("div");
  var context = canvas.getContext("2d");
  if (!context) return;

  canvas.className = "research-field";
  canvas.setAttribute("aria-hidden", "true");
  indicator.className = "research-field__indicator";
  indicator.setAttribute("aria-hidden", "true");
  indicator.innerHTML = '<span class="research-field__pulse"></span><span class="research-field__label"></span>';
  body.insertBefore(canvas, body.firstChild);
  body.appendChild(indicator);

  var labels = isZh
    ? {
        thermo: "随机跃迁网络",
        learning: "学习动力学噪声流",
        quantum: "量子相干连线",
        gravity: "弯曲轨道与混沌"
      }
    : {
        thermo: "stochastic transition network",
        learning: "learning-dynamics noise flow",
        quantum: "quantum coherence links",
        gravity: "curved orbits and chaos"
      };

  var width = 0;
  var height = 0;
  var ratio = 1;
  var frame = null;
  var scrollFrame = null;
  var fromMode = "thermo";
  var toMode = "thermo";
  var transitionStart = 0;
  var transitionDuration = 900;
  var activeMarker = null;
  var markers = [];

  function color(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function seeded(index, salt) {
    var value = Math.sin(index * 91.731 + salt * 17.117) * 43758.5453;
    return value - Math.floor(value);
  }

  var networkNodes = Array.from({ length: 22 }, function (_, index) {
    return {
      x: 0.06 + seeded(index, 1) * 0.88,
      y: 0.08 + seeded(index, 2) * 0.84,
      phase: seeded(index, 3) * Math.PI * 2,
      size: 1.4 + seeded(index, 4) * 2.1
    };
  });

  var streamSeeds = Array.from({ length: 12 }, function (_, index) {
    return {
      y: (index + 0.7) / 13,
      phase: seeded(index, 8) * Math.PI * 2,
      bend: 0.7 + seeded(index, 9) * 1.4,
      speed: 0.55 + seeded(index, 10) * 0.7
    };
  });

  var quantumNodes = Array.from({ length: 12 }, function (_, index) {
    var ring = index < 6 ? 0.24 : 0.39;
    var local = index % 6;
    return {
      angle: (local / 6) * Math.PI * 2 + (index < 6 ? 0 : Math.PI / 6),
      ring: ring,
      phase: seeded(index, 12) * Math.PI * 2
    };
  });

  var orbits = Array.from({ length: 7 }, function (_, index) {
    return {
      radius: 0.09 + index * 0.045,
      eccentricity: 0.48 + seeded(index, 15) * 0.28,
      tilt: -0.65 + index * 0.19,
      speed: 0.13 + index * 0.025,
      phase: seeded(index, 16) * Math.PI * 2
    };
  });

  function resize() {
    width = Math.max(1, window.innerWidth);
    height = Math.max(1, window.innerHeight);
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (reduceMotion) draw(performance.now());
  }

  function arrow(x1, y1, x2, y2, alpha, accent) {
    var angle = Math.atan2(y2 - y1, x2 - x1);
    var px = x1 + (x2 - x1) * 0.66;
    var py = y1 + (y2 - y1) * 0.66;
    context.beginPath();
    context.moveTo(px, py);
    context.lineTo(px - Math.cos(angle - 0.55) * 5, py - Math.sin(angle - 0.55) * 5);
    context.moveTo(px, py);
    context.lineTo(px - Math.cos(angle + 0.55) * 5, py - Math.sin(angle + 0.55) * 5);
    context.strokeStyle = accent;
    context.globalAlpha = alpha;
    context.lineWidth = 0.75;
    context.stroke();
  }

  function drawThermo(time, alpha) {
    var accent = color("--ai-accent", "#3157d5");
    var accentTwo = color("--ai-accent-2", "#7257d8");
    var scale = Math.min(width, height);

    for (var i = 0; i < networkNodes.length; i += 1) {
      for (var j = i + 1; j < networkNodes.length; j += 1) {
        var a = networkNodes[i];
        var b = networkNodes[j];
        var dx = (a.x - b.x) * width;
        var dy = (a.y - b.y) * height;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > scale * 0.24 || (i + j) % 3 !== 0) continue;
        var x1 = a.x * width;
        var y1 = a.y * height;
        var x2 = b.x * width;
        var y2 = b.y * height;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = accent;
        context.globalAlpha = alpha * (0.09 + 0.08 * Math.sin(time * 0.001 + i));
        context.lineWidth = 0.7;
        context.stroke();
        arrow(x1, y1, x2, y2, alpha * 0.12, accent);
      }
    }

    networkNodes.forEach(function (node, index) {
      var pulse = 1 + Math.sin(time * 0.0014 + node.phase) * 0.28;
      var x = node.x * width;
      var y = node.y * height;
      var radius = node.size * pulse;
      context.beginPath();
      context.arc(x, y, radius * 4.8, 0, Math.PI * 2);
      var glow = context.createRadialGradient(x, y, 0, x, y, radius * 4.8);
      glow.addColorStop(0, index % 5 === 0 ? accentTwo : accent);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.globalAlpha = alpha * 0.16;
      context.fill();
      context.beginPath();
      context.arc(x, y, Math.max(1, radius), 0, Math.PI * 2);
      context.fillStyle = index % 5 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.52;
      context.fill();
    });
  }

  function streamY(seed, x, time) {
    var base = seed.y * height;
    var wave = Math.sin(x * 0.012 * seed.bend + seed.phase + time * 0.00022 * seed.speed) * 18;
    var noise = Math.sin(x * 0.031 - seed.phase * 1.7 + time * 0.00035) * 7;
    return base + wave + noise;
  }

  function drawLearning(time, alpha) {
    var accent = color("--ai-accent", "#3157d5");
    var accentTwo = color("--ai-accent-2", "#7257d8");

    streamSeeds.forEach(function (seed, index) {
      context.beginPath();
      for (var x = -20; x <= width + 20; x += 18) {
        var y = streamY(seed, x, time);
        if (x === -20) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = index % 4 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * (0.075 + index * 0.003);
      context.lineWidth = index % 3 === 0 ? 1.15 : 0.72;
      context.stroke();

      var progress = (time * 0.000055 * seed.speed + seed.phase / (Math.PI * 2)) % 1;
      var particleX = progress * (width + 80) - 40;
      var particleY = streamY(seed, particleX, time);
      context.beginPath();
      context.arc(particleX, particleY, index % 4 === 0 ? 2.6 : 1.7, 0, Math.PI * 2);
      context.fillStyle = index % 4 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.48;
      context.fill();
    });
  }

  function drawQuantum(time, alpha) {
    var accent = color("--ai-accent", "#3157d5");
    var accentTwo = color("--ai-accent-2", "#7257d8");
    var cx = width * 0.62;
    var cy = height * 0.50;
    var scale = Math.min(width, height);
    var points = quantumNodes.map(function (node) {
      var drift = Math.sin(time * 0.00055 + node.phase) * 0.018;
      return {
        x: cx + Math.cos(node.angle + drift) * node.ring * scale,
        y: cy + Math.sin(node.angle + drift) * node.ring * scale * 0.76
      };
    });

    context.setLineDash([5, 9]);
    for (var i = 0; i < points.length; i += 1) {
      var target = points[(i + 5) % points.length];
      var source = points[i];
      var controlX = (source.x + target.x) / 2 + Math.sin(i * 1.7) * 42;
      var controlY = (source.y + target.y) / 2 + Math.cos(i * 1.3) * 35;
      context.beginPath();
      context.moveTo(source.x, source.y);
      context.quadraticCurveTo(controlX, controlY, target.x, target.y);
      context.strokeStyle = i % 3 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * (0.08 + 0.055 * Math.sin(time * 0.0011 + i));
      context.lineWidth = 0.8;
      context.stroke();
    }
    context.setLineDash([]);

    points.forEach(function (point, index) {
      var pulse = 2.3 + Math.sin(time * 0.0014 + quantumNodes[index].phase) * 0.7;
      context.beginPath();
      context.arc(point.x, point.y, pulse * 4, 0, Math.PI * 2);
      var glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, pulse * 4);
      glow.addColorStop(0, index % 3 === 0 ? accentTwo : accent);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.globalAlpha = alpha * 0.17;
      context.fill();
      context.beginPath();
      context.arc(point.x, point.y, pulse, 0, Math.PI * 2);
      context.fillStyle = index % 3 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.58;
      context.fill();
    });
  }

  function ellipsePoint(cx, cy, orbit, angle, scale) {
    var x = Math.cos(angle) * orbit.radius * scale;
    var y = Math.sin(angle) * orbit.radius * scale * orbit.eccentricity;
    var cos = Math.cos(orbit.tilt);
    var sin = Math.sin(orbit.tilt);
    return { x: cx + x * cos - y * sin, y: cy + x * sin + y * cos };
  }

  function drawGravity(time, alpha) {
    var accent = color("--ai-accent", "#3157d5");
    var accentTwo = color("--ai-accent-2", "#7257d8");
    var cx = width * 0.68;
    var cy = height * 0.48;
    var scale = Math.min(width, height) * 1.35;

    var halo = context.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.20);
    halo.addColorStop(0, accentTwo);
    halo.addColorStop(0.18, accent);
    halo.addColorStop(1, "rgba(0,0,0,0)");
    context.beginPath();
    context.arc(cx, cy, Math.min(width, height) * 0.20, 0, Math.PI * 2);
    context.fillStyle = halo;
    context.globalAlpha = alpha * 0.11;
    context.fill();

    orbits.forEach(function (orbit, index) {
      context.beginPath();
      for (var step = 0; step <= 100; step += 1) {
        var angle = (step / 100) * Math.PI * 2;
        var point = ellipsePoint(cx, cy, orbit, angle, scale);
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.strokeStyle = index % 3 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * (0.06 + index * 0.009);
      context.lineWidth = index % 2 === 0 ? 0.9 : 0.65;
      context.stroke();

      var particleAngle = time * 0.00035 * orbit.speed * 8 + orbit.phase;
      var particle = ellipsePoint(cx, cy, orbit, particleAngle, scale);
      context.beginPath();
      context.arc(particle.x, particle.y, index % 3 === 0 ? 2.5 : 1.7, 0, Math.PI * 2);
      context.fillStyle = index % 3 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.55;
      context.fill();
    });

    for (var trail = 0; trail < 3; trail += 1) {
      context.beginPath();
      var offset = trail * 0.7 + time * 0.00008;
      for (var t = 0; t <= 1.001; t += 0.018) {
        var radius = (0.43 - t * 0.34) * scale;
        var angle = t * Math.PI * (3.5 + trail * 0.5) + offset;
        var x = cx + Math.cos(angle) * radius * 0.72;
        var y = cy + Math.sin(angle) * radius * 0.34;
        if (t === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = trail === 1 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.075;
      context.lineWidth = 0.75;
      context.stroke();
    }
  }

  function drawMode(mode, time, alpha) {
    if (mode === "learning") drawLearning(time, alpha);
    else if (mode === "quantum") drawQuantum(time, alpha);
    else if (mode === "gravity") drawGravity(time, alpha);
    else drawThermo(time, alpha);
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);
    var progress = reduceMotion ? 1 : Math.min(1, (time - transitionStart) / transitionDuration);
    var eased = 1 - Math.pow(1 - Math.max(0, progress), 3);
    if (fromMode !== toMode && eased < 1) drawMode(fromMode, time, 1 - eased);
    drawMode(toMode, time, fromMode === toMode ? 1 : eased);
    context.globalAlpha = 1;

    if (!reduceMotion) {
      frame = window.requestAnimationFrame(draw);
    }
  }

  function setMode(mode, marker) {
    if (!labels[mode]) return;
    if (mode !== toMode) {
      fromMode = toMode;
      toMode = mode;
      transitionStart = performance.now();
      body.classList.remove("research-mode-thermo", "research-mode-learning", "research-mode-quantum", "research-mode-gravity");
      body.classList.add("research-mode-" + mode);
      indicator.querySelector(".research-field__label").textContent = labels[mode];
      if (reduceMotion) draw(performance.now());
    }

    if (marker !== activeMarker) {
      archive.querySelectorAll(".is-field-active, .is-field-parent-active").forEach(function (element) {
        element.classList.remove("is-field-active", "is-field-parent-active");
      });
      activeMarker = marker;
      if (marker) {
        marker.classList.add("is-field-active");
        var parentTheme = marker.closest(":scope > ul > li");
        if (!parentTheme) parentTheme = marker.closest(".archive > ul > li");
        if (parentTheme && parentTheme !== marker) parentTheme.classList.add("is-field-parent-active");
      }
    }
  }

  function buildMarkers() {
    var themes = archive.querySelectorAll(":scope > ul > li");
    markers = [];
    if (themes[0]) {
      var statisticalItems = themes[0].querySelectorAll(":scope > ul > li");
      statisticalItems.forEach(function (item, index) {
        markers.push({ element: item, mode: index >= 1 && index <= 3 ? "learning" : "thermo" });
      });
      if (!statisticalItems.length) markers.push({ element: themes[0], mode: "thermo" });
    }
    if (themes[1]) markers.push({ element: themes[1], mode: "quantum" });
    if (themes[2]) markers.push({ element: themes[2], mode: "gravity" });
  }

  function updateModeFromScroll() {
    scrollFrame = null;
    if (!markers.length) return;
    var focus = window.innerHeight * 0.48;
    var best = markers[0];
    var bestDistance = Infinity;

    markers.forEach(function (marker) {
      var rect = marker.element.getBoundingClientRect();
      var center = rect.top + rect.height * 0.5;
      var distance = Math.abs(center - focus);
      if (rect.bottom < -window.innerHeight * 0.25 || rect.top > window.innerHeight * 1.25) distance += window.innerHeight;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = marker;
      }
    });

    setMode(best.mode, best.element);
  }

  function scheduleModeUpdate() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateModeFromScroll);
  }

  function start() {
    resize();
    buildMarkers();
    indicator.querySelector(".research-field__label").textContent = labels.thermo;
    body.classList.add("research-mode-thermo", "has-research-field");
    updateModeFromScroll();
    if (reduceMotion) draw(performance.now());
    else frame = window.requestAnimationFrame(draw);
  }

  window.addEventListener("resize", function () {
    resize();
    scheduleModeUpdate();
  });
  window.addEventListener("scroll", scheduleModeUpdate, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (reduceMotion) return;
    if (document.hidden && frame) {
      window.cancelAnimationFrame(frame);
      frame = null;
    } else if (!document.hidden && !frame) {
      frame = window.requestAnimationFrame(draw);
    }
  });

  start();
})();
