// さりげない流れ星アニメーション（サイドバー内）
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  function spawnStar() {
    var star = document.createElement("span");
    star.className = "shooting-star";
    star.setAttribute("aria-hidden", "true");

    star.style.top  = (10 + Math.random() * 65) + "%"; // 10–75%
    star.style.left = ( 5 + Math.random() * 55) + "%"; // 5–60%
    star.style.rotate = (30 + Math.random() * 25) + "deg"; // 30–55°

    sidebar.appendChild(star);

    star.addEventListener("animationend", function () {
      star.remove();
      scheduleNext();
    });
  }

  function scheduleNext() {
    setTimeout(spawnStar, 700 + Math.random() * 600); // 0.7–1.3秒後に次の星
  }

  setTimeout(spawnStar, 300 + Math.random() * 400); // 初回は0.3–0.7秒後
})();
