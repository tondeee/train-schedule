# Train Schedule Application

A full-stack application for managing train schedules built with Next.js and NestJS.

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Git

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd train-schedule
```

2. Set up environment variables:

Create environment files from the examples:

For the backend:
```bash
cp server/.env.example server/.env
```

For the frontend:
```bash
cp frontend/.env.example frontend/.env
```

**Important**: Make sure the following values match between frontend and backend:
- `NEXTAUTH_SECRET` in frontend should match `AUTH_JWT_SECRET` in backend
- `NEXTAUTH_REFRESH_SECRET` in frontend should match `AUTH_REFRESH_SECRET` in backend

3. Start the application:
```bash
docker compose up -d
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3002
- Database Admin (Adminer): http://localhost:8080

## Database Access (Adminer)

To access the database through Adminer:
1. Visit http://localhost:8080
2. Use these credentials:
   - System: PostgreSQL
   - Server: postgres
   - Username: root
   - Password: secret
   - Database: api

## Default Ports

- Frontend (Next.js): 3000
- Backend (NestJS): 3002
- PostgreSQL: 5432
- Adminer: 8080
