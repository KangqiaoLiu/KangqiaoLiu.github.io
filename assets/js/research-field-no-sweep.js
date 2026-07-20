(function () {
  "use strict";

  var canvas = document.querySelector(".research-field-boost");
  if (!canvas) return;

  var context = canvas.getContext("2d");
  if (!context) return;

  var originalStroke = context.stroke;

  context.stroke = function () {
    // The transition sweep is the only very wide stroke on this canvas.
    if (context.lineWidth >= 20) return;
    return originalStroke.apply(context, arguments);
  };
})();
