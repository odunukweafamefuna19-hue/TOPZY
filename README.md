# TOPZY
**YOUR GAME. YOUR POWER.**

TOPZY is a gaming top-up marketplace foundation designed for a web app first, with a shared API for a future Android app.

## Stack
- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Node.js + Express
- Database/auth: Supabase (PostgreSQL + Supabase Auth)
- Backend hosting: Render
- Frontend hosting: Netlify
- Source control: GitHub

## Important before launch
This package is the initial deployable foundation, not a finished live top-up business. Real top-ups require approved supplier API credentials and verified product mappings. Automatic payments require a supported payment provider account, server-side webhook verification, and any applicable adult/guardian or business verification. Do not collect or store card/bank secrets in the frontend.

## Project layout
- `frontend/` — customer-facing website
- `backend/` — Express API
- `database/schema.sql` — initial PostgreSQL schema for Supabase
- `.env.example` — environment variable template

## Local setup
1. Install Node.js on a computer or use a supported Node environment.
2. Copy `backend/.env.example` to `backend/.env` and fill in values.
3. In `backend/`, run `npm install`, then `npm start`.
4. Serve `frontend/` using a static host or local web server.
5. Run `database/schema.sql` in the Supabase SQL Editor after reviewing it.

## Deployment overview
- Push the project contents to a GitHub repository.
- Deploy `backend/` as a Node web service on Render. Set its root directory to `backend`.
- Deploy `frontend/` on Netlify. Set its publish directory to `frontend`.
- Add the production environment variables in the hosting dashboards.

## Current API routes
- `GET /health`
- `GET /api/v1/games`
- `GET /api/v1/games/:slug`
- `GET /api/v1/packages/:gameSlug`
- `POST /api/v1/player/validate` (safe placeholder; returns not-configured until a game validator is integrated)

Order creation, payment collection, wallet funding, supplier fulfillment, refunds, and admin operations are intentionally not enabled until their real providers and security rules are configured and tested. The database schema reserves the required tables for those modules.
