// スクロールアニメーション
(function () {
  var sections = document.querySelectorAll(".reveal-section");
  if (!sections.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sections.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      /* 少し手前で発火させ、フェードの変化が目に入りやすくする */
      rootMargin: "0px 0px 100px 0px",
      threshold: 0.05,
    }
  );

  sections.forEach(function (el) {
    observer.observe(el);
  });
})();
