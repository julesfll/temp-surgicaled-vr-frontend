# Contributing to SurgicalEdVR Frontend

## Prerequisites

- **Node.js** 22+
- **pnpm** 10+ (`npm install -g pnpm`)
- A `.env.local` file (copy from `.env.example`)

## Setup

```bash
git clone https://github.com/julesfll/temp-surgicaled-vr-frontend.git
cd temp-surgicaled-vr-frontend
pnpm install
cp .env.example .env.local
# Edit .env.local with your local values
```

Git hooks are installed automatically by the `postinstall` script. If they aren't active, run:

```bash
pnpm lefthook install
```

## Development

```bash
pnpm dev          # With real backend (VITE_API_URL must be set)
pnpm dev:mock     # With MSW mock API (no backend needed)
```

## Code Quality

We use **BiomeJS** (not ESLint/Prettier) for linting and formatting.

```bash
pnpm check        # Run biome and auto-fix issues
pnpm lint         # Lint only
pnpm format       # Format only
```

The pre-commit hook runs biome automatically on staged files. Fix any issues before pushing.

## Commit Messages

We use **Conventional Commits** enforced by commitlint.

Format: `type(scope): description`

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Config, tooling, dependencies |
| `docs` | Documentation changes |
| `refactor` | Refactoring without behavior change |
| `test` | Adding/updating tests |
| `ci` | CI/CD changes |
| `build` | Build system changes |

Common scopes: `auth`, `users`, `institutions`, `sessions`, `results`, `layout`, `config`, `deps`

**Examples:**
```
feat(users): add user list page with data table
fix(auth): handle expired token redirect correctly
chore(deps): upgrade @refinedev/core to v5.1
test(auth): add auth provider unit tests
```

## Branching

```
feature/short-description
fix/short-description
chore/short-description
docs/short-description
```

Branch from `main`, PR back to `main`.

## Adding UI Components

### shadcn/ui base components
```bash
pnpx shadcn@latest add <component>
```

### Refine registry components
```bash
pnpx shadcn@latest add https://ui.refine.dev/r/<name>.json
```

Both install code directly into `src/components/` — it's yours to modify.

## Adding API Mock Handlers

When the backend API spec is defined, add MSW handlers to `src/mocks/handlers.ts`:

```ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/users", () => {
    return HttpResponse.json({ data: [], total: 0 });
  }),
];
```

Run with `pnpm dev:mock` to test without the real backend.

## Testing

```bash
pnpm test          # Vitest (unit/integration)
pnpm test:e2e      # Playwright (E2E, requires dev server)
```

## Pull Requests

Use the PR template. Before opening a PR:

1. `pnpm check` passes
2. `pnpm build` succeeds
3. Tested in the browser
4. Added tests if adding new behavior
