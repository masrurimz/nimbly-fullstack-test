# Nimbly Fullstack Test

A coding challenge for senior fullstack engineer candidates.

**Stack:** Expo SDK 54 + React Native 0.81 + Uniwind (Tailwind v4) + TanStack Query + TanStack Form

## Setup

```bash
npm install
npx expo start
```

Then scan the QR code with **Expo Go** from the Play Store.

> **Note:** If TypeScript shows `className` errors, run `npx expo start` once to let Uniwind generate its type declarations, then restart your editor.

## Structure

```
src/
├── api/
│   ├── types.ts          # Shared types (Task, TaskFilter)
│   └── tasks.ts          # Mock API layer
├── hooks/
│   └── use-tasks.ts      # TanStack Query hooks
├── components/
│   ├── task-item.tsx      # Single task row
│   ├── task-form.tsx      # Add task form (modal)
│   └── filter-bar.tsx     # Status filter chips
├── app/
│   ├── _layout.tsx        # Root layout (QueryClientProvider)
│   └── index.tsx          # Home screen
└── global.css             # Tailwind v4 + Uniwind
```

## The Challenge

This app has **deliberate bugs** and missing features. Diagnose the root cause of each issue, fix it, then add the features below.

### Part 1 — Fix the Bugs

These issues are visible when you run the app:

1. Tapping a task to toggle between pending and completed doesn't visually update the list — it stays the same even though the API call succeeds.
2. If the toggle API call fails for any reason, nothing happens — no error message appears.
3. Sometimes when scrolling, tasks that have been toggled show their old status briefly before updating.
4. Tapping Save with an empty title adds a blank task.

### Part 2 — Add Features

1. **Optimistic updates** — when toggling a task, the UI updates immediately. If the API fails, roll back to the previous state and show a message.
2. **Offline queue** — store failed mutations locally and retry when connectivity returns. Show a sync indicator.
3. **Filter persistence** — save the active filter and search term so they survive app restarts (use AsyncStorage).

### Part 3 — Refactor

1. Extract the task list screen logic into a custom hook (`use-tasks-screen.ts`)
2. Add proper loading skeletons instead of the spinner
3. Ensure every file has strict TypeScript types

### Bonus (Optional)

- Pagination or infinite scroll
- Unit tests (Jest / React Native Testing Library)
- Dark mode toggle using Uniwind's dark variant
- Sentry integration with `captureException` on mutation errors

## Evaluation

| Criteria | What We Look For |
|----------|-----------------|
| **TanStack Query** | Query keys, caching, invalidation, optimistic updates |
| **TanStack Form** | Validation, error states, form state management |
| **TypeScript** | Strict typing, no `any`, well-structured types |
| **Code Quality** | Component composition, hooks, separation of concerns |
| **Error Handling** | UX feedback, edge cases, offline resilience |
| **Fullstack Thinking** | API design awareness, offline sync, data flow |
| **AI Usage** | You may use AI tools — but you must understand every line |

## Submission

1. **Fork** this repo into your **private** GitHub account
2. Complete the tasks above
3. Push your changes
4. Invite **masrurimz** as a collaborator to your private fork
5. Reply to your interview thread with a link
