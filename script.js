// MASTER script.js - OSAMA ZAIN

document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // Fade In On Scroll
  // =========================
  const items = document.querySelectorAll(".card, .section-title, .hero h1, .hero p, .gallery img");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold:0.15
  });

  items.forEach(item=>{
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all .8s ease";
    observer.observe(item);
  });


  // =========================
  // Image Popup Viewer
  // =========================
  const galleryImages = document.querySelectorAll(".gallery img");

  if(galleryImages.length > 0){

    const popup = document.createElement("div");
    popup.id = "imgPopup";
    popup.innerHTML = `
      <span id="closePopup">&times;</span>
      <img id="popupImg" src="">
    `;
    document.body.appendChild(popup);

    popup.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,.92);
      display:none;
      justify-content:center;
      align-items:center;
      z-index:99999;
      flex-direction:column;
      padding:20px;
    `;

    const popupImg = popup.querySelector("#popupImg");
    popupImg.style.cssText = `
      max-width:90%;
      max-height:85%;
      border-radius:14px;
      box-shadow:0 0 30px rgba(255,215,0,.18);
    `;

    const closeBtn = popup.querySelector("#closePopup");
    closeBtn.style.cssText = `
      position:absolute;
      top:25px;
      right:35px;
      color:#fff;
      font-size:42px;
      cursor:pointer;
      font-weight:bold;
    `;

    galleryImages.forEach(img=>{
      img.addEventListener("click", ()=>{
        popup.style.display = "flex";
        popupImg.src = img.src;
      });
    });

    closeBtn.addEventListener("click", ()=>{
      popup.style.display = "none";
    });

    popup.addEventListener("click", (e)=>{
      if(e.target === popup){
        popup.style.display = "none";
      }
    });
  }


  // =========================
  // Active Nav Link Highlight
  // =========================
  const links = document.querySelectorAll("nav a");
  const page = location.pathname.split("/").pop();

  links.forEach(link=>{
    const href = link.getAttribute("href");
    if(href === page){
      link.classList.add("active");
    }
  });


  // =========================
  // Smooth Button Hover Pulse
  // =========================
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn=>{
    btn.addEventListener("mouseenter", ()=>{
      btn.style.transform = "scale(1.06)";
    });

    btn.addEventListener("mouseleave", ()=>{
      btn.style.transform = "scale(1)";
    });
  });

});
