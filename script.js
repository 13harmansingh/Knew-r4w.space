// redirect behavior and countdown
(function(){
  const REDIRECT = "https://knew.network";
  const enterButtons = [document.getElementById("enterBtn"), document.getElementById("enterBtnHero")].filter(Boolean);
  const timerEl = document.getElementById("timer");
  const learnBtn = document.getElementById("learnBtn");

  // Click handlers (open same tab)
  enterButtons.forEach(btn=>{
    btn.addEventListener("click", ()=> {
      window.location.href = REDIRECT;
    });
  });

  // Smooth scroll to about
  if (learnBtn) {
    learnBtn.addEventListener("click", ()=> {
      const el = document.getElementById("about") || document.querySelector(".about");
      if (el) el.scrollIntoView({behavior: "smooth", block: "start"});
    });
  }

  // Optional auto-redirect (disabled by default, set seconds > 0 to enable)
  let countdownSeconds = 0; // <- set to 7 (or any) to enable auto redirect
  if (timerEl) timerEl.textContent = countdownSeconds;

  if (countdownSeconds > 0) {
    let s = countdownSeconds;
    const interval = setInterval(()=> {
      s--;
      timerEl.textContent = s;
      if (s <= 0) {
        clearInterval(interval);
        window.location.href = REDIRECT;
      }
    }, 1000);
  }
})();
// Smooth fade-in animations on scroll
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));