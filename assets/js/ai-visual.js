(function () {
  "use strict";

  var body = document.body;
  var masthead = document.querySelector(".masthead");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  body.classList.add("motion-ready");

  function updateMasthead() {
    if (!masthead) return;
    masthead.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  updateMasthead();
  window.addEventListener("scroll", updateMasthead, { passive: true });

  var currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll(".greedy-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href) return;
    try {
      var linkPath = new URL(href, window.location.origin).pathname.replace(/\/+$/, "") || "/";
      if (linkPath === currentPath) link.classList.add("is-active");
    } catch (error) {
      // Ignore malformed navigation links.
    }
  });

  var revealTargets = Array.prototype.slice.call(document.querySelectorAll(".ai-reveal"));

  if (body.classList.contains("is-research")) {
    revealTargets = revealTargets.concat(
      Array.prototype.slice.call(document.querySelectorAll(".page__content > ul > li"))
    );
  }

  if (body.classList.contains("is-publications")) {
    revealTargets = revealTargets.concat(
      Array.prototype.slice.call(document.querySelectorAll(".page__content > ol > li"))
    );
  }

  revealTargets.forEach(function (element, index) {
    element.classList.add("page-reveal");
    element.style.transitionDelay = Math.min(index % 6, 5) * 55 + "ms";
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealTargets.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  var canvas = document.getElementById("ai-research-canvas");
  if (!canvas) return;

  var context = canvas.getContext("2d");
  if (!context) return;

  var host = canvas.parentElement;
  var width = 0;
  var height = 0;
  var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  var nodes = [];
  var animationFrame = null;
  var pointer = { x: 0, y: 0, active: false };

  function cssColor(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function makeNodes() {
    var area = width * height;
    var count = Math.max(28, Math.min(68, Math.round(area / 8500)));
    nodes = [];

    for (var i = 0; i < count; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: randomBetween(-0.22, 0.22),
        vy: randomBetween(-0.22, 0.22),
        radius: randomBetween(1.1, 2.8),
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function resizeCanvas() {
    var rect = host.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    makeNodes();
    drawFrame(0, true);
  }

  function updateNode(node, time) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -12) node.x = width + 12;
    if (node.x > width + 12) node.x = -12;
    if (node.y < -12) node.y = height + 12;
    if (node.y > height + 12) node.y = -12;

    if (pointer.active) {
      var dx = node.x - pointer.x;
      var dy = node.y - pointer.y;
      var distanceSquared = dx * dx + dy * dy;
      if (distanceSquared > 1 && distanceSquared < 14000) {
        var influence = (14000 - distanceSquared) / 14000;
        node.x += (dx / Math.sqrt(distanceSquared)) * influence * 0.3;
        node.y += (dy / Math.sqrt(distanceSquared)) * influence * 0.3;
      }
    }

    node.displayRadius = node.radius + Math.sin(time * 0.0012 + node.phase) * 0.45;
  }

  function drawFrame(time, staticOnly) {
    context.clearRect(0, 0, width, height);

    var accent = cssColor("--ai-accent", "#3157d5");
    var accentTwo = cssColor("--ai-accent-2", "#7257d8");

    if (!staticOnly) {
      nodes.forEach(function (node) {
        updateNode(node, time);
      });
    }

    var maxDistance = Math.min(118, Math.max(82, width * 0.22));

    for (var i = 0; i < nodes.length; i += 1) {
      for (var j = i + 1; j < nodes.length; j += 1) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= maxDistance) continue;

        context.beginPath();
        context.moveTo(nodes[i].x, nodes[i].y);
        context.lineTo(nodes[j].x, nodes[j].y);
        context.strokeStyle = accent;
        context.globalAlpha = (1 - distance / maxDistance) * 0.17;
        context.lineWidth = 0.7;
        context.stroke();
      }
    }

    context.globalAlpha = 1;

    nodes.forEach(function (node, index) {
      var radius = node.displayRadius || node.radius;
      var gradient = context.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        radius * 4.2
      );
      gradient.addColorStop(0, index % 4 === 0 ? accentTwo : accent);
      gradient.addColorStop(0.28, index % 4 === 0 ? accentTwo : accent);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      context.beginPath();
      context.arc(node.x, node.y, radius * 4.2, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.globalAlpha = 0.38;
      context.fill();

      context.beginPath();
      context.arc(node.x, node.y, Math.max(0.8, radius), 0, Math.PI * 2);
      context.fillStyle = index % 4 === 0 ? accentTwo : accent;
      context.globalAlpha = 0.82;
      context.fill();
    });

    context.globalAlpha = 1;

    if (!reduceMotion && !staticOnly) {
      animationFrame = window.requestAnimationFrame(function (nextTime) {
        drawFrame(nextTime, false);
      });
    }
  }

  function startAnimation() {
    if (reduceMotion || animationFrame) return;
    animationFrame = window.requestAnimationFrame(function (time) {
      drawFrame(time, false);
    });
  }

  function stopAnimation() {
    if (!animationFrame) return;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  host.addEventListener("pointermove", function (event) {
    var rect = host.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });

  host.addEventListener("pointerleave", function () {
    pointer.active = false;
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopAnimation();
    else startAnimation();
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeCanvas).observe(host);
  } else {
    window.addEventListener("resize", resizeCanvas);
  }

  resizeCanvas();
  startAnimation();
})();
