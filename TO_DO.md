# Project TO-DO List

This document tracks unfinished features and modules across the codebase. It maps database models found in `prisma/schema.prisma` and inferred modules from `src/server/types/` against the currently implemented API routes and UI components. Follow `AGENTS.md` and `DOC.md` patterns when implementing these features.

---

## 1. Forum Core Mutations

_Severity: Critical | Completion: 30%_

**Context:** The forum is currently read-only. We have `getCategories`, `getSubCategories`, and `getTopic` in `src/server/forum/forum.ts`, but no way for users to create, edit, or delete content.

- [ ] **Topic Creation & Management**
  - **API:** Implement POST/PUT/DELETE handlers in `src/app/api/forum/topic/route.ts` and `[id]/route.ts`.
  - **Server Logic:** Add `createTopic`, `editTopic`, `deleteTopic` to `src/server/forum/forum.ts`.
  - **Validation:** Create Zod schemas (e.g., `createTopicSchema`) in a new file `src/lib/schemas/forumSchemas.ts`.
  - **UI/Client:** Build `CreateTopicForm.tsx` utilizing `FormProvider`, `useFormManager`, and `sanitizeInput`.
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

_Severity: High | Completion: 5%_

**Context:** The `ForumMessage` and `ForumMessageReply` models exist in the database, and the feature is referenced in `DOC.md` (Section 23). There is no server module, types, or UI for it.

- [ ] **Messaging Core Module**
  - **Data Types:** Create `src/server/types/messaging.ts` to transform Prisma messages into app models.
  - **Server Logic:** Create `src/server/messaging/messaging.ts` for sending/receiving loops.
- [ ] **Messaging API Routes**
  - **API:** Implement `src/app/api/messages/route.ts` (GET inbox, POST new thread) and `src/app/api/messages/[id]/route.ts` (GET thread, POST reply).
- [ ] **Messaging UI**
  - **Page:** Build `src/app/messages/page.tsx` containing an inbox view and thread renderer.

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

_Severity: Medium | Completion: 30%_

**Context:** The `Profile` schema types exist (`profile.ts`, `settings.ts`, `user-data.ts`). Base login/registration works (via server actions), but users cannot edit their internal settings.

- [ ] **Change Password & Edit Profile**
  - **Server Action:** Build out the missing "change password" server action described in `DOC.md` Section 14.2.
  - **UI/Client:** Add `ChangePasswordForm.tsx` (already stubbed, needs completion hookups) to `src/app/profile/page.tsx`.
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

### Implementation Reminders (for the Developer)

1. **Forms:** Any form you build _must_ use `zod`, `FormProvider`, and `useFormManager`. Apply `sanitizeInput` for text fields.
2. **API Consistency:** Wrap reads with `apiHandler()` from `src/utils/apiHandler.ts`. Include robust error boundaries.
3. **Database:** Be careful when using `npm run db:push`. Prefer `npm run db:generate` for safe iterative development.
4. **Types:** The codebase enforces strict separation. If a Prisma schema returns a property, you must update the mapped representations inside `src/server/types/*`.
5. **Loading States:** Use the `showLoadingBar(id)` pattern from `useTheme()` for all async API or Service Action operations.
