# Project TO-DO List

This is the active implementation backlog. The previous completed backlog is
archived in `resolved_to_do_v1_20260309.md`.

## Priority 1 — Dashboard foundation and Bootstrap UI system

- [x] **Audit every dashboard route and classify its intended feature**
  - Inspect the route names, existing APIs, Prisma models, and neighboring
    components before implementing each page.
  - Replace placeholder pages with working dashboard screens, not generic
    “coming soon” content.
- [x] **Implement the dashboard shell and landing routes**
  - Replace the placeholder `src/app/dashboard/page.tsx`.
  - Add a useful `/dashboard` landing experience and consistent navigation,
    breadcrumbs, permissions, loading states, empty states, and error states.
- [x] **Implement dashboard configuration pages**
  - General settings
  - Navigation management
  - Privacy and terms
  - Registration settings
  - Reaction configuration
- [ ] **Implement dashboard forum management pages**
  - Forum settings
  - Forum/category management under the dashboard route
  - [x] Forum labels (persisted model, authorized API, and Bootstrap UI)
  - Reuse the existing forum and admin server logic instead of creating
    duplicate APIs.
- [ ] **Implement dashboard user and group management pages**
  - Users
  - Groups
  - Punishments
  - Reports
  - Ensure all actions use the dashboard permission and role checks.
- [ ] **Implement dashboard store pages**
  - Store configuration
  - Products
  - Payments
  - Subscriptions
  - Sales
  - Coupons
  - Start with read models and safe empty states where a write model/API is
    not yet available; add the corresponding server route before mutations.
- [x] **Implement dashboard announcements and settings**
  - [x] Replace the placeholder announcements page with persisted Prisma-backed
    announcements and an authorized Bootstrap API/UI.
  - Dashboard configuration now persists general, registration, privacy, and
    terms settings through a validated server/API boundary.
- [ ] **Move administrative functionality into the dashboard**
  - Treat `src/app/dashboard` as the canonical administration surface.
  - Integrate or redirect the existing `src/app/admin` category, role, and
    reaction features into the lined-up dashboard pages.
  - Avoid maintaining two separate admin implementations.

## Priority 2 — Restore the intended messaging location

- [x] **Consolidate messages under profile settings**
  - Make `src/app/profile/settings/messaging/page.tsx` the canonical inbox.
  - Move the thread route from `src/app/messages/[id]/page.tsx` to the
    corresponding profile-settings messaging route.
  - Update all links, navigation items, redirects, and imports.
  - The duplicate `/messages` page surface has been removed after migrating
    its inbox and thread implementation.
- [ ] **Finish messaging UX using existing project patterns**
  - Use the existing notification, loading-bar, modal manager, UserPicker,
    form validation, and Bootstrap components.
  - Verify compose, inbox, thread, reply, unread, empty, error, and mobile
    states.

## Priority 3 — Replace non-project UI patterns with Bootstrap 5.0.1

- [ ] **Audit UI components for unsupported or invented patterns**
  - Identify custom UI elements that do not match existing project components
    or the installed Bootstrap v5.0.1 behavior.
  - Remove incompatible utility classes, ad-hoc controls, duplicated modal
    implementations, and styling that conflicts with the theme system.
- [x] **Use the existing Bootstrap implementation consistently**
  - Build with Bootstrap v5.0.1 classes and components such as containers,
    rows, cards, tables, forms, alerts, badges, pagination, dropdowns,
    nav-tabs, accordions, and modals.
  - Use the existing Bootstrap JavaScript bridge in `src/client` for modal and
    dropdown behavior instead of introducing another UI library.
- [ ] **Update `src/styles/bootstrap`**
  - Preserve the Bootstrap v5.0.1 baseline.
  - Add only project-required overrides or documented component extensions.
  - Verify responsive breakpoints, focus states, forms, tables, modals, and
    navigation against Bootstrap 5.0.1.
- [x] **Update `src/styles/theme` and related style layers**
  - Make dashboard, messaging, forum, profile, and admin surfaces work in
    light and dark themes.
  - Standardize colors, spacing, borders, cards, alerts, typography, and
    responsive behavior through theme variables and existing conventions.
  - Remove page-specific styling that duplicates theme definitions.
- [ ] **Create a UI consistency checklist**
  - Confirm every changed page uses existing font, icon, notification, loading,
    modal, and form patterns.
  - Confirm keyboard focus, labels, contrast, and mobile layouts.

## Priority 4 — Backend wiring for newly completed pages

- [ ] **Map dashboard pages to real data**
  - Locate existing Prisma models and API routes before adding new ones.
  - Add typed Zod schemas and permission checks for missing dashboard
    endpoints.
  - Keep database operations in `src/server` and route parsing in API routes.
- [ ] **Complete missing store, announcement, configuration, and group APIs**
  - Add list/detail/create/update/archive operations only where the page
    requires them.
  - Provide explicit authorization failures and user-visible error messages.
- [ ] **Unify admin and dashboard response contracts**
  - Share server helpers and types between migrated pages.
  - Remove duplicate request shapes and stale links after migration.

## Priority 5 — Verification and release quality

- [ ] **Add focused tests for dashboard and messaging**
  - Test authorization for each dashboard management area.
  - Test messaging relocation links, inbox/thread behavior, and mutations.
  - Test configuration, store, announcement, and report validation.
- [ ] **Run visual and responsive checks**
  - Check light/dark themes, desktop/tablet/mobile layouts, modal focus,
    dropdown behavior, tables, forms, and empty/error states.
- [ ] **Run the existing validation pipeline**
  - `npm run check`
  - `npx vitest run --maxWorkers=1`
  - `npx prisma validate`
  - `npm run build`

## Execution rules

1. Work in priority order, starting with the dashboard route audit and style
   foundation before adding more isolated features.
2. Infer intent from route names only after checking the schema, APIs, and
   existing feature documentation; do not invent unrelated behavior.
3. Reuse existing components and server helpers. Do not create parallel admin,
   messaging, modal, notification, or upload systems.
4. Use Bootstrap v5.0.1 and the existing `src/styles/bootstrap`,
   `src/styles/theme`, and project style layers for all new UI.
5. Update `plan.md` and `IMPLEMENTED_FEATURES.md` as implementation progresses,
   and keep this file limited to unresolved work.
