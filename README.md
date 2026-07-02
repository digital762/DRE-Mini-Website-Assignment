# betterhomes — Dubai real estate showcase

A polished demo real estate site for a Dubai residential broker, built with Next.js
(App Router) and TypeScript, styled entirely from a custom design-system token set
(colors, type, spacing, radii, shadows).

## Features

- **Home** — hero with area/community search, featured listings, "why betterhomes"
  trust section, footer.
- **Listings** (`/listings`) — grid/list toggle, sidebar filters (location, property
  type, price range, bedrooms), sort by price/date, deep-linkable via `?community=`,
  `?type=`, `?q=`.
- **Property detail** (`/listings/[id]`) — photo gallery, price/sqft, specs,
  description, amenities, agent card, embedded mortgage calculator.
- **Mortgage calculator** (`/mortgage-calculator`) — live-updating monthly payment,
  total interest, and a full amortization schedule; down payment toggles between
  % and AED.
- **Compare** (`/compare`) — add any number of listings to a comparison tray
  (persisted in `localStorage`) and view them side by side in a responsive table.
- **Favourites** (`/favourites`) — heart any listing to save it to this browser, no
  account required.

Sample data (15 listings across 15 Dubai communities) lives in `lib/listings.ts` —
edit that file to add or change inventory.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- CSS Modules, styled from tokens in `app/tokens.css`
- `next/font/local` for the self-hosted IvyMode serif, `next/font/google` for
  Poppins and Cormorant Garamond
- Phosphor Icons, self-hosted under `styles/phosphor/`
- No backend — all state is static sample data plus `localStorage` for
  favourites/compare (via `useSyncExternalStore`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
app/                route pages (App Router)
components/         shared UI components
lib/                sample data, types, formatting, mortgage math, storage hooks
styles/phosphor/    self-hosted Phosphor icon font + CSS
public/             fonts, logos, hero imagery
```
