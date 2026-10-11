// Metro Olografix — site behaviour. No dependencies.
document.addEventListener("DOMContentLoaded", () => {
  // ── Mobile menu ────────────────────────────────────────────────
  const menu = document.getElementById("mm");
  const openBtn = document.getElementById("ob");
  const closeBtn = document.getElementById("cm");

  // While the menu is open, everything behind it is inert: no focus, no screen-reader access.
  const behind = [document.querySelector(".skip"), document.getElementById("nav"), document.getElementById("main"), document.querySelector(".foot")].filter(Boolean);

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("open", open);
    behind.forEach((el) => { el.inert = open; });
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

  // ── Desktop dropdown: keep aria-expanded in sync with hover / keyboard focus
  document.querySelectorAll(".dd").forEach((dd) => {
    const btn = dd.querySelector("button");
    if (!btn) return;
    btn.setAttribute("aria-expanded", "false");
    const set = (v) => btn.setAttribute("aria-expanded", String(v));
    // Esc dismisses the open menu (WCAG 1.4.13) until the pointer or focus leaves, or the button is used again.
    const reopen = () => dd.classList.remove("dd--closed");
    dd.addEventListener("mouseenter", () => { if (!dd.classList.contains("dd--closed")) set(true); });
    dd.addEventListener("mouseleave", () => { reopen(); set(dd.contains(document.activeElement)); });
    dd.addEventListener("focusin", () => { if (!dd.classList.contains("dd--closed")) set(true); });
    dd.addEventListener("focusout", (e) => { if (!dd.contains(e.relatedTarget)) { reopen(); set(false); } });
    btn.addEventListener("click", () => { reopen(); set(true); });
    dd.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || dd.classList.contains("dd--closed")) return;
      dd.classList.add("dd--closed");
      set(false);
      btn.focus();
    });
  });


  // ── Live sede status (open / closed) ───────────────────────────
  const STATUS_API = {
    pescara: "https://sede.olografix.org/s/pescara/status",
    laquila: "https://sede.olografix.org/s/laquila/status",
  };

  // Only touch the text when the state changes, so the live region isn't re-announced every minute.
  function setStatus(widgets, state) {
    widgets.forEach((w) => {
      if (w.dataset.state === state) return;
      w.dataset.state = state;
      const text = { open: w.dataset.textOpen, closed: w.dataset.textClosed, unknown: w.dataset.textUnknown }[state];
      w.querySelector(".status__t").textContent = text;
    });
  }

  function updateSedeStatus(sedeId) {
    const widgets = document.querySelectorAll(`.status[data-sede="${sedeId}"]`);
    if (!widgets.length) return;
    fetch(STATUS_API[sedeId], { cache: "no-store", signal: AbortSignal.timeout?.(8000) })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        // Anything but a plain true/false (an error page, an empty body) is "unknown", never "closed".
        const value = data.trim();
        if (value !== "true" && value !== "false") throw new Error(`unexpected response "${value.slice(0, 40)}"`);
        setStatus(widgets, value === "true" ? "open" : "closed");
      })
      .catch((err) => {
        console.error(`Error fetching status for ${sedeId}:`, err);
        setStatus(widgets, "unknown");
      });
  }

  if (document.querySelector(".status[data-sede]")) {
    const updateAll = () => Object.keys(STATUS_API).forEach(updateSedeStatus);
    let timer;
    const poll = () => {
      updateAll();
      timer = setInterval(updateAll, 60000);
    };
    // No polling while the tab is in the background; refresh as soon as it comes back.
    document.addEventListener("visibilitychange", () => {
      clearInterval(timer);
      if (!document.hidden) poll();
    });
    poll();
  }

  // ── Photogallery lightbox (lightbox2, loaded only on gallery pages) ──
  const gallery = document.querySelector(".gallery[data-lb-counter]");
  if (gallery && window.lightbox) {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.lightbox.option({
      albumLabel: gallery.dataset.lbCounter,
      alwaysShowNavOnTouchDevices: true,
      ...(still && { fadeDuration: 0, imageFadeDuration: 0, resizeDuration: 0 }),
    });
    // lightbox2 builds its controls with English labels (and none on close): name them in the page language
    // just before it opens. Capture phase, so this runs before lightbox2's own click handler.
    const label = (selector, text) => document.querySelector(selector)?.setAttribute("aria-label", text);
    document.addEventListener("click", (e) => {
      if (!e.target.closest("[data-lightbox]")) return;
      label(".lb-prev", gallery.dataset.lbPrev);
      label(".lb-next", gallery.dataset.lbNext);
      label(".lb-close", gallery.dataset.lbClose);
    }, true);
  }
});

eval(
  atob(
    "KCgpPT57Y29uc29sZS5sb2coImNpIGhhbm5vIGg0Y2szcmE0dDAhISEhIik7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiLmh1Z28tdGV4dCIpLHQ9ITEsbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoIm1vdXNlZW50ZXIiLCgoKT0+dD0hMCkpLGUuYWRkRXZlbnRMaXN0ZW5lcigibW91c2VsZWF2ZSIsKCgpPT50PSExKSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigia2V5ZG93biIsKG89PnshbiYmdCYmInMiPT09by5rZXkudG9Mb3dlckNhc2UoKSYmKG49ITAsZS5pbm5lckhUTUw9JzxzcGFuIGNsYXNzPSJsZXR0ZXIgcm90YXRlIj5TPC9zcGFuPnVnbycsc2V0VGltZW91dCgoKCk9PntlLmlubmVySFRNTD0nPHNwYW4gY2xhc3M9ImxldHRlciI+SDwvc3Bhbj51Z28nLG49ITF9KSwyZTMpKX0pKX0pKCk7"
  )
);
