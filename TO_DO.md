# Project TO-DO List

This document outlines unfinished features and parity gaps identified by cross-referencing `DOC.md`, `DOC_AGENT.md`, and `WEBSITE_FEATURES.md` against the current codebase. Each item includes severity, completion estimate, relevant files, and implementation steps.

---

## 1. Forum Feature Parity

### 1.1. Featured Topics (Pinned Topics)

-   **Description**: The documentation references a featured topics flow for pinned/important topics, but there is no server function, route, or UI in the current app.
-   **Severity**: Medium
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/server/forum/forum.ts` (add `getFeaturedTopics`)
    -   `src/app/api/forum/featured/route.ts` (to be created)
    -   `src/hooks/useFeaturedTopics.ts` (to be created)
    -   `src/components/forum/FeaturedTopics.tsx` (to be created)
    -   `src/app/forum/page.tsx` (render component)
-   **Implementation Steps**:
    1.  Implement a server function returning pinned topics ordered by recency.
    2.  Add API route to return featured topics with error handling.
    3.  Build a client hook for loading state, error, and data.
    4.  Build a component that renders a compact featured list.
    5.  Place component on the forum page or home page.

### 1.2. Forum Search

-   **Description**: The reference websites expose a forum search box. The current forum page lacks a search route and UI.
-   **Severity**: Medium
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/forum/page.tsx` (UI placement)
    -   `src/app/api/forum/search/route.ts` (to be created)
    -   `src/server/forum/forum.ts` (search query)
    -   `src/server/types/forum.ts` (search response typing)
-   **Implementation Steps**:
    1.  Define search input and response contract (title, snippet, author, timestamps).
    2.  Implement a server search query with pagination and ordering.
    3.  Add a `GET` search API route with query param validation.
    4.  Add search UI to forum page and render results.

### 1.3. Forum Sidebar Widgets (Online + Latest)

-   **Description**: The reference sites show sidebar widgets for online staff, online users, latest posts, and forum statistics. Current UI shows only last-topic info per category.
-   **Severity**: Medium
-   **Completion**: 10%
-   **Relevant Files**:
    -   `src/components/forum/LastTopicInfo.tsx` (existing latest topic display)
    -   `src/app/api/forum/latest-topic/[id]/route.ts` (existing API)
    -   `src/app/api/forum/stats/route.ts` (to be created)
    -   `src/app/api/forum/online-users/route.ts` (to be created)
    -   `src/app/api/forum/online-staff/route.ts` (to be created)
    -   `src/components/forum/ForumSidebar.tsx` (to be created)
-   **Implementation Steps**:
    1.  Decide the data sources for online users/staff (session table, active user tracking).
    2.  Add stats endpoint for totals and latest member.
    3.  Add online users/staff endpoints with basic pagination.
    4.  Add a sidebar component and render it on the forum page.

### 1.4. Forum Category Collapsing

-   **Description**: Collapsible category sections appear in the reference forum. Current forum listing is static.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/components/forum/ForumCategoryItem.tsx`
    -   `src/app/forum/page.tsx`
-   **Implementation Steps**:
    1.  Add local state to collapse/expand categories.
    2.  Persist collapse state to local storage.
    3.  Add UI control in category header.

---

## 2. Members and Profiles

### 2.1. Members Directory Page

-   **Description**: The reference sites provide a members directory with lists (staff, most posts, highest reactions, most trophies, registered members), name search, and group filters. There is no `members` route in `src/app`.
-   **Severity**: Medium
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/members/page.tsx` (to be created)
    -   `src/app/api/members/route.ts` (to be created)
    -   `src/app/api/members/list/[type]/route.ts` (to be created)
    -   `src/server/auth/utils/getUser.ts` (existing pattern)
    -   `src/server/types/forum.ts` (add member list types)
-   **Implementation Steps**:
    1.  Define list types (`staff`, `most_posts`, `highest_reaction_scores`, `most_trophies`, `registered`).
    2.  Implement server queries for each list with pagination and filters.
    3.  Add a members page with tabbed lists and a name search field.
    4.  Add group filter support (Admin, Moderator, Member, Unconfirmed).

### 2.2. Profile Page Expansion

-   **Description**: The profile-by-id route exists and renders UI, but profile posts, activity, and settings navigation are incomplete.
-   **Severity**: Medium
-   **Completion**: 35%
-   **Relevant Files**:
    -   `src/app/profile/page.tsx`
    -   `src/app/profile/[id]/page.tsx`
    -   `src/app/profile/settings/change-password/page.tsx`
    -   `src/app/api/auth/user/[id]/route.ts` (existing user fetch)
    -   `src/app/api/profile/posts/[id]/route.ts` (to be created)
    -   `src/server/profile/profile.ts` (to be created)
-   **Implementation Steps**:
    1.  Replace placeholder links and routes with real settings URLs.
    2.  Add profile activity endpoints (wall posts, recent topics/replies).
    3.  Render activity sections and paginate in the profile UI.

---

## 3. Site Pages and Navigation Parity

### 3.1. Status Page

