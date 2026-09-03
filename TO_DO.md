# Project TO-DO List

This document tracks unfinished features and modules across the codebase. It maps database models found in `prisma/schema.prisma` and inferred modules from `src/server/types/` against the currently implemented API routes and UI components. Follow `AGENTS.md` and `DOC.md` patterns when implementing these features.

---

## 1. Forum Core Mutations

_Severity: Critical | Completion: 100%_

**Context:** Forum mutation endpoints and topic interaction controls are implemented. Topic and reply creation/editing/deletion, reactions, and follows are available through API routes and the topic UI.

- [x] **Topic Creation & Management** (Complete)
  - [x] **API:** POST/PUT/DELETE handlers in `src/app/api/forum/topic/route.ts` and `[id]/route.ts`.
  - [x] **Server Logic:** `createTopic`, `editTopic`, `deleteTopic` implemented in `src/server/forum/forum.ts`.
  - [x] **Validation:** Zod schemas in `src/lib/schemas/topicSchemas.ts`.
  - [x] **UI/Client:** `topicCreationForm.tsx` component using `FormProvider`, `useFormManager`, and `sanitizeInput`.
- [x] **Topic Replies** (Complete)
  - [x] **API:** `src/app/api/forum/topic/[id]/reply/route.ts` implemented.
  - [x] **Server Logic:** `createReply`, `editReply`, `deleteReply` mapped to `ForumTopicReply` model.
  - [x] **UI/Client:** `topicReplyForm.tsx` component with `showLoadingBar` and error notifications.
- [x] **Reactions & Follows UI** (Complete)
  - [x] **API:** `src/app/api/forum/topic/[id]/react/route.ts` fully implemented.
  - [x] **API:** `src/app/api/forum/topic/[id]/follow/route.ts` fully implemented.
  - [x] **UI/Client:** Topic page reaction selector with counts, active-user state, and local updates.
  - [x] **UI/Client:** Follow button on the topic header with pending-state handling.

---

## 2. Forum Interactions & Follows

_Severity: Medium | Completion: 100%_

**Context:** Reaction and follow infrastructure is implemented server-side and integrated into the topic page with current-user feedback and pending-state handling.

- [x] **Reactions System**
  - [x] **API:** `src/app/api/forum/topic/[id]/react/route.ts` implemented with full toggle logic.
  - [x] **Server Logic:** Toggle function for reactions in forum module with optimistic client-side patterns.
  - [x] **UI/Client:** Topic-page reaction selector with visual feedback and counts.
- [x] **Topic Follows**
  - [x] **API:** `src/app/api/forum/topic/[id]/follow/route.ts` targeting `ForumTopicFollow`.
  - [x] **UI/Client:** Follow button component on the topic header.

---

## 3. Private Messaging System

_Severity: High | Completion: 100%_

**Context:** Messaging infrastructure, inbox/thread pages, reply flow, recipient picker, and compose dialog are implemented.

- [x] **Messaging Core Module**
  - [x] **Data Types:** `src/server/types/messaging.ts` created for message type definitions.
  - [x] **Server Logic:** `src/server/messaging/messaging.ts` implements all messaging operations.
- [x] **Messaging API Routes**
  - [x] **API:** `src/app/api/messages/route.ts` (GET inbox, POST new messages).
  - [x] **API:** `src/app/api/messages/[id]/route.ts` (GET thread, POST reply).
- [x] **Messaging UI (Mostly Complete)**
  - [x] **UI/Client:** `src/components/messageReplyForm.tsx` component for replying to messages.
  - [x] **Pages:** `src/app/messages/page.tsx` (inbox view) and `src/app/messages/[id]/page.tsx` (thread view).
  - [x] **Enhancement:** Compose new message dialog through the shared modal manager.

---

## 4. Minecraft Integration & Clans

_Severity: Low | Completion: 100%_

**Context:** Clan browsing and account verification web flows are implemented; in-game plugin consumption and broader game-server synchronization remain outside this checklist.

- [x] **Clan Viewer**
  - [x] **API/Logic:** `src/server/clan/clan.ts` provides typed GET access to the `Clan` table.
  - [x] **API Route:** Exposed at `src/app/api/clan/route.ts`.
  - [x] **Page:** `src/app/clans/page.tsx` renders loading, empty, error, and responsive clan cards.
- [x] **Account Verification System**
  - [x] **API/Logic:** Added authenticated verification-code generation and status access using `ForumVerification`.
  - [x] **UI/Client:** Added profile settings UI with code display, regeneration, and navigation entry.

