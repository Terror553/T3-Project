# Project Files

This file contains a tree of all files and folders in the project, along with their last modified date.

src
|____styles
| |____bootstrap
| | |____bootstrap.min.css
| |____cookies
| | |____cookieconsent.min.css
| |____theme
| | |____theme-dark.css
| | |____theme.css
| |____fontawesome-free
| | |____webfonts
| | | |____fa-regular-400.ttf
| | | |____fa-solid-900.woff2
| | | |____fa-brands-400.woff2
| | | |____fa-v4compatibility.woff2
| | | |____fa-v4compatibility.ttf
| | | |____fa-solid-900.ttf
| | | |____fa-regular-400.woff2
| | | |____fa-brands-400.ttf
| | |____all.min.css
| |____toastr
| | |____toastr.min.css
| |____fonts
| | |____css.css
| | |____webfonts
| | | |____fa-montserrat-200.ttf
| | | |____fa-montserrat-300.ttf
| | | |____fa-montserrat-900.ttf
| | | |____fa-montserrat-500.ttf
| | | |____fa-montserrat-800.ttf
| | | |____fa-montserrat-400.ttf
| | | |____fa-montserrat-600.ttf
| | | |____fa-montserrat-700.ttf
| |____prism
| | |____prism_light_default.css
|____global.d.ts
|____client
| |____navUtils.tsx
| |____modalUtils.tsx
| |____theme.ts
| |____modal.tsx
| |____notification.tsx
| |____user.tsx
|____lib
| |____sanitize.ts
| |____schemas
| | |____topicSchemas.ts
| | |____messageSchema.ts
| | |____loginSchema.ts
| |____useFormManager.ts
|____app
| |____dashboard
| | |____page.tsx
| | |____user-management
| | | |____punishments
| | | | |____page.tsx
| | | |____users
| | | | |____page.tsx
| | | |____reports
| | | | |____page.tsx
| | |____groups
| | | |____page.tsx
| | |____configuration
| | | |____privacy
| | | | |____page.tsx
| | | |____registration
| | | | |____page.tsx
| | | |____navigation
| | | | |____page.tsx
| | | |____reactions
| | | | |____page.tsx
| | | |____general
| | | | |____page.tsx
| | |____overview
| | | |____page.tsx
| | |____store
| | | |____products
| | | | |____page.tsx
| | | |____subscriptions
| | | | |____page.tsx
| | | |____sales
| | | | |____page.tsx
| | | |____coupons
| | | | |____page.tsx
| | | |____configuration
| | | | |____page.tsx
| | | |____payments
| | | | |____page.tsx
| | |____announcements
| | | |____page.tsx
| | |____settings
| | | |____page.tsx
| | |____layout.tsx
| | |____forum
| | | |____labels
| | | | |____page.tsx
| | | |____forums
| | | | |____page.tsx
| | | |____settings
| | | | |____page.tsx
| |____rules
| | |____page.tsx
| |____page.tsx
| |____login
| | |____page.tsx
| |____register
| | |____page.tsx
| |____api
| | |____auth
| | | |____user
| | | | |____route.ts
| | | | |____[id]
| | | | | |____route.ts
| | | |____navigation
| | | | |____route.ts
| | |____user
| | | |____messages
| | | | |____route.ts
| | | | |____[id]
| | | | | |____route.ts
| | |____wiki
| | | |____route.ts
| | |____upload
| | | |____route.ts
| | |____forum
| | | |____route.ts
| | | |____topic
| | | | |____[id]
| | | | | |____route.ts
| | | |____latest-topic
| | | | |____[id]
| | | | | |____route.ts
| | | |____subcategory
| | | | |____route.ts
| | | | |____[id]
| | | | | |____route.ts
| | | |____category
| | | | |____route.ts
| |____wiki
| | |____page.tsx
| |____profile
| | |____page.tsx
| | |____[id]
| | | |____page.tsx
| | |____settings
| | | |____messaging
| | | | |____page.tsx
| | | | |____[id]
| | | | | |____page.tsx
| | | |____alerts
| | | | |____page.tsx
| | | |____change-password
| | | | |____page.tsx
| | | |____followed-topics
| | | | |____page.tsx
| | | |____overview
| | | | |____page.tsx
| | | |____profile-settings
| | | | |____page.tsx
| | | |____connections
| | | | |____page.tsx
| | | |____layout.tsx
| |____layout.tsx
| |____forum
| | |____page.tsx
| | |____topic
| | | |____new
| | | | |____page.tsx
| | | |____[id]
| | | | |____page.tsx
| | | |____add
| | | | |____page.tsx
| | |____subcategory
| | | |____[id]
| | | | |____page.tsx
|____hooks
| |____useForum.ts
|____env.js
|____components
| |____navbar
| | |____AuthMenu.tsx
| | |____MobileNavigation.tsx
| | |____index.ts
| | |____UserMenu.tsx
| | |____Navbar.tsx
| | |____MainNavigation.tsx
| | |____HeaderStatus.tsx
| |____logOut.tsx
| |____form
| | |____button.tsx
| | |____Select.tsx
| | |____TextArea.tsx
| | |____TextInput.tsx
| | |____FormProvider.tsx
| |____messageReplyForm.tsx
| |____changePasswordForm.tsx
| |____ui
| | |____Alert.tsx
| | |____Button.tsx
| | |____index.ts
| | |____Card.tsx
| |____loginForm.tsx
| |____footer.tsx
| |____wiki.tsx
| |____navbar.tsx
| |____uploads
| | |____uploadFile.tsx
| |____toastContainer.tsx
| |____editor.tsx
| |____profileBar.tsx
| |____notifcation.tsx
| |____uploadTest.tsx
| |____Test.tsx
| |____ThemeToggle.tsx
| |____forum
| | |____ForumSubcategoryItem.tsx
| | |____LastTopicInfo.tsx
| | |____index.ts
| | |____ForumCategoryItem.tsx
| |____loginModal.tsx
| |____Toast.tsx
| |____topicCreationForm.tsx
|____utils
| |____authUtils.ts
| |____apiHandler.ts
| |____errorHandler.ts
| |____dateUtils.ts
| |____styleUtils.ts
|____server
| |____auth
| | |____session.ts
| | |____actions
| | | |____signUp.ts
| | | |____signIn.ts
| | | |____changePassword.ts
| | | |____logOut.ts
| | | |____messageActions.ts
| | |____authSchemas.ts
| | |____lib.ts
| | |____utils
| | | |____getUser.ts
| | | |____getUserMessages.ts
| | | |____currentUser.ts
| | | |____passwordHasher.ts
| | | |____defaultRole.ts
| |____db.ts
| |____s3.ts
| |____types
| | |____db.ts
| | |____navigation.ts
| | |____user.ts
| | |____clan.ts
| | |____profile.ts
| | |____settings.ts
| | |____wiki.ts
| | |____minecraft.ts
| | |____verification.ts
| | |____user-data.ts
| | |____forum.ts
| | |____role.ts
| |____seed.ts.backup
| |____wiki
| | |____wiki.ts
| |____navigation
| | |____navGetter.ts
| |____forum
| | |____forum.ts
| |____utils
| | |____colorUtils.ts
| | |____forumUtils.ts
| | |____dbUtils.ts
| | |____dateUtils.ts
prisma
|____seed.ts
|____schema.prisma
|____migrations
| |____20250630130906_t3
| | |____migration.sql
| |____20260428125523_yes
| | |____migration.sql
| |____migration_lock.toml