-   **Description**: The navbar includes a status link, but there is no page route in the app.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/status/page.tsx` (to be created)
    -   `src/components/navbar/MainNavigation.tsx` (existing nav)
-   **Implementation Steps**:
    1.  Define a simple status UI (Minecraft server status, Discord status).
    2.  Reuse header status components or add dedicated widgets.

### 3.2. Rules Page

-   **Description**: Rules are linked on the reference site but no route exists.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/rules/page.tsx` (to be created)
-   **Implementation Steps**:
    1.  Add a static rules page layout with sections and headings.
    2.  Optionally source rules from CMS or JSON in `src/server`.

### 3.3. Store Page and Integration

-   **Description**: Store links are present in navigation, but they point to `#` and no store page exists.
-   **Severity**: Medium
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/store/page.tsx` (to be created)
    -   `src/components/navbar/Navbar.tsx` (update link)
    -   `src/components/navbar/MobileNavigation.tsx` (update link)
-   **Implementation Steps**:
    1.  Decide whether to embed an external store or build a native store page.
    2.  Implement store UI and link it from the navbar.

### 3.4. Downloads Page

-   **Description**: The reference site has a download page with versioned releases. There is no route or UI for downloads.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/download/page.tsx` (to be created)
    -   `src/app/api/downloads/route.ts` (to be created)
    -   `src/server/downloads/downloads.ts` (to be created)
-   **Implementation Steps**:
    1.  Decide data source for download metadata (DB table or static config).
    2.  Add API route to list current and legacy downloads.
    3.  Render download cards and metadata in the page UI.

### 3.5. Resources Marketplace Page

-   **Description**: The reference site has a resources directory with categories, ratings, and pagination. There is no route or UI for resources.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/resources/page.tsx` (to be created)
    -   `src/app/api/resources/route.ts` (to be created)
    -   `src/server/resources/resources.ts` (to be created)
-   **Implementation Steps**:
    1.  Define resource data model and categories.
    2.  Add list endpoint with sort and pagination.
    3.  Render resource cards with rating, downloads, and author.

### 3.6. Partners Page

-   **Description**: Partners are linked on the reference site, but no route exists.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/partners/page.tsx` (to be created)
-   **Implementation Steps**:
    1.  Add a static partners page with logo cards and outbound links.
    2.  Optionally source partners from a config or DB table.

### 3.7. FAQ Page

-   **Description**: The reference site includes FAQs and the theme contains FAQ styles, but no page exists.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/faq/page.tsx` (to be created)
    -   `src/styles/theme/theme.css` (FAQ styles already present)
-   **Implementation Steps**:
    1.  Add an accordion-based FAQ page using the existing styles.
    2.  Store FAQ entries in a static array or DB table.

---

## 4. News and Home Page Widgets

### 4.1. News Posts + Latest News Widget

-   **Description**: The reference sites show news posts and a "latest news" widget. There is no news route or module in the app.
-   **Severity**: Medium
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/app/news/page.tsx` (to be created)
    -   `src/app/api/news/route.ts` (to be created)
    -   `src/server/news/news.ts` (to be created)
    -   `src/components/news/LatestNews.tsx` (to be created)
-   **Implementation Steps**:
    1.  Define a `NewsPost` model or reuse existing data source.
    2.  Add server query and API route for recent posts.
    3.  Add a home page widget for latest posts.

### 4.2. Latest Wiki Updates on Home

-   **Description**: Documentation includes a sample, but there is no server function, route, hook, or component in the app.
-   **Severity**: Low
-   **Completion**: 0%
-   **Relevant Files**:
    -   `src/server/wiki/wiki.ts` (add `getLatestWikiUpdates`)
    -   `src/app/api/wiki/latest/route.ts` (to be created)
    -   `src/hooks/useLatestWiki.ts` (to be created)
    -   `src/components/wiki/LatestUpdates.tsx` (to be created)
    -   `src/app/page.tsx` (integrate component)
-   **Implementation Steps**:
    1.  Add server function, API route, and hook for latest wiki updates.
    2.  Build a compact widget for the home page.

---

## 5. Authentication and Account Management

### 5.1. Change Password

-   **Description**: Server action, schema, and form exist, but UX integration and settings navigation are incomplete.
-   **Severity**: Medium
-   **Completion**: 80%
-   **Relevant Files**:
    -   `src/server/auth/actions/changePassword.ts`
    -   `src/server/auth/authSchemas.ts`
    -   `src/components/changePasswordForm.tsx`
    -   `src/app/profile/settings/change-password/page.tsx`
    -   `src/app/profile/[id]/page.tsx` (settings link)
-   **Implementation Steps**:
    1.  Add a profile settings hub and link to change-password.
    2.  Validate error rendering and success messaging.
    3.  Add basic route protection and redirect handling.

---

## 6. Code Quality and Consistency

### 6.1. Standardize API Route Error Handling

-   **Description**: API routes use mixed error handling styles (`apiHandler` vs inline `try/catch`).
-   **Severity**: Low
-   **Completion**: 50%
-   **Relevant Files**:
    -   All files under `src/app/api/`
    -   `src/utils/apiHandler.ts`
-   **Implementation Steps**:
    1.  Pick a single API error handling pattern.
    2.  Refactor existing routes to match.
    3.  Update `DOC.md` to document the decision.
