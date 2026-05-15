### Commit 37b7ea9
- **Time**: Thu Apr 17 17:34:14 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
initial commit


A	.env.example
A	.gitignore
A	README.md
A	eslint.config.js
A	next.config.js
A	package-lock.json
A	package.json
A	prettier.config.js
A	prisma/schema.prisma
A	public/favicon.ico
A	src/app/index.module.css
A	src/app/layout.tsx
A	src/app/page.tsx
A	src/env.js
A	src/server/db.ts
A	src/styles/globals.css
A	start-database.sh
A	tsconfig.json

### Commit 5d82694
- **Time**: Fri Apr 18 14:36:34 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Little backup, added the first page of the forum.


M	next.config.js
M	package-lock.json
M	package.json
M	prisma/schema.prisma
A	public/default.png
A	public/new/bootstrap/css/bootstrap.min.css
A	public/new/bootstrap/js/bootstrap.min.js
A	public/new/cloudflare-static/rocket-loader.min.js
A	public/new/cookies/assets/css/cookieconsent.min.css
A	public/new/cookies/assets/js/cookieconsent.min.js
A	public/new/fonts/css.css
A	public/new/jquery/dist/jquery.min.js
A	public/new/popper.js/2.9.1/umd/popper.min.js
A	public/new/theme/assets/coldfire.webp
A	public/new/theme/assets/css/theme-dark.css
A	public/new/theme/assets/css/theme.css
A	public/new/theme/assets/js/theme.js
A	public/new/theme/uploads/image_2022-11-06_200754706.png
A	public/new/theme/uploads/image_2022-11-06_200850921.png
A	public/new/theme/uploads/k5BXmrj-2.jpg
A	public/new/toastr/toastr.min.css
A	public/new/toastr/toastr.min.js
A	src/app/api/auth/navigation/route.ts
A	src/app/api/auth/user/route.ts
A	src/app/api/forum/category/route.ts
A	src/app/api/forum/route.ts
A	src/app/api/forum/subcategory/route.ts
A	src/app/api/forum/topic/route.ts
A	src/app/forum/page.tsx
D	src/app/index.module.css
M	src/app/layout.tsx
A	src/app/login/page.tsx
M	src/app/page.tsx
A	src/app/profile/[id]/page.tsx
A	src/app/profile/page.tsx
A	src/app/register/page.tsx
A	src/app/wiki/page.tsx
A	src/client/theme.ts
A	src/components/footer.tsx
A	src/components/form/button.tsx
A	src/components/logOut.tsx
A	src/components/loginForm.tsx
A	src/components/navbar.tsx
A	src/components/navigation.tsx
A	src/components/toast.tsx
A	src/components/toastContainer.tsx
A	src/server/auth/actions/logOut.ts
A	src/server/auth/actions/signIn.ts
A	src/server/auth/actions/signUp.ts
A	src/server/auth/authSchemas.ts
A	src/server/auth/lib.ts
A	src/server/auth/session.ts
A	src/server/auth/utils/currentUser.ts
A	src/server/auth/utils/passwordHasher.ts
A	src/server/forum/forum.ts
A	src/server/navigation/navGetter.ts
A	src/server/types/forum.ts
A	src/server/types/navigation.ts
A	src/server/types/role.ts
A	src/server/types/user.ts
A	src/server/utils/colorUtils.ts
A	src/server/utils/dateUtils.ts
A	src/styles/bootstrap/bootstrap.min.css
A	src/styles/cookies/cookieconsent.min.css
A	src/styles/fontawesome-free/all.min.css
A	src/styles/fontawesome-free/webfonts/fa-brands-400.ttf
A	src/styles/fontawesome-free/webfonts/fa-brands-400.woff2
A	src/styles/fontawesome-free/webfonts/fa-regular-400.ttf
A	src/styles/fontawesome-free/webfonts/fa-regular-400.woff2
A	src/styles/fontawesome-free/webfonts/fa-solid-900.ttf
A	src/styles/fontawesome-free/webfonts/fa-solid-900.woff2
A	src/styles/fontawesome-free/webfonts/fa-v4compatibility.ttf
A	src/styles/fontawesome-free/webfonts/fa-v4compatibility.woff2
A	src/styles/fonts/css.css
D	src/styles/globals.css
A	src/styles/prism/prism_light_default.css
A	src/styles/theme/theme-dark.css
A	src/styles/theme/theme.css
A	src/styles/toastr/toastr.min.css
M	tsconfig.json

