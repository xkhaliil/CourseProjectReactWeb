# Word Clone

A retro Nokia-themed Wordle clone built with React 19, TypeScript, and Zustand. Guess the hidden 5-letter word in six tries, with a phone keypad UI and color-coded feedback. Includes a Rainbow Six Siege leaderboard and a cat image viewer as additional game modes.

## Features

- Wordle-style word guessing game with keyboard and on-screen input
- Nokia phone aesthetic with CSS module styling
- R6 Siege leaderboard with pagination (live API in dev, static JSON in prod)
- Cat image viewer as a second playable game mode
- Leaderboard with per-game score detail view
- Deployed via GitHub Actions to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 22+ (see `.nvmrc`)
- npm

### Install and run

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env` file in the project root:

```
VITE_R6_API_KEY=your_api_key_here
```

This key is used in development to fetch live leaderboard data from `api.r6data.eu`. In production builds, the app falls back to a static `data/leaderboard.json` file, so the key is not required for deployment.

### Other scripts

```bash
npm run lint      # runs typecheck, eslint, and prettier checks
npm test          # runs vitest
npm run build     # production build
npm run preview   # preview the production build locally
```

## Architecture

The project uses a **feature/domain-based** folder structure — code is grouped by what it does, not what layer it lives in. Every feature is a **modlet**: a self-contained folder that exposes a clean public API via `index.ts` and keeps its internals private.

```
src/
├── app/                    # App shell: routing (App.tsx), layout, global styles
├── features/
│   ├── home/               # Home page — lists available games
│   ├── play/               # Play page — resolves slug → game component
│   ├── game/               # Wordle game — components, logic, types, tests
│   ├── cats/               # Cat viewer — component and API hook
│   └── leaderboard/        # R6 leaderboard + game detail — components and API
│       └── api/             # r6.ts (R6 data), games.ts (game records), index.ts
└── shared/
    ├── config.ts            # App-wide constants (word length, max guesses, etc.)
    ├── games.ts             # Game registry — maps slugs to Game objects
    ├── getErrorMessage/     # Utility: safely extracts error message strings
    ├── store/               # Zustand store — slices, composed store, scoped hooks
    │   ├── index.ts         # Public API: useGameStore, useLeaderboardStore
    │   ├── gameSlice.ts     # Game state (guesses, currentRow, actions)
    │   └── leaderboardSlice.ts # Leaderboard pagination state
    └── useAsync/            # Utility hook: wraps async functions with React 19 `use()`
```

### Feature-based organization

Each feature folder is a modlet — everything related to a feature lives together (component, styles, API, types, tests), and the feature exposes only what other parts of the app need through its `index.ts`. Nothing reaches into a feature's internals directly.

Cross-feature concerns (game registry, config, state management, shared utilities) live in `shared/`.

### State management

State is handled by **Zustand** (`shared/store/`). The store is split into `GameSlice` and `LeaderboardSlice`. Scoped selector hooks (`useGameStore`, `useLeaderboardStore`) are the only public interface — components never subscribe to the raw store directly. This prevents unnecessary re-renders and limits state leakage to unrelated parts of the app.

The store lives in `shared/` because it is a cross-cutting concern used by multiple features, and is imported via the `#shared/store` path alias.

### Data fetching

Data fetching follows the **services-as-hooks** pattern: plain async functions (e.g. `getR6Leaderboard`, `getCat`) are wrapped by hook counterparts (e.g. `useCat`) using the shared `useAsync` hook, which leverages React 19's `use(promise)` API. Components use `<Suspense>` and `<ErrorBoundary>` for loading and error states.

### Separation of concerns

- **Rendering logic** — React components and CSS modules, no business logic
- **Business logic** — pure functions in `logic.ts` (e.g. `evaluateGuess`, `calculateKeyboardState`), independently testable with no React dependencies
- **App state** — Zustand slices, accessed only through scoped hooks

### Type safety

All data structures have explicit TypeScript types. Core function return types are explicitly annotated. API functions are typed end-to-end (`Promise<R6Player[]>`, `Promise<Cat>`, etc.).

### Path aliases

The `#shared/*` alias maps to `src/shared/*/index.ts` and is configured in both `package.json` (Node resolution), `tsconfig.json` (TypeScript), and `vite.config.ts` (Vite / Vitest). Use `#shared/store`, `#shared/useAsync`, and `#shared/getErrorMessage` for imports from shared utilities.

## Testing

Every file with runtime behaviour has a co-located test file. Run the full suite with:

```bash
npm test
```

