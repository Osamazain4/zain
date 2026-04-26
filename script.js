// script.js

const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{
threshold:0.15
});

document.querySelectorAll(".fade-up").forEach((el)=>{
observer.observe(el);
});


// Smooth header shadow on scroll
window.addEventListener("scroll",()=>{

const header = document.querySelector(".header");

if(window.scrollY > 40){
header.style.boxShadow = "0 8px 25px rgba(0,0,0,.35)";
}else{
header.style.boxShadow = "none";
}

});


// Simple page load animation
window.addEventListener("load",()=>{

document.body.style.opacity = "1";

});
