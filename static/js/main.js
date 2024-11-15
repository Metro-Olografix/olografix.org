document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const elements = {
    mobileMenu: document.getElementById("mobileMenu"),
    menuToggle: document.getElementById("mobileMenu"),
    mainMenu: document.getElementById("main-menu"),
    menuIconClosed: document.getElementById("menu-icon-closed"),
    menuIconOpen: document.getElementById("menu-icon-open"),
    menuText: document.getElementById("menu-text"),
    menuCloseText: document.getElementById("menu-close-text"),
    closeButton: document.getElementById("closeMenu"),
    mainMenuButton: document.getElementById("mainMenuButton"),
  };

  // State management
  const menuState = {
    isOpen: false,
  };

  /**
   * Toggles the menu state and updates UI accordingly
   * @param {boolean} [forceClose] - Optional parameter to force close the menu
   */
  function toggleMenu(forceClose = false) {
    menuState.isOpen = forceClose ? false : !menuState.isOpen;

    // Using an array of elements to toggle makes it more maintainable
    [
      [elements.mainMenu, "hidden"],
      [elements.menuToggle, "open"],
      [elements.menuIconClosed, "hidden"],
      [elements.menuIconOpen, "hidden"],
      [elements.menuText, "hidden"],
      [elements.menuCloseText, "hidden"],
    ].forEach(([element, className]) => {
      if (element) {
        element.classList.toggle(className);
      }
    });

    // Update mobile menu visibility
    if (elements.mobileMenu) {
      elements.mobileMenu.classList[menuState.isOpen ? "remove" : "add"](
        "hidden"
      );
    }
  }

  // Event Handlers
  function handleEscapeKey(event) {
    if (event.key === "Escape" && menuState.isOpen) {
      toggleMenu(true);
    }
  }

  function handleMenuButtonClick(event) {
    if (event) {
      event.preventDefault();
    }
    toggleMenu();
  }

  // Event Listeners
  if (elements.mainMenuButton) {
    elements.mainMenuButton.addEventListener("click", handleMenuButtonClick);
  }

  // Separate close button handler to ensure it always forces close
  if (elements.closeButton) {
    elements.closeButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event bubbling
      toggleMenu(true);
    });
  }

  // Global event listeners
  document.addEventListener("keydown", handleEscapeKey);

  document
    .getElementById("mainMenuButton")
    .addEventListener("click", function () {
      document.getElementById("mobileMenu").classList.remove("hidden");
      document.getElementById("mainMenuButton").classList.add("hidden");
      document.getElementById("closeMenu").classList.remove("hidden");
    });

  document.getElementById("closeMenu").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.add("hidden");
    document.getElementById("closeMenu").classList.add("hidden");
    document.getElementById("mainMenuButton").classList.remove("hidden");
  });
});

eval(atob("KCgpPT57Y29uc29sZS5sb2coImNpIGhhbm5vIGg0Y2szcmE0dDAhISEhIik7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiLmh1Z28tdGV4dCIpLHQ9ITEsbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoIm1vdXNlZW50ZXIiLCgoKT0+dD0hMCkpLGUuYWRkRXZlbnRMaXN0ZW5lcigibW91c2VsZWF2ZSIsKCgpPT50PSExKSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigia2V5ZG93biIsKG89PnshbiYmdCYmInMiPT09by5rZXkudG9Mb3dlckNhc2UoKSYmKG49ITAsZS5pbm5lckhUTUw9JzxzcGFuIGNsYXNzPSJsZXR0ZXIgcm90YXRlIj5TPC9zcGFuPnVnbycsc2V0VGltZW91dCgoKCk9PntlLmlubmVySFRNTD0nPHNwYW4gY2xhc3M9ImxldHRlciI+SDwvc3Bhbj51Z28nLG49ITF9KSwyZTMpKX0pKX0pKCk7"));