---

## 5. User Settings & Extended Profile

_Severity: Medium | Completion: 100%_

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
  - [x] **API/Server:** Theme, timezone, notifications, and compact-layout preferences persist per user.
  - [x] **UI/Client:** Profile settings exposes the compact-layout preference.
 - [x] **Profile Wall**
  - [x] **Data Types/Server:** Public profile loading includes `ProfileWall` posts and replies.
  - [x] **UI/Client:** Public profile renders loaded wall posts and reply areas.

---

## 6. Admin Panel & Moderation Tools

_Severity: Medium | Completion: 100%_

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
  - [x] **Reports:** Added authenticated report submission, moderator listing, and resolve/dismiss actions.

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

_Severity: Low | Completion: 75%_

**Context:** The dashboard overview and `/api/dashboard/stats` endpoint are implemented with typed community activity cards. Detailed analytics views and profile-wall integration remain pending.

- [x] **Dashboard Data Endpoints**
  - [x] **API:** Fetch typed community statistics in `/api/dashboard/stats/route.ts`.
  - [x] **UI/Client:** `/dashboard/analytics` displays live community metrics from the stats endpoint.
- [ ] **Profile Wall**
  - **Data Types/Server:** Hook up `ProfileWall` and `ProfileWallReply` models to `profile.ts`.
  - **UI/Client:** Render user wall component on the public profile view natively.

---

## 9. Refactor Forum Data Fetching (Subcategory / Topic Views)

_Severity: Low | Completion: 100%_

**Context:** The subcategory response derives its latest topic from the already-loaded relation, and the page uses that unified payload with a visible fetch-failure state.

- [x] **Unify Database Query**
  - [x] **Server Logic:** `src/server/forum/forum.ts` now derives `latestEntry` from the already-loaded topic relation without a second latest-topic query.
- [x] **Refactor React Logic**
  - [x] **UI/Client:** `subcategory/[id]/page.tsx` uses the unified subcategory payload and now surfaces fetch failures as a visible warning state.
  - [x] **Cleanup:** Removed the unused internal `/api/forum/latest-topic/[id]` endpoint after consolidating subcategory loading.

---

## 10. File Uploads & CDN

_Severity: High | Completion: 95%_

**Context:** Uploads use the configured S3-compatible MinIO client, Prisma metadata persistence, attachment targets, and direct browser-to-bucket transfers.

- [x] **API Route for Pre-signed URLs**
  - [x] **API:** `src/app/api/upload/[path]/route.ts` implemented for file serving.
  - [x] **API:** Direct browser upload using the pre-signed URL returned by `src/app/api/upload/[path]/route.ts`.
- [x] **File Upload Component**
  - [x] **UI/Client:** `UploadForm.tsx` component with configurable title and aspect ratio.
  - [x] **Client Logic:** Uses `FormProvider`, `useFormManager`, and `setFieldValue`.
  - [x] **Enhancements:** Client-side image cropping and aspect ratio enforcement.
- [x] **Storage Adapter**
  - [x] **Server Logic:** `src/server/s3.ts` provides the MinIO/S3-compatible client.
  - [x] **Server Logic:** `src/app/api/upload/save/route.ts` handles file persistence with metadata.
  - [x] **Validation:** Upload metadata strictly typed and validated at runtime.
  - [x] **Database Integration**
    - [x] **Server Logic:** Persist upload metadata and attachment targets through the storage module.
    - [x] **Prisma Schema:** Added the `UploadMetadata` model and deployment migration.
  - [x] **S3/MinIO Storage**
  - [x] **Server Logic:** Browser uploads go directly to the configured bucket using pre-signed URLs.

---

### Implementation Reminders (for the Developer)

1. **Forms:** Any form you build _must_ use `zod`, `FormProvider`, and `useFormManager`. Apply `sanitizeInput` for text fields.
2. **API Consistency:** Wrap reads with `apiHandler()` from `src/utils/apiHandler.ts`. Include robust error boundaries.
3. **Database:** Be careful when using `npm run db:push`. Prefer `npm run db:generate` for safe iterative development.
4. **Types:** The codebase enforces strict separation. If a Prisma schema returns a property, you must update the mapped representations inside `src/server/types/*`.
5. **Loading States:** Use the `showLoadingBar(id)` pattern from `useTheme()` for all async API or Service Action operations.
