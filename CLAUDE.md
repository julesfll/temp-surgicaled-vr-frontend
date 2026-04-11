# SurgicalEd VR — Frontend Dashboard

## Project Overview

Admin/management dashboard for a VR surgery training platform. Serves **admins**, **trainers**, and **trainees** for managing users, institutions, VR sessions, and viewing performance results. No direct VR integration in this repo.

**Backend**: Lambda TypeScript REST API + DynamoDB (separate repo, API spec TBD)
**Auth**: AWS Cognito (managed server-side — frontend just calls REST auth endpoints and stores JWTs)
**Deployment**: CloudFront + S3 via CDK (separate repo)

---

## Commands

```bash
pnpm dev           # Start dev server (requires backend or use dev:mock)
pnpm dev:mock      # Start dev server with MSW API mocking enabled
pnpm build         # TypeScript type-check + Vite production build
pnpm preview       # Preview production build locally
pnpm check         # Biome lint + format (auto-fix)
pnpm lint          # Biome lint only
pnpm format        # Biome format only
pnpm ci            # Biome in CI mode (no auto-fix, fails on any issue)
pnpm test          # Vitest unit/integration tests
pnpm test:e2e      # Playwright E2E tests
```

---

## Tech Stack

| Layer | Tool |
|---|---|
| Package Manager | pnpm |
| Framework | Refine v5 (`@refinedev/core`) |
| UI Components | shadcn/ui + Refine shadcn registry (`ui.refine.dev`) |
| Styling | TailwindCSS v4 (`@tailwindcss/vite` — no tailwind.config.js) |
| Build | Vite + `@vitejs/plugin-react` |
| Routing | React Router v7 via `@refinedev/react-router` |
| Linting/Formatting | BiomeJS (replaces ESLint + Prettier) |
| Git Hooks | Lefthook (pre-commit: biome; commit-msg: commitlint) |
| Commit Style | Conventional Commits |
| Unit Tests | Vitest + React Testing Library |
| E2E Tests | Playwright |
| API Mocking | MSW (Mock Service Worker) |
| CI | GitHub Actions |

---

## Architecture

### Refine providers (`src/providers/`)

| File | Purpose |
|---|---|
| `auth-provider.ts` | Calls backend REST auth endpoints (`/auth/login`, `/auth/logout`). Decodes JWT, checks expiry, provides role for RBAC. |
| `data-provider.ts` | Custom Refine `DataProvider` calling the Lambda REST API. Attaches JWT `Authorization` header automatically. |
| `access-control.ts` | Refine `accessControlProvider` — RBAC matrix for admin/trainer/trainee roles. |

### Layout (`src/components/layout/`)

- `app-layout.tsx` — Root shell: `SidebarProvider` + `AppSidebar` + `Header` + content area
- `app-sidebar.tsx` — Sidebar nav built with shadcn `Sidebar` + Refine `useMenu()` hook
- `header.tsx` — Top bar with theme toggle + user identity/logout dropdown

### Pages (`src/pages/`)

Organized by resource. Currently only `dashboard/` and `login/` have placeholder content. Resource pages (users, institutions, sessions, results) will be added when the API spec is defined.

### Refine registry components (`src/components/refine-ui/`)

Pre-built components from `https://ui.refine.dev/r/`. These are **project-owned** code (not npm packages) and can be customized freely. Installed via shadcn CLI.

Available: `views/`, `buttons/`, `data-table/`, `layout/` (breadcrumb, error-component, loading-overlay), `notification/`, `theme/`, `form/`

### shadcn/ui components (`src/components/ui/`)

Base shadcn components copied into the project. Also project-owned and customizable.

---

## Key Conventions

- **Path alias**: `@/` → `src/`
- **Linting**: Use BiomeJS — NOT ESLint. Run `pnpm check` to lint and format.
- **Imports**: Biome organizes imports automatically. Don't manually sort.
- **Refine hooks first**: Use Refine's built-in hooks (`useList`, `useOne`, `useCreate`, `useUpdate`, `useDelete`, `useForm`, `useCan`, `useGetIdentity`, `useMenu`, etc.) for all data/auth/navigation. Don't reinvent what Refine provides.
- **RBAC**: Use `useCan` from `@refinedev/core` in components to check permissions. Use `<CanAccess>` for conditional rendering. Roles: `platform_admin`, `institution_admin`, `trainer`, `trainee`.
- **Notifications**: Use Refine's `useNotification()` hook — it's connected to the Sonner toast provider.
- **API mocking**: Add MSW handlers to `src/mocks/handlers.ts` when API spec is defined. Run `pnpm dev:mock` to test locally without the backend.

### Forms (react-hook-form + zod)

Zod schemas live in `src/schemas/<resource>.ts` and export both the schema and its inferred type.

Always wrap form JSX in the shadcn `<Form>` wrapper and use `<FormField>` → `<FormItem>` → `<FormControl>` / `<FormMessage>` for each input so validation errors render automatically.

**CRUD forms** (create/edit resource pages) — use `useForm` from `@refinedev/react-hook-form` to bind to the data provider:

```ts
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormValues } from "@/schemas/users";

const form = useForm<UserFormValues>({
  resolver: zodResolver(userSchema),
  refineCoreProps: { resource: "users", action: "create" },
});
```

**Non-CRUD forms** (login, filters, etc.) — use plain `useForm` from `react-hook-form`:

```ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";

const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: "", password: "" },
});
```

See `src/pages/login/index.tsx` for the canonical non-CRUD form example.

### Tables (TanStack Table via Refine)

Use `useTable` from `@refinedev/react-table` for resource list pages. Pass the result into the existing `<DataTable>` wrapper — do **not** call `useTable` inside `DataTable`.

```ts
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name", meta: { filterOperator: "contains" } },
  // ...
];

const table = useTable<User>({
  columns,
  refineCoreProps: { resource: "users" },
});

return <DataTable table={table} />;
```

Sorting, pagination, and filtering are handled by Refine via the data provider. Filter operators (`"contains"`, `"eq"`, etc.) live on `columnDef.meta.filterOperator`.

---

## Adding Components

### shadcn/ui base components
```bash
pnpx shadcn@latest add <component-name>
```

### Refine registry components
```bash
pnpx shadcn@latest add https://ui.refine.dev/r/<component-name>.json
```

Available registry items: `views`, `buttons`, `data-table`, `breadcrumb`, `loading-overlay`, `error-component`, `auto-save-indicator`, `theme-provider`, `notification-provider`

---

## Claude Code Setup

### Active MCP Servers (project-level)

| Server | Purpose | Add command |
|---|---|---|
| **Context7** | Real-time framework docs (Refine, shadcn, etc.) | Already installed |
| **GitHub** | PR/issue management | Already installed |
| **Playwright** | E2E browser testing | Available in session |

Use Context7 by adding `use context7` to your prompts when asking about Refine, shadcn, or other framework docs.

### Recommended Extensions

Install from the VS Code extensions panel or via the `.vscode/extensions.json` recommendations:
- `biomejs.biome` — BiomeJS formatter/linter
- `bradlc.vscode-tailwindcss` — Tailwind IntelliSense
- `anthropic.claude-code` — Claude Code IDE integration

### Recommended Skills / Slash Commands

- `/commit` — Generate conventional commit messages
- `/code-review` — Review staged/changed code
- `/revise-claude-md` — Update this file with session learnings
