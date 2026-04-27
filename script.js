// ===============================
// V15 ULTRA PREMIUM SCRIPT
// ===============================

// LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 700);

  }, 1400);
});

// MUSIC
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

// first interaction autoplay safe
document.addEventListener("click", () => {
  if (!playing) startMusic();
}, { once:true });

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

// WORK SLIDER
function slideLeft() {
  const slider = document.getElementById("workSlider");
  if (slider) slider.scrollBy({
    left: -450,
    behavior: "smooth"
  });
}

function slideRight() {
  const slider = document.getElementById("workSlider");
  if (slider) slider.scrollBy({
    left: 450,
    behavior: "smooth"
  });
}

// AUTO SLIDE
setInterval(() => {
  const slider = document.getElementById("workSlider");

  if (!slider) return;

  const maxScroll = slider.scrollWidth - slider.clientWidth;

  if (slider.scrollLeft >= maxScroll - 10) {
    slider.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  } else {
    slider.scrollBy({
      left: 450,
      behavior: "smooth"
    });
  }

}, 5000);

// CURSOR GLOW
const glow = document.createElement("div");
glow.id = "cursorGlow";

glow.style.position = "fixed";
glow.style.width = "18px";
glow.style.height = "18px";
glow.style.borderRadius = "50%";
glow.style.background = "rgba(255,215,0,.8)";
glow.style.boxShadow = "0 0 20px rgba(255,215,0,.8)";
glow.style.pointerEvents = "none";
glow.style.zIndex = "99999";
glow.style.transform = "translate(-50%, -50%)";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// FADE IN ON SCROLL
const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }

  });

}, {
  threshold: 0.15
});

document.querySelectorAll(".section, .card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all .8s ease";
  observer.observe(el);
});
/* ===============================
V15.5 PREMIUM ANIMATION PACK
script.js
================================= */

/* Loader */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader){
    setTimeout(()=>{
      loader.style.opacity="0";
      loader.style.pointerEvents="none";
      setTimeout(()=>loader.remove(),700);
    },1200);
  }
});

/* Reveal on Scroll */
const revealItems = document.querySelectorAll(
".section, .card, .work-item, .poster-item, .stat-box, .hero-card"
);

function revealOnScroll(){
  const trigger = window.innerHeight - 80;

  revealItems.forEach(item=>{
    const top = item.getBoundingClientRect().top;

    if(top < trigger){
      item.classList.add("reveal","active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Navbar Hide / Show */
let lastScroll = 0;
const nav = document.querySelector(".navbar");

window.addEventListener("scroll", ()=>{

let current = window.pageYOffset;

if(nav){
if(current > lastScroll && current > 120){
nav.style.transform = "translateY(-100%)";
}else{
nav.style.transform = "translateY(0)";
}
}

lastScroll = current;
});

/* Counter Animation */
const counters = document.querySelectorAll(".stat-box h2");

counters.forEach(counter=>{
let started = false;

function runCounter(){
const top = counter.getBoundingClientRect().top;

if(top < window.innerHeight && !started){

started = true;

const target = +counter.innerText.replace(/\D/g,'');
let count = 0;
const speed = target / 60;

const update = ()=>{
count += speed;

if(count < target){
counter.innerText = Math.floor(count) + "+";
requestAnimationFrame(update);
}else{
counter.innerText = target + "+";
}
};

update();
}
}

window.addEventListener("scroll", runCounter);
runCounter();

});

/* Mouse Glow Effect */
document.addEventListener("mousemove",(e)=>{
let glow = document.querySelector(".mouse-glow");

if(!glow){
glow = document.createElement("div");
glow.className = "mouse-glow";
document.body.appendChild(glow);

glow.style.position="fixed";
glow.style.width="18px";
glow.style.height="18px";
glow.style.borderRadius="50%";
glow.style.pointerEvents="none";
glow.style.zIndex="9999";
glow.style.background="rgba(255,215,0,.55)";
glow.style.filter="blur(8px)";
}

glow.style.left = e.clientX - 9 + "px";
glow.style.top = e.clientY - 9 + "px";
});
