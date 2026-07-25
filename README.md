# OTA Platform

Full-stack OTA (Online Travel Agency) platform with Node.js/Express backend, PostgreSQL database, and React frontend.

## Project Structure

```
ota-platform/
├── backend/               # Express API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth, rate limit, error handling
│   │   ├── models/        # Sequelize ORM models
│   │   ├── routes/        # Express routers
│   │   ├── services/      # Email, Stripe, currency
│   │   ├── utils/         # JWT helpers
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Entry point
│   ├── database/
│   │   ├── migrations/    # PostgreSQL schema SQL
│   │   └── seeders/       # Seed data SQL
│   ├── .env.example
│   └── package.json
└── frontend/              # React + Vite app
    ├── src/
    │   ├── components/    # NavBar, etc.
    │   ├── pages/         # All page components
    │   └── services/      # Axios API client
    ├── .env.example
    └── package.json
```

## Features

**Backend**
- JWT authentication (register/login)
- Flight and hotel search & booking APIs
- Stripe payment checkout integration
- Admin dashboard summary API
- Review and rating API
- CORS, Helmet security, rate limiting, input validation

**Frontend**
- React + React Router SPA
- Homepage with flight/hotel search
- Flight/hotel results, booking management, checkout
- User profile and admin dashboard pages

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

---

## Quick Start

### 1. Database Setup

Start PostgreSQL and create the database:

```bash
# macOS (Homebrew)
brew services start postgresql

# Ubuntu/Debian
sudo service postgresql start

# Windows — start via pgAdmin or Services panel
```

```sql
-- In psql or pgAdmin:
CREATE DATABASE ota_platform;
```

Run the schema migration:

```bash
psql -U postgres -d ota_platform -f backend/database/migrations/001_initial_schema.sql
```

Optionally seed starter data:

```bash
psql -U postgres -d ota_platform -f backend/database/seeders/001_seed_data.sql
```

---

### 2. Backend

```bash
cd backend
cp .env.example .env   # then edit .env with your values
npm install
npm run dev
```

Backend runs at **http://localhost:5000**

Health check: `GET http://localhost:5000/health` → `{"status":"ok"}`

---

### 3. Frontend

```bash
cd frontend
cp .env.example .env   # set VITE_API_URL if backend is not on localhost:5000
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_NAME` | `ota_platform` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
| `JWT_SECRET` | — | **Required** — random secret, min 32 chars |
| `STRIPE_SECRET_KEY` | — | Stripe secret key (from stripe.com/keys) |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000` | Backend API base URL |

---

## Production Deployment

1. Set `NODE_ENV=production` in backend `.env`
2. Use a strong random `JWT_SECRET` (e.g. `openssl rand -hex 32`)
3. Add real Stripe keys from the Stripe dashboard
4. Point `VITE_API_URL` to your deployed backend URL
5. Build the frontend: `npm run build` (serves from `dist/`)

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/flights` | Search flights |
| GET | `/api/hotels` | Search hotels |
| GET | `/api/bookings` | List bookings |
| POST | `/api/payments/checkout` | Create payment |
| GET | `/api/admin/summary` | Admin stats |
