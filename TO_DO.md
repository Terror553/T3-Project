# Project TO-DO List

This document tracks unfinished features and modules across the codebase. It maps database models found in `prisma/schema.prisma` and inferred modules from `src/server/types/` against the currently implemented API routes and UI components. Follow `AGENTS.md` and `DOC.md` patterns when implementing these features.

---

## 1. Forum Core Mutations

_Severity: Critical | Completion: 60%_

**Context:** Forum mutation endpoints have been largely implemented. Topic and reply creation/editing/deletion are available via API routes and server actions. Full UI completion and error handling remain.

- [x] **Topic Creation & Management** (Complete)
  - [x] **API:** POST/PUT/DELETE handlers in `src/app/api/forum/topic/route.ts` and `[id]/route.ts`.
  - [x] **Server Logic:** `createTopic`, `editTopic`, `deleteTopic` implemented in `src/server/forum/forum.ts`.
  - [x] **Validation:** Zod schemas in `src/lib/schemas/topicSchemas.ts`.
  - [x] **UI/Client:** `topicCreationForm.tsx` component using `FormProvider`, `useFormManager`, and `sanitizeInput`.
- [x] **Topic Replies** (Complete)
  - [x] **API:** `src/app/api/forum/topic/[id]/reply/route.ts` implemented.
  - [x] **Server Logic:** `createReply`, `editReply`, `deleteReply` mapped to `ForumTopicReply` model.
  - [x] **UI/Client:** `topicReplyForm.tsx` component with `showLoadingBar` and error notifications.

---

## 2. Forum Interactions & Follows

_Severity: Medium | Completion: 35%_

**Context:** Reaction and follow infrastructure have been implemented server-side. API endpoints exist but UI components and optimistic updates are still needed.

- [x] **Reactions System**
  - [x] **API:** `src/app/api/forum/topic/[id]/react/route.ts` implemented.
  - [x] **Server Logic:** Toggle function for reactions in forum module.
  - [ ] **UI/Client:** Reaction component with optimistic UI updates based on current user state.
- [x] **Topic Follows**
  - [x] **API:** `src/app/api/forum/topic/[id]/follow/route.ts` targeting `ForumTopicFollow`.
  - [ ] **UI/Client:** "Follow" button component on the topic header.

---

## 3. Private Messaging System

_Severity: High | Completion: 50%_

**Context:** Core messaging infrastructure implemented. API routes and UI pages exist, with server logic and database operations in place. Full feature completion remains.

- [x] **Messaging Core Module**
  - [x] **Data Types:** `src/server/types/messaging.ts` created for message type definitions.
  - [x] **Server Logic:** `src/server/messaging/messaging.ts` implements messaging operations.
- [x] **Messaging API Routes**
  - [x] **API:** `src/app/api/messages/route.ts` (GET inbox, POST new messages).
  - [x] **API:** `src/app/api/messages/[id]/route.ts` (GET thread, POST reply).
- [x] **Messaging UI (Partial)**
  - [x] **UI/Client:** `src/components/messageReplyForm.tsx` component for replying to messages.
  - [x] **Pages:** `src/app/messages/page.tsx` (inbox view) and `src/app/messages/[id]/page.tsx` (thread view).
  - [ ] **Enhancement:** Implement compose new message dialog and thread viewing improvements.

---

## 4. Minecraft Integration & Clans

_Severity: Low | Completion: 10%_

**Context:** Prisma models (`Clan`, `EnderChest`, `Cooldown`) and Type interfaces (`src/server/types/clan.ts`, `minecraft.ts`, `verification.ts`) exist, meaning game-server sync is planned but missing web implementation.

- [ ] **Clan Viewer**
  - **API/Logic:** Build a `src/server/clan/clan.ts` module with GET methods for the `Clan` table.
  - **API Route:** Expose at `src/app/api/clan/route.ts`.
  - **Page:** Build `src/app/clans/page.tsx` reflecting active server clans.
- [ ] **Account Verification System**
  - **API/Logic:** Flesh out a verification flow using `src/server/types/verification.ts`. This links in-game UUIDs to `ForumUser` accounts.

---

## 5. User Settings & Extended Profile

_Severity: Medium | Completion: 50%_

**Context:** The `Profile` schema types exist (`profile.ts`, `settings.ts`, `user-data.ts`). Base login/registration works (via server actions), but users cannot edit their internal settings.

- [x] **Change Password**
  - [x] **Server Action:** Build out the missing "change password" server action described in `DOC.md` Section 14.2.
  - [x] **UI/Client:** Added `ChangePasswordForm.tsx` via `src/app/profile/settings/change-password/page.tsx`.
- [ ] **Extended User Preferences**
  - **API/Server:** Expose GET/PUT routes for adjusting theme, timezone, etc., utilizing `src/server/types/settings.ts`.

---

## 6. Admin Panel & Moderation Tools

_Severity: Medium | Completion: 45%_

**Context:** A comprehensive admin panel has been implemented with role-based access control. Core infrastructure is in place; full feature implementations are pending.

- [x] **Admin Dashboard Foundation**
  - [x] **Page:** Created `src/app/admin/page.tsx` with role/team checks via `getCurrentUser()`.
  - [x] **Authorization:** Role-based access control implemented; redirects unauthorized users.
- [x] **Forum Category Management**
  - [x] **Page:** `src/app/admin/categories/page.tsx` implemented.
  - [x] **API:** GET/POST handlers in `src/app/api/admin/categories/route.ts`.
  - [x] **API:** Subcategory management at `src/app/api/admin/categories/[categoryId]/subcategories/route.ts`.
  - [ ] **UI/Logic:** Full edit/archive/delete workflows and forms.
