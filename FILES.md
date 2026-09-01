# Project Files

This file contains a tree of all files and folders in the project, along with their last modified date.

**Last Updated:** 2026-09-01 12:30:00 PM

## prisma/

```
├── migrations/
│   ├── 20250630130906_t3/
│   │   └── migration.sql - Modified: 2026-08-19 12:17:24 AM
│   ├── 20260428125523_yes/
│   │   └── migration.sql - Modified: 2026-08-19 12:17:24 AM
│   ├── migration_lock.toml - Modified: 2026-08-19 12:17:24 AM
├── schema.prisma - Modified: 2026-08-19 12:17:24 AM
└── seed.ts - Modified: 2026-08-20 10:19:41 PM
```

## src/app/api/ - API Routes

### Admin APIs (NEW - 2026-09-01)

- `admin/categories/route.ts` - Forum category management
- `admin/categories/[categoryId]/subcategories/route.ts` - Subcategory management
- `admin/reactions/route.ts` - Forum reaction emoji management
- `admin/roles/route.ts` - Role management

### Forum APIs

- `forum/category/route.ts` - List categories
- `forum/subcategory/route.ts` - List subcategories
- `forum/subcategory/[id]/route.ts` - Get single subcategory
- `forum/topic/route.ts` - Create/list topics
- `forum/topic/[id]/route.ts` - Get/edit/delete topic
- `forum/topic/[id]/reply/route.ts` - Topic replies
- `forum/topic/[id]/react/route.ts` - Topic reactions (2026-08-20)
- `forum/topic/[id]/follow/route.ts` - Topic follows (2026-08-20)
- `forum/latest-topic/[id]/route.ts` - Get latest topic in subcategory

### Messaging APIs (2026-08-24)

- `messages/route.ts` - Get inbox, send messages
- `messages/[id]/route.ts` - Get thread, reply

### Profile APIs (2026-09-01)

- `profile/settings/route.ts` - Get/update profile settings

### Upload APIs (2026-08-31)

- `upload/[path]/route.ts` - Legacy upload handler
- `uploads/route.ts` - File upload management
- `uploads/form/route.ts` - Upload form configuration

### Auth APIs

- `auth/user/route.ts` - Get current user
- `auth/user/[id]/route.ts` - Get user by ID
- `auth/navigation/route.ts` - Get navigation data

### Other APIs

- `user/messages/route.ts` - Legacy messages
- `user/messages/[id]/route.ts` - Legacy message thread
- `user/search/route.ts` - User search (2026-08-24)
- `wiki/route.ts` - Wiki data
- `clan/route.ts` - Clan data (2026-08-20)
- `dashboard/stats/route.ts` - Dashboard analytics (2026-08-20)

## src/app/admin/ - Admin Pages (NEW - 2026-09-01)

```
├── page.tsx - Admin dashboard
├── categories/page.tsx - Forum categories management
├── reactions/page.tsx - Reaction emoji management
└── roles/page.tsx - Role management
```

## src/app/ - Main Pages

### Forum Pages

- `forum/page.tsx` - Forum index
- `forum/subcategory/[id]/page.tsx` - Category view (2026-08-24)
- `forum/topic/[id]/page.tsx` - Topic view (2026-08-24)
- `forum/topic/add/page.tsx` - Create topic (alt)
- `forum/topic/new/page.tsx` - Create topic

### User/Profile Pages

- `profile/page.tsx` - My profile (2026-08-24)
- `profile/[id]/page.tsx` - User profile
- `profile/settings/overview/page.tsx`
- `profile/settings/change-password/page.tsx`
- `profile/settings/alerts/page.tsx`
- `profile/settings/connections/page.tsx`
- `profile/settings/followed-topics/page.tsx`
- `profile/settings/profile-settings/page.tsx` (2026-09-01)
- `profile/settings/messaging/page.tsx`
- `profile/settings/messaging/[id]/page.tsx`

### Messages Pages (2026-08-24)

- `messages/page.tsx` - Inbox
- `messages/[id]/page.tsx` - Message thread

### Dashboard Pages

