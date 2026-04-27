# MelonenMC T3 Project - Full Developer Documentation

## 1. Purpose of This Document

This guide is the main technical onboarding and maintenance reference for this repository.

It is written to help developers:
- Understand how the project is structured.
- Add, modify, and remove features safely.
- Reuse existing patterns for database, API, server actions, types, forms, and notifications.
- Avoid common mistakes when extending the codebase.

Use this document together with:
- `AGENTS.md` for day-to-day coding standards and command references.
- `prisma/schema.prisma` for data model truth.
- `src/server/types/*` for app-facing type contracts.

---

## 2. Project Snapshot

### Tech Stack

- Framework: Next.js App Router (v15)
- Language: TypeScript (strict settings)
- ORM: Prisma
- Database: MySQL
- Validation: Zod
- Auth/session: cookie-based token session backed by database (`forum_user.userAuthToken`)
- UI base: Bootstrap classes + custom theme assets
- Notifications: app-level notification context + toast container

### Runtime Model

- App routes and API routes live under `src/app`.
- Data access lives in `src/server`.
- Client contexts/hooks/components live in `src/client`, `src/hooks`, and `src/components`.
- Shared helpers live in `src/utils` and `src/lib`.

---

## 3. Quick Start for New Developers

### Prerequisites

- Node.js 18+
- npm 9+
- MySQL database

### Setup

1. Install dependencies.

```bash
npm install
```

2. Create a `.env` file with required values.

