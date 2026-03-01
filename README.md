# NovelNest Frontend
Frontend app for NovelNest built with React + TypeScript + Vite.

## Tech Stack
- React 19
- TypeScript
- React Router
- React Hook Form + Zod
- Vite + mkcert (HTTPS in local dev)

## Current Features
- Register and login forms
- Auth context with session bootstrap (`/api/v1/auth/me`)
- Protected routes
- Logout flow
- Book search UI connected to backend

## Main Structure
- `src/provider`: auth context/provider
- `src/pages`: routed pages (`Login`, `Register`, `SearchPage`, `Mybooks`, etc.)
- `src/components`: reusable UI/form components
- `src/schemas`: frontend form/response schemas

## Requirements
- Bun or npm
- Backend running at `https://127.0.0.1:3000`

## Environment Variables
File: `novelnest-frontend/.env.local`

Common keys:
- `VITE_PORT`
- `VITE_API_REGISTER_ENDPOINT`
- `VITE_API_LOGIN_ENDPOINT`
- `VITE_API_LOGOUT_ENDPOINT`
- `VITE_API_ME_ENDPOINT`

## Install
```bash
bun install
```
(or `npm install`)

## Run
```bash
bun run dev
```
(or `npm run dev`)

Default frontend URL: `https://localhost:5173`

## Build
```bash
bun run build
```
(or `npm run build`)

## Notes
- Auth requests use `credentials: include`, so backend CORS and cookie settings must match.
- If you switch between `localhost` and `127.0.0.1`, keep frontend/backend origins consistent.
