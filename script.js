/* ===============================
   OSAMA ZAIN MASTER V5 SCRIPT.JS
   CURSOR REACTIVE GOLD
================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     CREATE CURSOR GLOW
  --------------------------------*/
  const glow = document.createElement("div");
  glow.id = "cursorGlow";
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  /* -------------------------------
     DUST CANVAS
  --------------------------------*/
  const canvas = document.createElement("canvas");
  canvas.id = "dustCanvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  class Dust {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.speedY = Math.random() * -0.2 - 0.05;
      this.alpha = Math.random() * 0.4 + 0.05;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        this.x += dx * 0.02;
        this.y += dy * 0.02;
      }

      if (this.y < -10 || this.x < -20 || this.x > w + 20) {
        this.reset();
        this.y = h + 10;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,215,120,${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255,215,120,.4)";
      ctx.fill();
    }
  }

  const dusts = [];
  for (let i = 0; i < 35; i++) {
    dusts.push(new Dust());
  }

  function animateDust() {
    ctx.clearRect(0, 0, w, h);

    dusts.forEach(d => {
      d.update();
      d.draw();
    });

    requestAnimationFrame(animateDust);
  }

  animateDust();

  /* -------------------------------
     HERO IMAGE TILT
  --------------------------------*/
  const frame = document.querySelector(".frame");

  if (frame) {
    document.addEventListener("mousemove", (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rotateY = (e.clientX - centerX) / 45;
      const rotateX = (centerY - e.clientY) / 45;

      frame.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    document.addEventListener("mouseleave", () => {
      frame.style.transform =
        `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
  }

  /* -------------------------------
     REVEAL ON SCROLL
  --------------------------------*/
  const reveals = document.querySelectorAll(".reveal");

  function revealScroll() {
    const trigger = window.innerHeight * 0.88;

    reveals.forEach(item => {
      const top = item.getBoundingClientRect().top;

      if (top < trigger) {
        item.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealScroll);
  revealScroll();

  /* -------------------------------
     CARD HOVER LIFT
  --------------------------------*/
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

  });

});
