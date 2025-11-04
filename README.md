# TravelHub - Travel Management System

A full-stack application for managing airports, airlines, routes, and countries.

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Chakra UI v3
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** SQLite

## Features

- Countries: Create, edit, delete countries
- Airports: Manage airports with GPS location, IATA/ICAO codes
- Airlines: Manage airlines with serviced airports
- Routes: Link airports via airlines with validation

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure database:**

Create `.env` file:
```env
DATABASE_URL="file:./dev.db"
```

3. **Setup database:**
```bash
npx prisma migrate dev
npx prisma generate
```

4. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

**Countries:** `GET|POST /api/countries`, `GET|PUT|DELETE /api/countries/:id`  
**Airports:** `GET|POST /api/airports`, `GET|PUT|DELETE /api/airports/:id`  
**Airlines:** `GET|POST /api/airlines`, `GET|PUT|DELETE /api/airlines/:id`  
**Routes:** `GET|POST /api/routes`, `GET|PUT|DELETE /api/routes/:id`

## Time Spent

Approximately **12-14 hours** total

## Future Improvements

- Authentication and authorization
- Server-side pagination and sorting
- Better error handling and user feedback
- Advanced search and filtering
- Design system and styling improvements
- Testing coverage
- Migrate to PostgreSQL for production deployment