- `dashboard/page.tsx`
- `dashboard/overview/page.tsx`
- `dashboard/announcements/page.tsx`
- `dashboard/configuration/general/page.tsx`
- `dashboard/configuration/navigation/page.tsx`
- `dashboard/configuration/privacy/page.tsx`
- `dashboard/configuration/reactions/page.tsx`
- `dashboard/configuration/registration/page.tsx`
- `dashboard/forum/forums/page.tsx`
- `dashboard/forum/labels/page.tsx`
- `dashboard/forum/settings/page.tsx`
- `dashboard/groups/page.tsx`
- `dashboard/settings/page.tsx`
- `dashboard/store/configuration/page.tsx`
- `dashboard/store/coupons/page.tsx`
- `dashboard/store/payments/page.tsx`
- `dashboard/store/products/page.tsx`
- `dashboard/store/sales/page.tsx`
- `dashboard/store/subscriptions/page.tsx`
- `dashboard/user-management/users/page.tsx`
- `dashboard/user-management/reports/page.tsx`
- `dashboard/user-management/punishments/page.tsx`

### Other Pages

- `page.tsx` - Home
- `login/page.tsx` - Login
- `register/page.tsx` - Register
- `rules/page.tsx` - Rules
- `wiki/page.tsx` - Wiki
- `layout.tsx` - Root layout

## src/client/ - Client Utilities (Updated 2026-09-01)

```
├── bootstrap.ts - Bootstrap modal initialization
├── modal.tsx - Modal component wrapper
├── modalUtils.tsx - Global modal manager context/hook
├── notification.tsx - Notification system
├── navUtils.tsx - Navigation utilities
├── theme.ts - Theme management
└── user.tsx - User state utilities
```

## src/components/ - React Components

### Components Updated (2026-09-01)

- `loginForm.tsx` - Updated for modal manager
- `loginModal.tsx` - Updated for modal manager
- `userPicker/UserPicker.tsx` - User selection component

### Form Components

- `form/FormProvider.tsx` - Form context
- `form/TextInput.tsx` - Text input
- `form/TextArea.tsx` - Text area
- `form/Select.tsx` - Select dropdown
- `form/button.tsx` - Button

### Forum Components

- `forum/ForumCategoryItem.tsx`
- `forum/ForumSubcategoryItem.tsx`
- `forum/LastTopicInfo.tsx`

### Navbar Components

- `navbar/Navbar.tsx`
- `navbar/MainNavigation.tsx`
- `navbar/MobileNavigation.tsx`
- `navbar/AuthMenu.tsx`
- `navbar/HeaderStatus.tsx`
- `navbar/UserMenu.tsx`

### UI Components

- `ui/Button.tsx`
- `ui/Card.tsx`
- `ui/Alert.tsx`

### Other Components

- `changePasswordForm.tsx`
- `topicCreationForm.tsx`
- `topicReplyForm.tsx` (2026-08-20)
- `messageReplyForm.tsx` (2026-08-24)
- `editor.tsx` - WYSIWYG editor
- `uploadForm.tsx`
- `uploads/uploadFile.tsx` (2026-08-24)
- `footer.tsx`
- `logOut.tsx`
- `profileBar.tsx`
- `ThemeToggle.tsx`
- `Toast.tsx`
- `toastContainer.tsx`
- `Test.tsx`
- `notifcation.tsx`
- `wiki.tsx`

## src/server/ - Server Logic

### Authentication

- `auth/lib.ts` - Auth utilities
- `auth/session.ts` - Session management
- `auth/authSchemas.ts` - Zod schemas
- `auth/actions/signUp.ts`
- `auth/actions/signIn.ts`
- `auth/actions/logOut.ts`
- `auth/actions/changePassword.ts`
- `auth/actions/messageActions.ts`
- `auth/utils/currentUser.ts`
- `auth/utils/getUser.ts`
- `auth/utils/getUserMessages.ts`
- `auth/utils/passwordHasher.ts`
- `auth/utils/defaultRole.ts`

### Forum (Updated 2026-09-01)

- `forum/forum.ts` - Forum business logic
- `forum/forum.test.ts` (2026-08-31)
- `forum/forum.edgecases.test.ts` (2026-08-31)
- `forum/forum.interactions.test.ts` (2026-08-31)
- `forum/forum.replies.edgecases.test.ts` (2026-08-31)

### Messaging (2026-08-24)

- `messaging/messaging.ts` - Messaging logic
- `messaging/messaging.test.ts` (2026-08-31)

### Storage (NEW - 2026-08-31)

- `storage/storage.ts` - File storage utilities

### Types (Updated 2026-09-01)

- `types/forum.ts` - Forum type definitions
- `types/messaging.ts` - Messaging types (2026-08-24)
- `types/user.ts`
- `types/profile.ts`
- `types/role.ts`
- `types/settings.ts`
- `types/clan.ts`
- `types/minecraft.ts`
- `types/verification.ts`
- `types/wiki.ts`
- `types/user-data.ts`
- `types/navigation.ts`
- `types/db.ts`

