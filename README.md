# DataAPI Platform

https://github.com/user-attachments/assets/1170718a-55c0-4b6d-9102-705ed307d8ad

A modern web application for managing API keys and storing data securely. Built with React, Node.js, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## Features

- 🔐 User authentication with email verification
- 🔑 API key management
- 💾 Secure data storage
- 📊 Data visualization
- ✨ Modern UI with Tailwind CSS
- 🛡️ Input validation with Zod
- 📧 Email notifications

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

## Project Structure

```
.
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── store/         # State management
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   └── package.json
│
└── backend/                # Node.js backend application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── middleware/    # Express middleware
    │   ├── routes/        # API routes
    │   └── index.js       # Entry point
    └── package.json
```

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory using the provided template:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:

   ```env
   PORT=3000
   JWT_SECRET=your-secret-key-here

   # Database Configuration
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=api_platform
   DB_PASSWORD=postgres
   DB_PORT=5432
   DB_SSL=false

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173

   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ```

## Environment Variables

### Frontend (.env)

| Variable     | Description     | Default                   |
| ------------ | --------------- | ------------------------- |
| VITE_API_URL | Backend API URL | http://localhost:3000/api |

### Backend (.env)

| Variable       | Description              | Required |
| -------------- | ------------------------ | -------- |
| PORT           | Server port              | Yes      |
| JWT_SECRET     | JWT signing key          | Yes      |
| DB_USER        | PostgreSQL username      | Yes      |
| DB_HOST        | PostgreSQL host          | Yes      |
| DB_NAME        | PostgreSQL database name | Yes      |
| DB_PASSWORD    | PostgreSQL password      | Yes      |
| DB_PORT        | PostgreSQL port          | Yes      |
| DB_SSL         | Enable SSL for database  | No       |
| CORS_ORIGIN    | Allowed CORS origin      | Yes      |
| EMAIL_USER     | Gmail address            | Yes      |
| EMAIL_PASSWORD | Gmail app password       | Yes      |

## Database Setup

1. Create a new PostgreSQL database:

   ```sql
   CREATE DATABASE api_platform;
   ```

2. Run the database migrations:
   ```bash
   cd backend
   psql -U postgres -d api_platform -f src/config/database.sql
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Documentation

### Authentication Endpoints

```
POST /api/auth/signup
POST /api/auth/verify-email
POST /api/auth/login
```

### API Key Management

```
POST /api/keys/generate
GET /api/keys/list
```

### Data Management

```
POST /api/data
GET /api/data
```

For detailed API documentation, visit the `/api-docs` page in the application.

## Security Considerations

1. Always use HTTPS in production
2. Store sensitive data in environment variables
3. Use secure password hashing (bcrypt)
4. Implement rate limiting
5. Validate all user inputs
6. Use parameterized SQL queries
7. Keep dependencies updated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
