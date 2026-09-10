# Local Site Rendered HTML Reference

Date: 2026-09-11

This file is an implementation reference produced from a read-only,
authenticated crawl of `http://localhost/`. It records rendered DOM structure,
live example values, semantic elements, Bootstrap/Lithium class families, and
the template each current application route should use.

Credentials and session cookies are intentionally not recorded. Store routes
were visited for structure only and remain out of implementation scope.

## Crawl coverage

- Public shell and route families: home, login, registration, forum index,
  topic detail, members, profile, account, settings, alerts, messaging,
  connections, followed topics, legal pages, and store links.
- StaffCP shell and page families: dashboard, core configuration, forum and
  members administration, user/security administration, integrations, update,
  user detail, and store administration.
- The crawl revisited the routes listed in `SITE_STRUCTURE_AUDIT.md` and
  captured representative DOM fragments, controls, headings, forms, semantic
  element counts, and class families.

## Live example data observed

Use these only as seed/demo content or shape examples; do not hard-code them
into production UI:

- Site name: `waleed`
- Announcement title: `Welcome to NamelessMC!`
- Announcement author: `admin2`
- Announcement body includes a welcome message and Discord support link.
- Example statistics: `Total Threads 1`, `Total Posts 1`, `Users Registered 2`,
  `Online Guests 1`, `Latest Member waleed`.
- Example forum user: `waleed`
- Example group styling: inline group color and avatar image.

## Shared public shell

Observed structure:

```html
<div class="wrapper">
  <header class="header faded">
    <nav class="navbar navbar-user navbar-expand">
      <div class="container">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link">
              <span class="nav-link-icon fas"></span>
              <span class="nav-link-text">StaffCP / Log In</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="navbar navbar-default navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand">waleed</a>
        <button class="navbar-toggler"><span class="fas fa-bars"></span></button>
        <div class="navbar-collapse collapse">
          <ul class="navbar-nav navbar-nav-container">
            <li class="nav-item active"><a class="nav-link">Home</a></li>
            <li class="nav-item"><a class="nav-link">Forum</a></li>
            <li class="nav-item"><a class="nav-link">Members</a></li>
            <li class="nav-item"><a class="nav-link">Store</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="main">
    <div class="container"><!-- route content --></div>
  </main>
  <footer class="footer">
    <div class="footer-main"><!-- logo, links, about, support --></div>
    <div class="footer-extra"><!-- copyright, social, theme, language --></div>
  </footer>
</div>
```

Required behavior:

- Keep the utility bar and primary navigation as separate layers.
- Keep desktop navigation and mobile off-canvas navigation separate.
- Preserve `navbar`, `navbar-user`, `navbar-default`, `navbar-brand`,
  `navbar-toggler`, `navbar-collapse`, `nav-item`, `nav-link`, and
  `nav-link-icon` class families.
- Keep the footer as a three-column content region plus a compact footer-extra
  row.

## Home/news template

The landing page uses a two-column Bootstrap grid. The left side is the
announcement/news feed; the right side contains online staff, online users, and
statistics widgets.

```html
<div class="row">
  <div class="col-xl-9 col-lg-8">
    <div class="content">
      <div class="card card-news">
        <div class="card-header">
          <div class="card-header-icon">
            <a href="/profile/admin2/">
              <img src="..." alt="admin2">
            </a>
          </div>
          <div class="card-header-content">
            <a href="/forum/topic/.../">Welcome to NamelessMC!</a>
            <div class="card-header-meta">
              <a href="/profile/admin2/">admin2</a>
              <span>4 months ago</span>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="news-date-block">
            <div class="news-date-day">11</div>
            <div class="news-date-month">May</div>
          </div>
          <div class="post"><p>Welcome!</p></div>
        </div>
        <div class="card-footer">
          <div class="meta"><i class="fas fa-eye"></i> 2</div>
          <a class="btn btn-primary btn-sm">Read full post</a>
        </div>
      </div>
    </div>
  </div>
  <div class="col-xl-3 col-lg-4">
    <div class="widget card card-secondary">
      <div class="card-header">Online Staff</div>
      <div class="card-body"><!-- avatar/list-item rows --></div>
    </div>
    <div class="widget card card-secondary">
      <div class="card-header">Statistics</div>
      <div class="card-body">
        <dl class="pairs"><dt>Total Threads</dt><dd>1</dd></dl>
      </div>
    </div>
  </div>
</div>
```

