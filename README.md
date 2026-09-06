# Word Clone

A retro Nokia-themed Wordle clone built with React, TypeScript, and Zustand. Guess the hidden 5-letter word in six tries using a phone-keypad UI with color-coded feedback. Also includes a Rainbow Six Siege leaderboard and a cat image viewer as additional game modes.

![TypeScript](https://img.shields.io/badge/TypeScript-88%25-blue)

## What it does

- Wordle-style word-guessing game (`features/game`) played via physical keyboard or on-screen keypad, with green/yellow/dark feedback per letter.
- A Rainbow Six Siege leaderboard (`features/leaderboard`) with pagination and a per-game score detail view; fetches live data from `api.r6data.eu` in development (proxied through Vite) and falls back to a static `data/leaderboard.json` in production.
- A cat image viewer (`features/cats`) as a second playable game mode.
- Client-side routing (`react-router-dom`) across a home page, a `play/:slug` page that resolves a game by slug, and the leaderboard pages.
- Deployed automatically to GitHub Pages via GitHub Actions.

## Tech stack

- **React** + **React Router** for the UI and routing
- **TypeScript** throughout
- **Zustand** for state management (`shared/store`, split into `gameSlice` and `leaderboardSlice`)
- **react-error-boundary** for error handling around async data fetching
- **Vite** for dev server and build, with **Vitest** + **@testing-library/react** + **jsdom** for testing
- **ESLint**, **Prettier**, and **Husky** for linting/formatting and pre-commit hooks

## Getting started

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

This key is used in development to fetch live leaderboard data from `api.r6data.eu`. Production builds fall back to a static `data/leaderboard.json` file, so the key is not required for deployment.

### Other scripts

```bash
npm run lint      # runs typecheck, eslint, and prettier checks
npm test          # runs vitest
npm run build     # production build
npm run preview   # preview the production build locally
```

## Usage — How to play

1. Enter a 5-letter guess using your keyboard or the on-screen keypad.
2. Press Enter to submit.
3. Each letter is colored after submission:
   - **Green** — correct letter, correct position
   - **Yellow** — correct letter, wrong position
   - **Dark** — letter is not in the word
4. Win by guessing the word within 6 tries.

Keyboard shortcuts: A–Z to type, Backspace to delete, Enter to submit.

## Architecture

The project uses a **feature/domain-based** folder structure. Each feature is a self-contained "modlet" exposing a public API via `index.ts` and keeping internals private:

```
src/
├── app/                    # App shell: routing (App.tsx), layout, global styles
├── features/
│   ├── home/               # Home page — lists available games
│   ├── play/               # Play page — resolves slug → game component
│   ├── game/               # Wordle game — components, logic, types, tests
│   ├── cats/               # Cat viewer — component and API hook
│   └── leaderboard/        # R6 leaderboard + game detail — components and API
└── shared/
    ├── config.ts            # App-wide constants (word length, max guesses, etc.)
    ├── games.ts             # Game registry — maps slugs to Game objects
    ├── getErrorMessage/     # Utility: safely extracts error message strings
    ├── store/               # Zustand store — slices, composed store, scoped hooks
    └── useAsync/            # Utility hook wrapping async functions
```

State is exposed only through scoped selector hooks (`useGameStore`, `useLeaderboardStore`) from `shared/store` — components never subscribe to the raw store directly. Data fetching follows a services-as-hooks pattern (plain async functions wrapped by hooks such as `useCat`), paired with `<Suspense>` and `<ErrorBoundary>` for loading/error states.

Path aliases (`#shared/store`, `#shared/useAsync`, `#shared/getErrorMessage`) map to `src/shared/*/index.ts` and are configured in `package.json`, `tsconfig.json`, and `vite.config.ts`.

## Testing

Every file with runtime behaviour has a co-located test file (Vitest + Testing Library), covering the app shell, routing, each feature (game logic, keyboard/grid components, leaderboard pagination, cats API), and the shared store slices/utilities. Run the full suite with:

```bash
npm test
```

## CI/CD

`.github/workflows/deploy.yml` runs on every push:

```
verify ──┐
         ├──▶ build ──▶ setup-pages ──▶ deploy
test   ──┘
```

| Job           | What it does                                                                |
| ------------- | --------------------------------------------------------------------------- |
| `verify`      | Runs TypeScript, ESLint, and Prettier checks                                |
| `test`        | Runs the Vitest test suite                                                  |
| `build`       | Fetches leaderboard data, builds the app, uploads the dist artifact         |
| `setup-pages` | Enables GitHub Pages on the repo via the GitHub API (idempotent)            |
| `deploy`      | Deploys the artifact to GitHub Pages (main branch and manual triggers only) |

### Required secrets

| Secret            | Where to get it                          |
| ----------------- | ----------------------------------------- |
| `VITE_R6_API_KEY` | R6 Data API portal                        |
| `GITHUB_TOKEN`    | Provided automatically by GitHub Actions  |

## License

No license file is present in this repository yet.

---

Course repository: https://github.com/christopherjbaker/hs-react-408
