// ====================================
// OSAMA ZAIN - MASTER V4 FINAL
// SCRIPT.JS
// ====================================

// ---------------------------
// GOLD CURSOR PARTICLES
// ---------------------------
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

let particles = [];
let mouse = {
    x: w / 2,
    y: h / 2
};

document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 6; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

document.addEventListener("touchmove", (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;

    for (let i = 0; i < 6; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = Math.random() * 4 + 1;

        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;

        this.life = 80;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.life--;
        this.opacity -= 0.012;
        this.size *= 0.98;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(242,201,76,${this.opacity})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#f2c94c";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, w, h);

    // Floating ambient stars
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(242,201,76,0.08)";
        ctx.arc(
            (Math.sin(Date.now() * 0.0002 + i) * 400) + w / 2,
            (Math.cos(Date.now() * 0.0003 + i) * 300) + h / 2,
            1.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0 || particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// ---------------------------
// HERO PARALLAX PHOTO
// ---------------------------
const photo = document.querySelector(".photo-frame");

document.addEventListener("mousemove", (e) => {
    if (!photo) return;

    let x = (window.innerWidth / 2 - e.clientX) / 35;
    let y = (window.innerHeight / 2 - e.clientY) / 35;

    photo.style.transform =
        `rotateY(${x}deg) rotateX(${y}deg) rotate(6deg)`;
});

// ---------------------------
// VIDEO POPUP MODAL
// ---------------------------
const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");

function openVideo(url) {
    if (!modal || !frame) return;

    frame.src = url + "?autoplay=1";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeVideo() {
    if (!modal || !frame) return;

    frame.src = "";
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

window.openVideo = openVideo;
window.closeVideo = closeVideo;

// close on background click
if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeVideo();
    });
}

// ESC close
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
});

// ---------------------------
// REVEAL ON SCROLL
// ---------------------------
const reveals = document.querySelectorAll(".card, .hero-text, .photo-frame");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform += " translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform += " translateY(40px)";
    item.style.transition = "all .8s ease";
    observer.observe(item);
});

// ---------------------------
// SMOOTH ACTIVE NAV
// ---------------------------
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// ---------------------------
// LOADER OPTIONAL
// ---------------------------
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
