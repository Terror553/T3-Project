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
- Dashboard forum settings now persist topic, reply, and moderation-approval
  controls through the shared configuration API.
- Dashboard navigation management now supports authorized create, list, and
  delete operations against the existing ForumNavigation model.
- Dashboard groups now exposes the existing role/group management workflow
  inside the permission-gated dashboard surface without duplicating APIs.
- Dashboard user management now has debounced, cancellable search with
  explicit loading/error states and Bootstrap-native profile links.
- Dashboard reports now use the shared permission shell with explicit loading,
  empty, error, and disabled-action states for moderation decisions.
- Dashboard punishments now use the shared permission shell with explicit
  loading, empty, validation, and in-flight submission states.
- Dedicated privacy/terms and registration dashboard forms now persist through
  the existing authorized configuration API; store work remains out of scope.
- Announcements now support optional MinIO images, public list/detail pages,
  and shared landing-page rendering from published database records.
- Runtime enforcement now applies persisted forum topic/reply settings,
  registration availability, and public privacy/terms content.
- Forum topics now support persisted managed labels selected during creation and
  displayed on public topic pages.
- Dashboard reaction configuration now has a native permission-gated Bootstrap
  page backed by a validated reaction API with create, list, update, and delete
  lifecycle operations.
- Messaging inbox and thread surfaces now expose retryable errors, unread
  indicators, empty states, and responsive Bootstrap layouts.
- Reply labels are now persisted, selectable in reply creation, and rendered in
  public topic threads. Remaining non-store work is messaging verification,
  broader focused test coverage, visual checks, and final release validation.
  Store functionality remains intentionally deferred.
- A public `/members` route and `/api/members` endpoint now provide searchable,
  paginated member cards with avatars, group badges, profile links, and explicit
  loading, empty, and error states.
- Dashboard forum/category management now has a native dashboard route, and
  category, group/role, and reaction administration are all available through
  dashboard surfaces while retaining legacy compatibility routes.
- Authenticated upload saves now persist metadata for every attachment target,
  not only avatars, while continuing to update avatar URLs and use MinIO paths.

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

**Remaining validation and platform work**: continue adding focused tests for
uncovered routes and management APIs. Reaction lifecycle coverage now includes
authorization, payload validation, updates, and deletes; dashboard
configuration coverage now includes authorization, defaults, validation, and
persistence. The deployment
database is now baselined and has the upload metadata and forum report
migrations applied. Storage-provider switching is intentionally out of scope
because MinIO is the configured deployment.

Prioritize report submission and moderation workflow, followed by focused validation tests for the remaining API and UI milestones.
