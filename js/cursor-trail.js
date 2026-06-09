(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if ("ontouchstart" in window) return;

  var sidebar = document.querySelector(".sidebar");
  var lastX = null;
  var lastY = null;

  document.addEventListener("mousemove", function (e) {
    var cx = e.clientX;
    var cy = e.clientY;

    if (lastX !== null) {
      var dx = cx - lastX;
      var dy = cy - lastY;
      var len = Math.sqrt(dx * dx + dy * dy);

      if (len > 1) {
        var seg = document.createElement("span");
        seg.className = "cursor-trail";
        seg.setAttribute("aria-hidden", "true");

        var sidebarRight = sidebar ? sidebar.getBoundingClientRect().right : 310;
        seg.dataset.zone = (lastX + cx) / 2 < sidebarRight ? "sidebar" : "main";

        seg.style.left   = (lastX + cx) / 2 + "px";
        seg.style.top    = (lastY + cy) / 2 + "px";
        seg.style.width  = len + "px";
        seg.style.rotate = Math.atan2(dy, dx) + "rad";

        document.body.appendChild(seg);
        seg.addEventListener("animationend", function () { seg.remove(); });
      }
    }

    lastX = cx;
    lastY = cy;
  });
})();
