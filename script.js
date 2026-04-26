/* ==========================================
MASTER V10.5 FULL SCRIPT.JS
TRUE PREMIUM + ARROW CONTROLS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     REVEAL ON SCROLL
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold:0.12
  });

  reveals.forEach(item => observer.observe(item));


  /* ===============================
     ELEMENTS
  =============================== */
  const slider = document.getElementById("worksSlider");
  const btnLeft = document.getElementById("slideLeft");
  const btnRight = document.getElementById("slideRight");
  const search = document.getElementById("searchWorks");
  const nav = document.querySelector("nav");


  /* ===============================
     LEFT / RIGHT BUTTON SCROLL
  =============================== */
  if(slider && btnLeft && btnRight){

    btnLeft.addEventListener("click", ()=>{
      slider.scrollBy({
        left:-380,
        behavior:"smooth"
      });
    });

    btnRight.addEventListener("click", ()=>{
      slider.scrollBy({
        left:380,
        behavior:"smooth"
      });
    });

  }


  /* ===============================
     MOUSE WHEEL SIDEWAYS
  =============================== */
  if(slider){

    slider.addEventListener("wheel",(e)=>{
      e.preventDefault();
      slider.scrollLeft += e.deltaY * 1.2;
    });

  }


  /* ===============================
     DRAG SCROLL
  =============================== */
  if(slider){

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown",(e)=>{
      isDown = true;
      slider.style.cursor = "grabbing";
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave",()=>{
      isDown = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseup",()=>{
      isDown = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove",(e)=>{
      if(!isDown) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.7;

      slider.scrollLeft = scrollLeft - walk;
    });

  }


  /* ===============================
     TOUCH SWIPE
  =============================== */
  if(slider){

    let touchStart = 0;
    let startScroll = 0;

    slider.addEventListener("touchstart",(e)=>{
      touchStart = e.touches[0].clientX;
      startScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchmove",(e)=>{
      const move = e.touches[0].clientX;
      const diff = move - touchStart;

      slider.scrollLeft = startScroll - diff;
    });

  }


  /* ===============================
     AUTO GLIDE
  =============================== */
  if(slider){

    let autoMove = true;

    slider.addEventListener("mouseenter",()=>{
      autoMove = false;
    });

    slider.addEventListener("mouseleave",()=>{
      autoMove = true;
    });

    function animate(){

      if(autoMove){

        slider.scrollLeft += 0.45;

        if(
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 2
        ){
          slider.scrollLeft = 0;
        }

      }

      requestAnimationFrame(animate);
    }

    animate();

  }


  /* ===============================
     SEARCH FILTER
  =============================== */
  if(search && slider){

    search.addEventListener("input",()=>{

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
     CARD TILT HOVER
  =============================== */
  const cards = document.querySelectorAll(".card");

  cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width)-0.5) * 8;
      const rotateX = ((y / rect.height)-0.5) * -8;

      card.style.transform =
      `perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-6px)`;

    });

    card.addEventListener("mouseleave",()=>{
      card.style.transform = "";
    });

  });


  /* ===============================
     NAVBAR EFFECT
  =============================== */
  window.addEventListener("scroll",()=>{

    if(window.scrollY > 40){

      nav.style.background = "rgba(0,0,0,.88)";
      nav.style.borderBottom =
      "1px solid rgba(255,210,70,.14)";

    }else{

      nav.style.background = "rgba(0,0,0,.75)";
      nav.style.borderBottom =
      "1px solid rgba(255,210,70,.08)";

    }

  });


  /* ===============================
     CURSOR GOLD GLOW
  =============================== */
  const glow = document.createElement("div");

  glow.style.position = "fixed";
  glow.style.width = "230px";
  glow.style.height = "230px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "-1";
  glow.style.filter = "blur(65px)";
  glow.style.background =
    "radial-gradient(circle, rgba(255,210,70,.20), transparent 70%)";

  document.body.appendChild(glow);

  let mx = 0, my = 0;
  let gx = 0, gy = 0;

  document.addEventListener("mousemove",(e)=>{
    mx = e.clientX - 115;
    my = e.clientY - 115;
  });

  function moveGlow(){

    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;

    glow.style.left = gx + "px";
    glow.style.top = gy + "px";

    requestAnimationFrame(moveGlow);
  }

  moveGlow();

});
