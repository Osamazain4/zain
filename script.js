/* =====================================
V11 FINAL PRO SCRIPT.JS
Working Arrows + Slider + Search
===================================== */

document.addEventListener("DOMContentLoaded", function () {

const slider = document.getElementById("worksSlider");
const leftBtn = document.getElementById("slideLeft");
const rightBtn = document.getElementById("slideRight");
const search = document.getElementById("searchInput");

/* =============================
ARROW BUTTONS
============================= */
if (slider && leftBtn && rightBtn) {

leftBtn.addEventListener("click", function () {
slider.scrollBy({
left: -420,
behavior: "smooth"
});
});

rightBtn.addEventListener("click", function () {
slider.scrollBy({
left: 420,
behavior: "smooth"
});
});

}

/* =============================
MOUSE WHEEL SIDE SCROLL
============================= */
if (slider) {

slider.addEventListener("wheel", function (e) {
e.preventDefault();
slider.scrollLeft += e.deltaY * 1.2;
}, { passive:false });

}

/* =============================
DRAG TO SCROLL
============================= */
if (slider) {

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", function (e) {
isDown = true;
slider.style.cursor = "grabbing";
startX = e.pageX - slider.offsetLeft;
scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", function () {
isDown = false;
slider.style.cursor = "grab";
});

slider.addEventListener("mouseup", function () {
isDown = false;
slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", function (e) {

if (!isDown) return;

e.preventDefault();

const x = e.pageX - slider.offsetLeft;
const walk = (x - startX) * 1.8;

slider.scrollLeft = scrollLeft - walk;

});

}

/* =============================
TOUCH SWIPE
============================= */
if (slider) {

let touchStart = 0;
let firstScroll = 0;

slider.addEventListener("touchstart", function (e) {
touchStart = e.touches[0].clientX;
firstScroll = slider.scrollLeft;
});

slider.addEventListener("touchmove", function (e) {
const move = e.touches[0].clientX;
const diff = move - touchStart;
slider.scrollLeft = firstScroll - diff;
});

}

/* =============================
AUTO GLIDE
============================= */
if (slider) {

let auto = true;

slider.addEventListener("mouseenter", function () {
auto = false;
});

slider.addEventListener("mouseleave", function () {
auto = true;
});

function moveSlider() {

if (auto) {

slider.scrollLeft += 0.35;

if (
slider.scrollLeft + slider.clientWidth >=
slider.scrollWidth - 2
) {
slider.scrollLeft = 0;
}

}

requestAnimationFrame(moveSlider);
}

moveSlider();

}

/* =============================
SEARCH FILTER
============================= */
if (search && slider) {

search.addEventListener("input", function () {

const value = search.value.toLowerCase();
const cards = slider.querySelectorAll(".work-card");

cards.forEach(function (card) {

const text = card.innerText.toLowerCase();

if (text.includes(value)) {
card.style.display = "block";
} else {
card.style.display = "none";
}

});

});

}

/* =============================
GOLD CURSOR GLOW
============================= */
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

let mx = 0;
let my = 0;
let gx = 0;
let gy = 0;

document.addEventListener("mousemove", function (e) {
mx = e.clientX - 110;
my = e.clientY - 110;
});

function animateGlow() {

gx += (mx - gx) * 0.08;
gy += (my - gy) * 0.08;

glow.style.left = gx + "px";
glow.style.top = gy + "px";

requestAnimationFrame(animateGlow);
}

animateGlow();

});