### Commit b00ed69
- **Time**: Mon Apr 28 23:39:35 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Little BackUp, overhauling the entire Layout & Navigation / Page State. If something breaks, continue here!


M	next.config.js
M	package-lock.json
M	package.json
M	public/new/bootstrap/js/bootstrap.min.js
M	public/new/theme/assets/js/theme.js
A	server.js
A	src/app/api/forum/latest-topic/[id]/route.ts
M	src/app/api/forum/route.ts
A	src/app/api/forum/subcategory/[id]/route.ts
D	src/app/api/forum/subcategory/route.ts
A	src/app/api/forum/topic/[id]/route.ts
D	src/app/api/forum/topic/route.ts
M	src/app/forum/page.tsx
A	src/app/forum/subcategory/[id]/page.tsx
A	src/app/forum/topic/[id]/page.tsx
M	src/app/layout.tsx
M	src/app/login/page.tsx
M	src/app/page.tsx
M	src/client/theme.ts
A	src/components/editor.tsx
M	src/components/form/button.tsx
A	src/components/loginModal.tsx
M	src/components/navbar.tsx
A	src/components/profileBar.tsx
M	src/server/auth/actions/signIn.ts
M	src/server/auth/actions/signUp.ts
M	src/server/auth/utils/currentUser.ts
A	src/server/auth/utils/defaultRole.ts
M	src/server/db.ts
M	src/server/forum/forum.ts
A	src/server/types/db.ts
M	src/server/types/forum.ts
M	src/server/utils/colorUtils.ts
M	src/server/utils/dateUtils.ts
A	src/server/utils/dbUtils.ts
M	tsconfig.json

### Commit 611b845
- **Time**: Sun May 4 17:39:01 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Latest Commit, made the loginModal work, changed the navbar layout and user fetching logic.


M	src/app/layout.tsx
M	src/app/page.tsx
A	src/client/modal.tsx
M	src/components/loginModal.tsx
M	src/components/navbar.tsx
M	src/server/auth/actions/signIn.ts
M	src/server/auth/lib.ts
M	src/server/auth/session.ts

### Commit f696952
- **Time**: Fri Jun 27 14:39:26 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Updated things, added Form Manager, fixed some bugs!


M	package.json
M	prisma/schema.prisma
A	src/app/api/auth/user/[id]/route.ts
A	src/app/api/wiki/route.ts
M	src/app/page.tsx
M	src/app/profile/[id]/page.tsx
M	src/app/wiki/page.tsx
A	src/components/Test.tsx
A	src/components/form/FormProvider.tsx
A	src/components/form/TextInput.tsx
M	src/components/loginForm.tsx
M	src/components/loginModal.tsx
M	src/components/navbar.tsx
A	src/components/notifcation.tsx
A	src/components/wiki.tsx
A	src/lib/sanitize.ts
A	src/lib/schemas/loginSchema.ts
A	src/lib/useFormManager.ts
M	src/server/auth/actions/signIn.ts
M	src/server/auth/authSchemas.ts
A	src/server/auth/utils/getUser.ts
A	src/server/types/wiki.ts
M	src/server/utils/colorUtils.ts
A	src/server/wiki/wiki.ts

### Commit 04b8511
- **Time**: Sat Jun 28 00:16:22 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Refactored the whole code base.


