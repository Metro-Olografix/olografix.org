---
title: "{{ replace .Name "-" " " | title }}"
subtitle: ""
image: ""  # Optional header photo, a real one from the event (e.g. /images/foo.jpg); empty = compact text header
imagePosition: ""  # Optional focus for the header photo, e.g. "center 30%"
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
# Event held at several venues at once? Use this INSTEAD of location/locationUrl:
# locations:
#   - name: "Sede Metro Olografix - Viale Marconi 278/1, Pescara"
#     url: "https://www.openstreetmap.org/node/12539021893"
#   - name: "Sede Metro Olografix - Via Ed Arco Cirillo 10, L'Aquila"
#     url: "https://www.openstreetmap.org/node/13787603509"
draft: false
---

<!-- Event description goes here -->