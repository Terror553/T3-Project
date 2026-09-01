# Agent Guidelines

This file is the primary operating instruction for agents working in this repository. It defines how to code, validate, and stay aligned with the project’s architecture and prior implementation work.

Before starting work, read the relevant project references in this order:

1. `AGENTS.md` (this file)
2. `DOC.md` (main technical architecture and feature guide)
3. `DOC_AGENT.md` (documentation and tracking workflow)
4. `TO_DO.md` (live backlog)
5. `PLAN_FOR_TO_DO.md` and `plan.md` (execution roadmap and current status)
6. `IMPLEMENTED_FEATURES.md` (what has already been built in this session)
7. `FILES.md` (tree / recent file activity)

The default behavior for any task is to reuse, extend, and integrate existing project patterns instead of reinventing them from scratch.

## 1. Mission and Working Philosophy

This project is a Next.js T3 application with Prisma, App Router, custom forum/admin/community features, and a large amount of work already implemented. The agent should behave like an experienced engineer working in a mature codebase:

- Prefer extending existing modules over creating new parallel implementations.
- Reuse established server actions, API patterns, Prisma access patterns, and client components before introducing new abstractions.
- Follow the architecture already documented in `DOC.md` and the feature patterns already established in the repo.
- Avoid "greenfield rewrites" if a nearby implementation already solves the same problem.
- Do not create duplicate versions of helpers, modals, schemas, or API route shapes when a working pattern already exists.

Never work in the wrong folder. The current active worktree is the source of truth for this session.

## 2. Repository Map and Architecture

The app is organized around the standard T3 stack architecture:

- `src/app`: Pages and route handlers
- `src/server`: DB access, auth/session logic, domain modules, server-only utilities
- `src/components`: Reusable UI
- `src/client`: Global client providers and contexts
- `src/hooks`: Client-side feature hooks
- `src/lib`: Shared schemas, sanitizers, form utilities
- `src/utils`: Shared utilities and API helpers
- `prisma/`: Prisma schema and migrations

Important product pattern:

- Pages and API routes live under `src/app`.
- Database logic and domain operations live under `src/server`.
- Client-side state and UI concerns live under `src/client`, `src/hooks`, and `src/components`.
- Shared validation and sanitization live under `src/lib`.
- Reuse `~/` imports consistently instead of deep relative imports.

## 3. Use the Existing Project, Not a Blank Template

Before implementing anything, check whether the project already has an equivalent or adjacent implementation.

Use these files as primary references for existing feature patterns:

- `DOC.md` contains the developer architecture and feature system documentation.
- `IMPLEMENTED_FEATURES.md` shows features already added in this session and the related file paths.
- `PLAN_FOR_TO_DO.md` and `plan.md` show the intended backlog and execution strategy.
- `TO_DO.md` tells you what is still missing and what the project expects.

Examples of reuse-first behavior:

- If a form already exists in the same feature area, match its component structure and validation flow instead of creating a different one.
- If the app already has a `getCurrentUser()` pattern, use it instead of introducing a separate user fetch pattern.
- If forum/admin APIs already use a certain response envelope or role guard pattern, preserve it.
- If the upload/storage pattern already exists, keep using `src/server/storage/storage.ts` and related helpers instead of inventing a parallel file system layer.

When in doubt, do not start from zero. Find the nearest existing implementation and extend it.

## 4. Required Reading and Workflow Rules

### Mandatory context rules

Every coding task should start with a narrow read of the exact files involved, not a broad repo search without purpose.

Use this sequence when entering a feature area:

1. Read the relevant route/file from the feature being changed.
2. Read the sibling route or component that follows the same pattern.
3. Read the server module or utility it depends on.
4. Read the documentation entry in `DOC.md` that describes the feature or workflow.
5. Only then implement the change.

### Feature-driven implementation rule

Work in feature order, not by file order. Meaning:

- Start from the next actionable item in `TO_DO.md` and `PLAN_FOR_TO_DO.md`.
- Prefer items that are user-facing and runtime-critical before lower-priority integrations.
- Keep changes scoped to the current feature instead of doing unrelated cleanup.

