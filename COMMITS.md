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
*SPÄTER EINFÜGEN*


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

### Commit 41d4e7b
- **Time**: Fri May 15 23:46:03 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
COMMITS, TO_DO, FILES & DOC update.


M	COMMITS.md
M	DOC.md
M	FILES.md
M	TO_DO.md

### Commit 44e77c2
- **Time**: Sat May 16 15:04:07 2026 +0200
- **Committer**: Waleed
- **Message**: 
Nothing


A	.nvmrc
A	prisma/seed.ts

### Commit dfe2b7c
- **Time**: Sat May 16 15:23:03 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat: Implement private messaging feature

This commit introduces a comprehensive private messaging system, allowing users to send, receive, and reply to private messages.

Key features and changes include:
- **Private Messaging Pages**: New pages for viewing message inbox and individual message threads.
- **API Endpoints**: Dedicated API routes for fetching message data.
- **Server Actions**: A new server action for handling message replies securely.
- **UI Components**: A new form for composing and sending message replies.
- **Database Integration**: Leverages existing Prisma models for messages and replies.
- **Documentation**: Updated DOC.md with details of the new feature and TO_DO.md to reflect its completion.


M	DOC.md
M	FILES.md
M	TO_DO.md
M	next.config.js
A	src/app/api/user/messages/[id]/route.ts
A	src/app/api/user/messages/route.ts
A	src/app/profile/settings/messaging/[id]/page.tsx
M	src/app/profile/settings/messaging/page.tsx
M	src/components/form/TextArea.tsx
A	src/components/messageReplyForm.tsx
D	src/components/navigation.tsx
A	src/lib/schemas/messageSchema.ts
A	src/server/auth/actions/messageActions.ts
M	src/server/auth/utils/getUserMessages.ts
M	src/server/types/forum.ts
M	src/server/utils/dbUtils.ts
M	src/utils/dateUtils.ts
M	src/utils/styleUtils.ts

### Commit 9d8069b
- **Time**: Sat May 16 15:51:44 2026 +0200
- **Committer**: Waleed
- **Message**: 
Added placeholder avatars, hid the id field for messageReplyForm


A	public/new/theme/avatar/1.png
A	public/new/theme/avatar/2.png
A	public/new/theme/avatar/3.png
A	public/new/theme/avatar/4.png
A	public/new/theme/avatar/5.png
A	public/new/theme/avatar/6.png
A	public/new/theme/avatar/7.png
A	public/new/theme/avatar/8.png
M	src/app/profile/page.tsx
M	src/components/messageReplyForm.tsx

### Commit 64e6e84
- **Time**: Tue May 19 17:51:01 2026 +0200
- **Committer**: Waleed
- **Message**: 
feat: Add file upload feature to-do and update docs

- Added a new section to TO_DO.md for tracking the implementation of a file upload feature.
- Updated FILES.md with the latest file structure and modification dates.


M	.env.example
M	FILES.md
M	TO_DO.md
M	next.config.js
M	package-lock.json
M	package.json
A	src/app/api/upload/route.ts
M	src/app/page.tsx
M	src/client/theme.ts
M	src/components/navbar.tsx
A	src/components/uploadTest.tsx
A	src/components/uploads/uploadFile.tsx
A	src/server/s3.ts

### Commit e2aea61
- **Time**: Tue May 19 17:59:02 2026 +0200
- **Committer**: Waleed
- **Message**: 
feat: Implement file uploads and update documentation

- **File Uploads**: Implemented a file upload feature using AWS S3. This includes a new API route ('/api/upload') for generating pre-signed URLs and a client-side component for handling the upload process.

- **'useTheme' Hook**: Added a new 'useTheme' hook to manage theme toggling, loading bars, and other UI interactions.

- **Navbar**: The main navbar component has been updated to accept an 'initialUser' prop, improving the initial page load performance by avoiding a client-side data fetch for user information.

- **Database Seeding**: The 'prisma/seed.ts' script has been significantly updated to provide a richer set of data for development and testing.

- **Private Messaging**: Started the implementation of the private messaging system by creating a form for replying to messages.

- **Documentation**: Updated 'DOC.md' and 'TO_DO.md' to reflect the latest changes and progress.


M	DOC.md
M	TO_DO.md
M	src/components/uploads/uploadFile.tsx

### Commit 7345dc3
- **Time**: Tue May 19 17:59:28 2026 +0200
- **Committer**: Waleed
- **Message**: 
Commits.md


M	COMMITS.md

### Commit fd36d48
- **Time**: Sun Jun 28 00:30:51 2026 +0200
- **Committer**: Waleed
- **Message**: 
feat: sync upload docs and form-manager workflow

- Document the dynamic upload route, reusable uploadForm component, and parent-form key handoff pattern in DOC.md
- Refresh FILES.md and TO_DO.md to match the current upload implementation and form-manager API
- Move the upload flow into src/components/uploadForm.tsx, add setFieldValue support to useFormManager, and keep uploadTest.tsx as a compatibility re-export
- Include the staged workspace changes in next.config.js, app layout, and forum topic route


M	DOC.md
M	FILES.md
M	TO_DO.md
M	next.config.js
M	src/app/api/forum/topic/[id]/route.ts
R090	src/app/api/upload/route.ts	src/app/api/upload/[path]/route.ts
M	src/app/layout.tsx
M	src/app/page.tsx
A	src/components/uploadForm.tsx
D	src/components/uploadTest.tsx
M	src/lib/useFormManager.ts
M	src/styles/theme/theme.css

### Commit 772f0ad
- **Time**: Thu Aug 20 22:09:50 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(types): resolve type errors and import missing schemas; tidy subcategory page

Addressed TS errors reported by tsc: added reactSchema and followSchema imports, explicit any annotations in mapping callbacks to silence implicit any, fixed forum reaction create to connect emoji relation, and removed undefined setLatestEntry usage in subcategory page. Ran typecheck to confirm no errors.