### Utilities

- `utils/dateUtils.ts`
- `utils/colorUtils.ts`
- `utils/dbUtils.ts`
- `utils/forumUtils.ts`

### Other

- `db.ts` - Prisma client
- `s3.ts` - S3 integration
- `navigation/navGetter.ts`
- `wiki/wiki.ts`
- `clan/clan.ts` (2026-08-20)
- `seed.ts.backup`

## src/lib/ - Shared Libraries

### Schemas

- `schemas/loginSchema.ts`
- `schemas/messageSchema.ts`
- `schemas/topicSchemas.ts`
- `schemas/messagingSchemas.ts` (2026-08-24)

### Utilities

- `sanitize.ts` - Input sanitization
- `useFormManager.ts` - Form state management

## src/utils/ - Client Utilities

- `apiHandler.ts` - API call wrapper
- `authUtils.ts` - Auth helpers
- `dateUtils.ts` - Date formatting
- `errorHandler.ts` - Error handling
- `styleUtils.ts` - Style utilities

## src/styles/ - CSS & Fonts

- `bootstrap/bootstrap.min.css`
- `fontawesome-free/all.min.css` + webfonts
- `fonts/css.css` + Montserrat webfonts
- `prism/prism_light_default.css`
- `theme/theme.css`
- `theme/theme-dark.css`
- `toastr/toastr.min.css`
- `cookies/cookieconsent.min.css`

## src/ - Root

