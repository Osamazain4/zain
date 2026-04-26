/* ==========================================
V13 MASTER CAREER PORTFOLIO - SCRIPT.JS
Premium Motion + Reveal + Smooth Effects
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     SMOOTH ACTIVE NAV LINK
  =============================== */
  const navLinks = document.querySelectorAll(".menu a");

  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0px)";
    });
  });

  /* ===============================
     REVEAL ANIMATION ON SCROLL
  =============================== */
  const revealItems = document.querySelectorAll(
    ".hero-text,.hero-image,.card,.title-wrap,.stat-box,.center-btn"
  );

  revealItems.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(45px)";
    el.style.transition = "all .9s ease";
  });

  function revealOnScroll() {
    revealItems.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const trigger = window.innerHeight - 80;

      if (top < trigger) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  /* ===============================
     GOLD CURSOR GLOW
  =============================== */
  const glow = document.createElement("div");

  glow.style.position = "fixed";
  glow.style.width = "220px";
  glow.style.height = "220px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "-1";
  glow.style.filter = "blur(70px)";
  glow.style.background =
    "radial-gradient(circle, rgba(255,210,70,.18), transparent 70%)";

  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX - 110;
    mouseY = e.clientY - 110;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  /* ===============================
     AUTO HOVER LIFT FOR BUTTONS
  =============================== */
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-4px) scale(1.02)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0px) scale(1)";
    });
  });

  /* ===============================
     HERO IMAGE FLOAT EFFECT
  =============================== */
  const heroImg = document.querySelector(".hero-image img");

  if (heroImg) {
    let pos = 0;

    function floatImage() {
      pos += 0.02;
      heroImg.style.transform =
        "translateY(" + Math.sin(pos) * 8 + "px)";
      requestAnimationFrame(floatImage);
    }

    floatImage();
  }

});
