/* ===============================
MASTER V10.4 TRUE PREMIUM
HORIZONTAL MY WORKS
=============================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     REVEAL ON SCROLL
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.12
  });

  reveals.forEach(item => revealObserver.observe(item));


  /* ===============================
     HORIZONTAL SCROLL SYSTEM
  =============================== */
  const slider = document.querySelector(".horizontal-row");

  if(slider){

    /* mouse wheel => sideways */
    slider.addEventListener("wheel", (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY * 1.2;
    });

    /* drag scroll */
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e)=>{
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", ()=>{
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", ()=>{
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e)=>{
      if(!isDown) return;
      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.7;
      slider.scrollLeft = scrollLeft - walk;
    });

    /* touch support */
    let startTouchX = 0;
    let startScroll = 0;

    slider.addEventListener("touchstart", (e)=>{
      startTouchX = e.touches[0].clientX;
      startScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchmove", (e)=>{
      const moveX = e.touches[0].clientX;
      const diff = moveX - startTouchX;
      slider.scrollLeft = startScroll - diff;
    });

  }


  /* ===============================
     AUTO GLIDE
  =============================== */
  if(slider){

    let autoMove = true;

    slider.addEventListener("mouseenter", ()=> autoMove = false);
    slider.addEventListener("mouseleave", ()=> autoMove = true);
    slider.addEventListener("touchstart", ()=> autoMove = false);

    function autoScroll(){
      if(autoMove){
        slider.scrollLeft += 0.45;

        if(
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 2
        ){
          slider.scrollLeft = 0;
        }
      }

      requestAnimationFrame(autoScroll);
    }

    autoScroll();
  }


  /* ===============================
     SEARCH FILTER
  =============================== */
  const search = document.getElementById("searchWorks");

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


  /* ===============================
     PREMIUM CARD TILT
  =============================== */
  const cards = document.querySelectorAll(".card");

  cards.forEach(card=>{

    card.addEventListener("mousemove", (e)=>{

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      card.style.transform =
      `perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-6px)`;

    });

    card.addEventListener("mouseleave", ()=>{
      card.style.transform = "";
    });

  });


  /* ===============================
     NAVBAR SCROLL EFFECT
  =============================== */
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", ()=>{

    if(window.scrollY > 40){
      nav.style.background = "rgba(0,0,0,.88)";
      nav.style.borderBottom =
      "1px solid rgba(255,196,0,.16)";
    }else{
      nav.style.background = "rgba(0,0,0,.72)";
      nav.style.borderBottom =
      "1px solid rgba(255,196,0,.12)";
    }

  });


  /* ===============================
     MOUSE GOLD GLOW
  =============================== */
  const glow = document.createElement("div");

  glow.style.position = "fixed";
  glow.style.width = "240px";
  glow.style.height = "240px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "-1";
  glow.style.filter = "blur(65px)";
  glow.style.background =
    "radial-gradient(circle, rgba(255,196,0,.22), transparent 70%)";

  document.body.appendChild(glow);

  let mx = 0, my = 0;
  let gx = 0, gy = 0;

  document.addEventListener("mousemove", (e)=>{
    mx = e.clientX - 120;
    my = e.clientY - 120;
  });

  function animateGlow(){
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;

    glow.style.left = gx + "px";
    glow.style.top = gy + "px";

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

});
