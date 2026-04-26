/* ==================================
   OSAMA ZAIN MASTER V7 SCRIPT.JS
   LAYERED CINEMATIC GOLD
================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CREATE LAYER ELEMENTS
  ========================== */
  const glow = document.createElement("div");
  glow.id = "cursorGlow";
  document.body.appendChild(glow);

  const dustCanvas = document.createElement("canvas");
  dustCanvas.id = "dustCanvas";
  document.body.appendChild(dustCanvas);

  const grainCanvas = document.createElement("canvas");
  grainCanvas.id = "grainCanvas";
  document.body.appendChild(grainCanvas);

  const vignette = document.createElement("div");
  vignette.id = "vignette";
  document.body.appendChild(vignette);


  /* =========================
     CURSOR LIGHT
  ========================== */
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let gx = mx, gy = my;

  document.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateGlow(){
    gx += (mx - gx) * 0.10;
    gy += (my - gy) * 0.10;

    glow.style.left = gx + "px";
    glow.style.top  = gy + "px";

    requestAnimationFrame(animateGlow);
  }
  animateGlow();


  /* =========================
     DUST PARTICLES
  ========================== */
  const dctx = dustCanvas.getContext("2d");
  let w = dustCanvas.width = window.innerWidth;
  let h = dustCanvas.height = window.innerHeight;

  function resizeAll(){
    w = dustCanvas.width = grainCanvas.width = window.innerWidth;
    h = dustCanvas.height = grainCanvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeAll);

  class Particle{
    constructor(near=false){
      this.near = near;
      this.reset();
    }

    reset(){
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = this.near ? Math.random()*2.6+1 : Math.random()*1.5+.4;
      this.vx = (Math.random()-.5) * (this.near ? .28 : .12);
      this.vy = Math.random()*-.25 - .05;
      this.a = this.near ? Math.random()*.35+.08 : Math.random()*.18+.04;
    }

    update(){
      this.x += this.vx;
      this.y += this.vy;

      const dx = this.x - mx;
      const dy = this.y - my;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if(dist < 160){
        this.x += dx * 0.012;
        this.y += dy * 0.012;
      }

      if(this.y < -20 || this.x < -30 || this.x > w+30){
        this.reset();
        this.y = h + 20;
      }
    }

    draw(){
      dctx.beginPath();
      dctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      dctx.fillStyle = `rgba(255,215,110,${this.a})`;
      dctx.shadowBlur = this.near ? 12 : 6;
      dctx.shadowColor = "rgba(255,215,110,.45)";
      dctx.fill();
    }
  }

  const particles = [];
  for(let i=0;i<38;i++) particles.push(new Particle(false));
  for(let i=0;i<18;i++) particles.push(new Particle(true));

  function animateDust(){
    dctx.clearRect(0,0,w,h);

    particles.forEach(p=>{
      p.update();
      p.draw();
    });

    requestAnimationFrame(animateDust);
  }
  animateDust();


  /* =========================
     FILM GRAIN
  ========================== */
  const gctx = grainCanvas.getContext("2d");

  function drawGrain(){
    const img = gctx.createImageData(w,h);
    const data = img.data;

    for(let i=0;i<data.length;i+=4){
      const val = Math.random()*255;
      data[i] = val;
      data[i+1] = val;
      data[i+2] = val;
      data[i+3] = 18;
    }

    gctx.putImageData(img,0,0);
  }

  setInterval(drawGrain, 120);


  /* =========================
     HERO IMAGE TILT
  ========================== */
  const frame = document.querySelector(".frame");

  if(frame){
    document.addEventListener("mousemove", e => {

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      const ry = (e.clientX - cx) / 38;
      const rx = (cy - e.clientY) / 38;

      frame.style.transform =
      `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    document.addEventListener("mouseleave", ()=>{
      frame.style.transform =
      `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
  }


  /* =========================
     PARALLAX SECTION SHIFT
  ========================== */
  document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - .5) * 8;
    const y = (e.clientY / window.innerHeight - .5) * 8;

    document.querySelectorAll("section").forEach(sec=>{
      sec.style.transform = `translate(${x*0.2}px,${y*0.15}px)`;
    });
  });


  /* =========================
     REVEAL ON SCROLL
  ========================== */
  const reveals = document.querySelectorAll(".reveal");

  function reveal(){
    const trigger = window.innerHeight * .88;

    reveals.forEach(el=>{
      const top = el.getBoundingClientRect().top;

      if(top < trigger){
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal();


  /* =========================
     CARD 3D HOVER
  ========================== */
  const cards = document.querySelectorAll(".card");

  cards.forEach(card=>{

    card.addEventListener("mousemove", e => {

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rx = ((y/rect.height)-.5)*-10;
      const ry = ((x/rect.width)-.5)*10;

      card.style.transform =
      `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", ()=>{
      card.style.transform = "translateY(0)";
    });

  });

});
