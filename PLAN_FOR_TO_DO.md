# PLAN_FOR_TO_DO

## Goal
Create a clear, execution-ready roadmap for the backlog in `TO_DO.md`, ordered by impact, dependency readiness, and delivery value. The plan intentionally starts from the highest-risk and highest-value user-facing systems and moves outward to secondary and experimental features.

## Priority rule
Priority is based on three filters, in order:
1. User-facing and runtime-critical functionality.
2. Features already partially implemented and close to completion.
3. Work that unlocks the next layer of product functionality or validation.

## Top-level feature ordering

### P1 — Core community features (highest priority)
1. Forum Core Mutations
   - Finish any remaining topic/reply UX, validation errors, and state handling.
   - confirm reaction and follow flows work in the topic page.
2. Forum Interactions & Follows
   - Optimize reaction/follow UI and optimistic updates.
   - Ensure server APIs and client UI are aligned and tested.
3. Private Messaging System
   - Finish compose flow, thread UX, and message behavior.
   - Ensure inbox/thread navigation is stable and well tested.

### P2 — Account and configuration features
4. User Settings & Extended Profile
   - Extend profile settings, preferences, and edit flows.
   - Make user preferences consistent with the saved settings API.
5. Admin Panel & Moderation Tools
   - Complete edit/archive/delete flows and role/reaction management polish.
   - Keep access controls aligned with role checks.
6. Global Modal Manager
   - Keep modal manager as a shared infrastructure utility; do not regress it.

### P3 — Integration and platform polish
7. Dashboard Analytics & Game Server Integration
   - Power the dashboard with live or derived stats.
   - Connect game-server integration to user-facing dashboards.
8. Minecraft Integration & Clans
   - Build the clan and verification flows after the app shell is stable.
9. Refactor Forum Data Fetching
   - Consolidate data-fetch patterns after the forum reads are stabilized.

### P4 — Secondary backend work
10. File Uploads & CDN
   - Finish database-backed upload metadata and storage integration.
   - Add remaining persistence and attachment wiring.

## Execution sequence for this coding session
Phase 1 — Stabilize forum UX and tests
- Finish remaining forum topic interactions (follow/reaction UI).
- Add Vitest coverage around the topic page and core forum behavior.
- Validate with focused tests and type/lint checks.

Phase 2 — Messaging and profile polish
- Complete messaging compose flow and thread improvements.
- Finish profile settings persistence and validation consistency.

Phase 3 — Admin and moderation polish
- Close admin edit flows and authorization polish.
- Check API + UI symmetry before moving on.

Phase 4 — Platform / integration backlog
- Dashboard analytics, clans, and refactors.
- Move to file upload persistence only once the user-facing core is stable.

## Delivery rules
- Work from the top-level TO_DO sections downward, not by isolated files.
- Prefer the earliest fully actionable task with the biggest benefit.
- Commit each completed feature branch as a separate, focused unit of work.
- Update `IMPLEMENTED_FEATURES.md` after every major feature.
- Keep `plan.md` synchronized with progress.
