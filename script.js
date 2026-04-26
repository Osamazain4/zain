/* ===============================
   OSAMA ZAIN - MASTER V3 SCRIPT
   Premium Animation Engine
================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CURSOR GLOW
  =============================== */
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });


  /* ===============================
     PARTICLE BACKGROUND
  =============================== */
  const canvas = document.createElement("canvas");
  canvas.id = "particles";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const mouse = { x: w / 2, y: h / 2 };

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const particles = [];

  for (let i = 0; i < 65; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        p.x -= dx * 0.002;
        p.y -= dy * 0.002;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212,175,55,.85)";
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();


  /* ===============================
     HERO 3D PARALLAX
  =============================== */
  const heroImg = document.querySelector(".photo-wrap");

  if (heroImg) {
    document.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 28;
      const y = (window.innerHeight / 2 - e.clientY) / 28;

      heroImg.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg) translateZ(10px)`;
    });

    document.addEventListener("mouseleave", () => {
      heroImg.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }


  /* ===============================
     REVEAL ON SCROLL
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  function revealNow() {
    const trigger = window.innerHeight - 80;

    reveals.forEach(item => {
      const top = item.getBoundingClientRect().top;

      if (top < trigger) {
        item.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealNow);
  revealNow();


  /* ===============================
     COUNTER ANIMATION
  =============================== */
  const counters = document.querySelectorAll(".count");

  counters.forEach(counter => {
    const target = +counter.dataset.target;

    let started = false;

    function runCounter() {
      if (started) return;

      const top = counter.getBoundingClientRect().top;

      if (top < window.innerHeight - 60) {
        started = true;

        let count = 0;
        const speed = target / 80;

        const update = () => {
          count += speed;

          if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target + "+";
          }
        };

        update();
      }
    }

    window.addEventListener("scroll", runCounter);
    runCounter();
  });


  /* ===============================
     NAVBAR SHRINK
  =============================== */
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.padding = "0";
      header.style.background = "rgba(0,0,0,.75)";
    } else {
      header.style.background = "rgba(0,0,0,.55)";
    }
  });


  /* ===============================
     SMOOTH HOVER CARD TILT
  =============================== */
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rx = -(y - rect.height / 2) / 18;
      const ry = (x - rect.width / 2) / 18;

      card.style.transform =
        `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });

  });


  /* ===============================
     YEAR AUTO UPDATE
  =============================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

});
