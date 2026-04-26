/* ===============================
MASTER V10.7 SCRIPT.JS
Final Real Fix
=============================== */

document.addEventListener("DOMContentLoaded", () => {

  const slider = document.getElementById("worksSlider");
  const leftBtn = document.getElementById("slideLeft");
  const rightBtn = document.getElementById("slideRight");
  const search = document.getElementById("searchInput");

  /* ==========================
     ARROW BUTTONS
  ========================== */
  if (slider && leftBtn && rightBtn) {

    leftBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: -420,
        behavior: "smooth"
      });
    });

    rightBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: 420,
        behavior: "smooth"
      });
    });

  }

  /* ==========================
     MOUSE WHEEL SIDE SCROLL
  ========================== */
  if (slider) {
    slider.addEventListener("wheel", (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY * 1.2;
    });
  }

  /* ==========================
     DRAG SLIDER
  ========================== */
  if (slider) {

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.style.cursor = "grabbing";
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.8;

      slider.scrollLeft = scrollLeft - walk;
    });

  }

  /* ==========================
     TOUCH SWIPE
  ========================== */
  if (slider) {

    let touchStart = 0;
    let startScroll = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStart = e.touches[0].clientX;
      startScroll = slider.scrollLeft;
    });

    slider.addEventListener("touchmove", (e) => {
      const move = e.touches[0].clientX;
      const diff = move - touchStart;
      slider.scrollLeft = startScroll - diff;
    });

  }

  /* ==========================
     AUTO GLIDE
  ========================== */
  if (slider) {

    let auto = true;

    slider.addEventListener("mouseenter", () => auto = false);
    slider.addEventListener("mouseleave", () => auto = true);

    function animate() {

      if (auto) {

        slider.scrollLeft += 0.35;

        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 2
        ) {
          slider.scrollLeft = 0;
        }

      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ==========================
     SEARCH FILTER
  ========================== */
  if (search && slider) {

    search.addEventListener("input", () => {

      const val = search.value.toLowerCase();
      const cards = slider.querySelectorAll(".work-card");

      cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(val)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }

      });

    });

  }

  /* ==========================
     GOLD CURSOR GLOW
  ========================== */
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

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX - 110;
    my = e.clientY - 110;
  });

  function glowMove() {

    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;

    glow.style.left = gx + "px";
    glow.style.top = gy + "px";

    requestAnimationFrame(glowMove);
  }

  glowMove();

});
