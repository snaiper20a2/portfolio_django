# Django Portfolio Site

The site is a gallery with the works of the architect.

## Requirements

- Django 3.0.3
- Pillow 7.2.0
- googletrans 3.0.0
- python-dotenv 0.14.0

## Database

- SQLite3

## Database model

### Projects
- name - unique
- title - may be null
- type - fk (ProjectType)

### ProjectTypes
- name
- slug

### Photos

- project - fk (Project)
- photo - file image
- thumbnail - file image autocomplete

### Bio
This model stores information about a person on the home page. Only the first record from the database is used.

- title 
- text
- photo - file image
- facebook_url - may be null
- telegram_url - may be null

###Request
Contains requests from users
- name
- email
- phone
- message
 