Use the current `AnnouncementCard` component for this pattern. Preserve the
date block, author avatar, metadata, post body, view/comment metadata, and
primary read action.

## Forum index and topic templates

Forum index:

```html
<div class="container">
  <div class="content">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Forum</h1>
      <form class="form-inline"><input class="form-control" name="forum_search"></form>
    </div>
    <div class="card card-forum">
      <div class="card-header">
        <button class="btn" data-bs-toggle="collapse" aria-expanded="true">
          General
        </button>
      </div>
      <div class="collapse show">
        <div class="card-body">
          <div class="forum-subcategory-row row">
            <div class="col-md-7"><i class="fas"></i><a>Announcements</a></div>
            <div class="col-md-2">Topics / Posts</div>
            <div class="col-md-3">Latest topic and user</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Topic detail:

```html
<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item">Forum</li></ol></nav>
<div class="card card-post forum-post">
  <div class="forum-post-sidebar">
    <a class="forum-post-user-avatar"><img alt="waleed"></a>
    <div class="forum-post-user-info"><a>waleed</a><span class="badge">Member</span></div>
    <div class="forum-post-user-stats"><span>Posts</span><span>Joined</span></div>
  </div>
  <div class="forum-post-main">
    <div class="forum-post-meta">11 May 2026</div>
    <div class="forum-post-content"><p>Welcome!</p></div>
    <div class="forum-post-actions"><button class="btn btn-sm">React</button></div>
    <div class="forum-post-reactions"><span class="badge">👍 1</span></div>
  </div>
</div>
<form class="card">
  <div class="card-body">
    <label class="form-label" for="reply-content">Reply</label>
    <textarea id="reply-content" class="form-control"></textarea>
  </div>
  <div class="card-footer form-actions"><button class="btn btn-primary">Post reply</button></div>
</form>
```

Use `ForumCategoryItem`, `ForumSubcategoryItem`, `LastTopicInfo`,
`topicReplyForm`, and the existing forum post classes. Do not replace the
sidebar/main responsive collapse with a generic comment list.

## Authentication and account forms

```html
<main class="main">
  <div class="container">
    <div class="card">
      <div class="card-header"><h2>Log In</h2></div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input id="email" name="email" type="email" class="form-control">
            <div class="alert alert-danger">Validation message</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input id="password" name="password" type="password" class="form-control">
          </div>
          <div class="form-check">
            <input id="remember" class="form-check-input" type="checkbox">
            <label class="form-check-label" for="remember">Remember me</label>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" type="submit">Log In</button>
            <a class="btn btn-secondary">Register</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
```

Use visible labels, `.form-group`, `.form-label`, `.form-control`,
`.form-check`, `.form-actions`, and inline `.alert-danger`. Preserve disabled
in-flight button text and explicit empty/error states.

## Profile and member templates

- Profile uses a banner/avatar identity bar, username/group metadata, tabs,
  wall/activity content, and card sections.
- Members uses a searchable list/card grid with avatar, username, group badge,
  profile link, pagination, loading, empty, and error states.
- Use `profileBar`, `.card`, `.list`, `.list-item`, `.list-icon`,
  `.list-content`, `.badge`, `.pagination`, `.page-item`, and `.page-link`.

## StaffCP shell

```html
<div class="wrapper">
  <aside class="sidebar">
    <a class="sidebar-brand"><img alt="waleed"><span>waleed</span></a>
    <div class="sidebar-section-title">CORE</div>
    <ul class="sidebar-nav">
      <li><a class="sidebar-link active"><i class="fas fa-home"></i> Dashboard</a></li>
      <li><a class="sidebar-link"><i class="fas fa-cog"></i> Configuration</a></li>
    </ul>
  </aside>
  <div class="content-wrapper">
    <header class="topbar">
      <button class="sidebar-toggle"><i class="fas fa-bars"></i></button>
      <div class="breadcrumb">Dashboard</div>
    </header>
    <main class="main">
      <div class="container-fluid">
        <div class="dashboard-section">
          <div class="page-header"><h1>Dashboard</h1><p>Summary</p></div>
          <div class="card"><div class="card-body"><!-- page content --></div></div>
        </div>
      </div>
    </main>
  </div>
