#!/usr/bin/env python3
"""
Generate an iCalendar (.ics) file from Hugo event markdown files.

This script parses event data from markdown files in the activities directory
and generates a single iCalendar file that can be imported into calendar apps.

Requirements:
- PyYAML
- icalendar

Install dependencies with:
pip install PyYAML icalendar
"""

import os
import glob
import re
import datetime
import uuid
import sys

# Try importing required packages
try:
    import yaml
except ImportError:
    print("Error: PyYAML package is required. Install it with: pip install PyYAML")
    sys.exit(1)

try:
    from icalendar import Calendar, Event, vText
except ImportError:
    print("Error: icalendar package is required. Install it with: pip install icalendar")
    sys.exit(1)

# Configuration
ORGANIZATION = 'Metro Olografix'
CALENDAR_NAME = 'Eventi Metro Olografix'
OUTPUT_FILE = 'eventi.ics'

def extract_frontmatter_and_content(file_content):
    """
    Extract YAML frontmatter and markdown content from file content.
    Returns a tuple of (frontmatter_dict, content_str).
    """
    frontmatter_match = re.match(r'^---\n(.*?)\n---\n?(.*?)$', file_content, re.DOTALL)
    if frontmatter_match:
        frontmatter_str = frontmatter_match.group(1)
        content = frontmatter_match.group(2).strip()
        try:
            frontmatter = yaml.safe_load(frontmatter_str)
            return frontmatter, content
        except yaml.YAMLError as e:
            print(f"Error parsing frontmatter: {e}")
    return None, None

def parse_date(date_val):
    """Parse a date value into a datetime object."""
    if isinstance(date_val, datetime.datetime):
        return date_val
    
    if isinstance(date_val, datetime.date):
        return datetime.datetime.combine(date_val, datetime.time.min)
    
    if isinstance(date_val, str):
        # Try ISO format with time
        try:
            return datetime.datetime.fromisoformat(date_val)
        except ValueError:
            pass
        
        # Try with quotes removed (if present)
        if date_val.startswith('"') and date_val.endswith('"'):
            try:
                return datetime.datetime.fromisoformat(date_val[1:-1])
            except ValueError:
                pass
        
        # Try common date formats
        for fmt in [
            '%Y-%m-%d', 
            '%Y-%m-%dT%H:%M:%S', 
            '%Y-%m-%dT%H:%M:%SZ',
            '%Y-%m-%d %H:%M:%S',
            '%d/%m/%Y %H:%M',
            '%d/%m/%Y',
        ]:
            try:
                return datetime.datetime.strptime(date_val, fmt)
            except ValueError:
                continue
    
    print(f"Warning: Could not parse date: {date_val}")
    return None

