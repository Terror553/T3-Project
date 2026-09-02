# Project TO-DO List

This document tracks unfinished features and modules across the codebase. It maps database models found in `prisma/schema.prisma` and inferred modules from `src/server/types/` against the currently implemented API routes and UI components. Follow `AGENTS.md` and `DOC.md` patterns when implementing these features.

---

## 1. Forum Core Mutations

_Severity: Critical | Completion: 65%_

**Context:** Forum mutation endpoints have been largely implemented. Topic and reply creation/editing/deletion are available via API routes and server actions. Reaction and follow APIs are complete but UI components are still needed.

- [x] **Topic Creation & Management** (Complete)
  - [x] **API:** POST/PUT/DELETE handlers in `src/app/api/forum/topic/route.ts` and `[id]/route.ts`.
  - [x] **Server Logic:** `createTopic`, `editTopic`, `deleteTopic` implemented in `src/server/forum/forum.ts`.
  - [x] **Validation:** Zod schemas in `src/lib/schemas/topicSchemas.ts`.
  - [x] **UI/Client:** `topicCreationForm.tsx` component using `FormProvider`, `useFormManager`, and `sanitizeInput`.
- [x] **Topic Replies** (Complete)
  - [x] **API:** `src/app/api/forum/topic/[id]/reply/route.ts` implemented.
  - [x] **Server Logic:** `createReply`, `editReply`, `deleteReply` mapped to `ForumTopicReply` model.
  - [x] **UI/Client:** `topicReplyForm.tsx` component with `showLoadingBar` and error notifications.
- [ ] **Reactions & Follows UI** (Partial - APIs exist, UI needed)
  - [x] **API:** `src/app/api/forum/topic/[id]/react/route.ts` fully implemented.
  - [x] **API:** `src/app/api/forum/topic/[id]/follow/route.ts` fully implemented.
  - [ ] **UI/Client:** Reaction component with optimistic UI updates based on current user state - **PENDING**.
  - [ ] **UI/Client:** "Follow" button component on the topic header - **PENDING**.

---

## 2. Forum Interactions & Follows

_Severity: Medium | Completion: 50%_

**Context:** Reaction and follow infrastructure have been fully implemented server-side. API endpoints exist but UI components for selecting reactions and following topics are still needed for full feature completion.

- [x] **Reactions System**
  - [x] **API:** `src/app/api/forum/topic/[id]/react/route.ts` implemented with full toggle logic.
  - [x] **Server Logic:** Toggle function for reactions in forum module with optimistic client-side patterns.
  - [ ] **UI/Client:** Reaction selector component with visual feedback - **PENDING**.
- [x] **Topic Follows**
  - [x] **API:** `src/app/api/forum/topic/[id]/follow/route.ts` targeting `ForumTopicFollow`.
  - [ ] **UI/Client:** "Follow" button component on the topic header - **PENDING**.

---

## 3. Private Messaging System

_Severity: High | Completion: 75%_

**Context:** Core messaging infrastructure fully implemented with API routes and UI pages. Server logic, database operations, and thread viewing are in place. Message compose new dialog is the main remaining feature.

- [x] **Messaging Core Module**
  - [x] **Data Types:** `src/server/types/messaging.ts` created for message type definitions.
  - [x] **Server Logic:** `src/server/messaging/messaging.ts` implements all messaging operations.
- [x] **Messaging API Routes**
  - [x] **API:** `src/app/api/messages/route.ts` (GET inbox, POST new messages).
  - [x] **API:** `src/app/api/messages/[id]/route.ts` (GET thread, POST reply).
- [x] **Messaging UI (Mostly Complete)**
  - [x] **UI/Client:** `src/components/messageReplyForm.tsx` component for replying to messages.
  - [x] **Pages:** `src/app/messages/page.tsx` (inbox view) and `src/app/messages/[id]/page.tsx` (thread view).
  - [ ] **Enhancement:** Implement compose new message dialog - **PENDING**.

---

## 4. Minecraft Integration & Clans

_Severity: Low | Completion: 60%_

**Context:** Prisma models (`Clan`, `EnderChest`, `Cooldown`) and Type interfaces (`src/server/types/clan.ts`, `minecraft.ts`, `verification.ts`) exist, meaning game-server sync is planned but missing web implementation.

- [x] **Clan Viewer**
  - [x] **API/Logic:** `src/server/clan/clan.ts` provides typed GET access to the `Clan` table.
  - [x] **API Route:** Exposed at `src/app/api/clan/route.ts`.
  - [x] **Page:** `src/app/clans/page.tsx` renders loading, empty, error, and responsive clan cards.
- [x] **Account Verification System**
  - [x] **API/Logic:** Added authenticated verification-code generation and status access using `ForumVerification`.
  - [x] **UI/Client:** Added profile settings UI with code display, regeneration, and navigation entry.

---

## 5. User Settings & Extended Profile

_Severity: Medium | Completion: 80%_

**Context:** Avatar upload, client-side crop functionality, and user preference persistence are now fully implemented. Settings pages exist for profile configuration, theme preferences, and password management.

- [x] **Change Password**
  - [x] **Server Action:** Build out the missing "change password" server action described in `DOC.md` Section 14.2.
  - [x] **UI/Client:** Added `ChangePasswordForm.tsx` via `src/app/profile/settings/change-password/page.tsx`.
