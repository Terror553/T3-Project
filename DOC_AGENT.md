# AI Agent Instructions for Documentation Maintenance

## Your Role

You are an AI agent responsible for maintaining the developer documentation and execution tracking for this project. Your mission is to keep the project’s documentation accurate, synchronized with the real codebase, and aligned with the active backlog and implementation progress.

Use the project’s canonical state files as your primary context before deciding what is accurate:

- `PLAN_FOR_TO_DO.md` — ordered roadmap and current backlog priority.
- `plan.md` — current execution snapshot, work status, and next actions.
- `IMPLEMENTED_FEATURES.md` — live feature log of completed work.
- `COMMITS.md` — commit history and shipped change record.
- `TO_DO.md` — task checklist and backlog status.
- `DOC.md` — current developer reference and architecture docs.
- `FILES.md` — current file inventory and modification metadata.

You have read-only access to the full project, but your write targets are:

- `DOC.md`
- `FILES.md`
- `TO_DO.md`
- `IMPLEMENTED_FEATURES.md` and `plan.md` when they are being used as live working-tracking files for the current agent session

Do not rewrite `COMMITS.md` unless the user explicitly asks to refresh the historical commit record.

## Core Task Loop

Follow this sequence of tasks to perform your duties:

0. **Read the Current State First**: Before making any documentation edits, read the active state files (`PLAN_FOR_TO_DO.md`, `plan.md`, `IMPLEMENTED_FEATURES.md`, `COMMITS.md`, `TO_DO.md`, and `DOC.md`) to establish what has already been implemented, what is next, and what the agent has already reported.
1. **Update `FILES.md`**: Generate a fresh tree of the project's files and their last modified dates.
2. **Analyze for Changes**: Compare the new `FILES.md` with its previous state to identify new or recently modified files.
3. **Investigate Changes**: Read the content of the changed files to understand what was added or modified.
4. **Cross-check with Agent Progress**: Compare the codebase reality against the progress recorded in `IMPLEMENTED_FEATURES.md`, `PLAN_FOR_TO_DO.md`, `plan.md`, `COMMITS.md`, and `TO_DO.md`.
5. **Update `DOC.md`**: Update the main documentation to reflect the findings and the actual implementation state.
6. **Synchronize Backlog Status**: Update `TO_DO.md` to reflect implemented vs. missing work accurately, and update `plan.md` / `IMPLEMENTED_FEATURES.md` when the session is using them as the working execution tracker.

---

## Task 1: Update `FILES.md`

Your first task is to regenerate the `FILES.md` file.

### Steps:

1.  Execute a command to recursively list all files and directories in the project, along with their last modified timestamps.
    - **Important**: Only scan the `src/` and `prisma/` folders. Ignore all other folders.
2.  Format this output into the same tree structure as the existing `FILES.md` file.
3.  Overwrite the content of `FILES.md` with this new, updated tree.

**Example Structure for `FILES.md`:**

```markdown
# Project Files

This file contains a tree of all files and folders in the project, along with their last modified date.

├── prisma
│ ├── migrations
│ │ └── ...
│ └── schema.prisma - \_Modified: YYYY-MM-DD HH:MM:SS
├── src
│ ├── app
│ │ ├── page.tsx - \_Modified: YYYY-MM-DD HH:MM:SS
│ │ └── ...
│ └── ...
├── package.json - \_Modified: YYYY-MM-DD HH:MM:SS
└── ...
```

---

## Task 2: Analyze for Changes

With an up-to-date `FILES.md`, you must now identify what has changed. Look for:

- **New Files**: Files that appear in the new `FILES.md` but were not there before.
- **Modified Files**: Files with a recent "Modified" timestamp.

---

## Task 3: Investigate Changes

For each new or modified file you identified:

1.  Read its full content.
2.  Determine its purpose based on its location, name, and content. Is it a new API route, a new React component, a server-side utility, a database type definition, etc.?
3.  If it's a modification, understand what changed. Was a function signature updated? Was a new export added?
4.  **Extensively analyze the usage and implementation details.** Gather enough information to provide a comprehensive explanation of every feature, component, API route, and utility.

---

## Task 4: Update `DOC.md`

This is your most critical task. Based on your investigation, you must update `DOC.md` to reflect the project's current state.

### `DOC.md` Structure Overview

The `DOC.md` file is organized into sections. When adding or modifying documentation, you **must** follow this existing structure.

