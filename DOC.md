# MelonenMC T3 Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Directory Structure](#directory-structure)
4. [Key Components](#key-components)
5. [Authentication](#authentication)
6. [State Management](#state-management)
7. [Utilities](#utilities)
8. [Data Models](#data-models)
9. [API Reference](#api-reference)
10. [Styling](#styling)
11. [Setup & Deployment](#setup--deployment)
12. [Testing & CI/CD](#testing--cicd)
13. [Troubleshooting & FAQ](#troubleshooting--faq)
14. [Contribution Guidelines](#contribution-guidelines)
15. [Agent & Automation Details](#agent--automation-details)
16. [Development Guidelines](#development-guidelines)

---

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
interface UserContextType {
  user: ForumUser | null; // The current user
  isLoading: boolean; // Loading state
  error: string | null; // Error message if any
  refreshUser: () => Promise<void>; // Refresh user data from API
  updateUser: (user: ForumUser | null) => void; // Update user state
}
```

Usage:

```tsx
const { user, refreshUser } = useUser();
```

#### ThemeProvider (`src/client/theme.tsx`)

Manages theme state (light/dark mode) and loading indicators.

```typescript
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

---

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

---

## State Management

State is managed using React Context API with custom hooks for specific functionality.

### Global State

- **User State**: Current user, authentication status
- **Theme State**: Dark/light mode, loading indicators
- **Notification State**: Toast notifications

### Local State

- **Form State**: Form values, validation, submission
- **UI State**: Loading states, error messages, modal visibility

---

## Utilities

### API Utilities

- `apiHandler` (`src/utils/apiHandler.ts`): Standardized API response handling

```typescript
export async function apiHandler<T>({
  handler,
  errorMessage = "Internal Server Error",
}: ApiHandlerOptions<T>) {
  try {
    const data = await handler();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`API Error: ${errorMessage}`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
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
  field?: string,
): AuthResult<T> {
  return {
    success: false,
    error: createAuthError(message, code, field),
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

---

# 📦 Data Models

## ForumUser

```prisma
model ForumUser {
  id           Int      @id @default(autoincrement())
  username     String   @db.Text
  email        String   @db.Text
  password     String   @db.LongText
  salt         String   @db.LongText
  userAuthToken String? @db.LongText
  avatarUrl    String   @default("default.png") @db.LongText
  bannerUrl    String   @default("default.png") @db.LongText
  signature    String   @default("") @db.LongText
  createdAt    DateTime @default(now()) @db.DateTime(6)
  updatedAt    DateTime @default(now()) @db.DateTime(6)
  roleId       Int?
  userId       Int?     @unique(map: "REL_e01d18e1c4884655561785cca8")
  // ...relations omitted for brevity
  @@unique([username(length: 255), password(length: 255), salt(length: 255), email(length: 255), userAuthToken(length: 255)])
  @@index([roleId], map: "FK_0fd7d07d475155bfb73b59a0b64")
  @@map("forum_user")
}
```

**Fields:**

- `id`: Primary key, auto-incremented.
- `username`: User's display name.
- `email`: User's email address.
- `password`: Hashed password.
- `salt`: Password salt.
- `userAuthToken`: Optional, for session management.
- `avatarUrl`: Path to avatar image.
- `bannerUrl`: Path to banner image.
- `signature`: User's forum signature.
- `createdAt`, `updatedAt`: Timestamps.
- `roleId`: Foreign key to Group.
- `userId`: Foreign key to User.

**Example:**

```json
{
  "id": 1,
  "username": "Steve",
  "email": "steve@example.com",
  "avatarUrl": "default.png",
  "createdAt": "2025-09-22T12:00:00.000Z"
}
```

## ForumCategory

```prisma
model ForumCategory {
  id            Int                @id @default(autoincrement())
  name          String             @db.Text
  createdAt     DateTime           @default(now()) @db.DateTime(6)
  updatedAt     DateTime           @default(now()) @db.DateTime(6)
  subcategories ForumSubcategory[]
  @@map("forum_category")
}
```

**Fields:**

- `id`: Primary key.
- `name`: Category name.
- `createdAt`, `updatedAt`: Timestamps.
- `subcategories`: List of ForumSubcategory.

**Example:**

```json
{
  "id": 1,
  "name": "General Discussion",
  "createdAt": "2025-09-22T12:00:00.000Z"
}
```

## ForumTopic

```prisma
model ForumTopic {
  id             Int                  @id @default(autoincrement())
  title          String               @db.Text
  content        String               @db.LongText
  status         Int                  @default(0)
  createdAt      DateTime             @default(now()) @db.DateTime(6)
  updatedAt      DateTime             @default(now()) @db.DateTime(6)
  locked         Int                  @default(0) @db.TinyInt
  pinned         Int                  @default(0) @db.TinyInt
  authorId       Int?
  subcategoryId  Int?
  slug           String?              @db.Text
  // ...relations omitted for brevity
  @@index([subcategoryId], map: "FK_01d2ff4b1bbf5c9eee83310498a")
  @@index([authorId], map: "FK_c228733246cf2aee0240663b354")
  @@map("forum_topics")
}
```

**Fields:**

- `id`: Primary key.
- `title`: Topic title.
- `content`: Topic content.
- `status`: Status code (e.g., open/closed).
- `locked`: 1 if locked, 0 otherwise.
- `pinned`: 1 if pinned, 0 otherwise.
- `authorId`: Foreign key to ForumUser.
- `subcategoryId`: Foreign key to ForumSubcategory.

**Example:**

```json
{
  "id": 42,
  "title": "Welcome to the Forum!",
  "content": "Introduce yourself here.",
  "status": 0,
  "locked": 0,
  "pinned": 1,
  "authorId": 1,
  "subcategoryId": 2
}
```

---

# 🛠️ API Endpoint Reference

## Authentication

### Get Current User

- **GET** `/api/auth/user`
- **Description:** Returns the current authenticated user.
- **Response:**
  ```json
  {
    "id": 1,
    "username": "Steve",
    "email": "steve@example.com"
  }
  ```
- **Errors:**
  - 401 Unauthorized: Not logged in.

### Get User by ID

- **GET** `/api/auth/user/[id]`
- **Description:** Returns a user by their ID.
- **Response:** Same as above.

### Get Navigation Items

- **GET** `/api/auth/navigation`
- **Description:** Returns navigation items based on user roles.
- **Response:**
  ```json
  [
    { "name": "Home", "link": "/" },
    { "name": "Forum", "link": "/forum" }
  ]
  ```

## Forum

### Get All Forum Categories

- **GET** `/api/forum`
- **Description:** Returns all forum categories with subcategories.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "General Discussion",
      "subcategories": [{ "id": 2, "name": "Introductions" }]
    }
  ]
  ```

### Get Forum Category

- **GET** `/api/forum/category`
- **Description:** Returns forum categories.
- **Response:** Same as above.

### Get Subcategory by ID

- **GET** `/api/forum/subcategory/[id]`
- **Description:** Returns a specific subcategory with its topics.
- **Response:**
  ```json
  {
    "id": 2,
    "name": "Introductions",
    "topics": [{ "id": 42, "title": "Welcome to the Forum!" }]
  }
  ```

### Get Topic by ID

- **GET** `/api/forum/topic/[id]`
- **Description:** Returns a specific topic with its replies.
- **Response:**
  ```json
  {
    "id": 42,
    "title": "Welcome to the Forum!",
    "replies": [{ "id": 100, "content": "Hello everyone!" }]
  }
  ```

---

# 🚀 Setup & Deployment

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MySQL server

## Setup Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd T3-Project
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and set your `DATABASE_URL` and any other required secrets.
4. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
6. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

- See official T3 Stack deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify), and [Docker](https://create.t3.gg/en/deployment/docker).
- Set all required environment variables in your deployment platform.

---

# 🧪 Testing & CI/CD

- Run all checks: `npm run check`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Format: `npm run format:check`
- Build: `npm run build`
- (Add test instructions if/when tests are present.)

---

# 🛠️ Troubleshooting & FAQ

- **Database connection error:** Check `DATABASE_URL` in `.env`.
- **Migration issues:** Run `npm run db:generate` or `npm run db:migrate`.
- **Build fails:** Ensure all dependencies are installed and TypeScript passes.

---

# 🤝 Contribution Guidelines

- Fork and branch from `main`.
- Follow code style in AGENTS.md.
- Run `npm run check` before PR.
- Write clear commit messages.

---

# 🤖 Agent & Automation Details

- (Describe any agents, bots, or automation scripts if used.)

---

# 📝 Development Guidelines

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
