(function () {
  var shapes = document.querySelectorAll(".geo-shape");
  if (!shapes.length) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  var configs = [
    { speed: 0.11, drift: -18, rotate: 0.018 },
    { speed: -0.08, drift: 16, rotate: -0.014 },
    { speed: 0.16, drift: 22, rotate: 0.022 },
    { speed: -0.13, drift: -10, rotate: 0.012 },
    { speed: 0.09, drift: 13, rotate: -0.01 },
  ];

  var ticking = false;

  function update() {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var viewportH = window.innerHeight || 1;
    var progress = scrollY / viewportH;

    shapes.forEach(function (shape, index) {
      var config = configs[index] || configs[0];
      var wave = Math.sin(progress * 1.35 + index * 0.85);
      var x = wave * config.drift;
      var y = scrollY * config.speed;
      var r = scrollY * config.rotate;

      shape.style.setProperty("--geo-x", x.toFixed(2) + "px");
      shape.style.setProperty("--geo-y", y.toFixed(2) + "px");
      shape.style.setProperty("--geo-r", r.toFixed(2) + "deg");
    });

    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();