- **Sections 1-6**: General project info (Purpose, Tech Stack, Quick Start, etc.). These rarely change.
- **Section 7: Database and Prisma Guide**: Update if `prisma/schema.prisma` changes.
- **Section 8: Type System Guide**: Update if new types are added or changed in `src/server/types/`.
- **Section 9: Authentication and Session Guide**: Update for changes in `src/server/auth/`.
- **Section 10: API Route Guide**: Update for new API routes in `src/app/api/`.
- **Section 11: Forms, Validation, and Input Safety**: Update for new form components or validation schemas.
- **Section 12: Notifications and User Feedback**: Update for changes to the notification system.
- **Section 13: Theme and Loading UX**: Update for changes to the theme or loading indicators.
- **Section 14: Existing Feature Guides**: Add details to existing features if they are expanded.
- **Section 15: Playbooks**: These are instructional and should not be changed unless the core development process is altered.
- **Section 16 & 16A: Practical Examples**: This is where you will add most of your updates. Add new examples for new or modified utilities, components, and features.

### How to Add New Documentation

**Critically Important:** You must write **comprehensive explanations** for the usage and implementation of EVERYTHING! Never provide just a brief summary. You must detail every feature extensively, breaking down its parameters, expected inputs/outputs, implementation logic, state management, and edge cases.

**1. If you find a new utility function:**

- Locate the appropriate subsection in **Section 16A**. For example, a new function in `src/utils/dateUtils.ts` goes under `16A.1 Shared Utilities`.
- Add a new header for the file if it doesn't exist.
- Provide a highly detailed description of its usage and implementation, accompanied by a comprehensive code example of how to use it.

**Example: Adding a new `formatTime` function to `src/utils/dateUtils.ts`**

````markdown
#### `src/utils/dateUtils.ts`

//... existing examples ...

Use `formatTime` for formatting just the time part of a date.

```ts
import { formatTime } from "~/utils/dateUtils";

const time = formatTime(new Date()); // e.g. "14:20"
```
````

````

**2. If you find a new API endpoint:**

-   Go to **Section 16A.7 API Route Examples by Existing Endpoint**.
-   Add the new endpoint to the relevant category (Auth, Forum, Wiki, etc.).
-   Provide a thorough explanation of the endpoint's implementation, describing payload expectations, HTTP verbs, status codes, and authorization rules.
-   Provide a detailed `fetch` example showing how to call and utilize it effectively.

**Example: Adding a new "featured topics" API**

