// script.js

document.addEventListener("DOMContentLoaded", () => {

  // Scroll animation
  const items = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  items.forEach(item => observer.observe(item));


  // Active nav link
  const current = window.location.pathname.split("/").pop();

  document.querySelectorAll("nav a").forEach(link=>{
    const href = link.getAttribute("href");

    if(
      href === current ||
      (current === "" && href === "index.html")
    ){
      link.classList.add("active");
    }
  });


  // Counter animation
  const counters = document.querySelectorAll("[data-count]");

  const runCounter = (el)=>{
    const target = +el.getAttribute("data-count");
    let count = 0;
    const speed = Math.max(15, 1200 / target);

    const timer = setInterval(()=>{
      count++;
      el.textContent = count + (target >= 10 ? "+" : "");
      if(count >= target){
        clearInterval(timer);
      }
    }, speed);
  };

  const counterObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.5});

  counters.forEach(counter=>{
    counterObserver.observe(counter);
  });


  // Smooth top on logo click
  const logo = document.querySelector(".logo");
  if(logo){
    logo.addEventListener("click", ()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      });
    });
  }

});