M	package-lock.json
A	src/app/admin/page.tsx
A	src/app/api/clan/route.ts
A	src/app/api/dashboard/stats/route.ts
A	src/app/api/forum/topic/[id]/follow/route.ts
A	src/app/api/forum/topic/[id]/react/route.ts
A	src/app/api/forum/topic/[id]/reply/route.ts
M	src/app/api/forum/topic/[id]/route.ts
A	src/app/api/forum/topic/route.ts
A	src/app/api/profile/settings/route.ts
A	src/app/api/upload/save/route.ts
M	src/app/forum/subcategory/[id]/page.tsx
M	src/app/forum/topic/[id]/page.tsx
A	src/app/messages/[id]/page.tsx
A	src/app/messages/page.tsx
A	src/components/topicReplyForm.tsx
M	src/lib/schemas/topicSchemas.ts
A	src/server/clan/clan.ts
M	src/server/forum/forum.ts

### Commit fdec4bc
- **Time**: Mon Aug 24 21:08:15 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(lint): resolve remaining ESLint warnings and baseline checks


M	prisma/seed.ts
M	src/app/admin/page.tsx
M	src/app/forum/subcategory/[id]/page.tsx
M	src/app/forum/topic/[id]/page.tsx
M	src/app/profile/page.tsx
M	src/components/uploads/uploadFile.tsx
M	src/server/forum/forum.ts

### Commit 48c3b31
- **Time**: Mon Aug 24 21:11:22 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(forum): enable follow and reaction toggles


M	src/app/forum/topic/[id]/page.tsx

### Commit 2f0c296
- **Time**: Mon Aug 24 22:05:06 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(messages): add messaging module and /api/messages routes


A	src/app/api/messages/[id]/route.ts
A	src/app/api/messages/route.ts
M	src/app/messages/[id]/page.tsx
M	src/app/messages/page.tsx
M	src/components/messageReplyForm.tsx
A	src/lib/schemas/messagingSchemas.ts
A	src/server/messaging/messaging.ts
A	src/server/types/messaging.ts

### Commit 3d6ca87
- **Time**: Mon Aug 24 22:06:59 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(messages): add inbox compose thread form


M	src/app/messages/page.tsx

### Commit 52fd8f8
- **Time**: Mon Aug 24 22:20:17 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(messages): add recipient picker UI and /api/user/search route


A	src/app/api/user/search/route.ts
M	src/app/messages/page.tsx
A	src/components/userPicker/UserPicker.tsx

### Commit 3a470da
- **Time**: Mon Aug 24 22:23:44 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(messages): add keyboard navigation to UserPicker and use next/image for avatars


M	src/components/userPicker/UserPicker.tsx

### Commit d64c0e5
- **Time**: Mon Aug 24 22:33:13 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
chore(messages): merge recipient picker into baseline branch


### Commit 1429576
- **Time**: Mon Aug 24 22:34:03 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Settings.json changed


M	.vscode/settings.json

### Commit ea7bed3
- **Time**: Mon Aug 31 20:28:30 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(messaging): add vitest and unit tests for messaging module


M	package.json
A	src/server/messaging/messaging.test.ts
A	vitest.config.ts

### Commit ba5eac8
- **Time**: Mon Aug 31 20:29:34 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(messaging): expand tests for inbox and thread mapping


M	src/server/messaging/messaging.test.ts

### Commit 4215800
- **Time**: Mon Aug 31 20:30:50 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(messaging): sanitize input and error-path tests for messaging module


M	src/server/messaging/messaging.test.ts

### Commit 22c019c
- **Time**: Mon Aug 31 20:32:30 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(api): add integration tests for /api/messages routes


A	src/app/api/messages/id.route.test.ts
A	src/app/api/messages/messages.route.test.ts

### Commit 133e7dd
- **Time**: Mon Aug 31 20:35:22 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(forum): add unit tests for forum server module (create/edit/delete replies, topic create, reactions, follows)


A	src/server/forum/forum.test.ts

### Commit 2349534
- **Time**: Mon Aug 31 20:37:43 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(api): add integration tests for forum API routes


A	src/app/api/forum/forum.api.test.ts

### Commit bf8ce78
- **Time**: Mon Aug 31 20:44:14 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test: configure vitest for TSX/jsdom and add UserPicker component test


A	src/components/userPicker/UserPicker.test.tsx
M	tsconfig.json
M	vitest.config.ts
A	vitest.setup.ts

### Commit e48642e
- **Time**: Mon Aug 31 20:46:50 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(forum): add smoke edgecase tests skeleton for forum module (tests-forum-edgecases)


A	src/server/forum/forum.edgecases.test.ts

### Commit 1d0e009
- **Time**: Mon Aug 31 20:49:20 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(forum): add replies edge-case tests (validation + admin permissions)


A	src/server/forum/forum.replies.edgecases.test.ts

### Commit 77ab388
- **Time**: Mon Aug 31 20:50:30 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(forum): add interactions tests for reactions and follows


A	src/server/forum/forum.interactions.test.ts

### Commit 72837b2
- **Time**: Mon Aug 31 20:53:02 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
refactor(forum): extract mapping helpers to normalize topic/reply/reaction shapes (forum-fetch-refactor)


M	src/server/forum/forum.ts

### Commit 6c262d9
- **Time**: Mon Aug 31 20:56:16 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(messaging): improve UserPicker keyboard navigation, aria attributes, and focus behavior; keep avatar as Next/Image


M	src/components/userPicker/UserPicker.tsx

### Commit b30ab32
- **Time**: Mon Aug 31 21:11:41 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(storage): add local storage adapter and uploads API (file-uploads)


A	src/app/api/uploads/route.ts
A	src/server/storage/storage.ts

### Commit 71aa7ab
- **Time**: Mon Aug 31 21:13:43 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(profile): persist avatar URL on upload save when attachTo.type='avatar'


M	src/app/api/upload/save/route.ts

### Commit b245fb9
- **Time**: Mon Aug 31 21:15:37 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(profile): add profile settings UI with avatar upload flow (client)


M	src/app/profile/settings/profile-settings/page.tsx

### Commit d5a3f2d
- **Time**: Mon Aug 31 21:17:26 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(profile): drag-and-drop avatar upload + client resize/crop and progress; add multipart upload API /api/uploads/form


A	src/app/api/uploads/form/route.ts
M	src/app/profile/settings/profile-settings/page.tsx

