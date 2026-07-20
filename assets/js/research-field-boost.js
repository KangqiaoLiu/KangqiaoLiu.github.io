(function () {
  "use strict";

  var body = document.body;
  if (!body.classList.contains("is-research")) return;

  var archive = document.querySelector(".archive");
  if (!archive) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  if (!context) return;

  canvas.className = "research-field-boost";
  canvas.setAttribute("aria-hidden", "true");
  body.appendChild(canvas);

  var width = 1;
  var height = 1;
  var ratio = 1;
  var frame = null;
  var fromMode = currentMode();
  var toMode = fromMode;
  var transitionStart = performance.now();
  var transitionDuration = 620;

  function cssColor(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function seeded(index, salt) {
    var value = Math.sin(index * 71.391 + salt * 19.733) * 43758.5453;
    return value - Math.floor(value);
  }

  function currentMode() {
    if (body.classList.contains("research-mode-learning")) return "learning";
    if (body.classList.contains("research-mode-quantum")) return "quantum";
    if (body.classList.contains("research-mode-gravity")) return "gravity";
    return "thermo";
  }

  function modeCenter(mode) {
    if (mode === "learning") return { x: width * 0.52, y: height * 0.50 };
    if (mode === "quantum") return { x: width * 0.66, y: height * 0.48 };
    if (mode === "gravity") return { x: width * 0.69, y: height * 0.47 };
    return { x: width * 0.55, y: height * 0.48 };
  }

  var thermoNodes = Array.from({ length: 34 }, function (_, index) {
    return {
      x: 0.03 + seeded(index, 1) * 0.94,
      y: 0.05 + seeded(index, 2) * 0.90,
      phase: seeded(index, 3) * Math.PI * 2,
      size: 1.4 + seeded(index, 4) * 2.5
    };
  });

  var streamSeeds = Array.from({ length: 18 }, function (_, index) {
    return {
      y: (index + 0.55) / 19,
      phase: seeded(index, 7) * Math.PI * 2,
      bend: 0.8 + seeded(index, 8) * 1.8,
      speed: 0.8 + seeded(index, 9) * 1.2
    };
  });

  var quantumNodes = Array.from({ length: 16 }, function (_, index) {
    var inner = index < 8;
    return {
      ring: inner ? 0.21 : 0.39,
      angle: (index % 8) / 8 * Math.PI * 2 + (inner ? 0 : Math.PI / 8),
      phase: seeded(index, 12) * Math.PI * 2
    };
  });

  var orbits = Array.from({ length: 9 }, function (_, index) {
    return {
      radius: 0.065 + index * 0.043,
      eccentricity: 0.42 + seeded(index, 15) * 0.38,
      tilt: -0.78 + index * 0.18,
      speed: 0.32 + index * 0.055,
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

  function wash(mode, alpha) {
    var center = modeCenter(mode);
    var accent = cssColor("--ai-accent", "#3157d5");
    var accentTwo = cssColor("--ai-accent-2", "#7257d8");
    var radius = Math.max(width, height) * 0.72;
    var gradient = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
    gradient.addColorStop(0, mode === "learning" || mode === "gravity" ? accentTwo : accent);
    gradient.addColorStop(0.24, mode === "quantum" ? accentTwo : accent);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.globalAlpha = alpha * 0.075;
    context.fillRect(0, 0, width, height);
  }

  function drawThermo(time, alpha) {
    var accent = cssColor("--ai-accent", "#3157d5");
    var accentTwo = cssColor("--ai-accent-2", "#7257d8");
    var scale = Math.min(width, height);
    var points = thermoNodes.map(function (node) {
      return {
        x: node.x * width + Math.sin(time * 0.00022 + node.phase) * 8,
        y: node.y * height + Math.cos(time * 0.00019 + node.phase) * 7,
        size: node.size,
        phase: node.phase
      };
    });

    wash("thermo", alpha);

    for (var i = 0; i < points.length; i += 1) {
      for (var j = i + 1; j < points.length; j += 1) {
        if ((i + j) % 3 !== 0) continue;
        var dx = points[i].x - points[j].x;
        var dy = points[i].y - points[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > scale * 0.29) continue;

        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.lineTo(points[j].x, points[j].y);
        context.strokeStyle = (i + j) % 5 === 0 ? accentTwo : accent;
        context.globalAlpha = alpha * (0.13 + (1 - distance / (scale * 0.29)) * 0.18);
        context.lineWidth = (i + j) % 7 === 0 ? 1.25 : 0.82;
        context.stroke();

        if ((i + j) % 8 === 0) {
          var packet = (time * 0.00018 + seeded(i + j, 22)) % 1;
          var px = points[i].x + (points[j].x - points[i].x) * packet;
          var py = points[i].y + (points[j].y - points[i].y) * packet;
          context.beginPath();
          context.arc(px, py, 2.2, 0, Math.PI * 2);
          context.fillStyle = accentTwo;
          context.globalAlpha = alpha * 0.72;
          context.fill();
        }
      }
    }

    points.forEach(function (point, index) {
      var pulse = 1 + Math.sin(time * 0.002 + point.phase) * 0.36;
      var radius = point.size * pulse;
      var glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 7);
      glow.addColorStop(0, index % 5 === 0 ? accentTwo : accent);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.beginPath();
      context.arc(point.x, point.y, radius * 7, 0, Math.PI * 2);
      context.fillStyle = glow;
      context.globalAlpha = alpha * 0.22;
      context.fill();
      context.beginPath();
      context.arc(point.x, point.y, Math.max(1.2, radius), 0, Math.PI * 2);
      context.fillStyle = index % 5 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.78;
      context.fill();
    });
  }

  function streamY(seed, x, time) {
    var base = seed.y * height;
    var wave = Math.sin(x * 0.0105 * seed.bend + seed.phase + time * 0.00052 * seed.speed) * 30;
    var noise = Math.sin(x * 0.028 - seed.phase * 1.5 + time * 0.0009) * 12;
    return base + wave + noise;
  }

  function drawLearning(time, alpha) {
    var accent = cssColor("--ai-accent", "#3157d5");
    var accentTwo = cssColor("--ai-accent-2", "#7257d8");
    wash("learning", alpha);

    streamSeeds.forEach(function (seed, index) {
      context.beginPath();
      for (var x = -30; x <= width + 30; x += 14) {
        var y = streamY(seed, x, time);
        if (x === -30) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = index % 4 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * (0.11 + index * 0.005);
      context.lineWidth = index % 4 === 0 ? 1.65 : 0.92;
      context.stroke();

      for (var particle = 0; particle < 2; particle += 1) {
        var progress = (time * 0.00012 * seed.speed + seed.phase / (Math.PI * 2) + particle * 0.46) % 1;
        var px = progress * (width + 120) - 60;
        var py = streamY(seed, px, time);
        context.beginPath();
        context.arc(px, py, index % 4 === 0 ? 3.1 : 2.0, 0, Math.PI * 2);
        context.fillStyle = index % 4 === 0 ? accentTwo : accent;
        context.globalAlpha = alpha * (particle === 0 ? 0.82 : 0.45);
        context.fill();
      }
    });
  }

  function drawQuantum(time, alpha) {
    var accent = cssColor("--ai-accent", "#3157d5");
    var accentTwo = cssColor("--ai-accent-2", "#7257d8");
    var center = modeCenter("quantum");
    var scale = Math.min(width, height) * 1.08;
    var points = quantumNodes.map(function (node, index) {
      var direction = index < 8 ? 1 : -1;
      var rotation = time * 0.00022 * direction;
      var breathing = 1 + Math.sin(time * 0.0012 + node.phase) * 0.045;
      return {
        x: center.x + Math.cos(node.angle + rotation) * node.ring * scale * breathing,
        y: center.y + Math.sin(node.angle + rotation) * node.ring * scale * 0.74 * breathing
      };
    });

    wash("quantum", alpha);

    context.setLineDash([7, 8]);
    for (var i = 0; i < points.length; i += 1) {
      var target = points[(i + 5) % points.length];
      var source = points[i];
      var bend = 55 + Math.sin(time * 0.0006 + i) * 24;
      var controlX = (source.x + target.x) / 2 + Math.sin(i * 1.3) * bend;
      var controlY = (source.y + target.y) / 2 + Math.cos(i * 1.7) * bend;
      context.beginPath();
      context.moveTo(source.x, source.y);
      context.quadraticCurveTo(controlX, controlY, target.x, target.y);
      context.strokeStyle = i % 3 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * (0.14 + 0.10 * Math.sin(time * 0.0018 + i));
      context.lineWidth = i % 4 === 0 ? 1.45 : 0.9;
      context.stroke();
    }
    context.setLineDash([]);

    for (var ring = 1; ring <= 3; ring += 1) {
      context.beginPath();
      context.ellipse(center.x, center.y, scale * (0.11 + ring * 0.10), scale * (0.07 + ring * 0.075), time * 0.00012, 0, Math.PI * 2);
      context.strokeStyle = ring === 2 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.10;
      context.lineWidth = 0.8;
      context.stroke();
    }

    points.forEach(function (point, index) {
      var pulse = 2.8 + Math.sin(time * 0.0021 + quantumNodes[index].phase) * 1.0;
      var glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, pulse * 6);
      glow.addColorStop(0, index % 3 === 0 ? accentTwo : accent);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.beginPath();
      context.arc(point.x, point.y, pulse * 6, 0, Math.PI * 2);
      context.fillStyle = glow;
      context.globalAlpha = alpha * 0.25;
      context.fill();
      context.beginPath();
      context.arc(point.x, point.y, pulse, 0, Math.PI * 2);
      context.fillStyle = index % 3 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.82;
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
    var accent = cssColor("--ai-accent", "#3157d5");
    var accentTwo = cssColor("--ai-accent-2", "#7257d8");
    var center = modeCenter("gravity");
    var scale = Math.min(width, height) * 1.55;
    wash("gravity", alpha);

    var haloRadius = Math.min(width, height) * 0.27;
    var halo = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, haloRadius);
    halo.addColorStop(0, accentTwo);
    halo.addColorStop(0.12, accent);
    halo.addColorStop(0.45, "rgba(49,87,213,0.12)");
    halo.addColorStop(1, "rgba(0,0,0,0)");
    context.beginPath();
    context.arc(center.x, center.y, haloRadius, 0, Math.PI * 2);
    context.fillStyle = halo;
    context.globalAlpha = alpha * 0.25;
    context.fill();

    orbits.forEach(function (orbit, index) {
      context.beginPath();
      for (var step = 0; step <= 140; step += 1) {
        var angle = step / 140 * Math.PI * 2 + time * 0.00005 * (index % 2 ? -1 : 1);
        var point = ellipsePoint(center.x, center.y, orbit, angle, scale);
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.strokeStyle = index % 3 === 0 ? accentTwo : accent;
      context.globalAlpha = alpha * (0.11 + index * 0.012);
      context.lineWidth = index % 2 === 0 ? 1.35 : 0.82;
      context.stroke();

      var particleAngle = time * 0.00105 * orbit.speed + orbit.phase;
      for (var trail = 7; trail >= 0; trail -= 1) {
        var trailPoint = ellipsePoint(center.x, center.y, orbit, particleAngle - trail * 0.045, scale);
        context.beginPath();
        context.arc(trailPoint.x, trailPoint.y, 1.2 + (7 - trail) * 0.18, 0, Math.PI * 2);
        context.fillStyle = index % 3 === 0 ? accentTwo : accent;
        context.globalAlpha = alpha * (0.09 + (7 - trail) * 0.085);
        context.fill();
      }
    });

    for (var spiral = 0; spiral < 5; spiral += 1) {
      context.beginPath();
      var offset = spiral * 0.72 + time * 0.00022;
      for (var t = 0; t <= 1.001; t += 0.014) {
        var radius = (0.48 - t * 0.41) * scale;
        var angle = t * Math.PI * (4.2 + spiral * 0.35) + offset;
        var x = center.x + Math.cos(angle) * radius * 0.72;
        var y = center.y + Math.sin(angle) * radius * 0.34;
        if (t === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = spiral % 2 ? accentTwo : accent;
      context.globalAlpha = alpha * 0.13;
      context.lineWidth = spiral === 2 ? 1.3 : 0.8;
      context.stroke();
    }
  }

  function drawMode(mode, time, alpha) {
    if (mode === "learning") drawLearning(time, alpha);
    else if (mode === "quantum") drawQuantum(time, alpha);
    else if (mode === "gravity") drawGravity(time, alpha);
    else drawThermo(time, alpha);
  }

  function drawTransformed(mode, time, alpha, scale, rotation) {
    context.save();
    context.translate(width * 0.5, height * 0.5);
    context.rotate(rotation);
    context.scale(scale, scale);
    context.translate(-width * 0.5, -height * 0.5);
    drawMode(mode, time, alpha);
    context.restore();
  }

  function drawTransitionBurst(mode, progress) {
    var strength = Math.sin(Math.PI * progress);
    if (strength <= 0) return;
    var center = modeCenter(mode);
    var accent = cssColor("--ai-accent", "#3157d5");
    var accentTwo = cssColor("--ai-accent-2", "#7257d8");
    var radius = Math.max(width, height) * (0.18 + progress * 0.55);
    var gradient = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
    gradient.addColorStop(0, mode === "learning" || mode === "gravity" ? accentTwo : accent);
    gradient.addColorStop(0.35, mode === "quantum" ? accentTwo : accent);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.globalAlpha = strength * 0.15;
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(-width * 0.1 + progress * width * 1.2, 0);
    context.lineTo(-width * 0.25 + progress * width * 1.2, height);
    context.strokeStyle = accentTwo;
    context.globalAlpha = strength * 0.16;
    context.lineWidth = Math.max(24, width * 0.035);
    context.stroke();
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);
    var progress = reduceMotion ? 1 : Math.min(1, Math.max(0, (time - transitionStart) / transitionDuration));
    var eased = progress * progress * (3 - 2 * progress);

    if (fromMode !== toMode && progress < 1) {
      drawTransformed(fromMode, time, 1 - eased, 1 + eased * 0.055, -eased * 0.018);
      drawTransformed(toMode, time, eased, 0.88 + eased * 0.12, (1 - eased) * 0.025);
      drawTransitionBurst(toMode, progress);
    } else {
      drawMode(toMode, time, 1);
    }
    context.globalAlpha = 1;

    if (!reduceMotion) frame = window.requestAnimationFrame(draw);
  }

  function removeEntryHighlight() {
    archive.querySelectorAll(".is-field-active, .is-field-parent-active").forEach(function (element) {
      element.classList.remove("is-field-active", "is-field-parent-active");
    });
  }

  function switchMode(nextMode) {
    if (nextMode === toMode) {
      removeEntryHighlight();
      return;
    }
    fromMode = toMode;
    toMode = nextMode;
    transitionStart = performance.now();
    removeEntryHighlight();

    var indicator = document.querySelector(".research-field__indicator");
    if (indicator) {
      indicator.classList.remove("is-switching");
      void indicator.offsetWidth;
      indicator.classList.add("is-switching");
      window.setTimeout(function () { indicator.classList.remove("is-switching"); }, transitionDuration + 40);
    }
    if (reduceMotion) draw(performance.now());
  }

  var bodyObserver = new MutationObserver(function () {
    switchMode(currentMode());
  });
  bodyObserver.observe(body, { attributes: true, attributeFilter: ["class"] });

  var highlightObserver = new MutationObserver(removeEntryHighlight);
  highlightObserver.observe(archive, { subtree: true, attributes: true, attributeFilter: ["class"] });

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", function () {
    if (reduceMotion) return;
    if (document.hidden && frame) {
      window.cancelAnimationFrame(frame);
      frame = null;
    } else if (!document.hidden && !frame) {
      frame = window.requestAnimationFrame(draw);
    }
  });

  resize();
  removeEntryHighlight();
  if (reduceMotion) draw(performance.now());
  else frame = window.requestAnimationFrame(draw);
})();