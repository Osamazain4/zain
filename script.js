/* ==========================================
MASTER V10.6 SCRIPT.JS
Clean Premium Controls
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENTS */
  const slider = document.getElementById("worksSlider");
  const leftBtn = document.getElementById("slideLeft");
  const rightBtn = document.getElementById("slideRight");
  const search = document.getElementById("searchWorks");
  const nav = document.querySelector("nav");

  /* ==================================
     REVEAL ON SCROLL
  ================================== */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  },{ threshold:.12 });

  reveals.forEach(item => observer.observe(item));


  /* ==================================
     LEFT RIGHT BUTTONS
  ================================== */
  if(slider && leftBtn && rightBtn){

    leftBtn.addEventListener("click", ()=>{
      slider.scrollBy({
        left:-380,
        behavior:"smooth"
      });
    });

    rightBtn.addEventListener("click", ()=>{
      slider.scrollBy({
        left:380,
        behavior:"smooth"
      });
    });

  }


  /* ==================================
     WHEEL SIDE SCROLL
  ================================== */
  if(slider){

    slider.addEventListener("wheel",(e)=>{
      e.preventDefault();
      slider.scrollLeft += e.deltaY * 1.1;
    });

  }


  /* ==================================
     DRAG SCROLL
  ================================== */
  if(slider){

    let down = false;
    let startX;
    let scrollStart;

    slider.addEventListener("mousedown",(e)=>{
      down = true;
      slider.style.cursor = "grabbing";
      startX = e.pageX - slider.offsetLeft;
      scrollStart = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave",()=>{
      down = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseup",()=>{
      down = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove",(e)=>{
      if(!down) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.7;

      slider.scrollLeft = scrollStart - walk;
    });

  }


  /* ==================================
     TOUCH SWIPE
  ================================== */
  if(slider){

    let touchX = 0;
    let touchScroll = 0;

    slider.addEventListener("touchstart",(e)=>{
      touchX = e.touches[0].clientX;
      touchScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchmove",(e)=>{
      const move = e.touches[0].clientX;
      const diff = move - touchX;
      slider.scrollLeft = touchScroll - diff;
    });

  }


  /* ==================================
     SEARCH FILTER
  ================================== */
  if(search && slider){

    search.addEventListener("input", ()=>{

      const val = search.value.toLowerCase();
      const cards = slider.querySelectorAll(".card");

      cards.forEach(card=>{

        const text = card.innerText.toLowerCase();

        if(text.includes(val)){
          card.style.display = "block";
        }else{
          card.style.display = "none";
        }

      });

    });

  }


  /* ==================================
     AUTO GLIDE
  ================================== */
  if(slider){

    let auto = true;

    slider.addEventListener("mouseenter", ()=>{
      auto = false;
    });

    slider.addEventListener("mouseleave", ()=>{
      auto = true;
    });

    function glide(){

      if(auto){

        slider.scrollLeft += .35;

        if(
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 2
        ){
          slider.scrollLeft = 0;
        }

      }

      requestAnimationFrame(glide);
    }

    glide();

  }


  /* ==================================
     NAVBAR SCROLL EFFECT
  ================================== */
  window.addEventListener("scroll", ()=>{

    if(window.scrollY > 30){
      nav.style.background = "rgba(0,0,0,.88)";
    }else{
      nav.style.background = "rgba(0,0,0,.78)";
    }

  });


  /* ==================================
     GOLD CURSOR GLOW
  ================================== */
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

  let mx = 0, my = 0;
  let gx = 0, gy = 0;

  document.addEventListener("mousemove",(e)=>{
    mx = e.clientX - 110;
    my = e.clientY - 110;
  });

  function animateGlow(){

    gx += (mx - gx) * .08;
    gy += (my - gy) * .08;

    glow.style.left = gx + "px";
    glow.style.top = gy + "px";

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

});
