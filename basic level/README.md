# Full Stack Internship - Basic level
 This repository contains my environment setup and project work for the internship. It includes the development environment, backend REST API, and frontend interface built as part of Level 1 tasks.
 
#Features
CRUD operations for users (Create, Read, Update, Delete)
Persistent data stored in a JSON file
Interactive frontend built with HTML, CSS, and JavaScript
API testing using Postman or Thunder Client
Search and filter users dynamically
Responsive design with clean UI

#Technologies Used
Frontend: HTML, CSS, Vanilla JavaScript
Backend: Node.js, Express.js
Database: JSON file (for persistent storage)
Tools: Postman/Thunder Client for API testing, Git/GitHub for version control

#Project Structure
full-stack-intern/
│
├─ frontend/
│   ├─ index.html        # Main HTML page
│   ├─ style.css         # Styling
│   └─ script.js         # JS for interacting with backend API
│
├─ server.js             # Node.js + Express backend server
├─ users.json            # JSON file for storing users
└─ README.md             # Project documentation


#Installation & Setup
1.Clone the repository
git clone https://github.com/rayanayash/full-stack-internship.git
cd full-stack-intern
2.Install backend dependencies
node server.js
3.Run the server
node server.js
4.Open frontend
-Open frontend/index.html in your browser or
-Run a simple HTTP server:
python -m http.server 5500
5.Test API
-Use Postman or Thunder Client to test endpoints:
-GET /users → Get all users
-POST /users → Add a new user
-PUT /users/:id → Update a user
-DELETE /users/:id → Delete a user

#Tasks Completed
*Task 1: Setup Development Environment
-Installed Node.js, npm, and VS Code.
-Configured Git & GitHub repository.
-Set up a JSON file for temporary data storage.

*Task 2: Build a Simple REST API
-Created Express.js server with CRUD operations.
-Implemented GET, POST, PUT, DELETE routes for /users.
-Tested API using Postman/Thunder Client.

*Task 3: Frontend with HTML, CSS, JavaScript
-Built a static frontend with responsive layout.
-Used Fetch API to interact with backend.
-Handled errors and displayed loading states.
-Added dynamic user list, search, and highlight features.

#Usage
-Add a user using the form.
-Edit a user by clicking Edit.
-Delete a user using Delete button.
-Search users using the search bar.

#Future Improvements
-Migrate frontend to React or Vue for component-based architecture.
-Replace JSON storage with a real database (MongoDB/PostgreSQL).
-Add user authentication and login system.
-Improve UI with light/dark mode and animations.
