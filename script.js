/* ===============================
   OSAMA ZAIN - FINAL MASTER JS
   MAX GOLD PARTICLES + PORTFOLIO FIX
================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ACTIVE NAV LINK
  ================================= */
  const path = window.location.pathname.toLowerCase();

  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href").toLowerCase();
    if (path.includes(href)) {
      link.classList.add("active");
    }
  });

  /* ===============================
     SCROLL REVEAL
  ================================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  /* ===============================
     GOLD PARTICLE CANVAS
  ================================= */
  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let w, h;
  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let mouse = {
    x: w / 2,
    y: h / 2
  };

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // burst particles
    for (let i = 0; i < 8; i++) {
      particles.push(new Particle(mouse.x, mouse.y, true));
    }
  });

  class Particle {
    constructor(x, y, burst = false) {
      this.x = x || Math.random() * w;
      this.y = y || Math.random() * h;

      this.size = burst ? Math.random() * 4 + 1 : Math.random() * 2 + 1;

      this.vx = burst
        ? (Math.random() - 0.5) * 5
        : (Math.random() - 0.5) * 0.5;

      this.vy = burst
        ? (Math.random() - 0.5) * 5
        : (Math.random() - 0.5) * 0.5;

      this.alpha = 1;
      this.life = burst ? 60 : 300;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      if (this.life < 100) {
        this.alpha = this.life / 100;
      }

      // pull slightly to mouse
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 180) {
        this.x -= dx * 0.002;
        this.y -= dy * 0.002;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(255,215,0,${this.alpha})`;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ffd700";
      ctx.fill();
    }
  }

  const particles = [];

  // base floating particles
  for (let i = 0; i < 180; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].life <= 0) {
        particles.splice(i, 1);
        particles.push(new Particle());
      }
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  /* ===============================
     PARALLAX GLOW BG
  ================================= */
  window.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });

});