def create_ics_calendar(events):
    """Create an iCalendar file from a list of events."""
    cal = Calendar()
    cal.add('prodid', f'-//{ORGANIZATION}//Events Calendar//IT')
    cal.add('version', '2.0')
    cal.add('method', 'PUBLISH')
    cal.add('name', CALENDAR_NAME)
    cal.add('x-wr-calname', CALENDAR_NAME)
    
    for event_data, content in events:
        event = Event()
        
        # Generate a stable UID for the event based on title
        if 'title' in event_data:
            slug = event_data['title'].lower().replace(' ', '-')
            # Remove any non-alphanumeric characters
            slug = re.sub(r'[^a-z0-9-]', '', slug)
            uid = f"{slug}@olografix.org"
        else:
            uid = str(uuid.uuid4()) + "@olografix.org"
        
        event.add('uid', uid)
        
        # Required fields
        if 'title' in event_data:
            event.add('summary', event_data['title'])
        
        if 'date' in event_data:
            start_date = parse_date(event_data['date'])
            if start_date:
                event.add('dtstart', start_date)
                
                # If no end date is specified, handle based on time presence
                if 'endDate' not in event_data or not event_data['endDate']:
                    # Check if it's an all-day event (no time specified)
                    if start_date.hour == 0 and start_date.minute == 0:
                        end_date = start_date + datetime.timedelta(days=1)
                    else:
                        # Default duration of 2 hours if time is specified
                        end_date = start_date + datetime.timedelta(hours=2)
                    event.add('dtend', end_date)
        
        # Optional fields
        if 'endDate' in event_data and event_data['endDate']:
            end_date = parse_date(event_data['endDate'])
            if end_date:
                event.add('dtend', end_date)
        
        # Build description
        description_parts = []
        if 'subtitle' in event_data and event_data['subtitle']:
            description_parts.append(event_data['subtitle'])
        
        # Add content to description
        if content:
            description_parts.append(content)
        
        # Add URLs to description
        if 'externalUrl' in event_data and event_data['externalUrl']:
            description_parts.append(f"Sito dell'evento: {event_data['externalUrl']}")
        elif 'footerUrl' in event_data and event_data['footerUrl']:
            description_parts.append(f"Maggiori informazioni: {event_data['footerUrl']}")
        
        if description_parts:
            event.add('description', "\n\n".join(description_parts))
        
        # Location information
        if 'location' in event_data and event_data['location']:
            location = event_data['location']
            event.add('location', vText(location))
        
        # Add URL as a separate field
        url = None
        if 'externalUrl' in event_data and event_data['externalUrl']:
            url = event_data['externalUrl']
        elif 'footerUrl' in event_data and event_data['footerUrl']:
            url = event_data['footerUrl']
        elif 'locationUrl' in event_data and event_data['locationUrl']:
            url = event_data['locationUrl']
        
        if url:
            event.add('url', url)
        
        # Add the organizer
        event.add('organizer', f"MAILTO:info@olografix.org")
        
        # Set creation timestamp
        event.add('dtstamp', datetime.datetime.now())
        
        # Add recurring flag if specified
        if 'recurring' in event_data and event_data['recurring']:
            if 'recurrencePattern' in event_data and event_data['recurrencePattern']:
                # Convert recurrence pattern text to RRULE
                pattern = event_data['recurrencePattern'].lower()
                if 'annual' in pattern or 'yearly' in pattern or 'annuale' in pattern:
                    event.add('rrule', {'FREQ': 'YEARLY'})
                elif 'monthly' in pattern or 'mensile' in pattern:
                    event.add('rrule', {'FREQ': 'MONTHLY'})
                elif 'weekly' in pattern or 'settimanale' in pattern:
                    event.add('rrule', {'FREQ': 'WEEKLY'})
                elif 'daily' in pattern or 'giornaliero' in pattern:
                    event.add('rrule', {'FREQ': 'DAILY'})
                elif 'biennial' in pattern or 'biennale' in pattern:
                    event.add('rrule', {'FREQ': 'YEARLY', 'INTERVAL': 2})
                elif 'every 4 years' in pattern or 'ogni 4 anni' in pattern:
                    event.add('rrule', {'FREQ': 'YEARLY', 'INTERVAL': 4})
        
        # Add the event to the calendar
        cal.add_component(event)
    
    return cal

def find_project_root():
    """Find the project root directory by looking for common Hugo files/folders."""
    # Start with current directory and move up to find project root
    current_dir = os.path.abspath(os.getcwd())
    
    # Maximum number of parent directories to check
    max_depth = 5
    depth = 0
    
    while depth < max_depth:
        # Check if current directory contains common Hugo project files/folders
        if (os.path.isdir(os.path.join(current_dir, 'content')) or
            os.path.isdir(os.path.join(current_dir, 'layouts')) or
            os.path.isdir(os.path.join(current_dir, 'static')) or
            os.path.isdir(os.path.join(current_dir, 'themes')) or
            os.path.isfile(os.path.join(current_dir, 'config.toml')) or
            os.path.isfile(os.path.join(current_dir, 'config.yaml')) or
            os.path.isfile(os.path.join(current_dir, 'config.json'))):
            return current_dir
        
        # Move up to parent directory
        parent_dir = os.path.dirname(current_dir)
        if parent_dir == current_dir:  # We've reached the root of the filesystem
            break
        
        current_dir = parent_dir
        depth += 1
    
    # If we couldn't find a Hugo project root, return the current directory
    return os.path.abspath(os.getcwd())

