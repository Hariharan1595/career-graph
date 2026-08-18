# CareerGraph

A graph-powered job recommendation frontend for the Wexa CognoDB assignment. Built with React, TypeScript, Vite, Tailwind CSS, and TanStack Query, consuming an existing Spring Boot + Neo4j backend.

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

The app expects the backend to expose:

- `GET /api/recommendations/{userName}`
- `GET /api/skill-gap?userName=...&jobName=...`

## Environment variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the Spring Boot backend | `http://localhost:8080` |

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally

## Deployment (Vercel)

1. Set the `VITE_API_BASE_URL` environment variable in the Vercel project settings to your deployed backend URL.
2. Build command: `npm run build`. Output directory: `dist`.

## Structure

```
src/
  components/
    layout/     — app shell, sidebar, header, mobile nav, API status
    dashboard/   — stats cards
    jobs/        — job card, match badge/progress, skill chip
    skills/      — skill gap card
    graph/       — animated node-relationship visualization
    common/      — loading / empty / error states, skeletons
  hooks/         — TanStack Query hooks (useRecommendations, useSkillGap, useApiHealth)
  services/      — typed Axios API client
  types/         — shared TypeScript interfaces
  pages/         — Dashboard, Jobs, JobDetails, SkillGap, Profile
```