### Commit 2e6a585
- **Time**: Mon Aug 31 21:19:36 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(profile): add manual crop UI using react-easy-crop for avatar uploads


M	package-lock.json
M	package.json
M	src/app/profile/settings/profile-settings/page.tsx

### Commit de1e00a
- **Time**: Tue Sep 1 10:29:10 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
profile: apply crop preview, add upload validation, document implemented features

- Added explicit 'Apply crop' button that updates the preview and provides a downloadable blob\n- Prefer pre-applied blob during multipart upload\n- Added basic server-side image validation (magic-bytes + MIME) for multipart uploads\n- Created IMPLEMENTED_FEATURES.md summarizing implemented features\n\nFiles: src/app/profile/settings/profile-settings/page.tsx, src/app/api/uploads/form/route.ts, tsconfig.json, IMPLEMENTED_FEATURES.md\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	IMPLEMENTED_FEATURES.md
M	src/app/api/uploads/form/route.ts
M	src/app/profile/settings/profile-settings/page.tsx
M	tsconfig.json

### Commit 5beeec2
- **Time**: Tue Sep 1 10:45:50 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat: persist profile settings and finish forum refactor cleanup

- Persist theme/timezone/email notification preferences per user via local JSON-backed storage
- Enable page-level editing for profile preferences and save API integration
- Reuse shared forum topic include config to reduce query duplication and keep fetch logic consistent
- Update the implemented feature summary log

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	src/app/api/profile/settings/route.ts
M	src/app/profile/settings/profile-settings/page.tsx
M	src/server/forum/forum.ts

### Commit f3b55cb
- **Time**: Tue Sep 1 10:52:33 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat: add admin category management foundation

- Add access-controlled admin category API routes for listing and creating forum categories
- Add admin categories page to create categories and subcategories under each category
- Update the feature summary and current plan docs

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
A	plan.md
A	src/app/admin/categories/page.tsx
A	src/app/api/admin/categories/[categoryId]/subcategories/route.ts
A	src/app/api/admin/categories/route.ts

### Commit 1522643
- **Time**: Tue Sep 1 10:59:49 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(admin): add role and reaction management

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
A	src/app/admin/reactions/page.tsx
A	src/app/admin/roles/page.tsx
A	src/app/api/admin/reactions/route.ts
A	src/app/api/admin/roles/route.ts

### Commit 5632b96
- **Time**: Tue Sep 1 12:18:50 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix: align jsdom with DOMPurify and refresh feature summary

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	eslint.config.js
M	package-lock.json
M	package.json
M	plan.md
M	src/app/api/profile/settings/route.ts
M	src/app/profile/settings/profile-settings/page.tsx
A	src/client/bootstrap.ts
M	src/client/modal.tsx
M	src/client/modalUtils.tsx
M	src/components/loginForm.tsx
M	src/components/loginModal.tsx
M	src/components/userPicker/UserPicker.tsx
M	src/server/forum/forum.ts
M	src/server/types/forum.ts

### Commit 8b20c8d
- **Time**: Tue Sep 1 12:23:48 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: synchronize documentation with latest implementations (2026-09-01)

This commit updates project documentation and tracking files to reflect
the current state of implementations as of 2026-09-01.

## FILES.md Updates

- Refreshed complete file tree with current modification timestamps
- Reorganized with clearer section hierarchy (API routes, pages, components, server logic)
- Added 'Recently Modified Files' section highlighting changes from 2026-08-28 onwards
- Documented key new implementations:
  * Admin Panel (categories, reactions, roles management)
  * Global Modal Manager infrastructure
  * Storage adapter for file uploads
  * UserPicker component for user selection
  * Profile settings API route

## TO_DO.md Progress Updates

Updated completion percentages to reflect current implementation status:

- Forum Core Mutations (40% -> 60%): Topic and reply creation/editing/deletion
  APIs fully implemented with server logic and UI components

- Forum Interactions & Follows (10% -> 35%): Reaction toggle and follow APIs
  exist; UI components pending

- Private Messaging (25% -> 50%): Core module, API routes, and pages
  implemented; refinements pending

- Admin Panel & Moderation Tools (0% -> 45%): Foundation complete with
  dashboard, category management, reaction/role management pages and APIs

- File Uploads & CDN (60% -> 70%): Storage adapter added; local file
  persistence working; database integration pending

## Key Implementations Identified

Admin Infrastructure (NEW - 2026-09-01):
- Admin dashboard and management pages
- Admin API routes for categories, reactions, roles
- Role-based access control via getCurrentUser() checks

Global Modal Manager (COMPLETED - 2026-09-01):
- Complete refactoring with React Context in modalUtils.tsx
- Modal component wrapper and Bootstrap integration

File Storage (NEW - 2026-08-31):
- Local storage adapter implementation
- File upload form and management APIs

Component Improvements (2026-09-01):
- UserPicker component for user search/selection
- LoginForm and LoginModal refactored for centralized modals

Server Logic (2026-09-01):
- Enhanced forum.ts with complete mutation operations
- Updated forum type definitions

Documentation Status:
- DOC.md Section 12.2 contains comprehensive Modal Manager documentation
- All changes align with existing code patterns and AGENTS.md guidelines


M	FILES.md
M	TO_DO.md

### Commit 33533d2
- **Time**: Tue Sep 1 12:25:04 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Commit


M	COMMITS.md

### Commit 6f6a42f
- **Time**: Tue Sep 1 22:27:08 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
plan: prioritize TO_DO backlog and test forum topic actions

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
A	PLAN_FOR_TO_DO.md
M	plan.md
A	src/app/forum/topic/[id]/page.test.tsx
M	vitest.config.ts

### Commit 3b628b4
- **Time**: Tue Sep 1 22:42:10 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix: align jsdom with DOMPurify and expand tests

This resolves the server-side sanitizer runtime issue by pinning jsdom to the version expected by isomorphic-dompurify. It also adds targeted coverage for forum interaction logic and admin category authorization so the backlog stays safely validated.


M	package-lock.json
M	package.json
M	plan.md
A	src/app/api/admin/categories/admin.categories.test.ts
M	src/server/forum/forum.test.ts

