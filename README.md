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
- `src/layouts`: app shell and shared layout components (`Header`, `Nav`, `Footer`, `MainLayout`)
- `src/routes`: router map and guards (`AppRoutes`, `guards/ProtectedRoute`)
- `src/features/auth`: auth state, context, provider and auth API
- `src/features/books`: books domain API and query hooks
- `src/pages`: routed pages grouped by domain (`auth`, `books`, `contact`, `home`, `user-books`, `system`)
- `src/components`: reusable UI/form components
- `src/shared/http`: shared HTTP helpers (JSON post and API error parsing)
- `src/shared/hooks`: generic reusable hooks (e.g. useFetch)
- `src/schemas`: frontend form/response schemas

## Documentation
- Auth flow and context internals: [`../docs/frontend/auth-context.md`](../docs/frontend/auth-context.md)
- Protected routes and guard flow: [`../docs/frontend/protected-routes.md`](../docs/frontend/protected-routes.md)

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
