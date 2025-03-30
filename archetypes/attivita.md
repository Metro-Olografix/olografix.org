---
title: "{{ replace .Name "-" " " | title }}"
subtitle: ""
date: {{ .Date }}
endDate: ""  # Optional end date for multi-day events
externalUrl: ""  # URL for external event page (optional)
footerUrl: ""    # URL for footer button (optional)

# Recurring event settings
recurring: false  # Set to true for recurring events
recurrenceType: "weekly"  # weekly, bi-weekly, monthly, yearly
recurrenceDay: ""  # For weekly/bi-weekly: monday, tuesday, etc.
recurrenceCount: 10  # Number of occurrences
recurrenceUntil: ""  # Alternative to count: end date for recurrence (YYYY-MM-DD)
recurrencePattern: ""  # Human-readable description (auto-generated if empty)

location: ""  # Physical location of the event
locationUrl: ""  # Map URL for the location
draft: false
---

<!-- Event description goes here -->