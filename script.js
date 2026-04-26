/* ==========================================
ABSOLUTE FINAL CINEMATIC JS SYSTEM
OSAMA ZAIN PORTFOLIO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ===============================
   SMOOTH SCROLL NAV
=============================== */

document.querySelectorAll("a[href^='#']").forEach(link => {
link.addEventListener("click", function(e){
e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){
window.scrollTo({
top: target.offsetTop - 60,
behavior: "smooth"
});
}
});
});


/* ===============================
   REVEAL ON SCROLL (CINEMATIC FADE)
=============================== */

const elements = document.querySelectorAll(".hero-text, .hero-image, .card, h1, h2, p, .btn");

const observer = new IntersectionObserver((entries) => {

entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";
}
});

}, { threshold: 0.15 });

elements.forEach(el => {
el.style.opacity = "0";
el.style.transform = "translateY(40px)";
el.style.transition = "0.9s ease";
observer.observe(el);
});


/* ===============================
   GOLD CURSOR GLOW EFFECT
=============================== */

const glow = document.createElement("div");

Object.assign(glow.style, {
position: "fixed",
width: "200px",
height: "200px",
borderRadius: "50%",
pointerEvents: "none",
zIndex: "-1",
filter: "blur(80px)",
background: "radial-gradient(circle, rgba(255,215,80,.18), transparent 70%)",
transform: "translate(-50%, -50%)"
});

document.body.appendChild(glow);

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", (e) => {
mouseX = e.clientX;
mouseY = e.clientY;
});

function animateGlow(){
currentX += (mouseX - currentX) * 0.08;
currentY += (mouseY - currentY) * 0.08;

glow.style.left = currentX + "px";
glow.style.top = currentY + "px";

requestAnimationFrame(animateGlow);
}

animateGlow();


/* ===============================
   BUTTON MICRO ANIMATION
=============================== */

document.querySelectorAll(".btn").forEach(btn => {

btn.addEventListener("mouseenter", () => {
btn.style.transform = "translateY(-6px) scale(1.03)";
btn.style.boxShadow = "0 10px 30px rgba(255,215,80,.25)";
});

btn.addEventListener("mouseleave", () => {
btn.style.transform = "translateY(0) scale(1)";
btn.style.boxShadow = "none";
});

});


/* ===============================
   CARD FLOAT MOTION (SUBTLE LIVING EFFECT)
=============================== */

document.querySelectorAll(".card").forEach(card => {

let t = 0;

function float(){
t += 0.01;
card.style.transform = `translateY(${Math.sin(t) * 3}px)`;
requestAnimationFrame(float);
}

float();

});


/* ===============================
   LOG (OPTIONAL)
=============================== */

console.log("🔥 Osama Zain Cinematic Portfolio Loaded Successfully");

});