A	AGENTS.md
A	DOC.md
M	package-lock.json
M	src/app/api/forum/route.ts
M	src/app/forum/page.tsx
M	src/app/layout.tsx
A	src/client/notification.tsx
M	src/client/theme.ts
A	src/client/theme.tsx
A	src/client/user.tsx
A	src/components/ThemeToggle.tsx
A	src/components/Toast.tsx
A	src/components/forum/ForumCategoryItem.tsx
A	src/components/forum/ForumSubcategoryItem.tsx
A	src/components/forum/LastTopicInfo.tsx
A	src/components/forum/index.ts
M	src/components/loginForm.tsx
A	src/components/navbar/AuthMenu.tsx
A	src/components/navbar/HeaderStatus.tsx
A	src/components/navbar/MainNavigation.tsx
A	src/components/navbar/MobileNavigation.tsx
A	src/components/navbar/Navbar.tsx
A	src/components/navbar/UserMenu.tsx
A	src/components/navbar/index.ts
D	src/components/toast.tsx
A	src/components/ui/Alert.tsx
A	src/components/ui/Button.tsx
A	src/components/ui/Card.tsx
A	src/components/ui/index.ts
A	src/hooks/useForum.ts
M	src/server/auth/actions/signIn.ts
M	src/server/types/forum.ts
M	src/server/utils/colorUtils.ts
A	src/utils/apiHandler.ts
A	src/utils/authUtils.ts
A	src/utils/dateUtils.ts
A	src/utils/styleUtils.ts
M	tsconfig.json

### Commit 8aac411
- **Time**: Sat Jun 28 01:19:35 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Fixed the Toast and Notificaitions, can now use the useNotification() hook to send toast Notifications!


M	src/app/layout.tsx
M	src/app/page.tsx
M	src/client/notification.tsx
M	src/components/Test.tsx
M	src/components/toastContainer.tsx

### Commit 215f9ca
- **Time**: Mon Jun 30 23:08:57 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Added TypeSafety to the whole application, changed the Schema to be more clear and added updated and clearer Types for the schema. Also added Zod Validation for the types


A	Making-It-TypeSafe.md
A	TYPE_SAFETY.md
M	prisma/schema.prisma
M	src/app/api/forum/latest-topic/[id]/route.ts
M	src/app/api/forum/route.ts
M	src/app/api/forum/subcategory/[id]/route.ts
M	src/app/api/forum/topic/[id]/route.ts
M	src/components/forum/ForumCategoryItem.tsx
M	src/components/forum/LastTopicInfo.tsx
M	src/server/auth/utils/currentUser.ts
M	src/server/auth/utils/defaultRole.ts
M	src/server/auth/utils/getUser.ts
M	src/server/forum/forum.ts
A	src/server/schema/forum.ts
A	src/server/types/base.ts
M	src/server/types/forum.ts
A	src/server/types/game.ts
A	src/server/types/index.ts
M	src/server/types/navigation.ts
A	src/server/types/profile.ts
M	src/server/types/role.ts
A	src/server/types/server.ts
M	src/server/types/user.ts
M	src/server/types/wiki.ts

### Commit 1bc9422
- **Time**: Mon Jun 30 23:08:57 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
I do not even know what i did man i hope nothing broke, but i added TypeSafety to the whole application, changed the Schema to be more clear and added updated and clearer Types for the schema. Also added Zod Validation for the types


D	Making-It-TypeSafe.md
D	TYPE_SAFETY.md
M	prisma/schema.prisma
M	src/app/api/forum/latest-topic/[id]/route.ts
M	src/app/api/forum/route.ts
M	src/app/api/forum/subcategory/[id]/route.ts
M	src/app/api/forum/topic/[id]/route.ts
M	src/server/auth/utils/currentUser.ts
M	src/server/auth/utils/defaultRole.ts
M	src/server/auth/utils/getUser.ts
M	src/server/forum/forum.ts
D	src/server/schema/forum.ts
D	src/server/types/base.ts
M	src/server/types/forum.ts
D	src/server/types/game.ts
D	src/server/types/index.ts
M	src/server/types/navigation.ts
D	src/server/types/profile.ts
M	src/server/types/role.ts
D	src/server/types/server.ts
M	src/server/types/user.ts
M	src/server/types/wiki.ts

### Commit fb031bf
- **Time**: Mon Jun 30 23:08:57 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Everything works now! Very good very nice, can continue working on new features.


