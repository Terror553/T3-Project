# Project Plan

## Current status
- Forum read flows are stabilized and refactored.
- Profile settings and avatar upload flow are implemented and persisted.
- Admin category management foundation has been implemented and is now committed as a separate feature.
- Runtime blocker resolved: the server-side sanitizer dependency mismatch was fixed by aligning the jsdom version with the one required by isomorphic-dompurify, and the forum API now responds successfully on GET /api/forum.

## Next planned work
1. Continue with remaining backlog items after the forum runtime fix is validated.
2. Resume broader testing only when normal feature work is complete and the user asks for it again.
3. Keep each feature in a separate commit on the current branch to preserve clean review history.
