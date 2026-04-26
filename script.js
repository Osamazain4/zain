document.addEventListener("DOMContentLoaded", () => {

const items = document.querySelectorAll(".card,.hero-text,.hero-image");

const obs = new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.style.opacity="1";
e.target.style.transform="translateY(0)";
}
});
},{threshold:0.1});

items.forEach(el=>{
el.style.opacity="0";
el.style.transform="translateY(40px)";
el.style.transition="0.8s ease";
obs.observe(el);
});

});