M	package-lock.json
M	package.json
A	prisma/migrations/20250630130906_t3/migration.sql
A	prisma/migrations/migration_lock.toml
M	prisma/schema.prisma
M	src/app/forum/subcategory/[id]/page.tsx
M	src/app/forum/topic/[id]/page.tsx
M	src/app/layout.tsx
M	src/app/page.tsx
M	src/app/profile/[id]/page.tsx
M	src/client/theme.ts
M	src/components/form/FormProvider.tsx
M	src/components/form/TextInput.tsx
M	src/components/forum/ForumCategoryItem.tsx
M	src/components/forum/LastTopicInfo.tsx
M	src/components/loginForm.tsx
M	src/components/loginModal.tsx
M	src/components/navbar.tsx
M	src/components/navbar/UserMenu.tsx
M	src/components/profileBar.tsx
M	src/components/toastContainer.tsx
M	src/lib/useFormManager.ts
M	src/server/auth/actions/signIn.ts
M	src/server/auth/actions/signUp.ts
M	src/server/auth/lib.ts
M	src/server/auth/session.ts
M	src/server/auth/utils/currentUser.ts
M	src/server/auth/utils/defaultRole.ts
M	src/server/auth/utils/getUser.ts
M	src/server/forum/forum.ts
M	src/server/navigation/navGetter.ts
A	src/server/seed.ts
M	src/server/types/forum.ts
M	src/server/types/navigation.ts
M	src/server/utils/colorUtils.ts
M	src/server/wiki/wiki.ts
M	src/utils/styleUtils.ts
A	test.sql

### Commit 4f23137
- **Time**: Tue Jul 1 12:44:32 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Removed unused TestButton, removed unnenacarry consoleLog in the nav api route, Fixed Message in register, fixed the styleUtils to work correctly


M	src/app/api/auth/navigation/route.ts
M	src/app/layout.tsx
M	src/app/register/page.tsx
M	src/components/navbar/UserMenu.tsx
M	src/server/navigation/navGetter.ts
M	src/utils/styleUtils.ts

### Commit e3d88f5
- **Time**: Tue Jul 1 12:51:04 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Fixed the styleUtils again, this time to make badges work


M	src/app/profile/[id]/page.tsx
M	src/server/auth/utils/getUser.ts
M	src/utils/styleUtils.ts

### Commit 6611c66
- **Time**: Wed Aug 27 21:25:39 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Fixed some things, updated the font to be stored locally in the CDN. Also added a toast notification system!


M	eslint.config.js
M	package-lock.json
M	package.json
D	public/new/bootstrap/css/bootstrap.min.css
D	public/new/cookies/assets/css/cookieconsent.min.css
D	public/new/fonts/css.css
D	public/new/theme/assets/css/theme-dark.css
D	public/new/theme/assets/css/theme.css
M	public/new/theme/assets/js/theme.js
M	public/new/toastr/toastr.min.css
M	src/app/forum/subcategory/[id]/page.tsx
M	src/app/forum/topic/[id]/page.tsx
M	src/app/layout.tsx
M	src/app/profile/[id]/page.tsx
M	src/client/notification.tsx
M	src/components/Test.tsx
M	src/components/forum/LastTopicInfo.tsx
M	src/components/loginForm.tsx
M	src/components/loginModal.tsx
M	src/components/navbar.tsx
M	src/components/navbar/MainNavigation.tsx
M	src/components/navbar/MobileNavigation.tsx
M	src/components/toastContainer.tsx
M	src/server/auth/actions/signIn.ts
M	src/server/auth/utils/currentUser.ts
M	src/server/auth/utils/getUser.ts
A	src/server/types/clan.ts
M	src/server/types/forum.ts
A	src/server/types/minecraft.ts
A	src/server/types/profile.ts
A	src/server/types/settings.ts
A	src/server/types/user-data.ts
M	src/server/types/user.ts
A	src/server/types/verification.ts
M	src/server/types/wiki.ts
M	src/server/wiki/wiki.ts
M	src/styles/fonts/css.css
A	src/styles/fonts/webfonts/fa-montserrat-200.ttf
A	src/styles/fonts/webfonts/fa-montserrat-300.ttf
A	src/styles/fonts/webfonts/fa-montserrat-400.ttf
A	src/styles/fonts/webfonts/fa-montserrat-500.ttf
A	src/styles/fonts/webfonts/fa-montserrat-600.ttf
A	src/styles/fonts/webfonts/fa-montserrat-700.ttf
A	src/styles/fonts/webfonts/fa-montserrat-800.ttf
A	src/styles/fonts/webfonts/fa-montserrat-900.ttf
M	src/styles/toastr/toastr.min.css
M	src/utils/authUtils.ts
M	test.sql
M	tsconfig.json