- [x] **Emoji & Role Management**
  - [x] **Pages:** Created `src/app/admin/reactions/page.tsx` and `src/app/admin/roles/page.tsx`.
  - [x] **API:** `src/app/api/admin/reactions/route.ts` and `src/app/api/admin/roles/route.ts` for managing reactions and roles.
  - [ ] **UI/Logic:** Full form implementations for creating and editing reactions/roles.

---

## 7. Global Modal Manager

_Severity: Medium | Completion: 100%_

**Context:** Currently, modals (like `loginModal.tsx`) fall back to hardcoded component IDs (e.g., `#modal-login`) and manually interact with `window.bootstrap.Modal` for state management, leading to heavy boilerplate and duplicated markup. We need a simple, centralized modal manager so any component can invoke a modal dialog dynamically without rendering its own `div.modal` tree.

- [x] **Global Modal Provider**
  - [x] **File:** Create a context and provider in `src/client/modalUtils.tsx` (previously planned as `ModalProvider.tsx`).
  - [x] **Logic:** It should hold the current active modal configuration (title, body component, footer, settings).
  - [x] **Component:** The provider itself renders a single `<div className="modal fade">` container placed once in the app (e.g. in `src/app/layout.tsx`), preventing DOM clutter.
- [x] **Simple Hook Interface**
  - [x] **File:** Create `useModalManager` hook.
  - [x] **Functions:** Expose simple methods like `openModal({ title, content, size })` and `closeModal()` to programmatically trigger modals from anywhere.
- [x] **Refactoring Existing Modals**
  - [x] **Migration:** Refactor `src/components/loginModal.tsx` and similar files to stop rendering the Bootstrap modal shell (`modal-dialog`, `modal-content`). They should only map to the content inside, which is passed into the new modal manager.

---

## 8. Dashboard Analytics & Game Server Integration

_Severity: Low | Completion: 0%_

**Context:** The new `/dashboard` routes structure provides overview, analytics, and settings. However, it needs integration with the Minecraft server stats and user activity models (e.g. `Job`, `UserJob`, `McServerSetting`).

- [ ] **Dashboard Data Endpoints**
  - [ ] **API:** Fetch analytics data in `/api/dashboard/stats/route.ts` bridging `ConsoleLog` or user metrics.
  - [ ] **UI/Client:** Refine the `/dashboard/analytics` view with actual data components.
- [ ] **Profile Wall**
  - **Data Types/Server:** Hook up `ProfileWall` and `ProfileWallReply` models to `profile.ts`.
  - **UI/Client:** Render user wall component on the public profile view natively.

---

## 9. Refactor Forum Data Fetching (Subcategory / Topic Views)

_Severity: Low | Completion: 0%_

**Context:** `src/app/forum/subcategory/[id]/page.tsx` uses a dense manual `useEffect` hook to fetch data. It creates a network waterfall (fetching the subcategory, waiting, then fetching the latest topic) and duplicates loading/error state boilerplate. This should be unified or moved to the server.

- [ ] **Unify Database Query**
  - **Server Logic:** Update `src/server/forum/forum.ts` to return the `latestEntry` directly as a relation when fetching a subcategory in a single Prisma query.
- [ ] **Refactor React Logic**
  - **UI/Client:** Convert `subcategory/[id]/page.tsx` directly into a React Server Component (fetching data server-side to skip internal API fetches) OR extract the states into a unified `useSubcategory(id)` hook matching the pattern seen in `useForum.ts`.
  - **Cleanup:** Remove the internal `/api/forum/latest-topic/[id]` endpoint once the data is unified in the subcategory query.

---

## 10. File Uploads & CDN

_Severity: High | Completion: 70%_

**Context:** The backend upload infrastructure is largely complete with local file storage. File processing and database integration with various models is in progress. S3 pre-signed URLs are available for direct uploads.

- [x] **API Route for Pre-signed URLs**
  - [x] **API:** `src/app/api/upload/[path]/route.ts` implemented.
  - [x] **API:** `src/app/api/uploads/route.ts` for general file upload management.
  - [x] **API:** `src/app/api/uploads/form/route.ts` for upload form configuration.
- [x] **File Upload Component**
  - [x] **UI/Client:** `UploadForm.tsx` component with configurable title and aspect ratio.
  - [x] **Client Logic:** Uses `FormProvider`, `useFormManager`, and `setFieldValue`.
- [x] **Storage Adapter**
  - [x] **Server Logic:** `src/server/storage/storage.ts` implements local file storage adapter.
  - [x] **Server Logic:** `src/app/api/upload/save/route.ts` handles file persistence.
- [ ] **Database Integration (Advanced)**
  - [ ] **Server Logic:** Connect S3 keys to application models (User avatars, forum attachments, etc.).
  - [ ] **Prisma Schema:** Add file metadata models if needed for tracking uploads.

---

### Implementation Reminders (for the Developer)

1. **Forms:** Any form you build _must_ use `zod`, `FormProvider`, and `useFormManager`. Apply `sanitizeInput` for text fields.
2. **API Consistency:** Wrap reads with `apiHandler()` from `src/utils/apiHandler.ts`. Include robust error boundaries.
3. **Database:** Be careful when using `npm run db:push`. Prefer `npm run db:generate` for safe iterative development.
4. **Types:** The codebase enforces strict separation. If a Prisma schema returns a property, you must update the mapped representations inside `src/server/types/*`.
5. **Loading States:** Use the `showLoadingBar(id)` pattern from `useTheme()` for all async API or Service Action operations.