</div>
```

StaffCP page families share this shell:

- Core configuration: labeled forms, switches, save/apply buttons, inline
  success/error alerts.
- Forum administration: category tables/cards, labels, settings, pagination,
  create/edit/delete controls and confirmation dialogs.
- User/security: searchable tables, profile links, punishment/report actions,
  status badges, empty/loading/error rows.
- Integrations/layout: settings cards with explicit disabled or unavailable
  states.
- Store: catalogued only; do not implement until requested.

The current app should map this visual language to `DashboardSection`,
dashboard cards/tables, permission gates, and the existing Bootstrap theme
variables. Do not copy the reference site's server-side action URLs.

## Element and class inventory

### Global

`wrapper`, `header`, `faded`, `navbar`, `navbar-user`, `navbar-default`,
`navbar-expand`, `navbar-expand-lg`, `navbar-brand`, `navbar-toggler`,
`navbar-collapse`, `navbar-nav`, `nav-item`, `nav-link`, `nav-link-icon`,
`nav-link-text`, `main`, `container`, `container-fluid`, `row`, `col-xl-*`,
`col-lg-*`, `footer`, `footer-main`, `footer-section`, `footer-extra`,
`footer-info`, `footer-buttons`, `footer-button`.

### Content

`content`, `card`, `card-header`, `card-header-icon`, `card-header-content`,
`card-header-meta`, `card-body`, `card-footer`, `card-news`,
`card-secondary`, `widget`, `post`, `meta`, `separator`, `pairs`.

### Forum

`card-forum`, `collapse`, `breadcrumb`, `card-post`, `forum-post`,
`forum-post-sidebar`, `forum-post-user-avatar`, `forum-post-user-info`,
`forum-post-user-stats`, `forum-post-main`, `forum-post-meta`,
`forum-post-actions`, `forum-post-content`, `forum-post-reactions`.

### Forms and feedback

`form-group`, `form-label`, `form-control`, `form-check`, `form-check-input`,
`form-check-label`, `form-actions`, `btn`, `btn-primary`, `btn-secondary`,
`btn-success`, `btn-danger`, `btn-warning`, `btn-info`, `btn-sm`, `btn-lg`,
`alert`, `alert-info`, `alert-success`, `alert-warning`, `alert-danger`,
`toast-container`, `toast`, `modal`, `modal-dialog`, `modal-content`,
`modal-header`, `modal-body`, `modal-footer`.

### Lists and pagination

`list`, `list-item`, `list-icon`, `list-content`, `pagination`, `page-item`,
`page-link`, `active`, `disabled`, `badge`, `table`, `table-responsive`.

## Route-to-template mapping

| Current route family | Use this reference |
| --- | --- |
| `/` and `/announcements` | Home/news template |
| `/login`, `/register` | Authentication/account form |
| `/forum`, `/forum/subcategory/*` | Forum index/subcategory |
| `/forum/topic/*` | Topic detail/post template |
| `/members` | Profile/member template |
| `/profile/*` | Profile/member template |
| `/profile/settings/*` | Authentication/account form plus dashboard cards |
| `/rules` and legal pages | Shared shell plus read-only card content |
| `/dashboard/*` | StaffCP shell and dashboard-native components |
| `/admin/*` compatibility routes | StaffCP shell; link to canonical dashboard pages |
| `/dashboard/store/*` | Structure only; implementation deferred |

## Agent implementation rules

1. Start from the route family in the mapping above before creating markup.
2. Reuse the existing React components and Bootstrap 5.0.1 classes.
3. Preserve the light/dark CSS variable contract and responsive breakpoints.
4. Include visible labels, accessible button names, `aria-expanded` on collapse
   controls, `aria-live` for toasts, and explicit loading/error/empty states.
5. Use the live values above only for fixtures/examples; production content must
   come from Prisma/API data.
6. Do not copy store behavior or activate store mutations.
7. Do not store credentials, cookies, or volatile session HTML in the repo.