## 5. Development Workflow

### Validate narrowly first

Run the smallest relevant validation command before and after a change.

Typical commands:

- `npm run lint`
- `npm run typecheck`
- `npm run check`
- `npm run build` only when the task genuinely requires full build validation
- Feature-specific test files via Vitest when they exist for the area being changed

The repo standard is to use the existing validation pipeline, not to invent new testing tools or workflows.

### Keep changes surgical

- Do not refactor broadly unless the task requires it.
- Avoid unrelated formatting churn.
- Fix the exact issue in the relevant layer.
- Preserve public APIs unless the current task intentionally changes them.

### Keep project history coherent

This repo is meant to preserve a clean change story. Follow these expectations:

- Keep commits focused on one feature or clear fix.
- Do not mix unrelated changes in a single commit.
- Update tracking files when the task warrants it (`plan.md`, `IMPLEMENTED_FEATURES.md`, `TO_DO.md`).
- Do not commit the live implementation summary file unless the user explicitly says to finalize it.

## 6. Type Safety and Quality Standards

Strict TypeScript is mandatory.

Rules:

- No unexpected `any` types in production code.
- Prefer explicit, narrow types.
- Use existing mapped types or Prisma result shapes rather than ad hoc broad object types.
- Handle `unknown` safely and narrow it before usage.
- Use `try/catch` around async operations that can fail.
- Validate untrusted input at API boundaries.

Examples:

- If the API body is parsed, type it explicitly and check field shapes.
- If a config value may be undefined, handle it before use.
- If a Prisma model relation is optional, type it as optional instead of assuming it exists.

Use `type` imports for TS type-only imports: `import type { Foo } from "~/..."`.

## 7. Code Style and Conventions

### Formatting

- Use Prettier with the repository’s default config.
- Use 2-space indentation.
- Use semicolon-free or repo-standard formatting as already present in the files around the change.
- Keep imports arranged logically and minimal.

### Naming

- `camelCase` for variables and functions.
- `PascalCase` for React components, interfaces, and types.
- `UPPER_CASE` for constants.
- Use descriptive names that reflect domain meaning, not generic labels like `data` or `props` without context.

### Imports

- Prefer `~/` aliases for app code.
- Prefer type imports for model and API contract types.
- Keep imports grouped by function: framework, app modules, local utilities.

### React and Next.js patterns

- Use functional components and hooks.
- Keep one main component per file.
- Follow Next.js App Router conventions for pages and route modules.
- Use server-only logic only in server components or server route handlers.
- Do not put server-side DB logic in client components.
- Use Bootstrap-driven classes and project-existing styling patterns instead of ad hoc CSS frameworks.

### Serializer / validation patterns

- Forms should use Zod validation where the project uses it.
- Use project form helpers when they already exist (`FormProvider`, `useFormManager`, `sanitizeInput`, loading bar patterns, notification helpers).
- Prefer the existing notification and toast infrastructure over inventing custom alert logic.

## 8. Forms, Validation, and User Input Safety

The project has explicit expectations for forms and user input.

Rules:

- Use Zod validation at API/input boundaries.
- Use `sanitizeInput` for text fields where the project already expects sanitization.
- Prefer `FormProvider` and `useFormManager` for forms already built in the project.
- Keep validation behavior consistent with adjacent feature examples.
- Surface user-visible errors through the existing notification flow and loading bar patterns.

If a form or input mutation is already implemented in a nearby module, mirror that style and shape rather than inventing a new one.

## 9. Auth, Session, and User Access Patterns

The project uses a shared auth/session model.

Rules:

- Reuse `getCurrentUser()` or the equivalent session helper for authenticated actions.
- Redirect or reject unauthorized requests centrally and consistently.
- Respect team/group permission checks where existing admin or moderation pages already do so.
- Do not bypass `getCurrentUser()` with ad hoc authentication checks.

