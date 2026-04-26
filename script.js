/* ==================================
   OSAMA ZAIN ULTRA FINAL SCRIPT
================================== */

/* Fade In Animation */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.15
});

document.querySelectorAll(".fade").forEach(el=>{
  observer.observe(el);
});


/* Smooth Active Nav */
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link=>{
  link.addEventListener("click",()=>{
    navLinks.forEach(a=>a.classList.remove("active"));
    link.classList.add("active");
  });
});


/* Dynamic Year */
const yearBox = document.getElementById("year");
if(yearBox){
  yearBox.textContent = new Date().getFullYear();
}


/* Poster Image Error Fix */
document.querySelectorAll("img").forEach(img=>{
  img.onerror = function(){
    this.src =
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";
  };
});


/* Video Modal Popup */
function openVideo(url){

  let old = document.getElementById("videoModal");
  if(old) old.remove();

  const modal = document.createElement("div");
  modal.id = "videoModal";

  modal.innerHTML = `
    <div class="video-overlay">
      <div class="video-box">
        <span class="close-video">&times;</span>
        <iframe src="${url}"
        allowfullscreen
        allow="autoplay; encrypted-media"></iframe>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.querySelector(".close-video").onclick = ()=>{
    modal.remove();
  };

  modal.onclick = (e)=>{
    if(e.target.classList.contains("video-overlay")){
      modal.remove();
    }
  };
}

/* Add Click Events Automatically */
document.querySelectorAll("[data-video]").forEach(btn=>{
  btn.addEventListener("click",function(e){
    e.preventDefault();
    openVideo(this.dataset.video);
  });
});


/* Modal CSS Inject */
const style = document.createElement("style");
style.innerHTML = `
.video-overlay{
 position:fixed;
 inset:0;
 background:rgba(0,0,0,.88);
 z-index:99999;
 display:flex;
 align-items:center;
 justify-content:center;
 padding:20px;
}
.video-box{
 width:100%;
 max-width:980px;
 position:relative;
}
.video-box iframe{
 width:100%;
 height:560px;
 border:none;
 border-radius:16px;
 background:#000;
}
.close-video{
 position:absolute;
 right:-8px;
 top:-45px;
 color:#fff;
 font-size:42px;
 cursor:pointer;
}
@media(max-width:900px){
 .video-box iframe{
   height:420px;
 }
}
@media(max-width:600px){
 .video-box iframe{
   height:240px;
 }
 .close-video{
   top:-38px;
   font-size:34px;
 }
}
`;
document.head.appendChild(style);


/* Counter Animation */
const counters = document.querySelectorAll(".count");

function runCounter(counter){
  const target = +counter.dataset.target;
  let num = 0;
  const speed = target / 100;

  const update = ()=>{
    num += speed;
    if(num < target){
      counter.innerText = Math.floor(num);
      requestAnimationFrame(update);
    }else{
      counter.innerText = target;
    }
  };

  update();
}

const countObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      runCounter(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
});

counters.forEach(counter=>{
  countObserver.observe(counter);
});


/* Scroll Top Button */
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
bottom:22px;
right:22px;
width:46px;
height:46px;
border:none;
border-radius:50%;
background:#f0c64b;
color:#000;
font-size:22px;
font-weight:bold;
cursor:pointer;
display:none;
z-index:9999;
box-shadow:0 10px 25px rgba(0,0,0,.4);
`;

window.addEventListener("scroll",()=>{
  if(window.scrollY > 400){
    topBtn.style.display = "block";
  }else{
    topBtn.style.display = "none";
  }
});

topBtn.onclick = ()=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
};


/* Console Signature */
console.log("OSAMA ZAIN ULTRA PORTFOLIO LOADED");
