// Canify 官网交互：移动端导航 + 截图灯箱。无任何外部依赖。
(function () {
  "use strict";

  // 移动端导航开关
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // 截图画廊灯箱
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    document.querySelectorAll(".gallery figure, .hero-shot .window").forEach(function (el) {
      el.addEventListener("click", function () {
        var img = el.querySelector("img");
        if (!img) return;
        // 用 data-full 或原图
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt || "";
        if (typeof lightbox.showModal === "function") lightbox.showModal();
      });
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.open) lightbox.close();
    });
  }
})();
