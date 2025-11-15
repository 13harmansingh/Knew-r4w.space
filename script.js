// =============================
// Page metadata (edit here)
// =============================
const PAGE_META = {
  currentModel: "Cursor Pro (Sonnet 4.5) • Codex 5.1 • Haiku 4.5 • HuggingFace API (fallback models)",
  lastUpdated: "2025-11-15",
  nextWork: `1) Move heavy inference to local CPU-hosted models for embeddings & classification.
2) Implement parallel racing for API fallbacks to reduce latency.
3) Add publisher-level crawler backoff + robust robots.txt handling.
4) Start YC pack and investor outreach (deck + one-pager).`
};

// Populate UI
document.addEventListener('DOMContentLoaded', () => {
  const cur = document.getElementById('currentModel');
  const lu = document.getElementById('lastUpdated');
  const nw = document.getElementById('nextWork');
  const nextWorkBlock = document.getElementById('nextWorkBlock');

  if (cur) cur.textContent = PAGE_META.currentModel;
  if (lu) lu.textContent = PAGE_META.lastUpdated;
  if (nw) nw.textContent = PAGE_META.nextWork;
  if (nextWorkBlock) nextWorkBlock.textContent = PAGE_META.nextWork;

  // download PDF button
  const downloadBtn = document.getElementById('downloadPdf');
  if (downloadBtn){
    downloadBtn.addEventListener('click', async () => {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Preparing PDF…';
      try {
        await generatePDFSnapshot();
      } catch (err) {
        alert('Could not prepare PDF: ' + (err && err.message ? err.message : err));
      } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download PDF';
      }
    });
  }
});

// Simple client-side PDF generator using print stylesheet trick
async function generatePDFSnapshot(){
  // Add a print-friendly wrapper
  const originalTitle = document.title;
  document.title = `KNEW - Snapshot ${PAGE_META.lastUpdated}`;

  // Open print dialog (user can Save as PDF)
  window.print();

  // restore
  document.title = originalTitle;
  return;
}

// Optional: copy to clipboard for quick investor notes
function copyOverviewToClipboard(){
  const overview = document.querySelector('#overview');
  if (!overview) return;
  const text = overview.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Overview copied to clipboard');
  }).catch(() => {
    alert('Copy failed');
  });
}