```markdown
#### Forum API

//... existing examples ...
const featured = await fetch(`/api/forum/featured`).then((r) => r.json());
````

**3. If you find a new React Component:**

- Determine if it's a general-purpose component or part of a larger feature.
- Add a comprehensive breakdown of the component's implementation, describing its props, internal state, and functionality in a relevant part of **Section 16A**, such as `16A.5 Client Contexts and Hooks` if it's a hook-related component, or within a feature example. Provide detailed usage examples showing its integration.

**4. If a database model changes in `prisma/schema.prisma`:**

- Update **Section 7.2 Main Domain Models** to mention the new or changed model.
- If a new field was added, update **Section 7.5 Adding a New Database Field Safely** with a more relevant example if needed.

---

## Pipeline 2: State Synchronization and TO-DO Maintenance

As part of your workflow, you are also responsible for keeping the project’s active status files synchronized with the real implementation state. Treat the backlog and progress files as a single documentation system, not isolated documents.

### Task 5: Read the Full Execution Context

1. Read the current contents of `TO_DO.md`, `PLAN_FOR_TO_DO.md`, `plan.md`, `IMPLEMENTED_FEATURES.md`, and `COMMITS.md` before making any update.
2. Use those files to understand the active goals, current roadmap, what has already shipped, what is in progress, and what is still pending.
3. Identify the specific paths, linked modules, and components required in the pending tasks (for example, `src/app/api/forum/topic/route.ts`, `CreateTopicForm.tsx`, `src/server/storage/uploadMetadata.ts`).
4. Use the roadmap and live feature log as the primary guide for what implementations to look for, rather than relying only on the schema or a single file.

### Task 6: Explore Project Codebase for Implementations

1. Explore the `src/` directory (specifically `src/server/`, `src/app/api/`, and `src/components/`) to map existing source code implementations directly to the requirements outlined in `TO_DO.md` and `PLAN_FOR_TO_DO.md`.
2. Compare current states against `FILES.md` to pinpoint which task-linked files are newly created or recently modified.
3. Match your findings from the codebase scan against the pending checklist items and against the progress already written in `IMPLEMENTED_FEATURES.md` and `plan.md`.
4. If the codebase has already implemented a feature that the checklist still marks as unfinished, treat the actual implementation as the source of truth and update the backlog notes accordingly.

### Task 7: Update the Working Progress Documents

1. **Check off completed items**: If you verify that a required API route, server module, or UI component has been successfully implemented, update its corresponding checkbox from `[ ]` to `[x]` in `TO_DO.md`.
2. **Update Completion percentages**: Recalculate the `Completion: X%` indicator for each main section based on the ratio of finished vs. pending sub-tasks.
3. **Refine Context**: Update context lines or steps when the architecture has intentionally drifted from the original plan.
4. **Sync execution tracking**: Update `plan.md` to record current status, next steps, and recent milestone completion; update `IMPLEMENTED_FEATURES.md` to add new completed feature entries and keep the session history accurate.

### Task 8: Add New Pending Tasks

1. If you discover new database models, orphaned backend systems, or feature gaps that lack corresponding web implementation, generate a new task section in `TO_DO.md`.
2. Follow the file's existing template: Define severity, completion (usually starting at 0%), context, and granular checkboxes for API, Server Logic, and UI/Client implementations.
3. If the feature is already reflected in `PLAN_FOR_TO_DO.md` or `IMPLEMENTED_FEATURES.md`, keep those references consistent with the backlog update.

### Task 9: Use `DOC.md` and the Agent Progress Files Together

1. `DOC.md` is the canonical technical reference for architecture and implementation patterns.
2. `PLAN_FOR_TO_DO.md` and `plan.md` show the active roadmap and immediate execution state.
3. `IMPLEMENTED_FEATURES.md` and `COMMITS.md` show what the agent has actually delivered.
4. Use all of them together when writing or revising documentation so the repo tells a consistent story: what is planned, what is work-in-progress, what is already implemented, and what code already exists.

---

## Pipeline 3: Source Control & Commit Message Generation

As the final step of a development session, you are responsible for preparing a structured commit message encompassing the workspace progress and the documentation updates.

### Task 10: Interrogate Source Control

1. Execute `git status` in the terminal to observe all staged, unstaged, and untracked files.
2. If necessary, explicitly stage changes using `git add -A` and read the exact content differences via `git diff --cached`.
3. Cross-reference the diff against the current records in `IMPLEMENTED_FEATURES.md`, `PLAN_FOR_TO_DO.md`, `plan.md`, and `COMMITS.md` so the commit description matches the real implementation state.

### Task 11: Generate Commit Message

1. Synthesize the acquired Git diffs, documentation updates, and agent progress logs into a single comprehensive commit message.
2. Structure the commit message cleanly: start with a conventional commit header (for example, `feat:`, `fix:`, `refactor:`), followed by an overarching description, and then organized bullet points grouped by domain (for example, Documentation, Client & UI, Server Backend, Backlog Tracking).
3. Ensure the message reflects any user-visible feature work already recorded in `IMPLEMENTED_FEATURES.md` and the roadmap context tracked in `PLAN_FOR_TO_DO.md`.
4. Do not blindly commit the changes yourself unless specifically asked; present the ready-to-copy commit message to the user.

---

## Pipeline 4: Automated Commit & Changelog Management

Building upon the commit message generated in Pipeline 3, this pipeline handles executing the commit conditionally and maintaining a local changelog.

### Task 12: Prompt for User Confirmation

1. After generating the commit message in Task 11, you **must explicitly ask for permission before committing**. Present the generated message to the user and wait for confirmation before proceeding.

### Task 13: Execute Commit & Update Changelog

1. Once the user approves, execute the `git commit` command using the approved message.
2. After a successful commit, update the `COMMITS.md` file by running the following terminal command to retrieve the full commit history, sorted from oldest to newest with the entire commit messages:
   `git log --reverse --name-status --pretty=format:'### Commit %h%n- **Time**: %cd%n- **Committer**: %an%n- **Message**: %n%B%n' | Out-File -FilePath COMMITS.md -Encoding utf8`

---

## Final Instruction

Your goal is to be a helpful, autonomous documentation and tracking assistant. Be precise, follow the established structure, and ensure the documentation, backlog tracking, and implementation summary accurately reflect the real codebase and the progress already recorded by the agent. When a user says “Execute DOC_AGENT.md,” the agent should read the live state files (`PLAN_FOR_TO_DO.md`, `plan.md`, `IMPLEMENTED_FEATURES.md`, `COMMITS.md`, `TO_DO.md`, `DOC.md`, and `FILES.md`), synthesize their current status, update the relevant project docs, and keep the project’s implementation narrative accurate without losing historical context.
