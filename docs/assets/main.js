// Canify 官网交互：明暗主题切换 + 移动端导航 + 截图灯箱。无任何外部依赖。
(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "canify-theme";

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  // 短暂挂载过渡类，让背景/边框/文字颜色平滑切换，且不影响首帧渲染
  function applyTheme(t) {
    root.classList.add("theming");
    root.setAttribute("data-theme", t);
    setTimeout(function () { root.classList.remove("theming"); }, 280);
  }

  // 初始主题由 <head> 内联脚本设置（避免闪烁）。
  // 若用户未手动选择过，则持续跟随系统主题变化。
  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* 隐私模式等 */ }
  if (!stored) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onSystemChange = function (e) { applyTheme(e.matches ? "dark" : "light"); };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  // 主题切换按钮（明 <-> 暗）
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
      themeBtn.setAttribute("aria-label",
        next === "dark" ? "切换到浅色主题" : "切换到深色主题");
    });
  }

  // 移动端导航开关
  var navToggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (navToggle && links) {
    navToggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // 截图灯箱（hero 窗口 + 画廊）
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    document.querySelectorAll(".gallery figure, .hero-shot .window").forEach(function (el) {
      el.addEventListener("click", function () {
        // hero 窗口内有两张图（明/暗），取当前可见的那张
        var visible = Array.prototype.filter.call(el.querySelectorAll("img"), function (img) {
          return img.offsetParent !== null;
        })[0];
        var img = visible || el.querySelector("img");
        if (!img) return;
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt || "";
        if (typeof lightbox.showModal === "function") lightbox.showModal();
      });
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
  }
})();