| Test file                                   | What it covers                                                                           |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `app/App.test.tsx`                          | App shell renders without crashing (covers main.tsx bootstrap indirectly)                |
| `app/Layout.test.tsx`                       | Nav links render and nested route outlet content appears                                 |
| `features/home/HomePage.test.tsx`           | Heading, game links, link paths                                                          |
| `features/home/index.test.ts`               | Barrel re-exports HomePage                                                               |
| `features/play/PlayPage.test.tsx`           | Known slug renders game; unknown slug shows error with home link                         |
| `features/play/index.test.ts`               | Barrel re-exports PlayPage                                                               |
| `features/cats/CatsPage.test.tsx`           | Button disabled state, image render, refresh callback                                    |
| `features/cats/api/cats.test.ts`            | `getCat` happy path and HTTP error handling                                              |
| `features/cats/api/index.test.ts`           | Barrel re-exports getCat and useCat                                                      |
| `features/cats/index.test.ts`               | Cats game registration shape (title, lazy Play)                                          |
| `features/game/logic.test.ts`               | `evaluateGuess` green/yellow/dark/unused; `calculateKeyboardState` strongest-status rule |
| `features/game/types.test.ts`               | Game type contract verified against the live wordle registration object                  |
| `features/game/Game.test.tsx`               | Game renders title; keydown event updates the guess grid                                 |
| `features/game/Guesses.test.tsx`            | 6×5 grid renders; getCellState called with correct row/position                          |
| `features/game/Keyboard.test.tsx`           | All 28 keys render; click dispatches correct KeyboardEvent                               |
| `features/game/useGameDisplay.test.ts`      | getCellState/getKeyState derive correct values from store state                          |
| `features/game/index.test.ts`               | Wordle game registration shape (title, lazy Play)                                        |
| `features/game/Game.integration.test.tsx`   | **Comprehensive vertical slice** — store + logic + component, 10 scenarios, zero mocks   |
| `features/leaderboard/Leaderboard.test.tsx` | Heading, 5-per-page display, pagination Previous/Next                                    |
| `features/leaderboard/GameDetail.test.tsx`  | Valid id shows heading/link/word hint; unknown id shows fallback                         |
| `features/leaderboard/api/r6.test.ts`       | `getR6Leaderboard` happy path and HTTP error                                             |
| `features/leaderboard/api/games.test.ts`    | `getGame` known id, unknown id, all five seeded records                                  |
| `features/leaderboard/api/index.test.ts`    | Barrel re-exports all four API functions                                                 |
| `features/leaderboard/index.test.ts`        | Barrel re-exports Leaderboard and GameDetail                                             |
| `shared/config.test.ts`                     | Constants have correct values and types                                                  |
| `shared/games.test.ts`                      | Registry contains wordle and cats; every entry has title and Play                        |
| `shared/getErrorMessage/index.test.ts`      | Error instance, plain string, and unknown value branches                                 |
| `shared/store/gameSlice.test.ts`            | typeKey, deleteLetter, submitGuess, resetGame — all edge cases                           |
| `shared/store/leaderboardSlice.test.ts`     | setPage, nextPage, prevPage (floor guard), resetPage                                     |
| `shared/store/index.test.ts`                | Scoped hooks expose only their slice — no cross-slice data leakage                       |
| `shared/useAsync/useAsync.test.tsx`         | Resolves value on mount; refresh triggers re-fetch                                       |
| `shared/useAsync/index.test.ts`             | Barrel re-exports useAsync as default                                                    |

## How to Play

1. Enter a 5-letter guess using your keyboard or the on-screen keypad.
2. Press Enter to submit.
3. Each letter will be colored after submission:
   - **Green** — correct letter, correct position
   - **Yellow** — correct letter, wrong position
   - **Dark** — letter is not in the word
4. Win by guessing the word within 6 tries.

**Keyboard shortcuts:** A–Z to type, Backspace to delete, Enter to submit.

## CI/CD

The deployment pipeline lives in `.github/workflows/deploy.yml` and runs automatically on every push:

```
verify ──┐
         ├──▶ build ──▶ setup-pages ──▶ deploy
test   ──┘
```

| Job           | What it does                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `verify`      | Runs TypeScript, ESLint, and Prettier checks                                                           |
| `test`        | Runs the Vitest test suite                                                                             |
| `build`       | Fetches leaderboard data (with retry + empty-data fallback), builds the app, uploads the dist artifact |
| `setup-pages` | Enables GitHub Pages on the repo via the GitHub API (idempotent)                                       |
| `deploy`      | Deploys the artifact to GitHub Pages (main branch and manual triggers only)                            |

### Required secrets

| Secret            | Where to get it                          |
| ----------------- | ---------------------------------------- |
| `VITE_R6_API_KEY` | R6 Data API portal                       |
| `GITHUB_TOKEN`    | Provided automatically by GitHub Actions |

---

Course repository: https://github.com/christopherjbaker/hs-react-408