- `env.js` - Environment variables
- `global.d.ts` - Global type definitions
- `hooks/useForum.ts` - Forum hook
  src
  | |\_**\_app
  | | |\_\_**api
  | | | |\_**\_auth
  | | | | |\_\_**navigation
  | | | | | |\_**\_route.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**user
  | | | | | |\_**\_[id]
  | | | | | | |\_\_**route.ts - \_Modified: 2026-05-16 15:34:58
  | | | | | |\_**\_route.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**forum
  | | | | |\_**\_category
  | | | | | |\_\_**route.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_latest-topic
  | | | | | |\_\_**[id]
  | | | | | | |\_**\_route.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**subcategory
  | | | | | |\_**\_[id]
  | | | | | | |\_\_**route.ts - \_Modified: 2026-05-16 15:34:58
  | | | | | |\_**\_route.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**topic
  | | | | | |\_**\_[id]
  | | | | | | |\_\_**route.ts - \_Modified: 2026-06-23 22:51:04
  | | | | |\_**\_route.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**upload
  | | | | |\_**\_[path]
  | | | | | |\_\_**route.ts - \_Modified: 2026-06-27 23:51:06
  | | | |\_**\_user
  | | | | |\_\_**messages
  | | | | | |\_**\_[id]
  | | | | | | |\_\_**route.ts - \_Modified: 2026-05-16 15:34:58
  | | | | | |\_**\_route.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**wiki
  | | | | |\_**\_route.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**dashboard
  | | | |\_**\_announcements
  | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_configuration
  | | | | |\_\_**general
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**navigation
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**privacy
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**reactions
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**registration
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**forum
  | | | | |\_**\_forums
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_labels
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_settings
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_groups
  | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_overview
  | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_settings
  | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_store
  | | | | |\_\_**configuration
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**coupons
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**payments
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**products
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**sales
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**subscriptions
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**user-management
  | | | | |\_**\_punishments
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_reports
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_users
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_layout.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_forum
  | | | |\_\_**subcategory
  | | | | |\_**\_[id]
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_topic
  | | | | |\_\_**[id]
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**add
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**new
  | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_login
  | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_profile
  | | | |\_\_**[id]
  | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**settings
  | | | | |\_**\_alerts
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_change-password
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_connections
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_followed-topics
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_messaging
  | | | | | |\_\_**[id]
  | | | | | | |\_**\_page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_overview
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_profile-settings
  | | | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_layout.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:50:59
  | | |\_**\_register
  | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_rules
  | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_wiki
  | | | |\_\_**page.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_layout.tsx - \_Modified: 2026-06-27 23:55:36
  | | |\_\_**page.tsx - \_Modified: 2026-06-28 00:16:45
  | |\_**\_client
  | | |\_\_**modal.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_modalUtils.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**navUtils.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_notification.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**theme.ts - \_Modified: 2026-05-18 01:55:40
  | | |\_**\_user.tsx - \_Modified: 2026-05-16 15:34:58
  | |\_\_**components
  | | |\_**\_form
  | | | |\_\_**FormProvider.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_Select.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**TextArea.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_TextInput.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**button.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_forum
  | | | |\_\_**ForumCategoryItem.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_ForumSubcategoryItem.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**LastTopicInfo.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_index.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**navbar
  | | | |\_**\_AuthMenu.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**HeaderStatus.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_MainNavigation.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**MobileNavigation.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_Navbar.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**UserMenu.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_index.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**ui
  | | | |\_**\_Alert.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**Button.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_Card.tsx - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**index.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_uploads
  | | | |\_\_**uploadFile.tsx - \_Modified: 2026-05-19 17:52:23
  | | |\_**\_Test.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**ThemeToggle.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_Toast.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**changePasswordForm.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_editor.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**footer.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_logOut.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**loginForm.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_loginModal.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**messageReplyForm.tsx - \_Modified: 2026-05-16 15:46:55
  | | |\_**\_navbar.tsx - \_Modified: 2026-05-18 01:56:41
  | | |\_\_**notifcation.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_profileBar.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**toastContainer.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_topicCreationForm.tsx - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**uploadForm.tsx - \_Modified: 2026-06-28 00:19:21
  | | |\_**\_wiki.tsx - \_Modified: 2026-05-16 15:34:58
  | |\_\_**hooks
  | | |\_**\_useForum.ts - \_Modified: 2026-05-16 15:34:58
  | |\_\_**lib
  | | |\_**\_schemas
  | | | |\_\_**loginSchema.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_messageSchema.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**topicSchemas.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_sanitize.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**useFormManager.ts - \_Modified: 2026-06-28 00:20:06
  | |\_**\_server
  | | |\_\_**auth
  | | | |\_**\_actions
  | | | | |\_\_**changePassword.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_logOut.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**messageActions.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_signIn.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**signUp.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_utils
  | | | | |\_\_**currentUser.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_defaultRole.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**getUser.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_getUserMessages.ts - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**passwordHasher.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_authSchemas.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**lib.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_session.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**forum
  | | | |\_**\_forum.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**navigation
  | | | |\_**\_navGetter.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**types
  | | | |\_**\_clan.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**db.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_forum.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**minecraft.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_navigation.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**profile.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_role.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**settings.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_user-data.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**user.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_verification.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**wiki.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_utils
  | | | |\_\_**colorUtils.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_dateUtils.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**dbUtils.ts - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_forumUtils.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**wiki
  | | | |\_**\_wiki.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**db.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_s3.ts - \_Modified: 2026-05-18 22:50:49
  | | |\_\_**seed.ts.backup - \_Modified: 2026-05-16 15:34:58
  | |\_**\_styles
  | | |\_\_**bootstrap
  | | | |\_**\_bootstrap.min.css - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**cookies
  | | | |\_**\_cookieconsent.min.css - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**fontawesome-free
  | | | |\_**\_webfonts
  | | | | |\_\_**fa-brands-400.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_fa-brands-400.woff2 - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**fa-regular-400.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_fa-regular-400.woff2 - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**fa-solid-900.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_fa-solid-900.woff2 - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**fa-v4compatibility.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_fa-v4compatibility.woff2 - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**all.min.css - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_fonts
  | | | |\_\_**webfonts
  | | | | |\_**\_fa-montserrat-200.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**fa-montserrat-300.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_fa-montserrat-400.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**fa-montserrat-500.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_fa-montserrat-600.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**fa-montserrat-700.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_**\_fa-montserrat-800.ttf - \_Modified: 2026-05-16 15:34:58
  | | | | |\_\_**fa-montserrat-900.ttf - \_Modified: 2026-05-16 15:34:58
  | | | |\_**\_css.css - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**prism
  | | | |\_**\_prism_light_default.css - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**theme
  | | | |\_**\_theme-dark.css - \_Modified: 2026-05-16 15:34:58
  | | | |\_\_**theme.css - \_Modified: 2026-06-28 00:11:01
  | | |\_**\_toastr
  | | | |\_\_**toastr.min.css - \_Modified: 2026-05-16 15:34:58
  | |\_**\_utils
  | | |\_\_**apiHandler.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_authUtils.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**dateUtils.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_**\_errorHandler.ts - \_Modified: 2026-05-16 15:34:58
  | | |\_\_**styleUtils.ts - \_Modified: 2026-05-16 15:34:58
  | |\_**\_env.js - \_Modified: 2026-05-16 15:34:58
  | |\_\_**global.d.ts - \_Modified: 2026-05-16 15:34:58