### Commit 56d467a
- **Time**: Sat Sep 13 22:29:38 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
*SP├äTER EINF├£GEN*


M	eslint.config.js
M	src/app/forum/subcategory/[id]/page.tsx
M	src/app/forum/topic/[id]/page.tsx
M	src/app/profile/[id]/page.tsx
M	src/app/wiki/page.tsx
M	src/client/notification.tsx
M	src/components/forum/LastTopicInfo.tsx
M	src/components/navbar.tsx
M	src/components/navbar/Navbar.tsx
M	src/components/navbar/UserMenu.tsx
M	src/components/navigation.tsx
M	src/components/profileBar.tsx
M	src/components/wiki.tsx
M	src/server/auth/actions/signUp.ts
R088	src/server/seed.ts	src/server/seed.ts.backup
M	tsconfig.json

### Commit f363adc
- **Time**: Mon Sep 22 19:11:11 2025 +0200
- **Committer**: Waleed Bakri
- **Message**: 
extended the DOC file


M	DOC.md

### Commit 77a3292
- **Time**: Fri Jan 2 01:48:22 2026 +0100
- **Committer**: Waleed Bakri
- **Message**: 
Ready for production Build!


A	.vscode/settings.json
M	next.config.js
M	package-lock.json
M	package.json
M	src/app/profile/[id]/page.tsx

### Commit 9f67dd7
- **Time**: Mon Apr 27 11:21:50 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
updated the whole doc.md file to be even more easy to understand and enable new developers (myself included) to understand the code. generated with Github CoPilot!

Co-authored-by: Copilot <copilot@github.com>


M	DOC.md

### Commit 36a4db6
- **Time**: Wed Apr 29 14:25:40 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Updated some things, added Html Formatting to toasts, changed up the authSchema for more detailed error messages, changes signUp schema to give clearer instructions to the client.


M	DOC.md
A	DOC_AGENT.md
A	FILES.md
A	prisma/migrations/20260428125523_yes/migration.sql
M	src/app/register/page.tsx
M	src/components/loginModal.tsx
M	src/components/toastContainer.tsx
M	src/server/auth/actions/signUp.ts
M	src/server/auth/authSchemas.ts

### Commit 9549a11
- **Time**: Sat May 2 02:49:17 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Added some changes i don't even know what i am doing anymore i am going insane i have been working on this since 2022 and it is still not done and nothing works anymore and it is so fucking shitty coded the codebase is just a mess bro please kl!l mee


M	.vscode/settings.json
M	eslint.config.js
M	package-lock.json
M	package.json
M	prettier.config.js
M	src/app/api/auth/user/[id]/route.ts
M	src/app/forum/subcategory/[id]/page.tsx
M	src/app/forum/topic/[id]/page.tsx
M	src/app/profile/[id]/page.tsx
M	src/app/wiki/page.tsx
M	src/client/modal.tsx
M	src/client/user.tsx
M	src/components/form/FormProvider.tsx
M	src/components/form/TextInput.tsx
M	src/components/forum/LastTopicInfo.tsx
M	src/components/loginForm.tsx
M	src/components/loginModal.tsx
M	src/components/navbar.tsx
M	src/components/navbar/Navbar.tsx
M	src/components/navbar/UserMenu.tsx
M	src/components/profileBar.tsx
M	src/components/toastContainer.tsx
M	src/lib/useFormManager.ts
M	src/server/auth/utils/currentUser.ts
M	src/server/navigation/navGetter.ts
M	src/server/types/forum.ts
M	src/server/utils/colorUtils.ts
M	src/utils/authUtils.ts
M	tsconfig.json