def main():
    # Find project root
    project_root = find_project_root()
    print(f"Project root directory: {project_root}")
    
    # Try multiple possible locations for activities
    possible_paths = [
        os.path.join(project_root, 'italiano', 'attivita'),
        os.path.join(project_root, 'content', 'italiano', 'attivita'),
        os.path.join(project_root, 'content', 'attivita'),
        os.path.join(project_root, 'attivita')
    ]
    
    # Output directory
    output_dir = os.path.join(project_root, 'static')
    
    # Print all possible paths for debugging
    print("Looking for activities in the following directories:")
    for path in possible_paths:
        print(f"- {path}")
    
    # Find the first valid path that exists
    activities_dir = None
    for path in possible_paths:
        if os.path.isdir(path):
            activities_dir = path
            print(f"Found activities directory: {activities_dir}")
            break
    
    if not activities_dir:
        print("Error: Could not find activities directory. Checked paths:")
        for path in possible_paths:
            print(f"- {path} {'(exists)' if os.path.isdir(path) else '(not found)'}")
        sys.exit(1)
    
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Try different glob patterns to find markdown files
    activity_files = []
    
    patterns = [
        os.path.join(activities_dir, '*.md'),
        os.path.join(activities_dir, '*', '*.md'),  # Check first level subdirectories
    ]
    
    for pattern in patterns:
        files = glob.glob(pattern)
        activity_files.extend(files)
    
    # Remove duplicates
    activity_files = list(set(activity_files))
    
    # Debug: list all files found
    print(f"Found {len(activity_files)} activity files:")
    for file in activity_files:
        print(f"- {file}")
    
    # Check if we have any files
    if not activity_files:
        print(f"No activity files found in {activities_dir}.")
        print("Listing directory contents for debugging:")
        try:
            for item in os.listdir(activities_dir):
                item_path = os.path.join(activities_dir, item)
                if os.path.isdir(item_path):
                    print(f"- [DIR] {item}")
                else:
                    print(f"- [FILE] {item}")
        except Exception as e:
            print(f"Error listing directory: {e}")
        
        sys.exit(1)
    
    # Parse each file for event data
    events = []
    for file_path in activity_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            frontmatter, markdown_content = extract_frontmatter_and_content(content)
            
            if frontmatter and 'date' in frontmatter:
                # Extract the filename (without extension) to use as a fallback title
                filename = os.path.basename(file_path).replace('.md', '')
                
                # Ensure the event has a title
                if 'title' not in frontmatter or not frontmatter['title']:
                    frontmatter['title'] = filename
                
                print(f"Found event: {frontmatter.get('title')} - Date: {frontmatter.get('date')}")
                events.append((frontmatter, markdown_content))
            else:
                print(f"Skipping {file_path}: Missing date in frontmatter")
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
    
    # Filter out events without valid dates
    valid_events = [(fm, content) for fm, content in events if parse_date(fm['date']) is not None]
    
    # Sort events by date
    valid_events.sort(key=lambda x: parse_date(x[0]['date']) if parse_date(x[0]['date']) else datetime.datetime.max)
    
    # Create the iCalendar file
    cal = create_ics_calendar(valid_events)
    
    # Write the iCalendar file
    output_path = os.path.join(output_dir, OUTPUT_FILE)
    with open(output_path, 'wb') as f:
        f.write(cal.to_ical())
    
    print(f"Created iCalendar file at {output_path} with {len(valid_events)} events.")
    print(f"Skipped {len(events) - len(valid_events)} events with invalid dates.")

if __name__ == "__main__":
    main()