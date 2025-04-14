document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const elements = {
    menu: document.getElementById("menu"),
    closeMenuButton: document.getElementById("closeMenuButton"),
    openMenuButton: document.getElementById("openMenuButton"),
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

    // Update mobile menu visibility
    if (elements.menu) {
      elements.menu.classList[menuState.isOpen ? "remove" : "add"]("hidden");
    }
  }

  // Event Handlers
  function handleEscapeKey(event) {
    if (event.key === "Escape" && menuState.isOpen) {
      event.stopPropagation(); // Prevent event bubbling
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
  if (elements.openMenuButton) {
    elements.openMenuButton.addEventListener("click", handleMenuButtonClick);
  }

  // Separate close button handler to ensure it always forces close
  if (elements.closeMenuButton) {
    elements.closeMenuButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event bubbling
      toggleMenu(true);
    });
  }

  // Global event listeners
  document.addEventListener("keydown", handleEscapeKey);

  // Fetch and update headquarter status
  function updateHeadquarterStatus() {
    const dotElement = document.getElementById("statusDot");
    const containerElement = document.getElementById("statusContainer");
    const loadingStatus = document.getElementById("headquarterStatusLoading");
    const openStatus = document.getElementById("headquarterStatusOpen");
    const closeStatus = document.getElementById("headquarterStatusClose");
    
    fetch("https://sede.olografix.org/status")
      .then(response => response.text())
      .then(data => {
        const isOpen = data.trim() === "true";
        if (dotElement && containerElement) {
          containerElement.classList.remove("bg-gray-100", "bg-green-100", "bg-red-100");
          containerElement.classList.add(isOpen ? "bg-green-100" : "bg-red-100");
          
          dotElement.classList.remove("bg-gray-300", "bg-green-500", "bg-red-500");
          dotElement.classList.add(isOpen ? "bg-green-500" : "bg-red-500");

          loadingStatus.classList.remove("text-gray-600");
          loadingStatus.classList.add("hidden");

          openStatus.classList.remove("hidden");
          openStatus.classList.toggle("hidden", !isOpen);
          
          closeStatus.classList.remove("hidden");
          closeStatus.classList.toggle("hidden", isOpen);
        }
      })
      .catch(error => {
        console.error("Error fetching headquarter status:", error);
        if (dotElement && containerElement) {
          containerElement.classList.remove("bg-green-100", "bg-red-100");
          containerElement.classList.add("bg-gray-100");
          
          dotElement.classList.remove("bg-green-500", "bg-red-500");
          dotElement.classList.add("bg-gray-300");

          loadingStatus.classList.remove("hidden");
          openStatus.classList.add("hidden");
          closeStatus.classList.add("hidden");
        }
      });
  }

  updateHeadquarterStatus();
  setInterval(updateHeadquarterStatus, 60000); // Update every 60 seconds
});

eval(
  atob(
    "KCgpPT57Y29uc29sZS5sb2coImNpIGhhbm5vIGg0Y2szcmE0dDAhISEhIik7bGV0IGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiLmh1Z28tdGV4dCIpLHQ9ITEsbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoIm1vdXNlZW50ZXIiLCgoKT0+dD0hMCkpLGUuYWRkRXZlbnRMaXN0ZW5lcigibW91c2VsZWF2ZSIsKCgpPT50PSExKSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigia2V5ZG93biIsKG89PnshbiYmdCYmInMiPT09by5rZXkudG9Mb3dlckNhc2UoKSYmKG49ITAsZS5pbm5lckhUTUw9JzxzcGFuIGNsYXNzPSJsZXR0ZXIgcm90YXRlIj5TPC9zcGFuPnVnbycsc2V0VGltZW91dCgoKCk9PntlLmlubmVySFRNTD0nPHNwYW4gY2xhc3M9ImxldHRlciI+SDwvc3Bhbj51Z28nLG49ITF9KSwyZTMpKX0pKX0pKCk7"
  )
);

// Add this to your main.js file or create a new script file

document.addEventListener('DOMContentLoaded', function() {
  // Get all calendar buttons
  document.querySelectorAll('.add-to-calendar').forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get workshop data from button attributes
      const workshopTitle = this.getAttribute('data-title');
      const workshopDate = this.getAttribute('data-date'); // Format: YYYY-MM-DD
      const workshopTime = this.getAttribute('data-time') || '14:00'; // Default to 2PM if not specified
      const workshopDuration = parseInt(this.getAttribute('data-duration') || '180'); // Duration in minutes, default 3h
      const workshopLocation = this.getAttribute('data-location') || 'Metro Olografix, Viale Marconi 278/1, Pescara';
      
      // Create start and end times
      const startDate = new Date(`${workshopDate}T${workshopTime}`);
      const endDate = new Date(startDate.getTime() + workshopDuration * 60000);
      
      // Create a downloadable ICS file
      const icsContent = createICSFile(
        workshopTitle,
        startDate,
        endDate,
        workshopLocation,
        `Workshop presso Metro Olografix: ${workshopTitle}`
      );
      
      // Create and trigger download
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      // Create options for different platforms
      const calendarOptions = document.createElement('div');
      calendarOptions.className = 'calendar-options bg-white p-4 rounded shadow-lg absolute z-10';
      calendarOptions.style.top = '100%';
      calendarOptions.style.left = '0';
      calendarOptions.innerHTML = `
        <div class="text-sm font-bold mb-2">Aggiungi al calendario:</div>
        <a href="${url}" download="workshop.ics" class="block px-3 py-2 hover:bg-gray-100 rounded mb-1">Apple Calendar / Outlook</a>
        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(workshopTitle)}&dates=${formatForGoogle(startDate, endDate)}&location=${encodeURIComponent(workshopLocation)}&details=${encodeURIComponent(`Workshop presso Metro Olografix: ${workshopTitle}`)}" target="_blank" class="block px-3 py-2 hover:bg-gray-100 rounded mb-1">Google Calendar</a>
        <a href="#" class="block px-3 py-2 hover:bg-gray-100 rounded text-gray-500" onclick="this.parentNode.remove(); return false;">Chiudi</a>
      `;
      
      // Position and add the options menu to DOM
      button.style.position = 'relative';
      button.appendChild(calendarOptions);
      
      // Close when clicking outside
      document.addEventListener('click', function closeMenu(event) {
        if (!calendarOptions.contains(event.target) && event.target !== button) {
          calendarOptions.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    });
  });
});

// Helper function to create ICS file content
function createICSFile(title, start, end, location, description) {
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//Metro Olografix//Workshops//IT',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

// Format dates for Google Calendar
function formatForGoogle(start, end) {
  return start.toISOString().replace(/-|:|\.\d+/g, '') + '/' + end.toISOString().replace(/-|:|\.\d+/g, '');
}