### Commit 555d27a
- **Time**: Tue Sep 1 22:56:40 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test: add profile settings route coverage

Lock in the authenticated and unauthenticated profile settings API contract with coverage for defaults, payload validation, and persisted updates while the backlog continues.


M	plan.md
A	src/app/api/profile/settings/route.test.ts

### Commit f7f3d0d
- **Time**: Tue Sep 1 23:01:17 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(admin): add category edit and delete controls

This completes the remaining admin moderation workflow for forum categories and subcategories by adding rename and delete actions with guard rails that block deleting non-empty collections. The UI now stays in sync with the API without broadening the change beyond the category management flow.


M	plan.md
M	src/app/admin/categories/page.tsx
M	src/app/api/admin/categories/[categoryId]/subcategories/route.ts
M	src/app/api/admin/categories/route.ts

### Commit 085feaf
- **Time**: Tue Sep 1 23:04:35 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix: harden upload metadata persistence


M	src/app/api/uploads/form/route.ts
M	src/app/api/uploads/route.ts
A	src/server/storage/uploadMetadata.ts

### Commit 144d7e6
- **Time**: Tue Sep 1 23:16:20 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: refresh agent guidance and backlog tracking

Update the agent and documentation workflows to reflect the project’s active backlog, roadmap, and progress tracking files. This keeps the repo guidance aligned with the real implementation state, the documentation standards, and the current session’s feature log.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	AGENTS.md
M	DOC_AGENT.md
M	FILES.md
M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md

### Commit 2c2ae00
- **Time**: Wed Sep 2 23:41:55 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(messaging): improve compose and thread UX

Use the shared modal manager for composing messages, improve inbox empty-state guidance, and refresh thread replies immediately after submission.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/messages/[id]/page.tsx
M	src/app/messages/page.tsx
M	src/components/messageReplyForm.tsx

### Commit d218d75
- **Time**: Wed Sep 2 23:42:59 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(admin): improve role and reaction form UX

Add accessible boolean switches, clear empty states, and reliable submit feedback to the admin role and reaction management screens.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/admin/reactions/page.tsx
M	src/app/admin/roles/page.tsx

### Commit e99f98d
- **Time**: Wed Sep 2 23:43:53 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): add overview activity cards

Replace the dashboard overview placeholder with typed community statistics cards and explicit loading failure feedback.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/dashboard/overview/page.tsx

### Commit 45c7884
- **Time**: Wed Sep 2 23:46:07 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(clans): add public clan viewer

Add a responsive clan browser backed by the existing clan API, expose it in dashboard navigation, and synchronize the backlog roadmap with the completed UI milestone.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md
A	src/app/clans/page.tsx
M	src/app/dashboard/layout.tsx

### Commit a8f7c47
- **Time**: Wed Sep 2 23:48:17 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(profile): add Minecraft verification flow

Add authenticated verification-code generation and a profile settings screen for viewing and regenerating Minecraft account verification codes.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md
A	src/app/api/profile/verification/route.ts
M	src/app/profile/settings/layout.tsx
A	src/app/profile/settings/verification/page.tsx

### Commit 6636d8d
- **Time**: Wed Sep 2 23:49:28 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(admin): add punishment management UI

Add authenticated ban listing and creation backed by UserBan, plus responsive punishment and reports states in the dashboard.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
A	src/app/api/admin/bans/route.ts
M	src/app/dashboard/user-management/punishments/page.tsx
M	src/app/dashboard/user-management/reports/page.tsx

### Commit 9a7a8af
- **Time**: Wed Sep 2 23:50:11 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(forum): surface subcategory loading errors

Replace the unhandled client-side fetch exception with a visible warning state and structured logging on forum subcategory pages.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/forum/subcategory/[id]/page.tsx

### Commit 9ad4bb6
- **Time**: Wed Sep 2 23:51:32 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
refactor(forum): consolidate subcategory topic loading

Derive the latest subcategory entry from the topics already loaded in the primary query and preserve the existing response shape.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	src/server/forum/forum.ts

### Commit 7e34eef
- **Time**: Wed Sep 2 23:52:13 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
refactor(forum): remove obsolete latest topic endpoint

Retire the unused endpoint now that subcategory responses include the latest entry from their primary query.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
D	src/app/api/forum/latest-topic/[id]/route.ts

### Commit 3f2943e
- **Time**: Wed Sep 2 23:55:48 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(storage): persist upload metadata in Prisma

Replace the temporary JSON upload index with a durable UploadMetadata model and deployment migration while preserving attachment targets and owner filtering.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md
A	prisma/migrations/20260902215000_add_upload_metadata/migration.sql
M	prisma/schema.prisma
M	src/server/storage/uploadMetadata.ts

### Commit 05749c1
- **Time**: Wed Sep 2 23:56:19 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: document upload metadata migration

Describe the UploadMetadata model, deployment migration, and the safety rule against resetting drifted databases.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	DOC.md

### Commit 8c9bf4b
- **Time**: Wed Sep 2 23:59:00 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(storage): cover upload metadata persistence

Verify Prisma metadata mapping, attachment fields, and owner-filtered listing behavior.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/server/storage/uploadMetadata.test.ts

### Commit 10f921d
- **Time**: Thu Sep 3 00:00:32 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(admin): cover role and reaction APIs

Verify team authorization, role defaults, and reaction payload validation.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/app/api/admin/reactions/route.test.ts
A	src/app/api/admin/roles/route.test.ts

### Commit 61f6172
- **Time**: Thu Sep 3 00:01:21 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(clan): cover clan data retrieval

Verify clan queries return typed data and surface database failures.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/server/clan/clan.test.ts

### Commit c6aabc6
- **Time**: Thu Sep 3 00:02:05 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: align backlog plan with MinIO storage

Track completed test coverage and remove S3 adapter switching from the remaining plan because MinIO uses the existing S3-compatible client.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	plan.md

### Commit 65dcac2
- **Time**: Thu Sep 3 00:06:09 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(profile): restore MinIO avatar uploads

Use the existing pre-signed MinIO upload flow for avatars instead of the local multipart endpoint, then persist the returned object key and URL.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/profile/settings/profile-settings/page.tsx