Example:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DB_NAME"
NODE_ENV="development"
```

3. Generate/apply schema changes if needed.

```bash
npm run db:generate
npm run db:migrate
```

4. Start development server.

```bash
npm run dev
```

5. Open http://localhost:3000.

### Verification Checklist

Run before opening PRs:

```bash
npm run check
npm run build
```

---

## 4. Repository Map and Responsibilities

### Top-Level

- `src/app`: Pages and API route handlers.
- `src/server`: Database client, auth/session logic, data access modules, server-only types/utilities.
- `src/components`: Reusable UI pieces.
- `src/client`: Global client providers and contexts.
- `src/hooks`: Feature hooks for fetching and UI state.
- `src/lib`: Shared client form/sanitize abstractions.
- `src/utils`: API wrapper and reusable utility helpers.
- `prisma`: Database schema and migrations.

### Feature-Oriented View

- Forum:
  - Page routes: `src/app/forum/*`
  - API routes: `src/app/api/forum/*`
  - Server data module: `src/server/forum/forum.ts`
  - Hook: `src/hooks/useForum.ts`
  - UI components: `src/components/forum/*`

- Authentication:
  - API routes: `src/app/api/auth/*`
  - Server actions: `src/server/auth/actions/*`
  - Session utilities: `src/server/auth/session.ts`
  - User context: `src/client/user.tsx`
  - Forms: `src/components/loginForm.tsx` and `src/components/form/*`

- Wiki:
  - Page route: `src/app/wiki/page.tsx`
  - API route: `src/app/api/wiki/route.ts`
  - Server data module: `src/server/wiki/wiki.ts`

---

## 5. Application Flow (End to End)

Typical read flow:

1. Client page/hook calls an API route (for example, `/api/forum`).
2. API route delegates to server module function (for example, `getCategories`).
3. Server module queries Prisma and reshapes output into app-specific type shape.
4. API route returns JSON.
5. UI renders typed data and handles loading/error states.

Typical auth mutation flow:

1. Client form validates with Zod through `FormProvider` and `useFormManager`.
2. Client calls server action (`signIn`/`signUp`).
3. Server action validates input again using auth schema.
4. Server action reads/writes DB and sets session cookie.
5. Client refreshes current user context and shows toast notification.

---

## 6. Environment and Configuration

Environment schema is defined in `src/env.js` using `@t3-oss/env-nextjs`.

Current required server variables:
- `DATABASE_URL`: must be a valid URL.
- `NODE_ENV`: `development | test | production`.

Important behavior:
- Build/start can fail early if required env vars are missing or invalid.
- `SKIP_ENV_VALIDATION=true` can bypass validation during specific workflows (for example Docker builds).

---

## 7. Database and Prisma Guide

### 7.1 Source of Truth

- Prisma schema: `prisma/schema.prisma`
- DB client singleton: `src/server/db.ts`

`src/server/db.ts` uses a singleton pattern in development to avoid creating multiple Prisma clients during hot reload.

### 7.2 Main Domain Models You Will Touch Most

- `ForumUser`
- `ForumCategory`
- `ForumSubcategory`
- `ForumTopic`
- `ForumTopicReply`
- `Group`
- `WikiCategory`, `WikiSubCategory`

Many models are mapped to existing DB table names via `@@map(...)`, so keep map names intact unless doing a deliberate migration.

### 7.3 Migration Workflow

For local schema evolution:

```bash
npm run db:generate
```

For deployment migration application:

```bash
npm run db:migrate
```

For quick schema sync (use with care):

```bash
npm run db:push
```

For visual inspection:

```bash
npm run db:studio
```

### 7.4 Query Pattern Used in This Codebase

Server modules often:
- Fetch rich relation trees (`include` / `select`).
- Map Prisma shape into app-facing custom types in `src/server/types`.

Example pattern (simplified):

```ts
const topic = await db.forumTopic.findFirst({
  where,
  include: {
    replies: { include: { author: { include: { group: true } } } },
    author: { include: { group: true } },
  },
});

if (!topic) throw new Error("Topic not found");

return {
  ...topic,
  forum_topic_replies: topic.replies.map((reply) => ({
    ...reply,
    forum_user: reply.author,
  })),
  forum_user: topic.author,
};
```

### 7.5 Adding a New Database Field Safely

Checklist:

1. Update model in `prisma/schema.prisma`.
2. Run migration command (`npm run db:generate`).
3. Update server module selectors/includes using that model.
4. Update relevant custom app types in `src/server/types/*`.
5. Update UI and API serialization assumptions.
6. Run `npm run check` and verify key pages manually.

---

## 8. Type System Guide

### 8.1 Type Layers in This Project

- Prisma-generated types: implicit from Prisma client.
- App domain types: explicit interfaces under `src/server/types/*`.

Why custom app types exist here:
- The app returns transformed shapes (for legacy naming and UI convenience).
- A direct Prisma type is often not equal to the final API payload shape.

### 8.2 Example: Forum Type Mapping

`src/server/forum/forum.ts` maps DB records into interfaces in `src/server/types/forum.ts`, such as:
- `ForumTopic.forum_topic_replies`
- `ForumTopic.forum_user`
- `ForumSubcategory.latestEntry`

This mapping is intentional and should remain consistent.

### 8.3 Rules for Adding/Modifying Types

- Always update both:
  - Data producer (server module).
  - Data contract (`src/server/types/...`).
- Prefer explicit optional fields where API may omit data.
- Keep naming consistent with existing feature types unless you are performing a full normalization effort.

---

## 9. Authentication and Session Guide

### 9.1 Auth Building Blocks

- Schemas: `src/server/auth/authSchemas.ts`
- Actions: `src/server/auth/actions/signIn.ts`, `signUp.ts`, `logOut.ts`
- Session logic: `src/server/auth/session.ts`
- Current user utility: `src/server/auth/utils/currentUser.ts`
- Standard auth response helpers: `src/utils/authUtils.ts`

### 9.2 Current Session Model

- A random token is generated and stored in `forum_user.userAuthToken`.
- Cookie key: `MELONEN_MC_SESSION`.
- Cookie is HTTP-only and strict same-site.
- Session lookup loads user by token from DB.

### 9.3 Server Action Pattern

Each action generally does:

1. Validate with Zod.
2. Query DB.
3. Return standardized success/error payload.
4. Create/update/remove session when needed.

Example usage from client side:

```ts
const result = await signIn({ email, password });

if (!result.success) {
  addNotification("Login failed", "error", 5000);
  return;
}

await refreshUser();
addNotification(`Welcome ${result.data?.username}`, "success", 5000);
```

### 9.4 Adding a New Protected Feature

1. Resolve current user on server (`getCurrentUser` or session helper).
2. Reject unauthorized users early.
3. Use role/team checks if feature is staff-only.
4. Return consistent auth errors using `AuthErrorCode` and `createErrorResult`.

---

## 10. API Route Guide

### 10.1 Location

All route handlers are in `src/app/api/**/route.ts`.

### 10.2 Current Style

There are two patterns in the repository:

- Wrapper style (`apiHandler`) for consistent success/error handling.
- Inline `try/catch` style returning `NextResponse` directly.

Both are currently used. For new routes, prefer a consistent wrapper approach where possible.

### 10.3 Common Read Route Pattern

```ts
export async function GET() {
  return apiHandler({
    handler: getCategories,
    errorMessage: "Failed to fetch forum categories",
  });
}
```

### 10.4 Route Creation Checklist

1. Add route at `src/app/api/<feature>/route.ts` (or nested dynamic route).
2. Delegate logic to `src/server/<feature>/<module>.ts`.
3. Return typed JSON.
4. Add client fetching integration in page/hook.
5. Add loading and error UI states.

---

## 11. Forms, Validation, and Input Safety

### 11.1 Current Form Stack

- Validation schemas: Zod.
- Form state manager: `src/lib/useFormManager.ts`.
- Provider wrapper: `src/components/form/FormProvider.tsx`.
- Input component(s): `src/components/form/TextInput.tsx`.
- Input sanitizer: `src/lib/sanitize.ts`.

### 11.2 Validation Flow

- Client validates before submit via `schema.safeParse(values)`.
- Server action validates again (required).

Never rely on client-only validation for security.

### 11.3 New Form Recipe

1. Create a Zod schema (feature-level schema file).
2. Create initial values typed as `z.infer<typeof schema>`.
3. Wrap your fields in `FormProvider`.
4. Use `useFormContext` in inner form component.
5. Submit to server action/API.
6. Show success/failure toast using notification context.

---

## 12. Notifications and User Feedback

### 12.1 Notification Architecture

- Provider: `src/client/notification.tsx`
- Renderer: `src/components/toastContainer.tsx`
- Mounted in root layout.

`addNotification(message, type, duration)` is the primary API.

Supported types:
- `success`
- `error`
- `info`
- `warning`

### 12.2 Example

```ts
const { addNotification } = useNotification();

