---
title: "{{ replace .Name "-" " " | title }}"
subtitle: ""
date: {{ .Date }}
endDate: ""  # Optional end date for multi-day events
externalUrl: ""  # URL for external event page (optional)
footerUrl: ""    # URL for footer button (optional)
recurring: false  # Set to true for recurring events
recurrencePattern: ""  # e.g., "Annual", "Biennial", "Every 4 years"
location: ""  # Physical location of the event
draft: false
---

<!-- Event description goes here -->