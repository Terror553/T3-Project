# Project TO-DO List

This document outlines unfinished features, bugs, and improvements required for the project. Each item includes a severity rating, estimated completion, relevant files, and implementation guidance to help developers get started.

---


## 1. Feature Development

### 1.1. Forum: Featured Topics

-   **Description**: The documentation mentions a "featured topics" feature for the forum, which would display pinned or important topics. This feature is not yet implemented.
-   **Severity**: Medium
-   **Completion**: 20% (Server-side function exists)
-   **Relevant Files**:
    -   `src/server/forum/forum.ts` (contains `getFeaturedTopics`)
    -   `src/app/api/forum/featured/route.ts` (to be created)
    -   `src/hooks/useFeaturedTopics.ts` (to be created)
    -   A new component for rendering featured topics (e.g., `src/components/forum/FeaturedTopics.tsx`)
-   **Implementation Steps**:
    1.  **Create API Route**: Implement the API route at `src/app/api/forum/featured/route.ts` that calls the existing `getFeaturedTopics` function.
    2.  **Create Client-Side Hook**: Develop a hook (`useFeaturedTopics`) to fetch data from the new API endpoint.
    3.  **Create UI Component**: Build a React component to display the featured topics, likely on the main forum page or homepage.
    4.  **Integrate Component**: Add the new component to the desired page and handle loading/error states.

### 1.2. Authentication: Change Password

-   **Description**: The ability for a user to change their password is a standard security feature that is currently missing.
-   **Severity**: High
-   **Completion**: 10%
-   **Relevant Files**:
    -   `src/server/auth/actions/changePassword.ts` (to be created)
    -   `src/server/auth/authSchemas.ts` (to add a new Zod schema)
    -   A new form component (e.g., `src/components/ChangePasswordForm.tsx`)
    -   A new page for the user profile section (e.g., `src/app/profile/settings/page.tsx`)
-   **Implementation Steps**:
    1.  **Create Zod Schema**: Define a schema in `src/server/auth/authSchemas.ts` for validating the old and new passwords.
    2.  **Implement Server Action**: Create a server action that validates the user's current password, hashes the new password, and updates it in the database.
    3.  **Build UI Form**: Develop a form component where users can enter their old and new passwords.
    4.  **Integrate Form**: Add the form to a user settings or profile page.
    5.  **Add Feedback**: Use the notification system to provide feedback on success or failure.

### 1.3. Wiki: Latest Updates on Homepage

-   **Description**: The documentation provides an example for showing the "latest 5 wiki updates" on the homepage, but this feature is not implemented.
-   **Severity**: Low
-   **Completion**: 20% (Server-side function exists)
-   **Relevant Files**:
    -   `src/server/wiki/wiki.ts` (contains `getLatestWikiUpdates`)
    -   `src/app/api/wiki/latest/route.ts` (to be created)
    -   `src/hooks/useLatestWiki.ts` (to be created)
    -   `src/components/wiki/LatestUpdates.tsx` (to be created)
    -   `src/app/page.tsx` (to integrate the new component)
-   **Implementation Steps**:
    1.  **Create API Route**: Implement the API route at `src/app/api/wiki/latest/route.ts`.
    2.  **Create Client-Side Hook**: Develop a hook to fetch the latest wiki updates.
    3.  **Create UI Component**: Build a component to display the list of latest updates.
    4.  **Integrate on Homepage**: Add the new component to the main homepage (`src/app/page.tsx`).

---

## 2. Code Quality and Refinements

### 2.1. Standardize API Route Error Handling

-   **Description**: The documentation notes that API routes use two different styles for error handling (`apiHandler` wrapper and inline `try/catch`). This should be standardized to improve consistency and maintainability.
-   **Severity**: Low
-   **Completion**: 50%
-   **Relevant Files**:
    -   All files under `src/app/api/`
    -   `src/utils/apiHandler.ts`
-   **Implementation Steps**:
    1.  **Agree on a Standard**: Decide whether to use the `apiHandler` wrapper or another consistent pattern for all API routes.
    2.  **Refactor Existing Routes**: Go through all existing API routes and refactor them to use the chosen standard pattern.
    3.  **Update Documentation**: Update `DOC.md` to reflect the single, standardized approach.
