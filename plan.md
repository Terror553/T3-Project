# Project Plan

## Current status
- Forum read flows are stabilized and refactored.
- Profile settings and avatar upload flow are implemented with client-side cropping (react-easy-crop) and multipart progress.
- User preferences (theme, timezone, notifications) persist via JSON file storage without requiring DB migrations.
- Admin panel is substantially complete with category management, role management, and emoji reaction management.
- All production code has been cleaned to strict TypeScript with zero `any` types.
- Comprehensive test suite (8 test files) added with Vitest for forum, messaging, admin, and profile routes.
- Forum reaction and follow APIs are complete but UI components are still pending.
- Private messaging infrastructure is complete; only the "compose new message" dialog remains.

## Recently Completed Features (Session 3 Snapshot)
1. **Avatar Upload with Client-Side Crop** - Full react-easy-crop integration, multipart progress, server-side persistence
2. **Profile Preferences Persistence** - JSON-backed storage for theme, timezone, notifications
3. **UserPicker Component** - Debounced user search for messaging with ARIA accessibility
4. **Admin Role Management** - Complete role/group management with team-based access control
5. **Admin Emoji Reactions** - Manage forum reaction emojis with team access control
6. **Type Safety Hardening** - All `any` types eliminated from production code
7. **Upload Metadata Hardening** - Strict TypeScript-validated file metadata persistence

## Prioritized execution order
1. ✅ Forum Core Mutations and forum interactions/follows (APIs complete, UIs pending).
2. ✅ Private messaging system (infrastructure complete, compose dialog pending).
3. ✅ User settings and extended profile preferences (avatar + preferences done, extended UI pending).
4. ✅ Admin moderation flows and policy checks (categories, roles, reactions complete; user bans pending).
5. ✅ Global modal manager (complete and regression-protected).
6. ⏳ Dashboard analytics and game-server integration (not started).
7. ⏳ Minecraft clans and account verification (types only).
8. ⏳ Forum data-fetch refactor after the main forum flow is stable (optimization task).
9. ✅ File uploads and CDN persistence (local storage complete, S3 migration pending).

## Next work item
**Forum Interactions UI**: Build the reaction selector and topic follow button components to complete forum interactions. These APIs are fully implemented and tested; the UI layer is the remaining blocker.

After forum interactions, prioritize:
- Message compose dialog for the messaging system
- Dashboard analytics integration
- Minecraft verification and clan viewer implementation
