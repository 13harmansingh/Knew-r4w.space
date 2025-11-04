// Final cinematic founder-level reveal
// - 4 lines, sequential reveal with subtle depth
// - final line glows purple, then white flash + confetti + redirect
// - any pointerdown/keyboard triggers immediate final
// - respects prefers-reduced-motion
(() => {
  const REDIRECT = 'https://knew.network';
  const LINES = [
    document.getElementById('line1'),
    document.getElementById('line2'),
    document.getElementById('line3'),
    document.getElementById('line4')
  ];
  const FLASH = document.getElementById('flash');
  const BUTTERFLY = document.getElementById('butterfly');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // timing values (tuned)
  const STAGGER = prefersReduced ? 300 : 900; // ms between reveals
  const FINAL_DWELL = prefersReduced ? 300 : 700;
  const MAX_SAFE = 7000; // safety redirect in case of failure

  // show lines with subtle depth offsets
  function revealSequence() {
    LINES.forEach((ln) => ln.classList.remove('visible'));
    LINES.forEach((ln, i) => {
      setTimeout(() => {
        // depth: earlier lines appear slightly "farther"
        const z = -40 + i * 12; // -40, -28, -16, -4
        ln.style.transform = `translate3d(-50%,-50% , ${z}px)`;
        ln.classList.add('visible');
      }, i * STAGGER);
    });

    // schedule final action after last reveal + dwell
    const total = (LINES.length - 1) * STAGGER + FINAL_DWELL;
    setTimeout(() => doFinal(), total);
  }

  // confetti burst (purple + white)
  function fireConfetti() {
    if (typeof confetti !== 'function') return;
    confetti({
      particleCount: 110,
      spread: 140,
      origin: { x: 0.5, y: 0.25 },
      colors: ['#ffffff', '#6B23DC']
    });
    setTimeout(() => confetti({
      particleCount: 70,
      spread: 90,
      origin: { x: 0.5, y: 0.35 },
      colors: ['#ffffff', '#9B6BFF']
    }), 160);
  }

  // final: flash, confetti, redirect
  let finalRun = false;
  function doFinal() {
    if (finalRun) return;
    finalRun = true;

    // ensure last line visible (if not)
    const last = LINES[LINES.length - 1];
    if (last && !last.classList.contains('visible')) {
      last.classList.add('visible');
      last.style.transform = 'translate3d(-50%,-50% , 0px)';
    }

    // small delay (let final glow register)
    setTimeout(() => {
      FLASH.style.opacity = '1';
      try { fireConfetti(); } catch (e) {}
      setTimeout(() => window.location.href = REDIRECT, 340);
    }, 420);
  }

  // any user interaction triggers final immediately
  function attachInteraction() {
    const one = (e) => {
      e.preventDefault();
      doFinal();
    };
    document.addEventListener('pointerdown', one, { once: true, passive: false });
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        doFinal();
      }
    }, { once: true });
  }

  // safety fallback
  setTimeout(() => { if (!finalRun) doFinal(); }, MAX_SAFE);

  // init
  document.addEventListener('DOMContentLoaded', () => {
    revealSequence();
    attachInteraction();
    // subtle butterfly vanish into scene (if present)
    if (BUTTERFLY && !prefersReduced) {
      setTimeout(() => {
        BUTTERFLY.style.transition = 'opacity 520ms ease, transform 600ms ease';
        BUTTERFLY.style.opacity = '0';
        BUTTERFLY.style.transform = 'translateY(-18px) scale(0.9)';
      }, 1400);
    } else if (BUTTERFLY) {
      BUTTERFLY.style.opacity = '0.9';
    }
  });
})();