### Commit cb16811
- **Time**: Thu Sep 3 00:08:53 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(images): allow CDN avatar hostname

Configure Next Image to load avatar URLs served from cdn.waleed-bakri.com.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	next.config.js

### Commit 5b98b46
- **Time**: Thu Sep 3 00:14:53 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: synchronize project documentation and backlog status

- Refresh source and Prisma file inventory
- Document current upload, messaging, admin, and forum APIs
- Mark verified forum, messaging, clan, and refactor work complete
- Update execution plan and implementation log


M	DOC.md
M	FILES.md
M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	public/uploads/1788386686699-6q451f-Screenshot-2026-09-03-000330.png
A	public/uploads/1788386711822-ya2qfi-Screenshot-2026-09-03-000330.png
M	src/app/api/forum/topic/[id]/react/route.ts
M	src/app/profile/settings/profile-settings/page.tsx

### Commit 1a8a059
- **Time**: Thu Sep 3 09:53:08 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(upload): use MinIO direct uploads only

Remove filesystem upload handlers and document the pre-signed browser-to-bucket flow used by avatar and upload components.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	DOC.md
M	TO_DO.md
D	src/app/api/uploads/form/route.ts
D	src/app/api/uploads/route.ts
D	src/server/storage/storage.ts

### Commit fb50a5a
- **Time**: Thu Sep 3 09:55:07 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): add live analytics page

Expose community metrics and engagement ratios through a dedicated dashboard analytics view backed by the existing stats endpoint.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md
A	src/app/dashboard/analytics/page.tsx
M	src/app/dashboard/layout.tsx

### Commit 4e86cf6
- **Time**: Thu Sep 3 09:56:46 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(profile): render profile wall posts

Return mapped wall-post markup so Prisma-loaded profile wall entries appear on public profiles.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md
M	src/app/profile/[id]/page.tsx

### Commit 928b947
- **Time**: Thu Sep 3 10:01:48 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(profile): add compact layout preference

Persist and expose a compact-layout setting alongside existing profile preferences.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md
M	src/app/api/profile/settings/route.ts
M	src/app/profile/settings/profile-settings/page.tsx

### Commit ce3ed7b
- **Time**: Thu Sep 3 10:05:29 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(moderation): add forum report workflow

Persist topic and reply reports, expose authenticated submissions, and provide moderator review actions in the dashboard.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md
A	prisma/migrations/20260903093000_add_forum_reports/migration.sql
M	prisma/schema.prisma
A	src/app/api/reports/route.ts
M	src/app/dashboard/user-management/reports/page.tsx
M	src/app/forum/topic/[id]/page.tsx

### Commit a3bdbd8
- **Time**: Thu Sep 3 10:31:43 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(messaging): cover compose validation

Verify message compose accepts valid input and rejects invalid recipients and titles.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/lib/schemas/messagingSchemas.test.ts

### Commit 59702b0
- **Time**: Thu Sep 3 10:36:14 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: synchronize implementation tracking

- Document ForumReport moderation and profile preferences
- Mark completed backlog items and update roadmap status
- Refresh source and Prisma file inventory
- Record documentation-agent execution


M	DOC.md
M	FILES.md
M	IMPLEMENTED_FEATURES.md
M	PLAN_FOR_TO_DO.md
M	TO_DO.md
A	data/profile-settings/27.json
M	plan.md
M	prisma/seed.ts

### Commit a63d654
- **Time**: Thu Sep 3 22:19:08 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): implement management surfaces

Add Bootstrap dashboard sections, canonical profile-settings messaging routes, persisted announcements and forum labels, and synchronized implementation tracking.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	prisma/migrations/20260903221500_add_announcements/migration.sql
A	prisma/migrations/20260903223000_add_forum_labels/migration.sql
M	prisma/schema.prisma
M	prisma/seed.ts
A	resolved_to_do_v1_20260309.md
A	src/app/api/dashboard/announcements/route.ts
A	src/app/api/dashboard/forum/labels/route.ts
M	src/app/dashboard/announcements/page.tsx
M	src/app/dashboard/configuration/general/page.tsx
M	src/app/dashboard/configuration/navigation/page.tsx
M	src/app/dashboard/configuration/privacy/page.tsx
M	src/app/dashboard/configuration/reactions/page.tsx
M	src/app/dashboard/configuration/registration/page.tsx
M	src/app/dashboard/forum/forums/page.tsx
M	src/app/dashboard/forum/labels/page.tsx
M	src/app/dashboard/forum/settings/page.tsx
M	src/app/dashboard/groups/page.tsx
M	src/app/dashboard/page.tsx
M	src/app/dashboard/settings/page.tsx
M	src/app/dashboard/store/configuration/page.tsx
M	src/app/dashboard/store/coupons/page.tsx
M	src/app/dashboard/store/payments/page.tsx
M	src/app/dashboard/store/products/page.tsx
M	src/app/dashboard/store/sales/page.tsx
M	src/app/dashboard/store/subscriptions/page.tsx
M	src/app/dashboard/user-management/users/page.tsx
D	src/app/messages/[id]/page.tsx
D	src/app/messages/page.tsx
M	src/app/profile/settings/messaging/[id]/page.tsx
M	src/app/profile/settings/messaging/page.tsx
A	src/components/dashboard/DashboardSection.tsx
A	src/components/dashboard/DashboardUsers.tsx
A	src/components/dashboard/StoreSection.tsx
M	src/styles/theme/theme-dark.css
M	src/styles/theme/theme.css

### Commit 8164770
- **Time**: Thu Sep 3 22:20:59 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: normalize implemented feature entries

Rewrite the latest implementation cycle as numbered feature records with validation and key-file references. Preserve the unrelated forum page worktree change.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md

### Commit 329c60c
- **Time**: Thu Sep 3 22:26:03 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): persist community configuration

Add authorized configuration storage for community identity, registration controls, privacy policy, and terms of service with a Bootstrap management form and deployed Prisma migration.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	prisma/migrations/20260903224500_add_dashboard_configuration/migration.sql
M	prisma/schema.prisma
A	src/app/api/dashboard/configuration/route.ts
M	src/app/dashboard/configuration/general/page.tsx

