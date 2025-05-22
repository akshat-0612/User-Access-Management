# User Access Management System

A full-stack application for managing user access to software, featuring role-based authentication, request workflows, and admin management.

---

Setup Instructions

Prerequisites
Node.js (v14+)
PostgreSQL

# Backend
Install dependencies:
cd backend
npm install
Configure environment:

Copy .env.example to .env and set your DB and JWT variables.

Run migrations:
npm run typeorm migration:run

Start server:
npm run dev

# Frontend
Install dependencies:

cd frontend
npm install

Configure environment:

Copy .env.example to .env and set your API URL.

Start React app:
npm start

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Overview](#system-overview)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Frontend Pages](#frontend-pages)
- [Setup Instructions](#setup-instructions)
- [Evaluation Criteria](#evaluation-criteria)
- [License](#license)

---

## Introduction

### Purpose

This system enables:
- User registration and authentication
- Software access requests
- Managerial approvals and rejections

### Scope

Core features:
- User Registration
- JWT-based Authentication
- Software Listing & Creation
- Access Request Submission
- Access Request Approval or Rejection

---

## Features

- **Role-based Access:** Employee, Manager, Admin
- **Secure Authentication:** JWT, bcrypt password hashing
- **Software Management:** Admins can add new software
- **Request Workflow:** Employees request access, Managers approve/reject
- **React Frontend:** Modern, role-based UI

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Tooling:** bcrypt, dotenv, nodemon

---

## System Overview

### User Roles

- **Employee:** Sign up, login, request software access
- **Manager:** View and approve/reject access requests
- **Admin:** Create software, full access

### Functionalities

- Sign-Up / Login with JWT
- Role-based redirection
- Software management (Admin only)
- Request access to software (Employee)
- Approve/reject requests (Manager)

---

## Database Schema

### User Entity

```ts
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: 'Employee' | 'Manager' | 'Admin';
}


### Software Entity

```ts
@Entity()
class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column("simple-array")
  accessLevels: string[]; // e.g., ["Read", "Write", "Admin"]
}

### Request Entity

```ts
@Entity()
class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Software)
  software: Software;

  @Column()
  accessType: 'Read' | 'Write' | 'Admin';

  @Column('text')
  reason: string;

  @Column()
  status: 'Pending' | 'Approved' | 'Rejected';
}

📡 API Documentation
All API endpoints follow RESTful principles and require JWT authentication for protected routes. Include the token in the Authorization header as:

Authorization: Bearer <your_token>
🔐 Authentication Routes
▶️ Register a New User
Endpoint: POST /api/auth/signup

Body:
{
  "username": "john_doe",
  "password": "your_password"
}
Response:
201 Created

{
  "id": 1,
  "username": "john_doe",
  "role": "Employee"
}

▶️ Login
Endpoint: POST /api/auth/login

{
  "username": "john_doe",
  "password": "your_password"
}
Response:
200 OK


{
  "token": "JWT_TOKEN",
  "role": "Employee"
}

🧩 Software Management (Admin Only)
➕ Create New Software
Endpoint: POST /api/software

Headers: Authorization: Bearer <token>

Body:

{
  "name": "Figma",
  "description": "Collaborative interface design tool",
  "accessLevels": ["Read", "Write", "Admin"]
}
Response:
201 Created

{
  "id": 1,
  "name": "Figma",
  "description": "...",
  "accessLevels": ["Read", "Write", "Admin"]
}

📄 Get All Software
Endpoint: GET /api/software

Headers: Authorization: Bearer <token>

Response:
200 OK

[
  {
    "id": 1,
    "name": "Figma",
    "description": "...",
    "accessLevels": [...]
  }
]

📥 Access Request Flow
📝 Submit a Request (Employee)
Endpoint: POST /api/requests

Headers: Authorization: Bearer <token>

Body:

{
  "softwareId": 1,
  "accessType": "Write",
  "reason": "Need access for UI design"
}
Response:
201 Created

{
  "id": 2,
  "status": "Pending",
  ...
}


📃 View My Requests
Endpoint: GET /api/requests/my

Headers: Authorization: Bearer <token>

Response:
200 OK

[
  {
    "id": 2,
    "software": "Figma",
    "accessType": "Write",
    "status": "Pending"
  }
]


🧾 View All Requests (Manager)
Endpoint: GET /api/requests

Headers: Authorization: Bearer <token>

Response:
200 OK

[
  {
    "id": 2,
    "user": "john_doe",
    "software": "Figma",
    "accessType": "Write",
    "status": "Pending"
  }
]


✅ Approve or Reject a Request (Manager)
Endpoint: PATCH /api/requests/:id

Headers: Authorization: Bearer <token>

Body:

{
  "status": "Approved" // or "Rejected"
}
Response:
200 OK

{
  "id": 2,
  "status": "Approved"
}

Frontend Pages
/signup – Sign-up form

/login – Login form

/create-software – Add new software (Admin)

/request-access – Request software access (Employee)

/pending-requests – List/manage requests (Manager)