### Commit 7485236
- **Time**: Fri May 8 01:35:41 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Updated the next and ts config and added a TO_DO list!


M	next.config.js
M	tsconfig.json

### Commit 07b83e0
- **Time**: Fri May 8 01:35:44 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Added TO_DO.md file


A	TO_DO.md

### Commit 8e86e44
- **Time**: Fri May 8 02:11:23 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Added Password Change Functionality


A	src/app/profile/settings/change-password/page.tsx
A	src/components/changePasswordForm.tsx
A	src/server/auth/actions/changePassword.ts
M	src/server/auth/authSchemas.ts

### Commit 0d7e53c
- **Time**: Sun May 10 10:58:24 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Updated next config and tsconfig, added WEBSITE_FEATURES to track what features are missing, added the Settings Pages for the Profile, no functionallity yet only front-end.


M	DOC_AGENT.md
M	TO_DO.md
A	WEBSITE_FEATURES.md
M	next.config.js
A	src/app/profile/settings/alerts/page.tsx
A	src/app/profile/settings/connections/page.tsx
A	src/app/profile/settings/followed-topics/page.tsx
A	src/app/profile/settings/layout.tsx
A	src/app/profile/settings/messaging/page.tsx
A	src/app/profile/settings/overview/page.tsx
A	src/app/profile/settings/profile-settings/page.tsx
A	src/app/rules/page.tsx
A	src/components/templates/profileSettings.tsx
M	src/server/types/profile.ts
M	tsconfig.json

### Commit b0f731c
- **Time**: Sun May 10 13:18:16 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Added Topic Creation feature, only barebones, need to add permission checks, checks for lock/closed/private what ever


M	TO_DO.md
D	WEBSITE_FEATURES.md
M	eslint.config.js
A	src/app/forum/topic/[id]/add/page.tsx
M	src/app/profile/settings/alerts/page.tsx
M	src/app/profile/settings/connections/page.tsx
M	src/app/profile/settings/followed-topics/page.tsx
M	src/app/profile/settings/messaging/page.tsx
M	src/app/profile/settings/profile-settings/page.tsx
A	src/components/form/TextArea.tsx
A	src/components/topicCreationForm.tsx
A	src/lib/schemas/createTopicSchema.ts
M	src/server/auth/actions/signUp.ts
M	src/server/forum/forum.ts
A	src/server/utils/forumUtils.ts
A	src/utils/errorHandler.ts

### Commit fbb5610
- **Time**: Mon May 11 23:20:04 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(core): implement dashboard, modal abstraction, and optimize SPA navigation

This commit introduces a significant set of updates encompassing the new Dashboard layout, the Global Modal Manager, SPA routing optimizations, and accompanying documentation synchronizations.

Documentation & Tracking:
- DOC.md: Documented the new Global Modal Manager (`modalUtils.tsx`) and `SubNavBar` `<Link>` usage. Improved markdown list formatting.
- DOC_AGENT.md: Refined instructions for the automatic documentation compilation loops.
- FILES.md: Regenerated the project file tree with the latest modified timestamps.
- TO_DO.md: Created a task for a Global Dropdown Manager (`dropdownUtil`), and ticked off newly completed API and Dashboard tasks.

Client & UI Optimizations:
- src/client/navUtils.tsx: Swapped native `<a>` tags for Next.js `<Link>` components within `SubNavBar` to enable seamless SPA routing without full page reloads. Fixed React unique `key` warnings by removing empty `<>` fragments.
- src/client/modalUtils.tsx: Added a centralized `ModalProvider` and `useModalManager` hook to abstract Bootstrap's modal boilerplate and programmatically trigger pop-ups.
- src/components/topicCreationForm.tsx: Updated form components to align with the new schema validation structure.