### Commit a43e341
- **Time**: Thu Sep 3 22:27:51 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(ui): align dashboard surfaces with bootstrap

Replace unsupported Bootstrap utility classes, improve messaging loading and error semantics, and standardize responsive UserPicker layout and accessible labels.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
M	src/app/dashboard/user-management/reports/page.tsx
M	src/app/profile/settings/messaging/[id]/page.tsx
M	src/app/profile/settings/messaging/page.tsx
M	src/components/dashboard/DashboardSection.tsx
M	src/components/messageReplyForm.tsx
M	src/components/userPicker/UserPicker.tsx

### Commit 8d3f44e
- **Time**: Thu Sep 3 22:29:09 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): persist forum settings

Add authorized Bootstrap controls for topic creation, replies, and moderation approval using the shared dashboard configuration API.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
M	src/app/api/dashboard/configuration/route.ts
M	src/app/dashboard/forum/settings/page.tsx

### Commit ca12ff7
- **Time**: Thu Sep 3 22:30:23 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): manage navigation links

Add authorized navigation create, list, and delete operations backed by ForumNavigation with a Bootstrap management form.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	src/app/api/dashboard/configuration/navigation/route.ts
M	src/app/dashboard/configuration/navigation/page.tsx

### Commit e844074
- **Time**: Thu Sep 3 22:31:50 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
Edited some things, removed NSFW content uploaded by intruder


D	public/uploads/1788386686699-6q451f-Screenshot-2026-09-03-000330.png
D	public/uploads/1788386711822-ya2qfi-Screenshot-2026-09-03-000330.png
M	src/app/forum/topic/[id]/page.tsx

### Commit cb61c5b
- **Time**: Fri Sep 4 11:23:12 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): expose group management

Route the existing role and group management workflow through the permission-gated dashboard surface without duplicating administration APIs.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
M	src/app/dashboard/groups/page.tsx

### Commit 2d54f81
- **Time**: Fri Sep 4 11:25:34 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(dashboard): improve user management search

Debounce and cancel user-directory requests, expose clear loading and error states, and use framework-native profile links in the dashboard user surface.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
M	src/components/dashboard/DashboardUsers.tsx

### Commit 3db8388
- **Time**: Fri Sep 4 11:26:32 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(dashboard): harden report moderation

Use the shared dashboard permission shell and add explicit loading, empty, error, and disabled-action states to report moderation.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
M	src/app/dashboard/user-management/reports/page.tsx

### Commit 5891870
- **Time**: Fri Sep 4 11:28:28 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record dashboard edited files

Complete the numbered implementation entries for dashboard forum settings, navigation, groups, users, and report moderation with all edited file references.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md

### Commit 138fd4a
- **Time**: Fri Sep 4 11:29:25 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(dashboard): harden punishment management

Use the shared dashboard shell and add explicit loading, empty, validation, error, and in-flight submission states to Minecraft ban management.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
M	src/app/dashboard/user-management/punishments/page.tsx

### Commit 284e6ef
- **Time**: Sun Sep 6 00:20:30 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): add policy settings

Replace privacy, terms, and registration placeholders with Bootstrap forms backed by the authorized configuration API while keeping store work out of scope.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
M	src/app/dashboard/configuration/privacy/page.tsx
M	src/app/dashboard/configuration/registration/page.tsx

### Commit 9d73cc0
- **Time**: Sun Sep 6 00:33:16 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(announcements): publish dashboard announcements

Add optional MinIO-backed announcement images, public list and detail pages, and shared landing-page rendering from published records.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	prisma/migrations/20260906003000_add_announcement_image/migration.sql
M	prisma/schema.prisma
A	src/app/announcements/[id]/page.tsx
A	src/app/announcements/page.tsx
M	src/app/api/dashboard/announcements/route.ts
M	src/app/dashboard/announcements/page.tsx
M	src/app/page.tsx
A	src/components/announcement/AnnouncementCard.tsx
A	src/server/announcements/announcements.ts

### Commit 42d6bcc
- **Time**: Tue Sep 8 00:05:23 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(forum): enforce dashboard creation settings

Read persisted forum configuration before topic and reply creation, return explicit forbidden errors when mutations are disabled, and update forum test mocks.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	src/server/forum/forum.test.ts
M	src/server/forum/forum.ts

### Commit 32ff6b2
- **Time**: Tue Sep 8 00:06:19 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(auth): enforce registration setting

Reject sign-up requests when dashboard registration is disabled so the persisted setting applies at the server boundary.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	src/server/auth/actions/signUp.ts

### Commit 3be2e9b
- **Time**: Tue Sep 8 00:27:12 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(policies): render public policy content

Read privacy policy and terms from dashboard configuration on the public rules page and preserve truthful empty states.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	src/app/rules/page.tsx

### Commit c222bb8
- **Time**: Tue Sep 8 00:27:54 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs(plan): track runtime enforcement progress

Record completed forum, registration, and public policy enforcement and keep the remaining non-store dashboard work explicit.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	plan.md

### Commit bb83164
- **Time**: Tue Sep 8 20:04:42 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(forum): attach labels to topics

Persist managed forum labels on topic creation, expose public label reads for the topic form, and render selected labels on topic pages.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	prisma/migrations/20260908201500_add_forum_topic_labels/migration.sql
M	prisma/schema.prisma
M	src/app/api/dashboard/forum/labels/route.ts
M	src/app/forum/topic/[id]/page.tsx
M	src/components/topicCreationForm.tsx
M	src/lib/schemas/topicSchemas.ts
M	src/server/forum/forum.ts
M	src/server/types/forum.ts

### Commit 68c4081
- **Time**: Tue Sep 8 20:05:26 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): move reaction management

Replace the dashboard reaction re-export with a permission-gated Bootstrap management surface backed by the existing authorized API.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	src/app/dashboard/configuration/reactions/page.tsx

### Commit c50b5bc
- **Time**: Tue Sep 8 20:06:20 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(messaging): surface inbox error states

Add retryable inbox and thread failures, preserve empty states, and mark unread conversations in the canonical profile-settings messaging UI.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	src/app/profile/settings/messaging/[id]/page.tsx
M	src/app/profile/settings/messaging/page.tsx

