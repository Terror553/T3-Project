# Project Plan

## Current status

- Forum read flows are stabilized and refactored.
- Profile settings and avatar upload flow are implemented with client-side cropping (react-easy-crop) and multipart progress.
- User preferences (theme, timezone, notifications, and compact layout) persist through the profile settings API.
- Admin panel is substantially complete with category management, role management, emoji reaction management, bans, and report moderation.
- All production code has been cleaned to strict TypeScript with zero `any` types.
- Focused Vitest coverage exists for forum, messaging, admin, profile, upload metadata, and clan server flows.
- Forum reaction and follow APIs and topic UI are implemented.
- Private messaging compose and thread UX are implemented with the shared modal manager.
- Dashboard overview, clan viewer, account verification UI, advanced moderation, and forum subcategory query consolidation are now implemented.
- Dashboard analytics now has a live metrics page backed by the stats endpoint.
- Public profile wall posts now render from the loaded Prisma relations.
- Extended profile preferences now include a persisted compact-layout option.
- Forum reports now have persistence, authenticated submission, and moderator status actions.
- Dashboard placeholder routes now have a shared permission-gated Bootstrap
  section shell, existing admin features are reachable from dashboard routes,
  and messaging is canonical under profile settings.
- The active next cycle is tracked in `TO_DO.md`, with remaining dashboard
  configuration, store, announcement, labels, backend, and style-audit work
  still open.
- Dashboard announcements and forum labels are now implemented and deployed;
  remaining gaps are configuration persistence and store domain/API design.
- The current continuation completed announcement and label deletion with
  strict authorization and validation. Next work remains dashboard
  store domain/API implementation, and focused dashboard tests.
- Dashboard configuration persistence is now implemented for general,
  registration, privacy, and terms settings with a deployed migration.
- Completed a Bootstrap 5.0.1 and accessibility audit for changed dashboard,
  messaging, and UserPicker surfaces, including supported utility classes,
  semantic loading/error states, labels, and responsive layouts.

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
6. ✅ Dashboard analytics overview and live metrics page.
7. ✅ Minecraft account verification UI and code generation (in-game plugin consumption remains).
8. ✅ Forum data-fetch refactor (subcategory query consolidation complete; legacy endpoint cleanup remains).
9. ✅ File uploads and CDN persistence (local storage complete, S3 migration pending).

## Next work item

**Remaining validation and platform work**: continue adding focused tests for uncovered routes. The deployment database is now baselined and has the upload metadata and forum report migrations applied. Storage-provider switching is intentionally out of scope because MinIO is the configured deployment.

Prioritize report submission and moderation workflow, followed by focused validation tests for the remaining API and UI milestones.
