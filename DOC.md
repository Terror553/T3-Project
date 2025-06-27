# MelonenMC T3 Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Directory Structure](#directory-structure)
4. [Key Components](#key-components)
   - [Context Providers](#context-providers)
   - [UI Components](#ui-components)
   - [Pages](#pages)
   - [API Routes](#api-routes)
5. [Authentication](#authentication)
6. [State Management](#state-management)
7. [Utilities](#utilities)
8. [Data Models](#data-models)
9. [Styling](#styling)
10. [Development Guidelines](#development-guidelines)

## Project Overview

The MelonenMC T3 Project is a Next.js application for a Minecraft community website. It features a forum, user authentication, profile management, and wiki functionality. The application is built using the T3 stack, which includes Next.js, TypeScript, Prisma, and Zod for schema validation.

## Architecture

The application follows a modern React architecture with:

- **Next.js App Router**: For page routing and API routes
- **Client/Server Components**: Clear separation between client and server-side code
- **Context-based State Management**: For global state (user, theme, notifications)
- **Custom Hooks**: For data fetching and UI logic
- **Prisma ORM**: For database interactions
- **Zod Validation**: For form validation and type safety

## Directory Structure

```
/src
├── app/                 # Next.js App Router pages and API routes
│   ├── api/             # API endpoints 
│   ├── forum/           # Forum-related pages
│   ├── profile/         # User profile pages
│   ├── login/           # Authentication pages
│   ├── register/        # Registration page
│   └── wiki/            # Wiki pages
├── client/              # Client-side context providers
├── components/          # Reusable UI components
│   ├── form/            # Form-related components
│   ├── forum/           # Forum-specific components
│   ├── navbar/          # Navigation components
│   └── ui/              # Generic UI components
├── hooks/               # Custom React hooks
├── lib/                 # Shared library code and schemas
├── server/              # Server-side code
│   ├── auth/            # Authentication logic
│   ├── forum/           # Forum data access
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Server utilities
├── styles/              # CSS and styling assets
└── utils/               # Shared utility functions
```

## Key Components

### Context Providers

#### UserProvider (`src/client/user.tsx`)

Provides user authentication state throughout the application.

```typescript
// Key features:
interface UserContextType {
  user: ForumUser | null;       // The current user
  isLoading: boolean;           // Loading state
  error: string | null;         // Error message if any
  refreshUser: () => Promise<void>;  // Refresh user data from API
  updateUser: (user: ForumUser | null) => void;  // Update user state
}
```

Usage:
```tsx
const { user, refreshUser } = useUser();
```

#### ThemeProvider (`src/client/theme.tsx`)

Manages theme state (light/dark mode) and loading indicators.

```typescript
// Key features:
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  showLoadingBar: (id: string) => void;
  hideLoadingBar: (id: string) => void;
}
```

Usage:
```tsx
const { isDarkMode, toggleTheme, showLoadingBar } = useTheme();
```

#### NotificationProvider (`src/client/notification.tsx`)

Manages toast notifications throughout the application.

```typescript
// Key features:
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
}
```

Usage:
```tsx
const { addNotification } = useNotification();
addNotification("Operation successful", "success");
```

### UI Components

#### Navbar (`src/components/navbar/Navbar.tsx`)

The main navigation component that renders different menus based on authentication state.

- **AuthMenu**: Navigation options for unauthenticated users
- **UserMenu**: User-specific options for authenticated users
- **MainNavigation**: Primary site navigation
- **MobileNavigation**: Responsive navigation for mobile devices
- **HeaderStatus**: Server status indicators

#### Form Components

- **FormProvider**: Manages form state with validation
- **TextInput**: Reusable input component with validation
- **Button**: Styled button component with variants

#### UI Component Library (`src/components/ui/`)

- **Button**: Customizable button component with variants
- **Card**: Flexible card component
- **Alert**: Notification component for in-page messages

#### Forum Components (`src/components/forum/`)

- **ForumCategoryItem**: Renders a forum category with its subcategories
- **ForumSubcategoryItem**: Renders a forum subcategory with its information
- **LastTopicInfo**: Displays information about the most recent topic

### Pages

#### Forum Pages

- **Forum Page** (`src/app/forum/page.tsx`): Displays all forum categories
- **Subcategory Page** (`src/app/forum/subcategory/[id]/page.tsx`): Shows topics in a subcategory
- **Topic Page** (`src/app/forum/topic/[id]/page.tsx`): Displays a topic and its replies

#### Authentication Pages

- **Login Page** (`src/app/login/page.tsx`): User login form
- **Register Page** (`src/app/register/page.tsx`): User registration form

#### Profile Pages

- **Profile Page** (`src/app/profile/[id]/page.tsx`): User profile display
- **Profile Settings** (`src/app/profile/settings/page.tsx`): User settings management

### API Routes

#### Auth API

- `GET /api/auth/user`: Returns the current authenticated user
- `GET /api/auth/user/[id]`: Returns a specific user by ID
- `GET /api/auth/navigation`: Returns navigation items based on user roles

#### Forum API

- `GET /api/forum`: Returns all forum categories with subcategories
- `GET /api/forum/category`: Returns forum categories
- `GET /api/forum/subcategory/[id]`: Returns a specific subcategory with its topics
- `GET /api/forum/topic/[id]`: Returns a specific topic with its replies
- `GET /api/forum/latest-topic/[id]`: Returns the latest topic in a subcategory

## Authentication

Authentication is handled using server-side sessions with iron-session.

### Key Files

- `src/server/auth/session.ts`: Session management
- `src/server/auth/actions/signIn.ts`: User login logic
- `src/server/auth/actions/signUp.ts`: User registration logic
- `src/server/auth/actions/logOut.ts`: User logout logic
- `src/utils/authUtils.ts`: Standardized authentication utilities

### Authentication Flow

1. User submits credentials via login form
2. Server validates credentials and creates a session
3. User context is updated with the authenticated user
4. Protected routes check for valid session

## State Management

State is managed using React Context API with custom hooks for specific functionality.

### Global State

- **User State**: Current user, authentication status
- **Theme State**: Dark/light mode, loading indicators
- **Notification State**: Toast notifications

### Local State

- **Form State**: Form values, validation, submission
- **UI State**: Loading states, error messages, modal visibility

## Utilities

### API Utilities

- `apiHandler` (`src/utils/apiHandler.ts`): Standardized API response handling

```typescript
export async function apiHandler<T>({ 
  handler, 
  errorMessage = "Internal Server Error" 
}: ApiHandlerOptions<T>) {
  try {
    const data = await handler();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`API Error: ${errorMessage}`, error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
```

### Authentication Utilities

- `authUtils` (`src/utils/authUtils.ts`): Standardized auth error handling

```typescript
export function createSuccessResult<T>(data: T): AuthResult<T> {
  return { success: true, data };
}

export function createErrorResult<T>(
  message: string, 
  code: string, 
  field?: string
): AuthResult<T> {
  return { 
    success: false, 
    error: createAuthError(message, code, field) 
  };
}
```

### Date Utilities

- `dateUtils` (`src/utils/dateUtils.ts`): Date formatting and parsing functions

```typescript
export function formatDate(date: Date | string, includeTime = false): string {
  // Format dates consistently
}

export function getRelativeTime(date: Date | string): string {
  // Get relative time (e.g., "2 days ago")
}
```

### Style Utilities

- `styleUtils` (`src/utils/styleUtils.ts`): Style generation functions

```typescript
export function replaceColor({
  color,
  gradient,
  start,
  end,
  isBadge,
}: ColorOptions): CSSProperties {
  // Generate consistent styling
}
```

## Data Models

### Forum Models

- **ForumCategory**: Top-level forum organization
- **ForumSubcategory**: Groups of related topics within a category
- **ForumTopic**: Individual discussion threads
- **ForumTopicReply**: Responses within a topic

### User Models

- **ForumUser**: User account information
- **UserRole**: User permission groups
- **UserGroup**: Mapping between users and roles

## Styling

The application uses a combination of:

- **Bootstrap**: For layout and components
- **Custom CSS**: For theme-specific styling
- **CSS Variables**: For theming support
- **Dynamic Styling**: For user group colors and gradients

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow consistent naming conventions:
  - React components: PascalCase
  - Functions and variables: camelCase
  - Constants: UPPER_SNAKE_CASE
- Use explicit types over inferred types
- Add JSDoc comments for functions and complex logic

### Component Structure

- Break large components into smaller, focused ones
- Use custom hooks for data fetching and complex logic
- Keep UI and business logic separate
- Use server components where possible to reduce client-side JavaScript

### State Management

- Use context for global state
- Use local state for component-specific state
- Use custom hooks for shared state logic

### Performance Considerations

- Use Next.js server components for static content
- Implement proper loading states
- Optimize data fetching with SWR or React Query
- Use appropriate caching strategies

### Error Handling

- Use consistent error handling patterns
- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases gracefully