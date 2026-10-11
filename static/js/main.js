// Metro Olografix — site behaviour. No dependencies.
document.addEventListener("DOMContentLoaded", () => {
  // ── Mobile menu ────────────────────────────────────────────────
  const menu = document.getElementById("mm");
  const openBtn = document.getElementById("ob");
  const closeBtn = document.getElementById("cm");

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("open", open);
    // No scroll lock: the menu is a full-screen overlay, and locking the page makes it jump on mobile browsers.
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
    if (open && closeBtn) closeBtn.focus();
    if (!open && openBtn) openBtn.focus();
  }

  openBtn?.addEventListener("click", () => setMenu(true));
  closeBtn?.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu?.classList.contains("open")) setMenu(false);
  });

  // ── Nav background once the page scrolls ───────────────────────
  const nav = document.getElementById("nav");
  const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── Live sede status (open / closed) ───────────────────────────
  const STATUS_API = {
    pescara: "https://sede.olografix.org/s/pescara/status",
    laquila: "https://sede.olografix.org/s/laquila/status",
  };

  function updateSedeStatus(sedeId) {
    const widgets = document.querySelectorAll(`.status[data-sede="${sedeId}"]`);
    if (!widgets.length) return;
    fetch(STATUS_API[sedeId])
      .then((r) => r.text())
      .then((data) => {
        const isOpen = data.trim() === "true";
        widgets.forEach((w) => {
          w.dataset.state = isOpen ? "open" : "closed";
          w.querySelector(".status__t").textContent = isOpen ? w.dataset.textOpen : w.dataset.textClosed;
        });
      })
      .catch((err) => console.error(`Error fetching status for ${sedeId}:`, err));
  }

  const updateAll = () => Object.keys(STATUS_API).forEach(updateSedeStatus);
  updateAll();
  setInterval(updateAll, 60000);
});

eval(
  atob(
    "KCgpPT57Y29uc29sZS5sb2coImNpIGhhbm5vIGg0Y2szcmE0dDAhISEhIik7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiLmh1Z28tdGV4dCIpLHQ9ITEsbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoIm1vdXNlZW50ZXIiLCgoKT0+dD0hMCkpLGUuYWRkRXZlbnRMaXN0ZW5lcigibW91c2VsZWF2ZSIsKCgpPT50PSExKSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigia2V5ZG93biIsKG89PnshbiYmdCYmInMiPT09by5rZXkudG9Mb3dlckNhc2UoKSYmKG49ITAsZS5pbm5lckhUTUw9JzxzcGFuIGNsYXNzPSJsZXR0ZXIgcm90YXRlIj5TPC9zcGFuPnVnbycsc2V0VGltZW91dCgoKCk9PntlLmlubmVySFRNTD0nPHNwYW4gY2xhc3M9ImxldHRlciI+SDwvc3Bhbj51Z28nLG49ITF9KSwyZTMpKX0pKX0pKCk7"
  )
);