### Commit 0cebcd5
- **Time**: Tue Sep 8 20:10:00 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs(plan): record dashboard and messaging work

Track the completed native reaction configuration and messaging UX hardening in the active implementation plan.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	plan.md

### Commit b450cb7
- **Time**: Tue Sep 8 20:12:20 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(forum): attach labels to replies

Persist managed labels on forum replies, expose label selection in the reply form, and render labels in public topic threads. Apply the additive reply-label migration and synchronize project tracking documentation.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	prisma/migrations/20260908203000_add_forum_reply_labels/migration.sql
M	prisma/schema.prisma
M	src/app/forum/topic/[id]/page.tsx
M	src/components/topicReplyForm.tsx
M	src/lib/schemas/topicSchemas.ts
M	src/server/forum/forum.ts
M	src/server/types/forum.ts

### Commit b0f48e0
- **Time**: Wed Sep 9 01:19:46 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(members): add public member directory

Add searchable and paginated member listing with profile links, avatars, group badges, and explicit loading, empty, and error states.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	TO_DO.md
M	plan.md
A	src/app/api/members/route.ts
A	src/app/members/page.tsx

### Commit bf22ece
- **Time**: Wed Sep 9 01:27:32 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): add forum management surface

Expose forum category and subcategory management through the dashboard route while reusing the existing authorized administration workflows and preserving the legacy admin entry point.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	src/app/admin/categories/page.tsx
M	src/app/dashboard/forum/forums/page.tsx

### Commit f62e936
- **Time**: Wed Sep 9 01:27:44 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record site structure and UI audit

Document the authenticated route inventory, shared Lithium/Bootstrap components, layout patterns, form controls, states, and deferred store surfaces for future implementation work.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	SITE_STRUCTURE_AUDIT.md

### Commit a7456df
- **Time**: Wed Sep 9 01:27:52 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: mark dashboard administration complete

Synchronize the backlog and execution snapshot with the dashboard forum, group, role, and reaction management surfaces now available through canonical dashboard routes.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md

### Commit cc86f47
- **Time**: Wed Sep 9 01:29:21 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(uploads): persist attachment metadata

Persist authenticated upload metadata for all attachment targets through the shared MinIO metadata module, retain avatar updates, and validate required upload fields at the API boundary.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md
M	src/app/api/upload/save/route.ts

### Commit adbbca6
- **Time**: Wed Sep 9 01:30:56 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: refresh source file inventory

Regenerate the required src and prisma inventory with current file timestamps so documentation and implementation tracking reflect the actual repository tree.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	FILES.md

### Commit 04938d8
- **Time**: Wed Sep 9 01:31:24 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: synchronize architecture and roadmap

Document managed forum labels, announcement records, canonical dashboard administration, profile-settings messaging, and the current non-store roadmap.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	DOC.md
M	PLAN_FOR_TO_DO.md

### Commit ddb234a
- **Time**: Wed Sep 9 01:33:54 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(dashboard): complete reaction lifecycle

Add validated reaction updates and deletions to the dashboard configuration flow while preserving the existing authorized list and create operations.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/api/admin/reactions/route.ts
M	src/app/dashboard/configuration/reactions/page.tsx

### Commit e4e721c
- **Time**: Fri Sep 11 00:50:37 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(admin): cover reaction lifecycle

Extend the reaction API coverage to validate the new update and delete operations alongside authorization and payload validation.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/api/admin/reactions/route.test.ts

### Commit 5c68833
- **Time**: Fri Sep 11 00:50:58 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record reaction verification progress

Update the execution plan and implementation history with the completed reaction lifecycle coverage and remaining non-store validation work.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md

### Commit 46cd96b
- **Time**: Fri Sep 11 00:52:03 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(dashboard): cover configuration API

Add focused authorization, default-value, validation, and persistence coverage for dashboard configuration updates.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/app/api/dashboard/configuration/route.test.ts

### Commit bcc300b
- **Time**: Fri Sep 11 00:52:26 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record configuration API coverage

Track the dashboard configuration test coverage and update the remaining validation plan.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md

### Commit f55e3eb
- **Time**: Fri Sep 11 00:53:55 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(members): cover directory API

Add focused coverage for member search, pagination normalization, and safe database error responses.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/app/api/members/route.test.ts

### Commit b54c9da
- **Time**: Fri Sep 11 00:54:14 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record members API coverage

Track the new members directory API tests in the execution plan and implementation history.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md

### Commit 6457838
- **Time**: Fri Sep 11 00:55:52 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(reports): cover moderation API

Add focused coverage for authenticated submissions, target validation, staff authorization, and report status updates.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/app/api/reports/route.test.ts

### Commit 2c44e78
- **Time**: Fri Sep 11 00:56:05 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record reports API coverage

Track the completed forum reports moderation tests in the execution plan and implementation history.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md

### Commit 56e59f0
- **Time**: Fri Sep 11 00:56:37 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
test(admin): cover bans API

Add focused coverage for staff authorization, payload validation, and normalized ban creation.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/app/api/admin/bans/route.test.ts

### Commit 552490f
- **Time**: Fri Sep 11 00:56:54 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record bans API coverage

Track the completed admin bans test coverage in the execution plan and implementation history.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md

### Commit 8fd96aa
- **Time**: Fri Sep 11 00:57:59 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: update release verification status

Record the expanded API coverage and current full-suite validation totals while keeping deferred store work unchanged.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	TO_DO.md
M	plan.md

### Commit 2e7710b
- **Time**: Fri Sep 11 01:08:40 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: add rendered site HTML reference

Record the latest authenticated public and StaffCP crawl as reusable HTML skeletons, UI class inventories, example data shapes, and route-to-template guidance while keeping store behavior deferred and credentials excluded.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
A	SITE_HTML_REFERENCE.md
M	SITE_STRUCTURE_AUDIT.md
M	TO_DO.md
M	plan.md

### Commit 8fa3d13
- **Time**: Fri Sep 11 01:11:02 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(ui): align shared pages with site reference

