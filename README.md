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
