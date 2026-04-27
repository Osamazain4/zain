// V15.1 SCRIPT.JS

/* =========================
   PARTICLES BACKGROUND
========================= */
const particleWrap = document.getElementById("particles");

if (particleWrap) {
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("span");
    p.classList.add("particle");

    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 8;

    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = left + "%";
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = delay + "s";

    particleWrap.appendChild(p);
  }
}

/* =========================
   MUSIC CONTROL
========================= */
const music = document.getElementById("introMusic");
const musicBtn = document.querySelector(".music-btn");

function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    music.play();
    if (musicBtn) musicBtn.innerHTML = "🔊";
  } else {
    music.pause();
    if (musicBtn) musicBtn.innerHTML = "🔇";
  }
}

/* Try autoplay after first interaction */
document.addEventListener(
  "click",
  () => {
    if (music && music.paused) {
      music.play().catch(() => {});
    }
  },
  { once: true }
);

/* =========================
   SMOOTH PAGE TRANSITION
========================= */
const links = document.querySelectorAll("a[href$='.html']");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    const url = this.getAttribute("href");

    if (!url || url.startsWith("#")) return;

    e.preventDefault();
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = url;
    }, 250);
  });
});

/* Fade in on load */
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity .4s ease";
});

/* =========================
   COUNTER ANIMATION
========================= */
const counters = document.querySelectorAll(".stat-box h3");

const runCounter = (el) => {
  const text = el.innerText;
  const target = parseInt(text.replace(/\D/g, "")) || 0;
  const suffix = text.replace(/[0-9]/g, "");
  let count = 0;

  const speed = Math.max(15, 180 / target);

  const update = () => {
    count++;
    el.innerText = count + suffix;

    if (count < target) {
      setTimeout(update, speed);
    } else {
      el.innerText = target + suffix;
    }
  };

  update();
};

if (counters.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* =========================
   SCROLL REVEAL
========================= */
const revealItems = document.querySelectorAll(
  ".stat-box, .hero-left, .hero-right, .card, .gallery-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(35px)";
  item.style.transition = "all .8s ease";
  revealObserver.observe(item);
});

/* =========================
   ACTIVE NAV LINK
========================= */
const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage || (currentPage === "" && href === "index.html")) {
    link.classList.add("active");
  }
});
