/**
 * Recurring events calculation and display with end date support
 */
document.addEventListener("DOMContentLoaded", function() {
    // Find all elements with recurring event data
    const recurringEvents = document.querySelectorAll('.recurring-event');
    
    // Process each recurring event
    recurringEvents.forEach(function(element) {
      // Extract data from element attributes
      const startDate = new Date(element.dataset.startDate);
      const endDate = element.dataset.endDate ? new Date(element.dataset.endDate) : null;
      const recurrenceType = element.dataset.recurrenceType || 'weekly';
      
      // Localization strings
      const todayText = element.dataset.textToday || 'Today';
      const tomorrowText = element.dataset.textTomorrow || 'Tomorrow';
      const nextText = element.dataset.textNext || 'Next:';
      const endedText = element.dataset.textEnded || 'This recurring event has ended.';
      
      // Calculate next occurrence
      const nextDate = calculateNextOccurrence(startDate, recurrenceType, endDate);
      
      // Update the display
      const displayElement = element.querySelector('.next-date');
      if (displayElement) {
        updateDateDisplay(displayElement, nextDate, todayText, tomorrowText, nextText, endedText);
      }
    });
  });
  
  /**
   * Calculate the next occurrence based on recurrence type and respect end date
   * @param {Date} startDate - The original start date of the event
   * @param {string} recurrenceType - weekly, bi-weekly, monthly, or yearly
   * @param {Date|null} endDate - The end date of the recurring event (null if no end date)
   * @returns {Date|null} - The next occurrence date, or null if the event has ended
   */
  function calculateNextOccurrence(startDate, recurrenceType, endDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // If there's an end date and it's already passed, return null
    if (endDate && endDate < today) {
      return null;
    }
    
    // If start date is in the future, that's the next occurrence
    // But make sure it's not beyond the end date
    if (startDate > today) {
      if (endDate && startDate > endDate) {
        return null;
      }
      return startDate;
    }
    
    let nextDate = new Date(startDate);
    
    switch(recurrenceType) {
      case 'weekly':
        // Calculate days since start
        const daysSinceWeekly = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        // Calculate completed weeks
        const weeksPassed = Math.floor(daysSinceWeekly / 7);
        // Next occurrence is the following week
        const nextWeek = weeksPassed + 1;
        nextDate.setDate(startDate.getDate() + (nextWeek * 7));
        break;
        
      case 'bi-weekly':
        // Calculate days since start
        const daysSinceBiWeekly = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        // Calculate completed weeks
        const biWeeksPassed = Math.floor(daysSinceBiWeekly / 14);
        // Next occurrence is the following bi-week
        const nextBiWeek = biWeeksPassed + 1;
        nextDate.setDate(startDate.getDate() + (nextBiWeek * 14));
        break;
        
      case 'monthly':
        // Calculate months since start
        let monthsPassed = (today.getFullYear() - startDate.getFullYear()) * 12 + 
                           (today.getMonth() - startDate.getMonth());
        
        // If we haven't reached the day of month yet, adjust
        if (today.getDate() < startDate.getDate()) {
          monthsPassed--;
        }
        
        // Next occurrence
        const nextMonth = monthsPassed + 1;
        nextDate.setMonth(startDate.getMonth() + nextMonth);
        
        // Adjust for month length issues (e.g., Jan 31 -> Feb 28)
        if (nextDate.getDate() !== startDate.getDate()) {
          nextDate.setDate(0); // Last day of previous month
        }
        break;
        
      case 'yearly':
        // Calculate years since start
        let yearsPassed = today.getFullYear() - startDate.getFullYear();
        
        // If we haven't reached the day of year yet, adjust
        const todayDayOfYear = getDayOfYear(today);
        const startDayOfYear = getDayOfYear(startDate);
        
        if (todayDayOfYear < startDayOfYear) {
          yearsPassed--;
        }
        
        // Next occurrence
        const nextYear = yearsPassed + 1;
        nextDate.setFullYear(startDate.getFullYear() + nextYear);
        break;
    }
    
    // Check if the calculated next date is beyond the end date
    if (endDate && nextDate > endDate) {
      return null;
    }
    
    return nextDate;
  }
  
  /**
   * Get the day of year (1-366)
   * @param {Date} date - The date to calculate day of year
   * @returns {number} - Day of year
   */
  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  
  /**
   * Format and display the next date with appropriate text
   * @param {HTMLElement} element - The element to update
   * @param {Date|null} nextDate - The next occurrence date, or null if ended
   * @param {string} todayText - Localized "Today" text
   * @param {string} tomorrowText - Localized "Tomorrow" text
   * @param {string} nextText - Localized "Next:" text
   * @param {string} endedText - Localized text for ended events
   */
  function updateDateDisplay(element, nextDate, todayText, tomorrowText, nextText, endedText) {
    // If nextDate is null, the recurring event has ended
    if (!nextDate) {
      element.innerHTML = `<em class="text-gray-500">${endedText}</em>`;
      return;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if next occurrence is today or tomorrow
    if (nextDate.getFullYear() === today.getFullYear() && 
        nextDate.getMonth() === today.getMonth() && 
        nextDate.getDate() === today.getDate()) {
      element.innerHTML = `<strong>${nextText} ${todayText}!</strong>`;
    } else if (nextDate.getFullYear() === tomorrow.getFullYear() && 
               nextDate.getMonth() === tomorrow.getMonth() && 
               nextDate.getDate() === tomorrow.getDate()) {
      element.innerHTML = `<strong>${nextText} ${tomorrowText}</strong>`;
    } else {
      // Format the date according to locale
      const formattedDate = nextDate.toLocaleDateString(document.documentElement.lang || 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      element.innerHTML = `<strong>${nextText}</strong> ${formattedDate}`;
    }
  }