- [x] **Avatar Upload & Crop**
  - [x] **UI/Client:** `src/app/profile/settings/profile-settings/page.tsx` with drag-and-drop, react-easy-crop, multipart progress.
  - [x] **Server Logic:** Upload metadata persistence in `src/app/api/upload/save/route.ts`.
  - [x] **Storage:** Local file adapter in `src/server/storage/storage.ts` with public URL serving.
- [x] **User Preferences Persistence**
  - [x] **API/Server:** GET/PUT routes for theme, timezone, notifications in `src/app/api/profile/settings/route.ts`.
  - [x] **Storage:** JSON file-backed persistence (no DB migration needed).
- [ ] **Extended User Preferences UI**
  - [ ] **API/Server:** Settings already exposed, but advanced preference panel UI is pending.

---

## 6. Admin Panel & Moderation Tools

_Severity: Medium | Completion: 90%_

**Context:** A comprehensive admin panel has been implemented with role-based access control. Core infrastructure including category management, role management, and emoji management are complete. Advanced moderation features remain.

- [x] **Admin Dashboard Foundation**
  - [x] **Page:** Created `src/app/admin/page.tsx` with role/team checks via `getCurrentUser()`.
  - [x] **Authorization:** Role-based access control implemented; redirects unauthorized users.
- [x] **Forum Category Management**
  - [x] **Page:** `src/app/admin/categories/page.tsx` implemented.
  - [x] **API:** GET/POST/PUT/DELETE handlers in `src/app/api/admin/categories/route.ts`.
  - [x] **API:** Subcategory management at `src/app/api/admin/categories/[categoryId]/subcategories/route.ts`.
  - [x] **UI/Logic:** Full edit/archive/delete workflows and forms.
- [x] **Role Management**
  - [x] **Page:** Created `src/app/admin/roles/page.tsx` for managing user groups/roles.
  - [x] **API:** `src/app/api/admin/roles/route.ts` for creating and listing roles.
  - [x] **Authorization:** Team-level access control (highTeam required).
- [x] **Emoji & Reaction Management**
  - [x] **Page:** Created `src/app/admin/reactions/page.tsx` for managing forum reaction emojis.
  - [x] **API:** `src/app/api/admin/reactions/route.ts` for managing reactions.
  - [x] **Authorization:** Team-level access control.
- [x] **Advanced Moderation**
  - [x] **User Bans:** Added authenticated admin ban listing and creation with a dashboard management UI.
  - [x] **Reports UI:** Added a clear empty-state screen while report submission infrastructure remains future work.

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

_Severity: Low | Completion: 70%_

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

- [x] **Unify Database Query**
  - [x] **Server Logic:** `src/server/forum/forum.ts` now derives `latestEntry` from the already-loaded topic relation without a second latest-topic query.
- [x] **Refactor React Logic**
  - [x] **UI/Client:** `subcategory/[id]/page.tsx` uses the unified subcategory payload and now surfaces fetch failures as a visible warning state.
  - [x] **Cleanup:** Removed the unused internal `/api/forum/latest-topic/[id]` endpoint after consolidating subcategory loading.

---

## 10. File Uploads & CDN

_Severity: High | Completion: 90%_

**Context:** The backend upload infrastructure is complete with local file storage, metadata persistence, and progress tracking. S3 pre-signed URLs are available for future cloud migration. Database-backed file metadata is now hardened with strict type safety.

- [x] **API Route for Pre-signed URLs**
  - [x] **API:** `src/app/api/upload/[path]/route.ts` implemented for file serving.
  - [x] **API:** `src/app/api/uploads/route.ts` for JSON file upload.
  - [x] **API:** `src/app/api/uploads/form/route.ts` for multipart form uploads (5MB limit, progress support).
- [x] **File Upload Component**
  - [x] **UI/Client:** `UploadForm.tsx` component with configurable title and aspect ratio.
  - [x] **Client Logic:** Uses `FormProvider`, `useFormManager`, and `setFieldValue`.
  - [x] **Enhancements:** Multipart progress tracking, client-side image cropping, aspect ratio enforcement.
- [x] **Storage Adapter**
  - [x] **Server Logic:** `src/server/storage/storage.ts` implements local file storage adapter with public URLs.
  - [x] **Server Logic:** `src/app/api/upload/save/route.ts` handles file persistence with metadata.
  - [x] **Validation:** Upload metadata strictly typed and validated at runtime.
  - [x] **Database Integration**
    - [x] **Server Logic:** Persist upload metadata and attachment targets through the storage module.
    - [x] **Prisma Schema:** Added the `UploadMetadata` model and deployment migration.
  - [ ] **S3/CDN Migration**
  - [ ] **Server Logic:** Connect S3 keys to application models when ready to migrate from local storage.
  - [ ] **Configuration:** Env-based storage adapter switching (local vs. S3).

---

### Implementation Reminders (for the Developer)

1. **Forms:** Any form you build _must_ use `zod`, `FormProvider`, and `useFormManager`. Apply `sanitizeInput` for text fields.
2. **API Consistency:** Wrap reads with `apiHandler()` from `src/utils/apiHandler.ts`. Include robust error boundaries.
3. **Database:** Be careful when using `npm run db:push`. Prefer `npm run db:generate` for safe iterative development.
4. **Types:** The codebase enforces strict separation. If a Prisma schema returns a property, you must update the mapped representations inside `src/server/types/*`.
5. **Loading States:** Use the `showLoadingBar(id)` pattern from `useTheme()` for all async API or Service Action operations.
