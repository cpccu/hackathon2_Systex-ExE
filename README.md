# CampusOS

> **Your campus. One starting point.**

CampusOS is a centralized university student platform designed to bring essential campus information and student services into one place.

Instead of students searching through different Facebook groups, Messenger groups, notice boards, and scattered sources, CampusOS provides a single starting point for academic resources, campus notices, lost & found information, transportation issues, and events.

---

## 🚀 Live Demo

### Frontend
https://campusos-mmbui09nd-syntex-ex-e.vercel.app

### Backend API
https://campusos-backend-gml9.onrender.com

### GitHub Repository
https://github.com/cpccu/hackathon2_Systex-ExE.git

---

# 🎯 Problem Statement

University students often receive important information from many disconnected sources.

For example:

- Previous semester questions may be shared across different groups.
- Class cancellation information may not reach every student.
- Bus problems may be reported in Messenger or Facebook groups.
- Lost items can be difficult to track.
- Campus events may be missed because announcements are scattered.
- Students may need to search through multiple platforms to find one important update.

This creates **information fragmentation**.

Students need a simple and centralized place where they can quickly find the information that matters to them.

---

# 💡 Our Solution

CampusOS solves this problem by creating a **single digital starting point for campus life**.

The platform brings important academic and campus information together into one web application.

The core idea is simple:

> **One campus. One platform. One starting point.**

CampusOS focuses on:

- Centralized campus information
- Easy access to academic resources
- Important campus announcements
- Lost & Found
- Transportation updates
- Campus events
- Secure user authentication
- A simple student dashboard

---

# ⭐ 8 Core Features

CampusOS is built around **8 core features**.

---

## 1. 🔐 User Registration & Login

Students can create an account and securely access CampusOS.

### Features

- User registration
- User login
- Password hashing
- JWT authentication
- Protected routes
- Persistent login session
- Input validation
- Invalid login handling

### Authentication Flow

