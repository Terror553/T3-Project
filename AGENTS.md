# Agent Guidelines

## Build & Test Commands
- Build: `npm run build` (Next.js build)
- Dev: `npm run dev` (Start development server with Turbo)
- Lint: `npm run lint` (Run ESLint)
- Lint with fixes: `npm run lint:fix` (Run ESLint with automatic fixes)
- Type check: `npm run typecheck` (Run TypeScript type checking)
- Format check: `npm run format:check` (Check code formatting with Prettier)
- Format code: `npm run format:write` (Format code with Prettier)
- Full check: `npm run check` (Run both lint and type checking)
- Database operations:
  - Generate migrations: `npm run db:generate`
  - Apply migrations: `npm run db:migrate`
  - Push schema changes: `npm run db:push`
  - Open Prisma Studio: `npm run db:studio`

## Code Style Guidelines
- **Formatting:** Use Prettier with default config (2 space indentation)
- **Imports:** Use type imports with inline style (`import type { Type } from 'module'`)
- **Naming:** 
  - Use camelCase for variables/functions
  - PascalCase for React components and types/interfaces
  - UPPER_CASE for constants
- **Types:** 
  - Enable strict TypeScript checking
  - Avoid using `any` type
  - Use explicit return types on functions
  - Use path aliases (`~/` points to `/src`)
- **Error Handling:** 
  - Use try/catch blocks with specific error types
  - Properly handle Promise rejections
- **React Components:**
  - Use functional components with hooks
  - One component per file
  - Follow Next.js patterns for page components
- **State Management:**
  - Use React's built-in state management (useState, useContext)
  - Leverage React Hook Form for form state
- **Prisma Usage:**
  - Follow Prisma best practices for database queries
  - Use schema validation with Zod

## Common Practices
- Run `npm run check` before submitting PRs
- Keep components small and focused
- Use the Next.js App Router patterns
- Enforce type safety throughout the application
- Use path aliases (`~/`) instead of relative imports
- Follow the T3 Stack conventions