When implementing admin or moderation actions, follow the same authorization pattern as the existing admin routes/pages.

## 10. Prisma and Database Rules

- Use the Prisma singleton in `src/server/db.ts`.
- Preserve `@@map` names and existing model semantics unless a migration intentionally changes them.
- Prefer safe, targeted Prisma queries over broad fetching.
- Keep model mappings and app-facing types in `src/server/types/*` consistent with Prisma output.
- If the schema changes, update the related app logic and types together.

Use `npm run db:generate` for schema changes when appropriate, and use `npm run db:push` only when an intentional direct schema sync is needed.

## 11. API Route and Server Module Patterns

Follow the project’s route conventions:

- API route handlers live in `src/app/api/...`
- Domain logic and Prisma orchestration live in `src/server/...`
- Parameter handling and request parsing stay near the route boundary
- Errors should be explicit and user-safe, with meaningful status codes

When implementing routes, prefer the shape already used by nearby endpoints:

- parse JSON with typed payloads
- validate required fields before DB access
- return `NextResponse.json(...)` with proper HTTP status codes
- avoid swallowing errors with silent fallbacks

## 12. Reuse Existing Feature Implementations

This project already includes working patterns for many feature types, including:

- forum topic and reply creation / edit / deletion
- reaction and follow toggles
- messaging inbox and thread flows
- admin category and role management
- profile settings and avatar upload persistence
- global modal management
- storage upload adapters and metadata persistence
- session and auth helpers

Before implementing anything new, check whether the project already has:

- a nearby API route with the same shape
- a server helper used for the same operation
- a client component with the same UX pattern
- a shared utility for the same validation / formatting / storage concern

If a feature is already implemented, use it as the reference implementation. If it is partially implemented, extend the existing code instead of creating a parallel branch.

## 13. Testing Expectations

The project already contains targeted tests. Prefer those existing patterns to validate feature work.

When a task touches a feature with existing coverage, add or expand the nearest relevant test rather than creating a disconnected test file.

Run the relevant test file or validation command after making the change.

## 14. Documentation and Tracking Rules

The agent must keep the project’s documentation and tracking aligned with actual code:

- `DOC.md` is the canonical technical documentation.
- `PLAN_FOR_TO_DO.md` and `plan.md` describe roadmap and active execution status.
- `IMPLEMENTED_FEATURES.md` tracks what the agent already delivered.
- `TO_DO.md` tracks the remaining backlog.
- `FILES.md` tracks the live project inventory.

When a feature is implemented or materially changed, the agent should update the relevant summary file if the task is part of the active session workflow.

## 15. Quality Gate Before Closing a Task

Before considering a feature complete, the agent should verify:

- the code matches surrounding project patterns
- TypeScript and lint checks pass
- the change is scoped to the task
- adjacent routes or components were not broken
- the implementation is consistent with `DOC.md` and the existing codebase

Do not claim success just because the change looks plausible. Confirm it with the repo’s existing checks and, when relevant, the nearest test coverage.

## 16. Standard Commands

Build and validation commands:

- Build: `npm run build`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Lint with fixes: `npm run lint:fix`
- Type check: `npm run typecheck`
- Format check: `npm run format:check`
- Format code: `npm run format:write`
- Full check: `npm run check`
- Database generate: `npm run db:generate`
- Database migrate: `npm run db:migrate`
- Database push: `npm run db:push`
- Prisma Studio: `npm run db:studio`

## 17. Non-Negotiable Rules

- Do not invent architecture that contradicts the existing repo.
- Do not create new patterns when a nearby implementation already exists.
- Do not leave the project with unexpected `any` values or unsafe type escapes.
- Do not rush features without checking how the project already does them.
- Do not work against the repo’s design conventions or philosophy.
- Follow `DOC.md` as the product architecture reference and the current repo state as the source of truth.

This project already contains meaningful, working implementations. The agent’s job is not to rebuild the app on a blank slate; it is to build carefully, extend correctly, and keep the implementation consistent with the project’s established patterns.
