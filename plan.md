# Project Plan

## Current status
- Forum read flows are stabilized and refactored.
- Profile settings and avatar upload flow are implemented with client-side cropping (react-easy-crop) and multipart progress.
- User preferences (theme, timezone, notifications) persist via JSON file storage without requiring DB migrations.
- Admin panel is substantially complete with category management, role management, and emoji reaction management.
- All production code has been cleaned to strict TypeScript with zero `any` types.
- Comprehensive test suite (8 test files) added with Vitest for forum, messaging, admin, and profile routes.
- Forum reaction and follow APIs and topic UI are implemented.
- Private messaging compose and thread UX are implemented with the shared modal manager.
- Dashboard overview, clan viewer, and account verification UI are now implemented.

## Recently Completed Features (Session 3 Snapshot)
1. **Avatar Upload with Client-Side Crop** - Full react-easy-crop integration, multipart progress, server-side persistence
2. **Profile Preferences Persistence** - JSON-backed storage for theme, timezone, notifications
3. **UserPicker Component** - Debounced user search for messaging with ARIA accessibility
4. **Admin Role Management** - Complete role/group management with team-based access control
5. **Admin Emoji Reactions** - Manage forum reaction emojis with team access control
6. **Type Safety Hardening** - All `any` types eliminated from production code
7. **Upload Metadata Hardening** - Strict TypeScript-validated file metadata persistence

## Prioritized execution order
1. ✅ Forum Core Mutations and forum interactions/follows.
2. ✅ Private messaging system, including compose and thread UX.
3. ✅ User settings and extended profile preferences (avatar + preferences done, extended UI pending).
4. ✅ Admin moderation flows and policy checks (categories, roles, reactions complete; user bans pending).
5. ✅ Global modal manager (complete and regression-protected).
6. ✅ Dashboard analytics overview (additional analytics views remain).
7. ✅ Minecraft account verification UI and code generation (in-game plugin consumption remains).
8. ⏳ Forum data-fetch refactor after the main forum flow is stable (optimization task).
9. ✅ File uploads and CDN persistence (local storage complete, S3 migration pending).

## Next work item
**Advanced moderation**: implement report/ban screens, then complete the forum data-fetch refactor and upload database integration.

After forum interactions, prioritize:
- Account verification and clan/player linking
- Advanced moderation reports and user bans
- Forum subcategory data-fetch consolidation
- Database-backed upload metadata and attachment integration
