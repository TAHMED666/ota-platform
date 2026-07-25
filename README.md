# OTA Platform

Full-stack OTA (Online Travel Agency) platform scaffold with Node.js/Express backend, PostgreSQL schema, and React frontend.

## Project Structure

- `/backend` - Express API with controllers, models, routes, middleware, services
- `/frontend` - React app with Router, pages, components, API services
- `/backend/database/migrations` - PostgreSQL schema migration SQL
- `/backend/database/seeders` - SQL seed data

## Backend Features

- JWT authentication (register/login)
- Flight search and booking APIs
- Hotel search and booking APIs
- Payment checkout endpoint with Stripe integration structure
- Admin dashboard summary API
- Review and rating API
- CORS, Helmet security middleware, input validation and centralized error handling
- Email notification and multi-currency service structure

## Frontend Features

- React + React Router navigation
- Homepage with flight/hotel search forms
- Flight and hotel result pages
- Booking management page
- Payment checkout page
- User profile page
- Admin dashboard page
- Responsive styling

## Run Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Run Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Database

- Run `backend/database/migrations/001_initial_schema.sql` to create the schema.
- Optionally run `backend/database/seeders/001_seed_data.sql` for starter flight and hotel data.