```text
Register
   ↓
Backend Validation
   ↓
Password Hashing
   ↓
MongoDB
   ↓
Login
   ↓
Password Verification
   ↓
JWT Token
   ↓
Dashboard
2. 📚 Previous Semester Questions / Resources

CampusOS provides a centralized place for students to access academic resources and previous semester questions.

Students can use this section to:

Find previous semester questions
Access useful academic resources
Organize study materials
Share relevant resources

The goal is to reduce dependency on scattered group posts when students need academic materials.

3. 🔎 Lost & Found

The Lost & Found feature helps students report and discover lost or found belongings around campus.

Students can create posts containing information such as:

Item name
Description
Location
Date
Contact information

This creates a centralized place for campus-related lost and found information.

4. 🚫 Class Cancellation Notices

CampusOS provides a centralized place for class cancellation and academic interruption notices.

Students can quickly find updates about:

Cancelled classes
Schedule-related announcements
Important academic changes
Urgent class updates

Instead of depending entirely on Messenger or individual class groups, students can check CampusOS for centralized information.

5. 🚌 Bus Issue / Transport Notices

CampusOS can be used to communicate important campus transportation updates.

Examples include:

Bus delays
Bus problems
Route-related issues
Temporary transportation changes
Important transport announcements

This helps students make better decisions before travelling to campus.

6. 🎉 Event Notices

Students can discover campus events and activities from one centralized location.

Event information can include:

Event title
Description
Date
Time
Location
Additional information

This helps students stay aware of campus activities and reduces the chance of missing important events.

7. 🏠 Student Dashboard

The Dashboard acts as the student's main control center.

After authentication, students can access the major CampusOS services from one place.

Dashboard provides access to:
Resources
Previous semester questions
Lost & Found
Notices
Class cancellation updates
Bus issue updates
Events
Student information

The dashboard is designed to make CampusOS easy to navigate from a single screen.

8. 🌐 Single Starting Point / Centralized Campus Hub

The most important idea behind CampusOS is the Single Starting Point.

Instead of checking:

Facebook
   +
Messenger
   +
Class Groups
   +
Notice Boards
   +
Different Websites

students can start with:

              CampusOS
                  │
       ┌──────────┼──────────┐
       │          │          │
   Resources   Notices     Events
       │          │          │
       │      ┌───┴───┐      │
       │      │       │      │
       │    Class    Bus     │
       │  Cancel.   Issue    │
       │                   │
       └──────┐       ┌─────┘
              │       │
          Lost & Found
              │
              ▼
       One Campus Hub

The purpose is not simply to create another website.

The purpose is to create a central information starting point for students.

🏗️ System Architecture

CampusOS follows a client-server architecture.

                    STUDENT
                       │
                       ▼
              ┌─────────────────┐
              │ React Frontend  │
              │      + Vite     │
              └────────┬────────┘
                       │
                    REST API
                       │
                       ▼
              ┌─────────────────┐
              │ Node.js +       │
              │ Express Backend │
              └────────┬────────┘
                       │
                   Mongoose
                       │
                       ▼
              ┌─────────────────┐
              │ MongoDB Atlas   │
              │    Database     │
              └─────────────────┘
🧰 Technology Stack
Frontend
React
Vite
JavaScript
React Router
CSS
Backend
Node.js
Express.js
JavaScript
Database
MongoDB
MongoDB Atlas
Mongoose
Authentication
JWT
bcryptjs
Deployment
Vercel — Frontend
Render — Backend
MongoDB Atlas — Database
Development Tools
Visual Studio Code
Git
GitHub
npm
📁 Project Structure
CampusOS/
│
├── client/
│   │
│   └── src/
│       │
│       ├── components/
│       │   └── ProtectedRoute.jsx
│       │
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Events.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── LostFound.jsx
│       │   ├── Notices.jsx
│       │   ├── Register.jsx
│       │   └── Resources.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── App.jsx
│       ├── App.css
│       └── index.css
│
├── server/
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Resource.js
│   │   ├── LostFound.js
│   │   ├── Notice.js
│   │   └── Event.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── resources.js
│   │   ├── lostFound.js
│   │   ├── notices.js
│   │   └── events.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   └── .env
│
├── package.json
└── README.md
🔌 API Overview

Base API:

https://campusos-backend-gml9.onrender.com/api
Authentication
Register
POST /auth/register
Login
POST /auth/login
Current User
GET /auth/me
Resources
Get Resources
GET /resources
Create Resource
POST /resources
Notices
Get Notices
GET /notices
Create Notice
POST /notices
Events
Get Events
GET /events
Create Event
POST /events
Lost & Found
Get Lost & Found Posts
GET /lost-found
Create Lost & Found Post
POST /lost-found
🔐 Security

CampusOS implements basic security practices suitable for the current MVP.

Password Hashing

User passwords are never stored as plain text.

Passwords are hashed using:

bcryptjs
JWT Authentication

CampusOS uses JSON Web Tokens for authenticated sessions.

Login
  ↓
Credentials verified
  ↓
JWT generated
  ↓
Token stored on client
  ↓
Token sent with protected API requests

Authenticated API requests use:

Authorization: Bearer <token>
Protected Routes

The following routes require authentication:

/dashboard
/resources
/lost-found
/notices
/events

Unauthenticated users are redirected to the login page.

Input Validation

The application validates important user inputs such as:

Required fields
Email
Password length
Existing email accounts
Invalid login credentials
⚙️ Local Development Setup
1. Clone the Repository
git clone https://github.com/cpccu/hackathon2_Systex-ExE.git

Then:

cd hackathon2_Systex-ExE
2. Install Frontend Dependencies
cd client
npm install
3. Install Backend Dependencies
cd ../server
npm install
4. Configure Environment Variables

Inside the server folder, create:

.env

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
Important

Never commit .env to GitHub.

Do not expose:

MongoDB credentials
JWT secret
API keys
Passwords
Private credentials
5. Start the Backend

From the server directory:

npm start

The backend should run on:

http://localhost:5000
6. Start the Frontend

Open another terminal.

Go to the client folder:

cd client

Run:

npm run dev

Vite will provide a local development URL similar to:

http://localhost:5173

Open the URL in your browser.

🌐 Production Deployment

CampusOS uses a cloud-based deployment architecture.

                  CampusOS
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
       Vercel                Render
      Frontend               Backend
          │                     │
          └──────────┬──────────┘
                     │
                     ▼
               MongoDB Atlas
                  Database
Frontend

Hosted on:

Vercel

Live URL:

https://campusos-mmbui09nd-syntex-ex-e.vercel.app

Backend

Hosted on:

Render

Live URL:

https://campusos-backend-gml9.onrender.com

Database

Hosted on:

MongoDB Atlas

🧪 Testing

CampusOS has been tested across the main application flows.

Authentication Testing
User registration
User login
Invalid login
Password validation
Duplicate email handling
Protected route access
Token-based authentication
Core Feature Testing
Dashboard
Previous semester questions / Resources
Lost & Found
Class cancellation notices
Bus issue notices
Event notices
Centralized navigation
Production Testing

The deployed production application was tested using the live frontend and backend.

📊 Project Status
Component	Status
Project Foundation	✅ Complete
User Registration & Login	✅ Complete
Previous Semester Questions / Resources	✅ Complete
Lost & Found	✅ Complete
Class Cancellation Notices	✅ Complete
Bus Issue / Transport Notices	✅ Complete
Event Notices	✅ Complete
Student Dashboard	✅ Complete
Single Starting Point / Campus Hub	✅ Complete
Backend APIs	✅ Complete
MongoDB Integration	✅ Complete
Frontend ↔ Backend Integration	✅ Complete
GitHub Repository	✅ Complete
Render Backend Deployment	✅ Complete
Vercel Frontend Deployment	✅ Complete
UI/UX Polish	✅ Complete
Production Testing	✅ Complete
Security & Validation	✅ Complete
🎯 Project Vision

CampusOS aims to become a unified digital campus environment where students can access the information they need without searching across multiple platforms.

The long-term vision is:

                CampusOS
                    │
        ┌───────────┼───────────┐
        │           │           │
    Academic     Campus      Student
    Services    Services     Services
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
             Digital Campus
🔮 Future Improvements

Future versions of CampusOS can include:

👤 Role-Based Access

Different access levels for:

Students
Teachers
Moderators
Administrators
🔔 Real-Time Notifications

Notifications for:

Class cancellations
Bus updates
Important notices
Events
🔎 Advanced Search

Search across:

Resources
Previous questions
Notices
Events
Lost & Found
📅 Academic Tools

Possible future modules:

Class schedules
Attendance
Assignment tracking
Exam schedules
Academic calendar
📱 Mobile Application

A dedicated Android/iOS application could provide faster access to CampusOS.

🤖 AI Campus Assistant

Future versions may include an AI-powered campus assistant that can help students find:

Academic resources
Campus notices
Events
University services
Important student information
🌱 Why CampusOS?

Students should not have to ask:

"Which group posted this?"

"Where was that notice?"

"Who shared that question?"

"Is today's class cancelled?"

"Is there a problem with the bus?"

Instead:

Open CampusOS
      ↓
Find what you need
      ↓
Continue your day

CampusOS is designed around a simple principle:

Students shouldn't have to search for campus information. Campus information should come to one place.

🏆 Hackathon Objective

CampusOS was developed as a practical solution to a real student problem:

Fragmented campus information.

The project combines:

Real-world usability
Modern web technologies
Secure authentication
Cloud deployment
Database integration
Clean UI/UX
Scalable backend architecture

into one centralized student platform.

👥 Team

Project: CampusOS

Team: Systex-ExE

Hackathon: CPCCU AI-Powered Web App Development & Deployment Hackathon 2026

📌 One-Line Summary

CampusOS is a centralized student platform that brings academic resources, class cancellation notices, bus updates, lost & found, events, authentication, and essential campus information together into one starting point.

📄 License

This project was developed for educational and hackathon purposes.

© 2026 CampusOS — Systex-ExE
