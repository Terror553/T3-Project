# Local Site Structure Audit

Date: 2026-09-08

This audit was collected from `http://localhost/` in an authenticated browser
session. It records the existing site as a reference template for the current
application. Credentials are intentionally not recorded.

## Crawl summary

- Public/authenticated crawl: 42 discovered same-origin URLs.
- StaffCP crawl: 120 discovered URLs, including dashboard pages and linked
  management/detail pages.
- Read-only crawl rules: action-style links such as logout, delete, update,
  enable, disable, and explicit action query URLs were not submitted.
- Store routes were observed but not treated as implementation scope.

## Shared public layout

1. Cookie consent trigger/dialog.
2. User utility bar:
   - StaffCP link for staff.
   - Messages, alerts, profile, account, and logout controls when signed in.
   - Login and register links when signed out.
3. Main navigation:
   - Brand/logo.
   - Home, Forum, Members, and Store.
   - Responsive collapsed navigation trigger.
4. Page content in a centered main container.
5. Footer:
   - Brand image.
   - About Us and Support Us text blocks.
   - Cookie Notice, Terms and Conditions, and Privacy Policy links.
   - Copyright, social links, dark-mode toggle, and language control.

## Public route inventory

| Route | Observed purpose and structure | Fields/controls |
| --- | --- | --- |
| `/` | News/announcement feed with author avatar, date block, excerpt, read-full-post link, online staff, online users, and statistics cards. | Login/register links when signed out; profile/navigation links when signed in. |
| `/login` | Standalone branded authentication page. | Email, Password, Remember me, Log In, Forgot password, Register. |
| `/register/` | Registration page discovered from navigation. | Registration fields are available when registration is enabled. |
| `/forum/` | Forum index with title, category/forum cards, search, and forum statistics. | `forum_search` text input, hidden CSRF token. |
| `/forum/view/{id}/` | Forum/category listing with breadcrumb, topic rows, pagination, and search. | Search, pagination, topic links, staff actions where authorized. |
| `/forum/topic/{id}/` | Topic thread with breadcrumb, topic/reply cards, user sidebars, metadata, reactions, pagination, and reply area. | Reply content field, search, follow/reaction controls, staff moderation controls. |
| `/forum/new/` | New-topic form scoped to a forum. | Title/content/category fields, submit/cancel controls, optional managed labels in the current app. |
| `/members/` | Intended member directory. | The current local route produced a fatal-error/debug screen instead of the directory. |
| `/profile/{username}/` | Public profile with banner/avatar, user metadata, tabs/content, and wall/activity areas. | Profile navigation and wall interaction controls when authorized. |
| `/user/` | Signed-in account overview. | Account navigation. |
| `/user/settings/` | Account settings surface. | Profile/account settings fields and save controls. |
| `/user/alerts/` | Alert list. | Alert list, read/dismiss controls. |
| `/user/messaging/` | Inbox/thread messaging surface. | Recipient/message compose fields, thread replies, pagination. |
| `/user/connections/` | Connected accounts surface. | Provider connection controls. |
| `/user/oauth/` | OAuth connection surface. | Provider authorization controls. |
| `/user/following_topics/` | Followed-topic list. | Topic navigation and unfollow controls. |
| `/user/store/` | User purchase/store history. | Store history controls. |
| `/cookies/`, `/terms/`, `/privacy/` | Legal/content pages using the shared shell. | Read-only content. |
| `/store`, `/store/category/{id}/`, `/store/checkout/` | Store landing, category, package details, and checkout flow. | Package selection, checkout, and payment controls. Store implementation is deferred. |

## StaffCP navigation and page families

The authenticated StaffCP uses a persistent dark sidebar, a top utility/header
area, a responsive sidebar toggle, a page title/breadcrumb region, and a
content panel. Forms use labeled controls, action buttons, alerts, tables, and
pagination where applicable.

### Core

