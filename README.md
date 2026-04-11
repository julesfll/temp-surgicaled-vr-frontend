# SurgicalEd VR — Frontend Dashboard

Admin and management dashboard for a VR surgery training platform. Serves platform admins, institution admins, trainers, and trainees across multiple institutions.

## Stack

- **Framework**: [Refine v5](https://refine.dev) (headless) + React 19 + Vite
- **Routing**: React Router v7 via `@refinedev/react-router`
- **UI**: [shadcn/ui](https://ui.shadcn.com) + [Refine shadcn registry](https://ui.refine.dev)
- **Styling**: TailwindCSS v4
- **Auth**: JWT via backend REST API (AWS Cognito managed server-side)
- **Linting**: BiomeJS
- **Testing**: Vitest + Playwright
- **API mocking**: MSW

## Getting started

```bash
pnpm install
pnpm dev:mock   # dev server with MSW mocking (no backend needed)
pnpm dev        # dev server against real backend (requires VITE_API_URL)
```

Copy `.env.example` to `.env.local` and set `VITE_API_URL` for real backend usage.

## Mock credentials

When running `pnpm dev:mock`:

| Email | Password | Role |
|---|---|---|
| `platform-admin@example.com` | `password` | Platform Admin |
| `institution-admin@example.com` | `password` | Institution Admin |
| `trainer@example.com` | `password` | Trainer |
| `trainee@example.com` | `password` | Trainee |

## Commands

```bash
pnpm dev          # Dev server (requires backend)
pnpm dev:mock     # Dev server with MSW API mocking
pnpm build        # Type-check + production build
pnpm preview      # Preview production build
pnpm check        # Biome lint + format (auto-fix)
pnpm ci           # Biome in CI mode (no auto-fix)
pnpm test         # Vitest unit tests
pnpm test:e2e     # Playwright E2E tests
```

## Project structure

```
src/
  components/
    layout/         # App shell (sidebar, header)
    ui/             # shadcn/ui base components
    refine-ui/      # Refine registry components (views, buttons, data-table, etc.)
  pages/
    dashboard/      # Home page
    login/          # Login page
  providers/
    auth-provider.ts        # JWT auth via REST API
    data-provider.ts        # Lambda REST API data layer
    access-control.ts       # RBAC for all four roles
  mocks/
    handlers.ts     # MSW handlers (add endpoints here as API spec is defined)
  types/            # Shared TypeScript types
```

## Architecture notes

This is a multi-tenant system. Tenant scoping (which institution's data a user sees) is enforced server-side. The frontend RBAC matrix in `src/providers/access-control.ts` controls which actions each role can perform — it does not enforce data visibility.

Backend and infrastructure live in separate repos.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, workflow, and commit conventions.
