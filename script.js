/* ===================================
   MASTER V10 TRUE PREMIUM
   script.js
=================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     REVEAL ON SCROLL
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  },{
    threshold:0.15
  });

  reveals.forEach(el=>revealObserver.observe(el));


  /* ===============================
     NAVBAR SCROLL EFFECT
  =============================== */
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 40){
      nav.style.background = "rgba(5,5,5,.82)";
      nav.style.backdropFilter = "blur(16px)";
      nav.style.borderBottom = "1px solid rgba(212,175,55,.10)";
    }else{
      nav.style.background = "rgba(8,8,8,.55)";
      nav.style.borderBottom = "1px solid rgba(212,175,55,.08)";
    }
  });


  /* ===============================
     CARD HOVER TILT
  =============================== */
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    card.addEventListener("mousemove", (e)=>{

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    });

    card.addEventListener("mouseleave", ()=>{
      card.style.transform = "translateY(0)";
    });

  });


  /* ===============================
     HERO IMAGE PARALLAX
  =============================== */
  const photo = document.querySelector(".photo-frame");

  if(photo){
    document.addEventListener("mousemove",(e)=>{

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = (e.clientX - centerX) / 35;
      const moveY = (e.clientY - centerY) / 35;

      photo.style.transform =
        `translate(${moveX}px, ${moveY}px)`;

    });
  }


  /* ===============================
     MOUSE SPOTLIGHT GLOW
  =============================== */
  const glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.width = "320px";
  glow.style.height = "320px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "-1";
  glow.style.filter = "blur(65px)";
  glow.style.opacity = ".22";
  glow.style.background =
    "radial-gradient(circle, rgba(212,175,55,.30), transparent 65%)";

  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove",(e)=>{
    mouseX = e.clientX - 160;
    mouseY = e.clientY - 160;
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
     LIVE SEARCH FILTER
  =============================== */
  const searchInput = document.querySelector("#searchWorks");

  if(searchInput){

    searchInput.addEventListener("input", ()=>{

      const val = searchInput.value.toLowerCase();

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
     SMOOTH SECTION PARALLAX
  =============================== */
  window.addEventListener("scroll", ()=>{

    const scrolled = window.scrollY;
    const heroes = document.querySelector(".hero");

    if(heroes){
      heroes.style.transform =
        `translateY(${scrolled * 0.08}px)`;
    }

  });


  /* ===============================
     BUTTON SHINE LOOP
  =============================== */
  const goldBtns = document.querySelectorAll(".btn-gold");

  goldBtns.forEach(btn=>{

    setInterval(()=>{
      btn.style.boxShadow =
      "0 0 35px rgba(212,175,55,.22)";
      setTimeout(()=>{
        btn.style.boxShadow =
        "0 10px 30px rgba(212,175,55,.18)";
      },800);
    },3200);

  });


});