- `/panel/` — dashboard summary, update notices, statistics, and quick links.
- `/panel/core/general_settings/` — general site configuration.
- `/panel/core/api/` — API configuration.
- `/panel/core/seo/` — SEO metadata.
- `/panel/core/avatars/` — avatar configuration.
- `/panel/core/profile_fields/` — custom profile fields.
- `/panel/core/debugging_and_maintenance/` — maintenance/debugging.
- `/panel/core/emails/` and `/panel/core/emails/errors/` — email configuration and errors.
- `/panel/core/navigation/` — navigation links.
- `/panel/core/privacy_and_terms/` — privacy and terms content.
- `/panel/core/queue/` — queued jobs.
- `/panel/core/reactions/` — reaction definitions.
- `/panel/core/registration/` — registration and verification controls.
- `/panel/core/social_media/` — social links.
- `/panel/core/hooks/` — webhooks.
- `/panel/core/announcements/` — announcement management.

### Integrations and layout

- `/panel/discord/` — Discord integration.
- `/panel/minecraft/` — Minecraft integration.
- `/panel/core/images/` — image management.
- `/panel/core/panel_templates/` — StaffCP templates.
- `/panel/core/templates/` — frontend templates and settings.
- `/panel/core/widgets/` — widgets.
- `/panel/core/modules/` — modules.
- `/panel/core/pages/` — custom pages.
- `/panel/core/groups/` — groups.

### User management and security

- `/panel/users/` — user list/search.
- `/panel/users/ip_lookup/` — IP lookup.
- `/panel/users/punishments/` — punishments.
- `/panel/users/reports/` — reports.
- `/panel/security/` — security controls.
- `/panel/user/{id}-{username}/` — individual user administration.

### Store

- `/panel/store/general_settings/`, `/panel/store/gateways/`,
  `/panel/store/connections/`, `/panel/store/fields/`,
  `/panel/store/actions/`, `/panel/store/products/`,
  `/panel/store/payments/`, `/panel/store/subscriptions/`,
  `/panel/store/sales/`, `/panel/store/coupons/`.
- These routes were catalogued for completeness only; store work remains
  explicitly deferred.

### Forum and members

- `/panel/forums/settings/` — forum settings.
- `/panel/forums/` — forum/category management.
- `/panel/forums/labels/` — managed forum labels.
- `/panel/members/settings/` — member module settings.
- `/panel/members/member_lists/` — member-list configuration.
- `/panel/cookies/` — cookie settings.

## Form and field conventions observed

- Text inputs use visible labels and Bootstrap-style form groups.
- Common controls include text, email, password, hidden CSRF/token, checkbox,
  textarea, select, submit, cancel, delete, and pagination buttons.
- Staff configuration pages commonly include a dark-mode hidden/checkbox field,
  save/apply controls, and inline success/error alerts.
- Forum pages consistently combine breadcrumb navigation, search, content
  cards/tables, user metadata, and action controls.
- Destructive or state-changing controls are exposed as explicit buttons or
  confirmation modal actions rather than ordinary navigation.

## Shared stylesheet and UI component catalog

The public pages and the current application use the same Lithium/Bootstrap
visual language. The main style sources are:

- `src/styles/bootstrap/bootstrap.min.css` — Bootstrap 5.0.1 primitives:
  containers, grid rows/columns, typography, buttons, forms, cards, tables,
  alerts, badges, modals, dropdowns, collapse, pagination, and responsive
  breakpoints.
- `src/styles/theme/theme.css` — Lithium template components and layout:
  public navigation, mobile off-canvas navigation, cards, forum posts,
  profile/member panels, modal styling, pagination placement, footer, and
  dashboard overrides.
- `src/styles/theme/theme-dark.css` — dark-theme variables and overrides.
- `src/styles/fontawesome-free/all.min.css` — icons used in navigation,
  metadata, actions, status indicators, and reactions.
- `src/styles/cookies/cookieconsent.min.css` and
  `src/styles/toastr/toastr.min.css` — cookie consent and notification styling.

### Navigation and shell components