Dashboard & Profile Settings Architecture:
- src/app/dashboard/*: Scaffolded extensive administrative and user dashboard routes (Overview, Announcements, Groups, Configuration, Forum Settings, Store Payments).
- src/app/profile/settings/*: Rebuilt the settings layouts handling user `Connections` and `Change Password` views.
- src/components/templates/profileSettings.tsx: Deleted in favor of the new app-router integrated settings structure.

Server Backend & Auth:
- src/server/auth/actions/changePassword.ts: Implemented secure password change logic evaluating the old password before mutation.
- src/server/forum/forum.ts & src/app/api/forum/subcategory/route.ts: Expanded forum subcategory fetching capabilities and topic mapping logic.
- src/lib/schemas/topicSchemas.ts: Consolidated topic-related Zod validation patterns.
- src/lib/schemas/createTopicSchema.ts: Deleted (logic merged into `topicSchemas.ts`).
- src/server/types/navigation.ts: Adjusted typing interfaces to support dropdown states.


M	DOC.md
M	DOC_AGENT.md
M	FILES.md
M	TO_DO.md
A	src/app/api/forum/subcategory/route.ts
A	src/app/dashboard/announcements/page.tsx
A	src/app/dashboard/configuration/general/page.tsx
A	src/app/dashboard/configuration/navigation/page.tsx
A	src/app/dashboard/configuration/privacy/page.tsx
A	src/app/dashboard/configuration/reactions/page.tsx
A	src/app/dashboard/configuration/registration/page.tsx
A	src/app/dashboard/forum/forums/page.tsx
A	src/app/dashboard/forum/labels/page.tsx
A	src/app/dashboard/forum/settings/page.tsx
A	src/app/dashboard/groups/page.tsx
A	src/app/dashboard/layout.tsx
A	src/app/dashboard/overview/page.tsx
A	src/app/dashboard/page.tsx
A	src/app/dashboard/settings/page.tsx
A	src/app/dashboard/store/configuration/page.tsx
A	src/app/dashboard/store/coupons/page.tsx
A	src/app/dashboard/store/payments/page.tsx
A	src/app/dashboard/store/products/page.tsx
A	src/app/dashboard/store/sales/page.tsx
A	src/app/dashboard/store/subscriptions/page.tsx
A	src/app/dashboard/user-management/punishments/page.tsx
A	src/app/dashboard/user-management/reports/page.tsx
A	src/app/dashboard/user-management/users/page.tsx
M	src/app/layout.tsx
M	src/app/profile/settings/change-password/page.tsx
M	src/app/profile/settings/connections/page.tsx
M	src/app/profile/settings/layout.tsx
A	src/client/modalUtils.tsx
A	src/client/navUtils.tsx
D	src/components/templates/profileSettings.tsx
M	src/components/topicCreationForm.tsx
D	src/lib/schemas/createTopicSchema.ts
A	src/lib/schemas/topicSchemas.ts
M	src/server/auth/actions/changePassword.ts
M	src/server/forum/forum.ts
M	src/server/types/navigation.ts

### Commit a0a540e
- **Time**: Mon May 11 23:21:21 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Added another pipeline to the DOC_AGENT.md file


M	DOC_AGENT.md

### Commit 59e9a30
- **Time**: Mon May 11 23:25:34 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Added a disclaimer to the DOC.md file


M	DOC.md

### Commit 547cde1
- **Time**: Mon May 11 23:26:02 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
updated the doc file disclaimer


M	DOC.md

### Commit 57e71fe
- **Time**: Tue May 12 13:49:40 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
chore: update documentation agent pipeline and file tree

- Documentation:
  - Added new automated commit & changelog management instructions (Pipeline 4) to DOC_AGENT.md.
  - Regenerated file structures and timestamps in FILES.md.
  - Staged COMMITS.md for changelog tracking.


A	COMMITS.md
M	DOC_AGENT.md
M	FILES.md

### Commit 25a8def
- **Time**: Tue May 12 13:50:00 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
chore: update changelog


M	COMMITS.md

### Commit d0d4801
- **Time**: Tue May 12 21:11:44 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
refactor: implement soft deletes and replace theme context with lightweight utilities

Server & Database:
- Implemented soft deletes for Forum Topics via the \hidden\ field (\schema.prisma\, \orum.ts\, \	ypes/forum.ts\).

Client & UI:
- Replaced the heavy \ThemeProvider\ React context with lightweight utility functions (\	heme.ts\), removing \	heme.tsx\.
- Cleaned up \layout.tsx\ by removing inline configuration scripts and the \ThemeProvider\ wrapper.
- Refactored layout configurations and map keys within \pp/profile/settings/layout.tsx\ and \
avbar.tsx\.
- Adjusted Bootstrap modal utility integrations inside \loginModal.tsx\.
- Added image domain \mc-heads.net\ to \
ext.config.js\ and updated image avatars.
- Added CSS module declarations via \global.d.ts\.

Documentation:
- Updated \FILES.md\ to reflect the current accurate file tree and modification dates.
- Updated \DOC.md\ with soft delete field mapping examples and the new \	heme.ts\ utility documentation.
- Updated \TO_DO.md\ to accurately reflect the completion of the topic core mutation server logic.


M	.vscode/settings.json
M	DOC.md
M	FILES.md
M	TO_DO.md
M	next.config.js
M	prisma/schema.prisma
M	src/app/forum/topic/[id]/page.tsx
M	src/app/layout.tsx
M	src/app/profile/settings/layout.tsx
D	src/client/theme.tsx
M	src/components/loginModal.tsx
M	src/components/navbar.tsx
A	src/global.d.ts
M	src/server/forum/forum.ts
M	src/server/types/forum.ts
M	src/styles/bootstrap/bootstrap.min.css
M	src/styles/theme/theme.css

### Commit 3d4467e
- **Time**: Fri May 15 23:23:05 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat: Implement comprehensive forum management and expand admin dashboard

FEATURES:
- feat(forum): Implement full topic management system
  * Add create, edit, and delete operations for topics
  * Implement server actions for secure operations
  * Create Zod schemas for topic validation
  * Build topic creation form component
  * Add 'hidden' field to Prisma schema for soft deletes

- feat(dashboard): Massively expand admin dashboard
  * Create new navigation structure for dashboard
  * Add placeholder pages for:
    - Configuration management
    - User management
    - Store management
    - Forum management

- feat(ui): Implement global modal management system
  * Create ModalProvider context for centralized control
  * Develop useModalManager hook for component integration
  * Enable consistent modal handling across the application

REFACTORING:
- refactor(auth): Improve authentication system robustness
  * Enhance login modal to better handle autofill scenarios
  * Refactor main layout to use UserProvider
  * Improve user session state management

FIXES:
- fix(auth): Correctly update user session after password change
  * Ensure session persists with updated credentials
  * Validate session state post-update

DOCUMENTATION:
- chore(docs): Update project documentation
  * Reflect recent feature additions in TO_DO.md
  * Update progress tracking in DOC.md

STYLING:
- style: Apply minor theme and style updates
  * Adjust color schemes and styling
  * Improve visual consistency

This commit represents a major milestone with significant additions to forum
functionality, admin capabilities, and UI infrastructure improvements.


M	COMMITS.md
M	DOC.md
M	DOC_AGENT.md
M	FILES.md
M	TO_DO.md
M	next.config.js
M	package-lock.json
M	package.json
M	src/app/forum/topic/[id]/page.tsx
R100	src/app/forum/topic/[id]/add/page.tsx	src/app/forum/topic/add/page.tsx
A	src/app/forum/topic/new/page.tsx
M	src/app/profile/settings/change-password/page.tsx
M	src/app/profile/settings/messaging/page.tsx
M	src/client/theme.ts
M	src/components/editor.tsx
A	src/components/form/Select.tsx
M	src/components/form/TextArea.tsx
M	src/components/topicCreationForm.tsx
M	src/hooks/useForum.ts
M	src/lib/schemas/topicSchemas.ts
M	src/server/auth/utils/getUser.ts
A	src/server/auth/utils/getUserMessages.ts
M	src/server/forum/forum.ts
M	src/server/types/forum.ts
M	src/server/types/user.ts
M	src/server/utils/dbUtils.ts
