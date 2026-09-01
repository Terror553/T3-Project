# Project Plan

## Current status
- Forum read flows are stabilized and refactored.
- Profile settings and avatar upload flow are implemented and persisted.
- Admin category management foundation has been implemented and is now committed as a separate feature.
- Runtime blocker resolved: the server-side sanitizer dependency mismatch was fixed by aligning the jsdom version with the one required by isomorphic-dompurify, and the forum API now responds successfully on GET /api/forum.
- A structured execution plan has been created in `PLAN_FOR_TO_DO.md` to drive the remaining backlog in priority order.

## Prioritized execution order
1. Forum Core Mutations and forum interactions/follows.
2. Private messaging system polish and compose flow completion.
3. User settings and extended profile preferences.
4. Admin moderation flows and policy checks.
5. Global modal manager regression protection.
6. Dashboard analytics and game-server integration.
7. Minecraft clans and account verification.
8. Forum data-fetch refactor after the main forum flow is stable.
9. File uploads and CDN persistence integration.

## Next work item
- Continue with the Forum Interactions & Follows UI and the targeted Vitest checks for the topic page.