- **Utility/user navbar** — `.navbar-user`, `.navbar-nav`, `.nav-link`,
  `.nav-link-icon`, `.nav-link-text`; signed-out auth links and signed-in
  dashboard/profile/messages/alerts/account menu.
- **Primary navbar** — `.navbar-default`, `.navbar-brand`,
  `.navbar-nav-container`, `.nav-link.active`, `.nav-link.highlighted`;
  active-route underline and highlighted Store link.
- **Mobile off-canvas menu** — `.oc-nav`, `.oc-nav.inverted`,
  `.oc-nav-container`, `.oc-nav-header`, `.oc-nav-items`, `.oc-nav-link`;
  opened by the hamburger and closed with an explicit close button.
- **Header status blocks** — Minecraft/Discord server status cards beside the
  logo, with icon, server name, player count, and online indicator.
- **Footer** — multi-column About, Links, Support Us, copyright, social,
  dark-mode, language, and attribution controls.

### Homepage and content components

- **Announcement/news card** — `.card-gpost`, `.card-gpost-index`,
  `.card-gpost-big`, `.card-image`, `.card-content`, `.card-header`,
  `.card-body`, `.card-footer`; optional cover image, title, body excerpt,
  author avatar, author link, and date metadata.
- **Secondary widget card** — `.card-secondary`; used for Online Staff, Online
  Users, Statistics, server status, and compact side widgets.
- **Statistics definition list** — `dl`, `dt`, and `dd` pairs for totals,
  registered users, guests, posts, and latest member.
- **Profile bar** — banner/avatar identity area with username, group/badge,
  metadata, tabs, and profile activity/wall content.
- **Empty state** — plain card/body or paragraph with explanatory text; use
  this instead of an empty blank region.

### Forum components

- **Forum category card** — `.card.card-forum` with `.card-header`, collapse
  toggle, `.collapse.show`, and nested subcategory rows.
- **Forum subcategory row** — icon/title/description, topic and post counts,
  and latest-topic/user metadata arranged in responsive columns.
- **Breadcrumb** — compact hierarchy from Forum to category/subcategory/topic.
- **Topic list row** — topic title, author/avatar, status or pinned badge,
  reply/view counts, last-post information, and pagination.
- **Forum post card** — `.card-post`, `.forum-post`, `.forum-post-sidebar`,
  `.forum-post-user-avatar`, `.forum-post-user-info`,
  `.forum-post-user-stats`, `.forum-post-main`, `.forum-post-meta`,
  `.forum-post-actions`, `.forum-post-content`, and
  `.forum-post-reactions`.
- **Label/badge** — Bootstrap `.badge` with managed label color; use compact
  inline badges on topics and replies.
- **Editor/reply form** — labeled editor/textarea, validation alert, submit
  button, optional label multi-select, and disabled in-flight state.

### Forms and controls

- **Text input** — `TextInput` renders `.form-group`, visible `.form-label`,
  `.form-control`, and an inline `.alert-danger` validation message.
- **Select** — `Select` follows the same label/control/error structure with
  generated options.
- **Rich text area** — `TextArea` wraps the shared editor and renders the same
  form-group/error pattern.
- **Buttons** — `.btn` plus `.btn-primary`, `.btn-secondary`, `.btn-success`,
  `.btn-danger`, `.btn-warning`, `.btn-info`; size modifiers `.btn-sm` and
  `.btn-lg`; use explicit disabled states during requests.
- **Button groups/actions** — `.form-actions` for aligned save/cancel or
  primary/destructive actions.
- **Checkboxes/toggles** — Bootstrap checkbox/switch controls for remember me,
  registration, verification, visibility, and theme settings.
- **Search** — compact `.form-control` input inside a form with a search icon
  or submit action; used on forum and member lists.
- **Tables/lists** — Bootstrap `.table`, responsive wrapper, striped/hover
  rows where useful, and explicit empty/loading/error rows.

### Feedback and overlays

