# Hospital Management System (HMS) - Google Antigravity MVP

> A next-generation Hospital Management System MVP accelerated by Google Antigravity. Built for speed, scale, and clarity.

![Status](https://img.shields.io/badge/Status-MVP_Complete-success)
![Tech](https://img.shields.io/badge/Stack-React_|_Node_|_SQLite-blue)
![Design](https://img.shields.io/badge/Design-Material_3-purple)

## 🚀 Overview

This project is a high-performance **Hospital Management System (HMS)** designed to streamline clinic operations. It focuses on the essentials—Patient, Doctor, and Appointment management—wrapped in a premium **Material Design 3** interface. 

It was built with a strict "MVP-first" mindset: **Execution beats complexity.**

## ✨ Key Features

- **🔐 Role-Based Access Control**: Secure portals for **Admins**, **Doctors**, **Receptionists**, and **Patients**.
- **🏥 Staff-Led Workflows**: 
  - Receptionists can **register walk-in patients** instantly.
  - Staff can **book appointments on behalf** of patients.
- **🎨 Material Design 3 UI**: 
  - Built with Vanilla CSS Variables (Tokens).
  - Premium aesthetic (Indigo/Violet theme, floating labels, glassmorphism).
- **📅 Smart Scheduling**: Real-time appointment status tracking (Pending → Confirmed → Completed).
- **📊 Interactive Dashboard**: Visual stats and quick-access cards.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Context API, Vanilla CSS (Material 3 Tokens).
- **Backend**: Node.js, Express.js.
- **Database**: SQLite (via Sequelize ORM).
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt.

## ⚡ Quick Start

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone & Install
```bash
git clone https://github.com/dhananjayaDev/hospital-management-system-antigravity.git
cd hospital-management-system-antigravity
```

### 2. Setup Backend
```bash
cd server
npm install
npm run dev
# Server starts on localhost:5000
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
# Client starts on localhost:5173
```

## 👤 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@hms.com` | `admin123` |
| **Patient** | *(Register via UI)* | *(User defined)* |

## 🏗️ Project Structure

```
hms-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Layout, Sidebar)
│   │   ├── pages/          # Route Views (Dashboard, Appointments)
│   │   ├── context/        # Auth State Management
│   │   └── index.css       # Material Design 3 Design Tokens
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # Business Logic
│   │   ├── models/         # Database Schema (Sequelize)
│   │   └── routes/         # API Endpoints
└── README.md
```

## 🤝 Contribution
Open to PRs for hardening security and adding Analytics modules.

---
*Built with ❤️ using Google Antigravity.*
