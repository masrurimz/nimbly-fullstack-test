# Nimbly Fullstack Test

A coding challenge for senior fullstack engineer candidates.

**Stack:** Expo SDK 55 + React Native 0.83 + Uniwind (Tailwind v4) + TanStack Query + TanStack Form

## Setup

```bash
npm install
npx expo start
```

Then open the app in Expo Go, iOS simulator, or Android emulator.

## Structure

```
├── src/
│   ├── app/
│   │   ├── _layout.tsx    # Root layout (TanStack Query provider)
│   │   └── index.tsx      # Task list screen — start here
│   └── global.css          # Tailwind v4 + Uniwind entry
├── app.json
├── metro.config.js         # Uniwind configured
├── package.json
└── README.md
```

## The Challenge

This is a partially built **Task Management** app. It has deliberate bugs and missing features. Fix, improve, and extend it.

### Part 1: Fix the Bugs

1. **FlatList keys** — items don't render with stable keys. Fix it.
2. **Query key mismatch** — toggle tasks doesn't refresh the list. Find and fix the root cause.
3. **Error handling** — the toggle mutation silently fails. Add error handling with user feedback.
4. **Form validation** — empty task titles can be submitted. Add validation to prevent this.

### Part 2: Add Features

1. **Optimistic updates** — When toggling a task, the UI updates immediately. If the API fails, roll back to the previous state.
2. **Offline queue** — Store failed mutations locally. Retry when connectivity returns. Show a sync status indicator.
3. **Filter persistence** — Save the active filter and search term so they survive app restarts (use AsyncStorage).

### Part 3: Refactor

1. Extract the task list logic into a custom hook (`useTasks`)
2. Structure the code into separate components (TaskItem, TaskForm, FilterBar)
3. Add proper TypeScript types — no `any` anywhere

### Bonus (Optional)

- Add pagination or infinite scroll
- Add unit tests with Jest
- Implement dark mode with Uniwind's dark mode support

## Evaluation Criteria

| Criteria | What We Look For |
|----------|-----------------|
| **TanStack Query** | Proper query keys, caching, invalidation, optimistic updates |
| **TanStack Form** | Validation, error handling, clean form state |
| **TypeScript** | Strict typing, no `any`, well-structured types |
| **Code Quality** | Component composition, hooks extraction, readability |
| **Error Handling** | Graceful degradation, user feedback, edge cases |
| **Fullstack Thinking** | Offline considerations, data flow, API design awareness |
| **AI Usage** | We allow AI but you must understand every line you commit |

## Submission

1. **Fork** this repo into your **private** GitHub account
2. Complete the tasks above
3. Push your changes
4. Invite **masrurimz** as a collaborator to your private fork
5. Reply to your interview thread with a link to your fork

## Tips

- Talk through your decisions — we want to understand your reasoning
- Handle edge cases — empty states, loading, errors, offline
- Don't over-engineer — clean, working code > over-abstracted
- AI is allowed — use it as a tool, but own the output
- If TypeScript shows `className` errors on first run, start Metro once (`npx expo start`) to generate Uniwind types, then they'll resolve