- **Alerts** — `.alert` variants for info, success, warning, and danger;
  reserve danger for errors and permission failures.
- **Toast notifications** — fixed `.toast-container` in the top-right,
  `.toast.show`, `.toast-header`, `.toast-body`, close button, and
  `aria-live="assertive"`.
- **Modals** — `.modal`, `.modal-dialog`, `.modal-content`, `.modal-header`,
  `.modal-body`, `.modal-footer`; use for confirmation, reactions, package
  details, and secondary forms.
- **Collapse/accordion** — Bootstrap collapse for forum categories and mobile
  navigation; preserve `aria-expanded` and an accessible toggle label.
- **Cookie consent** — dedicated consent dialog with More info, Disallow, and
  Allow actions.
- **Loading state** — visible alert/status text and `aria-busy` on dashboard
  regions; do not replace content silently.
- **Error state** — inline alert with a retry/action where possible.
- **Empty state** — clear explanatory copy and next-step link/button.

### Pagination and navigation lists

- Bootstrap `.pagination`, `.page-item`, and `.page-link`, placed inside the
  relevant card body or list footer.
- Current page uses `.active`; unavailable previous/next uses `.disabled`.
- Forum pagination belongs below topic/reply lists; member/admin pagination
  belongs below tables or cards.
- Navigation lists use `.navbar-nav`, `.nav-item`, `.nav-link`, active state,
  and icon/text pairings rather than unstyled links.

### Dashboard-native components

- **Dashboard section** — `.dashboard-section` with `container-fluid`,
  title/description block, permission gate, and content children.
- **Dashboard cards/tables** — shared card, table, alert, and responsive
  Bootstrap surfaces with `var(--background-primary)`, `var(--text-primary)`,
  `var(--text-secondary)`, `var(--divider)`, and `var(--shadow-soft)`.
- **Permission gate** — loading alert while authorization is checked, danger
  alert for denied/error access, and content only after authorization.
- **Management forms** — labeled controls, validation, save/create buttons,
  delete confirmation, loading state, error alert, and empty table/card state.
- **Sidebar navigation** — grouped sections, persistent desktop sidebar,
  top toggle, responsive mobile collapse, active link, and page title.

### Current reusable React components

- `Navbar`, `AuthMenu`, `UserMenu`, `MainNavigation`, `MobileNavigation`,
  `HeaderStatus`.
- `Card`, `Button`, `Alert`, `Toast`, `ToastContainer`.
- `FormProvider`, `TextInput`, `Select`, `TextArea`, `editor`.
- `ForumCategoryItem`, `ForumSubcategoryItem`, `LastTopicInfo`.
- `AnnouncementCard`.
- `DashboardSection`, `DashboardUsers`, `StoreSection`.
- `UserPicker`, `profileBar`, `loginForm`, `messageReplyForm`,
  `topicCreationForm`, `topicReplyForm`, and upload components.

When adding a new page, prefer these components and class families over
inventing a new visual pattern. Preserve the existing Bootstrap 5.0.1
compatibility constraint and the light/dark CSS variable contract.

## Layout/template guidance for the current site

- Preserve the public header/footer shell and responsive navigation hierarchy.
- Use one reusable content container with page title, breadcrumb, content panel,
  and explicit loading/empty/error states.
- Model forum pages as the primary component reference: card-based content,
  user metadata sidebar, action row, labels, pagination, and responsive collapse.
- Model StaffCP pages as the dashboard reference: persistent sidebar, grouped
  navigation, permission-gated content, Bootstrap forms/tables, alerts, and
  mobile sidebar toggle.
- Keep store routes structurally catalogued but do not implement them until
  explicitly requested.

## Findings requiring attention

1. `/members/` currently exposes a fatal error/debug page. This should be fixed
   before using the member directory as a visual template.
2. The public site and StaffCP use separate shells; they should not be flattened
   into one navigation component.
3. Several discovered links are action/query URLs for forum moderation and store
   checkout. They were catalogued but not activated during the crawl.
