(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  if (reduceMotion || !finePointer) return;

  var visual = document.querySelector(".ai-home-particle-card");

  if (visual) {
    var labels = Array.prototype.slice.call(visual.querySelectorAll(".ai-orbit-label"));
    var depths = [0.75, 1.0, 1.25];
    var currentX = 0;
    var currentY = 0;
    var targetX = 0;
    var targetY = 0;
    var currentFieldX = 50;
    var currentFieldY = 50;
    var targetFieldX = 50;
    var targetFieldY = 50;
    var frame = null;

    function animateField() {
      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;
      currentFieldX += (targetFieldX - currentFieldX) * 0.13;
      currentFieldY += (targetFieldY - currentFieldY) * 0.13;

      visual.style.setProperty("--field-x", currentFieldX.toFixed(2) + "%");
      visual.style.setProperty("--field-y", currentFieldY.toFixed(2) + "%");

      labels.forEach(function (label, index) {
        var depth = depths[index] || 1;
        label.style.transform = "translate3d(" +
          (currentX * depth).toFixed(2) + "px," +
          (currentY * depth).toFixed(2) + "px,0)";
      });

      var unsettled =
        Math.abs(targetX - currentX) > 0.04 ||
        Math.abs(targetY - currentY) > 0.04 ||
        Math.abs(targetFieldX - currentFieldX) > 0.04 ||
        Math.abs(targetFieldY - currentFieldY) > 0.04;

      if (unsettled) {
        frame = window.requestAnimationFrame(animateField);
      } else {
        frame = null;
      }
    }

    function requestFieldFrame() {
      if (frame) return;
      frame = window.requestAnimationFrame(animateField);
    }

    visual.addEventListener("pointermove", function (event) {
      var rect = visual.getBoundingClientRect();
      var x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      var y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

      targetFieldX = x * 100;
      targetFieldY = y * 100;
      targetX = (x - 0.5) * 12;
      targetY = (y - 0.5) * 10;
      visual.classList.add("is-interacting");
      requestFieldFrame();
    });

    visual.addEventListener("pointerleave", function () {
      targetFieldX = 50;
      targetFieldY = 50;
      targetX = 0;
      targetY = 0;
      visual.classList.remove("is-interacting");
      requestFieldFrame();
    });
  }

  var publicationCards = document.querySelectorAll(".is-publications .archive > ol > li");

  Array.prototype.forEach.call(publicationCards, function (card) {
    card.addEventListener("pointerenter", function () {
      card.classList.add("is-pointer-active");
    });

    card.addEventListener("pointermove", function (event) {
      var rect = card.getBoundingClientRect();
      var x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      var y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
      card.style.setProperty("--scan-x", x.toFixed(1) + "%");
      card.style.setProperty("--scan-y", y.toFixed(1) + "%");
    });

    card.addEventListener("pointerleave", function () {
      card.classList.remove("is-pointer-active");
      card.style.setProperty("--scan-x", "50%");
      card.style.setProperty("--scan-y", "50%");
    });
  });
})();
