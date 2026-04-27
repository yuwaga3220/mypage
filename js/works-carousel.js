// 制作物カルーセル 
(function () {
  var root = document.querySelector("[data-works-carousel]");
  var dotsRoot = document.querySelector("[data-works-dots]");
  if (!root || !dotsRoot) return;

  var viewport = root.querySelector(".works-viewport");
  var track = root.querySelector(".works-track");
  var prevBtn = root.querySelector(".works-nav--prev");
  var nextBtn = root.querySelector(".works-nav--next");
  var cards = track.querySelectorAll(".work-card");
  if (!viewport || !track || !prevBtn || !nextBtn || !cards.length) return;

  var index = 0;
  var slideStep = 0;
  var dragStartX = 0;
  var dragDx = 0;
  var isDragging = false;
  var didDrag = false;

  function slidesPerView() {
    if (window.matchMedia("(max-width: 680px)").matches) return 1;
    if (window.matchMedia("(max-width: 960px)").matches) return 1;
    return 2;
  }

  function maxIndex() {
    return Math.max(0, cards.length - slidesPerView());
  }

  function readGapPx() {
    var g = window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap;
    var n = parseFloat(g);
    return isNaN(n) ? 16 : n;
  }

  function render(offsetX) {
    track.style.transform = "translateX(" + (-index * slideStep + offsetX) + "px)";
  }

  function rebuildDots(pageCount) {
    dotsRoot.innerHTML = "";
    for (var i = 0; i < pageCount; i++) {
      (function (j) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "works-dot";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "作品ページ " + (j + 1));
        b.addEventListener("click", function () {
          goTo(j);
        });
        dotsRoot.appendChild(b);
      })(i);
    }
  }

  function syncDots() {
    var dots = dotsRoot.querySelectorAll(".works-dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  }

  function layout() {
    var spv = slidesPerView();
    var gapPx = readGapPx();
    var w = viewport.getBoundingClientRect().width;
    var slideW = (w - gapPx * (spv - 1)) / spv;

    var lastMax = maxIndex();
    index = Math.min(index, lastMax);

    var single = lastMax === 0;
    root.classList.toggle("is-single", single);

    if (single) {
      dotsRoot.innerHTML = "";
      dotsRoot.hidden = true;
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    } else {
      dotsRoot.hidden = false;
      var pages = lastMax + 1;
      if (dotsRoot.children.length !== pages) {
        rebuildDots(pages);
      }
      syncDots();
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= lastMax;
    }

    cards.forEach(function (card) {
      card.style.flex = "0 0 " + slideW + "px";
    });

    slideStep = slideW + gapPx;
    render(0);
  }

  function goTo(i) {
    index = Math.max(0, Math.min(i, maxIndex()));
    layout();
  }

  function go(delta) {
    goTo(index + delta);
  }

  prevBtn.addEventListener("click", function () {
    go(-1);
  });
  nextBtn.addEventListener("click", function () {
    go(1);
  });

  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  });

  viewport.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    isDragging = true;
    didDrag = false;
    dragStartX = e.clientX;
    dragDx = 0;
    root.classList.add("is-dragging");
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener("pointermove", function (e) {
    if (!isDragging) return;
    dragDx = e.clientX - dragStartX;
    if (Math.abs(dragDx) > 6) didDrag = true;
    render(dragDx);
  });

  function finishDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    root.classList.remove("is-dragging");
    if (viewport.hasPointerCapture && viewport.hasPointerCapture(e.pointerId)) {
      viewport.releasePointerCapture(e.pointerId);
    }

    var threshold = Math.min(120, Math.max(56, slideStep * 0.16));
    if (dragDx > threshold) go(-1);
    else if (dragDx < -threshold) go(1);
    else layout();

    dragDx = 0;
  }

  viewport.addEventListener("pointerup", finishDrag);
  viewport.addEventListener("pointercancel", finishDrag);
  viewport.addEventListener("lostpointercapture", function () {
    if (!isDragging) return;
    isDragging = false;
    root.classList.remove("is-dragging");
    layout();
  });

  viewport.addEventListener("click", function (e) {
    if (!didDrag) return;
    e.preventDefault();
    e.stopPropagation();
    didDrag = false;
  });

  var ro =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(function () {
          layout();
        })
      : null;
  if (ro) ro.observe(viewport);
  window.addEventListener("resize", layout);

  layout();
})();
