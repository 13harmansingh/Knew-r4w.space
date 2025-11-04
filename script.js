let seconds = 7;
const timer = document.getElementById("timer");
const redirectBtn = document.getElementById("redirectBtn");

const redirectURL = "https://knew.network";

redirectBtn.addEventListener("click", () => {
  window.location.href = redirectURL;
});

const countdown = setInterval(() => {
  seconds--;
  timer.textContent = seconds;
  if (seconds <= 0) {
    clearInterval(countdown);
    window.location.href = redirectURL;
  }
}, 1000);
