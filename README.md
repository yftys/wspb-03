# Expense Tracker

Starting point for the Web Software Production course project. 
This project will grow week by week.

- `client/` — React + Vite + TypeScript frontend
- `server/` — Node + Express + TypeScript backend (PostgreSQL storage)

Each part is an independent npm project with its own `node_modules`, and its own Biome config for linting/formatting.

## Running

**Server** (http://localhost:3001):

```
cd server
npm install
npm run dev
```

Starts the Express API with `tsx watch`, so it restarts on file changes. Once it's up you should see `Server listening on http://localhost:3001` in the terminal.

```
src/
  app.ts                     # configures the Express app (middleware + routes)
  server.ts                  # entry point: starts listening
  types/expense.ts           # Expense / NewExpense types
  store/expense.ts           # database queries (PostgreSQL)
  routes/expense.ts          # GET/POST/PUT/DELETE handlers, mounted at /api/expenses
```

Storage is PostgreSQL, via the connection pool in `server/src/db/pool.ts`. The connection details come from environment variables (`PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`). Start the database with `docker compose up -d db`. To run the server outside Compose, put these variables in `server/.env` (never commit it).

Available endpoints, all under `/api/expenses`:

| Method | Path             | Description                    |
| ------ | ---------------- | ------------------------------ |
| GET    | `/api/expenses`     | List all expenses           |
| POST   | `/api/expenses`     | Create an expense           |
| PUT    | `/api/expenses/:id` | Update an expense           |
| DELETE | `/api/expenses/:id` | Delete an expense           |

`POST`/`PUT` expect a JSON body with `description` (string), `amount` (number), and `date` (ISO string, e.g. `2026-08-01`); a missing/wrong-typed field returns `400`. Updating or deleting an unknown `id` returns `404`.

You can try it without the client, e.g.:

```
curl http://localhost:3001/api/expenses
```

**Client** (http://localhost:5173):

```
cd client
npm install
npm run dev
```

Starts the Vite dev server with hot reload. The app calls the API directly at `http://localhost:3001`, so the server needs to be running too (see above) — without it you'll see a "Failed to fetch" error in the browser console.

The UI is split by responsibility rather than kept in one file:

```
src/
  types/expense.ts          # Expense / NewExpense types
  api/expenses.ts           # the only place that calls fetch()
  hooks/useExpenses.ts      # owns the expenses state, exposes add/edit/remove
  utils/date.ts             # dd.mm.yyyy <-> ISO date conversion
  utils/currency.ts         # € formatting
  components/
    ExpenseForm.tsx         # add-expense form
    ExpenseList.tsx         # renders one ExpenseListItem per expense
    ExpenseListItem.tsx     # a row; toggles its own view/edit mode
    ExpenseTotal.tsx        # running total
  App.tsx                   # composition root, no fetch/state logic itself
```

## Linting

[Biome](https://biomejs.dev/) handles both linting and formatting — there's no separate Prettier/ESLint setup. `client/` and `server/` each have their own `biome.json`, so they can drift independently as the course progresses; there's no shared/root config to keep in sync.

Run from inside either project:

```
npm run lint      # check formatting, imports, and lint rules
npm run lint:fix  # same, but apply the fixes it can make automatically
```

`lint:fix` won't touch anything it can't fix safely (e.g. an unused variable) — it'll still report those for you to fix by hand.

## Testing

The server has unit tests and integration tests, using Vitest and Supertest. Run them from the `server` folder with `npm test`.

The integration tests use a separate database, `app_test_db`, so they never touch development data. The database must be running first (`docker compose up -d db`).
