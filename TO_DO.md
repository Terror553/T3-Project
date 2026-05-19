# Project TO-DO List

This document tracks unfinished features and modules across the codebase. It maps database models found in `prisma/schema.prisma` and inferred modules from `src/server/types/` against the currently implemented API routes and UI components. Follow `AGENTS.md` and `DOC.md` patterns when implementing these features.

---

## 1. Forum Core Mutations

_Severity: Critical | Completion: 40%_

**Context:** The forum is currently read-only. We have `getCategories`, `getSubCategories`, and `getTopic` in `src/server/forum/forum.ts`, but no way for users to create, edit, or delete content.

- [ ] **Topic Creation & Management** (Partial)
  - [ ] **API:** Implement POST/PUT/DELETE handlers in `src/app/api/forum/topic/route.ts` and `[id]/route.ts`.
  - [x] **Server Logic:** Add `createTopic`, `editTopic`, `deleteTopic` to `src/server/forum/forum.ts`.
  - [x] **Validation:** Create Zod schemas in `src/lib/schemas/topicSchemas.ts`.
  - [x] **UI/Client:** Build `topicCreationForm.tsx` utilizing `FormProvider`, `useFormManager`, and `sanitizeInput`.
- [ ] **Topic Replies**
  - **API:** Create `src/app/api/forum/topic/[id]/reply/route.ts`.
  - **Server Logic:** Add `createReply`, `editReply`, `deleteReply` mapped to the `ForumTopicReply` model.
  - **UI/Client:** Add a `ReplyForm.tsx` component to the bottom of the Topic view. Wrap submissions in `showLoadingBar` and handle errors with `addNotification`.

---

## 2. Forum Interactions & Follows

_Severity: Medium | Completion: 10%_

**Context:** Models for reactions (`ForumReaction`, `ForumTopicReaction`, `ForumTopicReplyReaction`) and following topics (`ForumTopicFollow`) exist in the schema but lack application logic.

- [ ] **Reactions System**
  - **API:** Add `src/app/api/forum/topic/[id]/react/route.ts`.
  - **Server Logic:** Build a toggle function (`addOrRemoveReaction`) in the forum module.
  - **UI/Client:** Add a reaction component below topics and replies. Needs optimistic UI updates based on current user state.
- [ ] **Topic Follows**
  - **API:** Add `src/app/api/forum/topic/[id]/follow/route.ts` targeting `ForumTopicFollow`.
  - **UI/Client:** Add a "Follow" button to the topic header.

---

## 3. Private Messaging System

_Severity: High | Completion: 0%_

**Context:** The `ForumMessage` and `ForumMessageReply` models exist in the database, and the feature is referenced in `DOC.md` (Section 23). There is no server module, types, or UI for it.

- [ ] **Messaging Core Module**
  - [ ] **Data Types:** Create `src/server/types/messaging.ts` to transform Prisma messages into app models.
  - [ ] **Server Logic:** Create `src/server/messaging/messaging.ts` for sending/receiving loops.
- [ ] **Messaging API Routes**
  - [ ] **API:** Implement `src/app/api/messages/route.ts` (GET inbox, POST new thread) and `src/app/api/messages/[id]/route.ts` (GET thread, POST reply).
- [ ] **Messaging UI**
  - [ ] **Page:** Build `src/app/messages/page.tsx` containing an inbox view and thread renderer.

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

_Severity: Medium | Completion: 0%_

**Context:** Essential for a functional forum. Missing entirely. Mentioned in Section 23.

- [ ] **Admin Dashboard Foundation**
  - **Page:** Create `src/app/admin/page.tsx`. Guard it strictly using role/team checks (`getCurrentUser()`).
- [ ] **Forum Category Management**
  - **Logic:** Admin actions for creating, editing, and archiving `ForumCategory` and `ForumSubcategory`.
- [ ] **Emoji & Role Management**
  - **Logic:** UI for adding rows to `ForumReactionEmoji` and modifying user roles.

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

_Severity: High | Completion: 25%_

**Context:** The backend has an API route (`src/app/api/upload/route.ts`) to generate pre-signed URLs for S3 uploads. However, there is no client-side implementation to use this, nor is there a clear link between uploaded files and other database models.

- [ ] **File Upload Component**
  - [ ] **UI/Client:** Create a reusable `UploadFile.tsx` component that allows users to select a file.
  - [ ] **Client Logic:**
    - On file selection, call the `/api/upload` endpoint to get a signed URL and a key.
    - Use the signed URL to upload the file directly to the S3 bucket (e.g., using `fetch` with a PUT request).
    - Display upload progress, and handle success or error states with notifications.
- [ ] **Database Integration**
  - [ ] **Server Logic:** Create a new server action or API endpoint that saves the returned S3 key to the database, associating it with the relevant model (e.g., `User`, `ForumPostAttachment`).
  - [ ] **Prisma Schema:** Add a model to store uploaded file metadata, for example, `FileUpload` with fields like `id`, `key`, `url`, `fileName`, `contentType`, `size`, and a relation to the user who uploaded it.
- [ ] **Frontend Integration Example**
  - [ ] **UI/Client:** Integrate the `UploadFile.tsx` component into a feature, for example, allowing users to upload a profile picture on their settings page.

---

### Implementation Reminders (for the Developer)

1. **Forms:** Any form you build _must_ use `zod`, `FormProvider`, and `useFormManager`. Apply `sanitizeInput` for text fields.
2. **API Consistency:** Wrap reads with `apiHandler()` from `src/utils/apiHandler.ts`. Include robust error boundaries.
3. **Database:** Be careful when using `npm run db:push`. Prefer `npm run db:generate` for safe iterative development.
4. **Types:** The codebase enforces strict separation. If a Prisma schema returns a property, you must update the mapped representations inside `src/server/types/*`.
5. **Loading States:** Use the `showLoadingBar(id)` pattern from `useTheme()` for all async API or Service Action operations.
