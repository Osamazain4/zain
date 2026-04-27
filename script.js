// ===============================
// OSAMA ZAIN FINAL OPTIMIZED SCRIPT
// Loader Fixed + No Conflict + Premium Effects
// Replace Full script.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
  /* Replace ONLY this loader section */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      loader.style.transition = ".35s ease";

      setTimeout(() => {
        loader.style.display = "none";
      }, 350);

    }, 450);   // fast premium timing
  }
});
  /* ===============================
     MUSIC
  =============================== */
  const music = document.getElementById("introMusic");
  const musicBtn = document.getElementById("musicToggle");
  let playing = false;

  function startMusic() {
    if (!music) return;

    music.volume = 0.35;

    music.play().then(() => {
      playing = true;
      if (musicBtn) musicBtn.innerHTML = "🔊";
    }).catch(() => {
      playing = false;
      if (musicBtn) musicBtn.innerHTML = "🔇";
    });
  }

  document.addEventListener("click", () => {
    if (!playing) startMusic();
  }, { once: true });

  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (!music) return;

      if (playing) {
        music.pause();
        playing = false;
        musicBtn.innerHTML = "🔇";
      } else {
        startMusic();
      }
    });
  }

  /* ===============================
     WORK SLIDER
  =============================== */
  const slider = document.getElementById("workSlider");

  window.slideLeft = function () {
    if (slider) {
      slider.scrollBy({ left: -450, behavior: "smooth" });
    }
  };

  window.slideRight = function () {
    if (slider) {
      slider.scrollBy({ left: 450, behavior: "smooth" });
    }
  };

  if (slider) {
    setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 450, behavior: "smooth" });
      }

    }, 5000);
  }

  /* ===============================
     PROGRESS BAR
  =============================== */
  const progressBar = document.createElement("div");
  progressBar.id = "progressBar";
  document.body.appendChild(progressBar);

  /* ===============================
     AMBIENT GLOW
  =============================== */
  const ambient = document.createElement("div");
  ambient.id = "ambientGlow";
  document.body.appendChild(ambient);

  /* ===============================
     CURSOR GLOW
  =============================== */
  const glow = document.createElement("div");
  glow.id = "cursorGlow";
  document.body.appendChild(glow);

  glow.style.position = "fixed";
  glow.style.width = "16px";
  glow.style.height = "16px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "99999";
  glow.style.background = "rgba(255,215,0,.75)";
  glow.style.boxShadow = "0 0 20px rgba(255,215,0,.7)";
  glow.style.transform = "translate(-50%,-50%)";

  /* ===============================
     REVEAL ON SCROLL
  =============================== */
  const revealItems = document.querySelectorAll(
    ".section, .card, .work-item, .poster-item, .stat-box, .hero-card"
  );

  revealItems.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = ".8s ease";
  });

  function revealNow() {
    revealItems.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < window.innerHeight - 80) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }

  /* ===============================
     COUNTERS
  =============================== */
  const counters = document.querySelectorAll(".stat-box h2");

  function runCounters() {
    counters.forEach(counter => {

      if (counter.dataset.done) return;

      const top = counter.getBoundingClientRect().top;

      if (top < window.innerHeight) {

        counter.dataset.done = "yes";

        const target = parseInt(counter.innerText.replace(/\D/g, ""));
        let count = 0;
        const speed = target / 60;

        function update() {
          count += speed;

          if (count < target) {
            counter.innerText = Math.floor(count) + "+";
            requestAnimationFrame(update);
          } else {
            counter.innerText = target + "+";
          }
        }

        update();
      }

    });
  }

  /* ===============================
     NAVBAR HIDE SHOW
  =============================== */
  let lastScroll = 0;
  const nav = document.querySelector(".navbar");

  function navbarControl() {
    const current = window.pageYOffset;

    if (nav) {
      if (current > lastScroll && current > 120) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }
    }

    lastScroll = current;
  }

  /* ===============================
     SCROLL EVENTS
  =============================== */
  window.addEventListener("scroll", () => {

    revealNow();
    runCounters();
    navbarControl();

    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;

    progressBar.style.width = progress + "%";

  });

  revealNow();
  runCounters();

  /* ===============================
     CURSOR MOVE
  =============================== */
  document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    document.body.appendChild(dot);

    setTimeout(() => {
      dot.style.opacity = "0";
      dot.style.transform = "scale(2)";
    }, 10);

    setTimeout(() => {
      dot.remove();
    }, 400);

  });

  /* ===============================
     CARD 3D HOVER
  =============================== */
  document.querySelectorAll(".card, .poster-item, .work-item").forEach(card => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 12;
      const rotateX = ((y / rect.height) - 0.5) * -12;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    });

  });

  /* ===============================
     MAGNETIC BUTTONS
  =============================== */
  document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mousemove", (e) => {

      const rect = btn.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform =
        `translate(${x * 0.18}px, ${y * 0.18}px)`;

    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)";
    });

  });

  /* ===============================
     PAGE TRANSITION
  =============================== */
  document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function (e) {

      const href = this.getAttribute("href");

      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("http") &&
        !this.hasAttribute("target")
      ) {

        e.preventDefault();

        document.body.style.opacity = "0";
        document.body.style.transform = "translateY(20px)";
        document.body.style.transition = ".45s ease";

        setTimeout(() => {
          window.location.href = href;
        }, 450);
      }

    });

  });

});
