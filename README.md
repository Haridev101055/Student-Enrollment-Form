# Student Enrollment Form Using JsonPowerDB

## Description
A micro project for registering and updating students using HTML, Bootstrap, JavaScript and JsonPowerDB. Roll-No is the logical primary key. The form checks existing records before enabling Save or Update.

## Benefits of using JsonPowerDB
- JSON-based, schema-free storage.
- REST APIs simplify database integration.
- Built-in retrieval and update commands reduce backend code.
- Indexing supports efficient record lookup.
- Suitable for rapid application development.

## Database details
Database: `SCHOOL-DB`; relation: `STUDENT-TABLE`.
Fields: Roll-No (primary key), Full-Name, Class, Birth-Date, Address, Enrollment-Date.

## Setup
1. Extract the ZIP. Open the folder in NetBeans or VS Code.
2. Create a JsonPowerDB account and generate a connection token with read/write permissions. Ensure the database and relation are available (initialize them in JPDB if necessary).
3. Serve the folder locally, for example with `python -m http.server 8000` and open http://localhost:8000/.
4. Click Configure JPDB token and enter your token. It is held only in page memory. Never commit tokens or use a privileged token on a public deployment.
5. Enter a Roll No and press Enter or Tab. Fill all fields and Save, or edit an existing record and Update. Reset clears the form.

## Scope of functionalities
- GET_BY_KEY for record lookup; PUT for insertion; UPDATE by record number for modification.
- Required-field and date validation, dynamic buttons, protected primary key, automatic reset.
- Logical uniqueness is checked in the UI; concurrent inserts require database-side uniqueness enforcement.

## Release History
- v1.0.0 (prepared, not yet published): initial implementation of enrollment form and JPDB integration. Create the GitHub release after live testing.

## Project status
Source prepared for academic submission. Live JPDB integration requires a valid token and has not been tested against a real account. Browser access also requires the JPDB endpoint to permit cross-origin requests. For production, use a secure backend rather than a browser token.

## Publish to GitHub
Create a public repository named Student-Enrollment-Form. Upload the extracted files (not the ZIP) and commit. Alternatively, create an empty repository and run the following inside this folder:

```sh
git init
git add .
git commit -m "Initial Student Enrollment Micro Project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Student-Enrollment-Form.git
git push -u origin main
```

## Sources
- https://login2explore.com/jpdb/docs.html
- https://getbootstrap.com/
- https://docs.github.com/
