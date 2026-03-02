# NovelNest Frontend

Frontend app for NovelNest built with React + TypeScript + Vite.

## Repositories
- Main (hub): https://github.com/Reyunix/novelnest
- Backend: https://github.com/Reyunix/novelnest-backend

## Tech Stack

- React 19
- TypeScript
- React Router
- React Hook Form + Zod
- Vite

## Current Features

- Register and login forms
- Auth context with session bootstrap (`/api/v1/auth/me`)
- Protected routes
- Logout flow
- Book search UI connected to backend

## Main Structure

- `src/layouts`: app shell and shared layout components (`Header`, `Nav`, `Footer`, `MainLayout`)
- `src/routes`: router map and guards (`AppRoutes`, `guards/ProtectedRoute`)
- `src/features/auth`: auth state, context, provider, API and auth form constants
- `src/features/books`: books domain API and query hooks
- `src/features/contact`: contact feature constants
- `src/pages`: routed pages grouped by domain (`auth`, `books`, `contact`, `home`, `user-books`, `system`)
- `src/components`: reusable UI/form components
- `src/shared/config`: shared runtime config (API endpoints)
- `src/shared/constants`: shared app constants (navigation, form error map)
- `src/shared/http`: shared HTTP helpers (JSON post and API error parsing)
- `src/shared/hooks`: generic reusable hooks (e.g. `useFetch`)
- `src/schemas`: frontend form/response schemas

## Documentation

- Auth flow and context internals: [`../docs/frontend/auth-context.md`](../docs/frontend/auth-context.md)
- Protected routes and guard flow: [`../docs/frontend/protected-routes.md`](../docs/frontend/protected-routes.md)
- Constants/modules organization: [`../docs/frontend/constants-organization.md`](../docs/frontend/constants-organization.md)

## Requirements

- Bun or npm
- Backend running at `http://localhost:3000`

## Environment Variables

File: `novelnest-frontend/.env.local`

Common keys:
- `VITE_PORT`
- `VITE_API_REGISTER_ENDPOINT`
- `VITE_API_LOGIN_ENDPOINT`
- `VITE_API_LOGOUT_ENDPOINT`
- `VITE_API_ME_ENDPOINT`
- `VITE_API_BOOKS_SEARCH_ENDPOINT`

Note:
- Google Books key and query translation belong to backend. Frontend should call backend endpoints only.

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

Default frontend URL: `http://localhost:5173`

## Build

```bash
bun run build
```

(or `npm run build`)

## Notes

- Auth requests use `credentials: include`, so backend CORS/cookie settings must match.
- Keep protocol/host consistent in dev (`http://localhost` for both frontend and backend).