addNotification("Profile updated", "success", 3000);
addNotification("Failed to update profile", "error", 5000);
```

### 12.3 Best Practices

- Success toasts: short duration (2-4 seconds).
- Error toasts: longer duration (4-8 seconds).
- Keep message actionable and specific.

---

## 13. Theme and Loading UX

### 13.1 Theme Context

`src/client/theme.tsx` provides:
- `isDarkMode`
- `toggleTheme`
- `showLoadingBar(id)`
- `hideLoadingBar(id)`

It persists mode in `localStorage` and controls `.loading-bar` element class state.

### 13.2 Feature Loading Pattern

Used in forum/wiki/topic pages:

```ts
showLoadingBar("featureLoad");
setLoading(true);

try {
  const res = await fetch("/api/...");
  // process
} finally {
  setLoading(false);
  hideLoadingBar("featureLoad");
}
```

Use unique loading IDs per concurrent operation.

---

## 14. Existing Feature Guides

### 14.1 Forum Feature

Core files:
- `src/server/forum/forum.ts`
- `src/app/api/forum/**/*`
- `src/hooks/useForum.ts`
- `src/app/forum/**/*`
- `src/components/forum/*`

Capabilities currently present:
- Category listing
- Subcategory details
- Topic details
- Latest topic lookup
- Derived counts and latest reply metadata

How to add a forum endpoint example ("featured topics"):

1. Add function in `src/server/forum/forum.ts`:

```ts
export async function getFeaturedTopics() {
  return db.forumTopic.findMany({
    where: { pinned: 1 },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}
```

2. Add API route `src/app/api/forum/featured/route.ts`.
3. Add hook or page fetch.
4. Render with existing forum components or new presentational component.

### 14.2 Auth Feature

Core files:
- `src/server/auth/actions/signIn.ts`
- `src/server/auth/actions/signUp.ts`
- `src/server/auth/session.ts`
- `src/components/loginForm.tsx`
- `src/app/api/auth/user/route.ts`

How to add "change password" feature:

1. Add Zod schema in auth schema module.
2. Add server action that:
   - Validates old password.
   - Hashes new password.
   - Updates DB.
3. Add client form with `FormProvider`.
4. Add notifications and optional forced re-login.

### 14.3 Wiki Feature

Core files:
- `src/server/wiki/wiki.ts`
- `src/app/api/wiki/route.ts`
- `src/app/wiki/page.tsx`
- `src/components/wiki.tsx`

Current behavior:
- Loads category + subcategory tree with author/group metadata.
- Maps DB shape to `WikiCategoryFull` view shape.

---

## 15. Add / Modify / Remove Feature Playbooks

### 15.1 Add a New Feature (Recommended Path)

1. Define the capability and data contract first.
2. Add/adjust DB schema only if needed.
3. Implement server module function in `src/server/<feature>`.
4. Add API route or server action.
5. Add/update types in `src/server/types`.
6. Add UI integration (hook/page/component).
7. Add notification and loading states.
8. Validate with `npm run check` and manual testing.

### 15.2 Modify an Existing Feature Safely

1. Find all usage points:
   - API route
   - Server module
   - Type contract
   - Hook/component consumers
2. Update data shape in one pass (producer + consumers).
3. Keep backward compatibility for route consumers if external clients exist.
4. Verify affected pages manually in browser.

### 15.3 Remove a Feature Safely

1. Remove UI entry points first (navigation/buttons/pages).
2. Remove hooks/components no longer referenced.
3. Remove API routes and server module functions.
4. Remove obsolete types.
5. If DB objects are obsolete, create migration.
6. Run lint/type/build and confirm no dead imports/references.

---

## 16. Practical Examples

### 16.1 Example: New API + Hook + UI Card

Goal: show "latest 5 wiki updates" on home page.

1. Server function in `src/server/wiki/wiki.ts`:

```ts
export async function getLatestWikiUpdates() {
  return db.wikiCategory.findMany({
    select: { id: true, name: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });
}
```

2. API route `src/app/api/wiki/latest/route.ts` calling that function.
3. Hook `src/hooks/useLatestWiki.ts` to fetch and type result.
4. Component `src/components/wiki/LatestUpdates.tsx` to render list.
5. On API error show: `addNotification("Failed to load latest wiki updates", "error", 5000)`.

### 16.2 Example: Add Field to Topic Card

Goal: show reaction count on topic list.

1. Ensure server query includes reactions relation.
2. Extend `ForumTopic` type with computed `reactionCount?: number`.
3. Map `reactionCount` in server module.
4. Render count in subcategory/topic component.

### 16.3 Example: Add Role-Gated Admin Action

1. Resolve current user and group/team flags.
2. Reject non-team users.
3. Log operation and return standard auth error codes.
4. In UI hide control for non-eligible users.

---

## 16A. Usage Examples Catalog (Utilities and Features)

This section provides practical examples for all current utility modules and major integrated feature flows in this repository.

### 16A.1 Shared Utilities (`src/utils`)

#### `src/utils/apiHandler.ts`

Use this in API routes to standardize JSON success/error responses.

```ts
import { getCategories } from "~/server/forum/forum";
import { apiHandler } from "~/utils/apiHandler";

export async function GET() {
  return apiHandler({
    handler: getCategories,
    errorMessage: "Failed to fetch forum categories",
  });
}
```

#### `src/utils/authUtils.ts`

Use this for consistent auth result shape across server actions.

```ts
import {
  AuthErrorCode,
  createErrorResult,
  createSuccessResult,
} from "~/utils/authUtils";

if (!user) {
  return createErrorResult("User not found", AuthErrorCode.USER_NOT_FOUND);
}

return createSuccessResult({ username: user.username });
```

#### `src/utils/dateUtils.ts`

Use for frontend-friendly date formatting and relative time labels.

```ts
import { formatDate, getRelativeTime } from "~/utils/dateUtils";

const absolute = formatDate(topic.createdAt, true); // e.g. "27. Apr. 2026, 14:20"
const relative = getRelativeTime(topic.createdAt); // e.g. "2 days ago"
```

#### `src/utils/styleUtils.ts`

Use `replaceColor` for role/group color rendering (plain color or gradient).

```tsx
import { replaceColor } from "~/utils/styleUtils";

<span
  style={replaceColor({
    color: user.group?.color,
    gradient: user.group?.gradient,
    start: user.group?.start,
    end: user.group?.end,
    isBadge: false,
  })}
>
  {user.username}
</span>;
```

### 16A.2 Server Utilities (`src/server/utils`)

#### `src/server/utils/dbUtils.ts`

Use `generateWhereClause` when route params can be numeric ID or slug.

```ts
import { generateWhereClause } from "~/server/utils/dbUtils";

const where = generateWhereClause(idOrSlug); // { id: 5 } or { slug: "welcome" }
const topic = await db.forumTopic.findFirst({ where });
```

#### `src/server/utils/colorUtils.ts`

Use these helpers when parsing Minecraft color metadata.

```ts
import {
  minecraftColorToRGB,
  replaceAsciiWithMinecraftColor,
  replaceMinecraftColors,
} from "~/server/utils/colorUtils";

const rgb = minecraftColorToRGB("&a"); // "#55FF55"
const htmlText = replaceAsciiWithMinecraftColor("Hello [0;31;1mRed");
const normalized = replaceMinecraftColors("&cError &aSuccess");
```

#### `src/server/utils/dateUtils.ts`

Use this module where German relative/absolute formatting is required.

```ts
import {
  formatDate,
  getRelativeTime,
  getMonth,
  getDay,
  getRemainingTime,
} from "~/server/utils/dateUtils";

const when = formatDate(new Date(), true); // absolute
const ago = getRelativeTime(new Date(Date.now() - 3600_000));
const month = getMonth(new Date());
const day = getDay(new Date());
const remaining = getRemainingTime(Date.now() + 5000);
```

### 16A.3 Form and Input Utilities (`src/lib` + form components)

#### `src/lib/sanitize.ts`

Use `sanitizeInput` to neutralize angle brackets before storing transient form values.

```ts
import { sanitizeInput } from "~/lib/sanitize";

const clean = sanitizeInput(userInput);
```

#### `src/lib/useFormManager.ts` + `src/components/form/FormProvider.tsx`

Use these as the standard schema-based form foundation.

```tsx
const schema = z.object({ name: z.string().min(2) });
type Values = z.infer<typeof schema>;

<FormProvider<Values>
  schema={schema}
  initialValues={{ name: "" }}
  onSubmit={(data) => console.log(data)}
>
  <MyFormFields />
</FormProvider>;
```

Inside field components:

```tsx
const { values, errors, handleChange, handleSubmit } = useFormContext<Values>();

<form onSubmit={handleSubmit}>
  <input value={values.name} onChange={handleChange("name")} />
  {errors.name && <p>{errors.name}</p>}
</form>;
```

### 16A.4 Auth Utilities and Actions

#### `src/server/auth/utils/passwordHasher.ts`

Use for credential creation and verification.

```ts
const salt = generateSalt();
const hashed = await hashPassword(password, salt);

const valid = await comparePasswords({
  password: loginAttempt,
  salt,
  hashedPassword: hashed,
});
```

#### `src/server/auth/utils/defaultRole.ts`

Use to guarantee a fallback role for signup flows.

```ts
const role = await getDefaultRole();
await db.forumUser.create({
  data: {
    username,
    email,
    password,
    salt,
    roleId: role.id,
  },
});
```

#### `src/server/auth/utils/currentUser.ts`

Use to resolve the full signed-in user in server contexts.

```ts
const currentUser = await getCurrentUser();
if (!currentUser) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

#### `src/server/auth/utils/getUser.ts`

Use when loading a specific profile with relation data.

```ts
const user = await getUser(Number(params.id));
if (!user) {
  return NextResponse.json(null, { status: 404 });
}
```

#### `src/server/auth/session.ts`

Use these APIs to create/read/update/remove sessions.

```ts
const user = await getUserFromSession(await cookies());

if (!user) {
  await createUserSession(sessionUser, await cookies());
}

await updateUserSessionExpiration(await cookies());
await removeUserFromSession(await cookies());
```

#### `src/server/auth/actions/signIn.ts` / `signUp.ts` / `logOut.ts`

These are the default auth mutation entry points for client components.

```ts
const signInResult = await signIn({ email, password });
const signUpResult = await signUp({ username, email, password, passwordConfirm });
await logOut();
```

### 16A.5 Client Contexts and Hooks

#### `src/client/user.tsx`

Use user context for auth-aware UI and refresh after auth mutations.

```tsx
const { user, isLoading, refreshUser, updateUser } = useUser();

await refreshUser();
updateUser(null); // e.g. optimistic logout UI
```

#### `src/client/notification.tsx`

Use notification context for global user feedback.

```tsx
const { addNotification, removeNotification, notifications } = useNotification();

addNotification("Saved successfully", "success", 3000);
removeNotification(notifications[0]?.id ?? "");
```

#### `src/client/theme.tsx`

Use for dark/light mode and loading bar control.

```tsx
const { isDarkMode, toggleTheme, showLoadingBar, hideLoadingBar } = useTheme();

toggleTheme();
showLoadingBar("wikiFetch");
hideLoadingBar("wikiFetch");
```

#### `src/hooks/useForum.ts`

Use this hook for category listing page state.

```tsx
const { loading, forum, error } = useForum();

if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
return <ForumCategoryList categories={forum} />;
```

### 16A.6 Feature Usage Examples

#### Forum feature (read flows)

- List categories:

```ts
const categories = await getCategories();
```

- Get single subcategory by ID or slug:

```ts
const subcategory = await getSubCategory("announcements");
```

- Get topic by ID or slug:

```ts
const topic = await getTopic(42);
```

- Get latest topic in subcategory:

```ts
const latest = await getLatestTopic(subcategoryId);
```

#### Wiki feature

```ts
const wikiTree = await getWikiCategories();
```

Client fetch example:

```ts
const res = await fetch("/api/wiki");
const data = (await res.json()) as WikiCategoryFull[];
```

#### Navigation feature

```ts
const nav = await getNavigation();
```

Client usage in navbar:

```ts
const navRes = await fetch("/api/auth/navigation");
const navItems = (await navRes.json()) as NavItem[];
```

### 16A.7 API Route Examples by Existing Endpoint

#### Auth API

```ts
// Current user
const me = await fetch("/api/auth/user").then((r) => r.json());

// User by id
const profile = await fetch(`/api/auth/user/${id}`).then((r) => r.json());

// Navigation
const nav = await fetch("/api/auth/navigation").then((r) => r.json());
```

#### Forum API

```ts
const categories = await fetch("/api/forum").then((r) => r.json());
const subcategory = await fetch(`/api/forum/subcategory/${id}`).then((r) => r.json());
const topic = await fetch(`/api/forum/topic/${id}`).then((r) => r.json());
const latest = await fetch(`/api/forum/latest-topic/${id}`).then((r) => r.json());
```

#### Wiki API

```ts
const wiki = await fetch("/api/wiki").then((r) => r.json());
```

### 16A.8 Type Usage Examples

Use domain types directly in hooks and components for strict contracts.

```ts
import type { ForumCategory, ForumTopic, ForumUser } from "~/server/types/forum";
import type { WikiCategoryFull } from "~/server/types/wiki";

const [forum, setForum] = useState<ForumCategory[]>([]);
const [topic, setTopic] = useState<ForumTopic | null>(null);
const [user, setUser] = useState<ForumUser | null>(null);
const [wiki, setWiki] = useState<WikiCategoryFull[]>([]);
```

### 16A.9 UI Feedback Example (Combined Pattern)

This is the preferred pattern used by existing pages and forms.

```ts
showLoadingBar("saveProfile");
try {
  const result = await doServerAction();
  if (!result.success) {
    addNotification("Save failed", "error", 5000);
    return;
  }

  await refreshUser();
  addNotification("Saved", "success", 3000);
} catch (error) {
  addNotification("Unexpected error", "error", 6000);
} finally {
  hideLoadingBar("saveProfile");
}
```

---

## 17. Quality and Testing Strategy

Current repository does not include a full automated test suite yet.

Minimum quality gate per change:

```bash
npm run lint
npm run typecheck
npm run build
```

Additionally:
- Manually verify changed pages and API routes.
- Test unhappy paths (invalid params, unauthorized access, empty datasets).
- Test notifications and loading states for async operations.

---

## 18. Error Handling and Logging Conventions

Recommended conventions:
- Catch errors at API boundary.
- Return generic safe error messages to client.
- Log detailed error on server (`console.error`) with context string.
- Keep auth errors structured with `AuthErrorCode` values.

Prefer this pattern:

```ts
try {
  const data = await getData();
  return NextResponse.json(data, { status: 200 });
} catch (error) {
  console.error("Error fetching data:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
```

---

## 19. Common Pitfalls and How to Avoid Them

1. Forgetting to update custom app types after changing server mapping.
2. Returning Prisma raw shape while UI expects transformed keys.
3. Missing validation in server actions/routes.
4. Not handling loading/error states in client pages.
5. Introducing DB schema changes without migration/update steps.
6. Inconsistent endpoint behavior across similar routes.

---

## 20. Suggested Conventions for Future Work

These are recommended to make future maintenance easier:

- Prefer one data module per domain under `src/server/<domain>`.
- Keep API route handlers thin; put logic in server module.
- Standardize route error handling via `apiHandler` where practical.
- Keep type contracts near domain (`src/server/types/<domain>.ts`).
- Add small feature README files when a domain becomes complex.

---

## 21. Command Reference

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run lint:fix
npm run typecheck
npm run check
npm run format:check
npm run format:write
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

---

## 22. Onboarding Checklist for First Contribution

1. Install dependencies and run app.
2. Read this document fully.
3. Explore forum and auth code paths end-to-end.
4. Make a small non-breaking change first (copy fix, UI detail, or loading state).
5. Run `npm run check` and `npm run build`.
6. Open PR with clear summary and manual test notes.

---

## 23. Appendix: Current Important Files

- App shell and providers: `src/app/layout.tsx`
- Forum API entry: `src/app/api/forum/route.ts`
- Forum data module: `src/server/forum/forum.ts`
- Wiki API entry: `src/app/api/wiki/route.ts`
- Wiki data module: `src/server/wiki/wiki.ts`
- Auth actions: `src/server/auth/actions/signIn.ts`, `src/server/auth/actions/signUp.ts`
- Session logic: `src/server/auth/session.ts`
- Notification provider: `src/client/notification.tsx`
- Toast renderer: `src/components/toastContainer.tsx`
- User context: `src/client/user.tsx`
- Form manager: `src/lib/useFormManager.ts`
- Prisma schema: `prisma/schema.prisma`

---

If you add a major new module (for example, messaging, moderation queue, or admin panel), update this document in the same PR with:
- New data model notes
- API contract summary
- UI flow and integration points
- Add/modify/remove checklist specific to that module