Apply the audited Lithium and Bootstrap structure to shared navigation, footer, announcement cards, dashboard framing, and form validation primitives used across the application.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md
M	src/client/navUtils.tsx
M	src/components/announcement/AnnouncementCard.tsx
M	src/components/footer.tsx
M	src/components/form/Select.tsx
M	src/components/form/TextArea.tsx
M	src/components/form/TextInput.tsx
M	src/components/navbar/AuthMenu.tsx
M	src/components/navbar/MainNavigation.tsx

### Commit bc4f643
- **Time**: Fri Sep 11 01:11:43 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(forum): align index with site templates

Apply the audited forum card, responsive subcategory, search, and feedback-state structures to the forum index and reusable category components.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md
M	src/app/forum/page.tsx
M	src/components/forum/ForumCategoryItem.tsx
M	src/components/forum/ForumSubcategoryItem.tsx

### Commit 245dfe8
- **Time**: Fri Sep 11 01:12:38 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(profile): align member surfaces with site templates

Apply the audited content, card, badge, alert, and profile utility patterns to public members and profile surfaces.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md
M	src/app/members/page.tsx
M	src/app/profile/[id]/page.tsx
M	src/components/profileBar.tsx

### Commit 091424a
- **Time**: Fri Sep 11 01:14:55 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
feat(auth): align forms with site templates

Apply the audited authentication card, form-group, alert, and action patterns to login and registration pages while correcting the registration success branch.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md
M	src/app/login/page.tsx
M	src/app/register/page.tsx
M	src/components/loginForm.tsx

### Commit 076c779
- **Time**: Fri Sep 11 01:16:26 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(ui): restore established page layouts

Rollback the over-broad visual parity changes and restore the existing forum, category, subcategory, dashboard shell, profile, authentication, navigation, footer, and form markup that was already working. Keep the rendered-site audit documentation for future targeted parity work.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/forum/page.tsx
M	src/app/login/page.tsx
M	src/app/members/page.tsx
M	src/app/profile/[id]/page.tsx
M	src/app/register/page.tsx
M	src/client/navUtils.tsx
M	src/components/announcement/AnnouncementCard.tsx
M	src/components/footer.tsx
M	src/components/form/Select.tsx
M	src/components/form/TextArea.tsx
M	src/components/form/TextInput.tsx
M	src/components/forum/ForumCategoryItem.tsx
M	src/components/forum/ForumSubcategoryItem.tsx
M	src/components/loginForm.tsx
M	src/components/navbar/AuthMenu.tsx
M	src/components/navbar/MainNavigation.tsx
M	src/components/profileBar.tsx

### Commit e45d859
- **Time**: Fri Sep 11 01:16:44 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record layout parity rollback

Document that the broad visual parity pass was reverted to preserve established forum, dashboard, profile, and authentication layouts.\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md
M	plan.md

### Commit 4fc6174
- **Time**: Wed Sep 30 00:23:16 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(messaging): validate API payloads at route boundaries

Use the existing messaging schemas before invoking server services and reject non-positive or non-integer thread IDs. Add focused tests for invalid create and reply requests.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/api/messages/[id]/route.ts
M	src/app/api/messages/id.route.test.ts
M	src/app/api/messages/messages.route.test.ts
M	src/app/api/messages/route.ts

### Commit ada9b7b
- **Time**: Wed Sep 30 00:24:49 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(reports): validate moderation payloads

Apply strict Zod schemas to report submissions and status updates so invalid targets and statuses are rejected before database operations.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/api/reports/route.test.ts
M	src/app/api/reports/route.ts

### Commit 43c9e8d
- **Time**: Wed Sep 30 00:26:11 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record messaging and report validation

Document the two completed non-store API validation slices, their focused coverage, validation status, and commit references.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md

### Commit 6eef852
- **Time**: Wed Sep 30 00:30:54 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record successful release validation

Update the implementation log with the passing full Vitest suite, Prisma validation, type checks, and production build after the transient test timeout cleared.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md

### Commit 403fbf2
- **Time**: Mon Oct 12 22:53:52 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(dashboard): validate announcement and label payloads

Protect dashboard management handlers with strict request schemas and staff authorization, with focused regression coverage.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


A	src/app/api/dashboard/announcements/route.test.ts
M	src/app/api/dashboard/announcements/route.ts
A	src/app/api/dashboard/forum/labels/route.test.ts
M	src/app/api/dashboard/forum/labels/route.ts

### Commit b4e5f61
- **Time**: Mon Oct 12 22:53:52 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record dashboard contract validation

Document the dashboard announcement and forum-label API validation slice and its test coverage.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md

### Commit fc82bf5
- **Time**: Mon Oct 12 22:54:38 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(admin): validate role creation payloads

Use a strict role schema at the admin API boundary and reject malformed numeric fields before database writes.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/api/admin/roles/route.test.ts
M	src/app/api/admin/roles/route.ts

### Commit 2de9411
- **Time**: Mon Oct 12 22:54:38 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record admin role validation

Document the admin role API validation slice and its focused coverage.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md

### Commit 4014121
- **Time**: Mon Oct 12 22:55:42 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
fix(admin): validate ban payloads

Apply strict schema validation to ban creation and reject malformed fields before database writes.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	src/app/api/admin/bans/route.test.ts
M	src/app/api/admin/bans/route.ts

### Commit 16deba2
- **Time**: Mon Oct 12 22:55:42 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: record admin bans validation

Document the admin bans API validation slice and focused test coverage.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	IMPLEMENTED_FEATURES.md

### Commit a200254
- **Time**: Mon Oct 12 23:01:43 2026 +0200
- **Committer**: Waleed Bakri
- **Message**: 
docs: synchronize project documentation pipelines

Regenerate FILES.md from the src/ and prisma/ trees with current timestamps.

Reconcile DOC.md, TO_DO.md, PLAN_FOR_TO_DO.md, plan.md, and IMPLEMENTED_FEATURES.md with verified members, dashboard, messaging, labels, announcements, and upload behavior.

Record deferred store persistence and remaining release validation.

Include the existing next.config.js image-domain change currently present in the worktree.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>


M	DOC.md
M	FILES.md
M	IMPLEMENTED_FEATURES.md
M	PLAN_FOR_TO_DO.md
M	TO_DO.md
M	next.config.js
M	plan.md
