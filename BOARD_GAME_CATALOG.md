# Board Game Catalog — Project Plan

## What This Is

A minimalist static single-page web app to browse a personal board game collection. The primary audience is friends and co-workers (many of whom are new to board games) who want to answer: **"What can we play tonight with X people?"**

No authentication, no backend, no database. A JSON file is the sole data source.

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Data:** Static `games.json` file in `public/`
- **Deployment:** Static build → Cloudflare Pages

## Data Schema

`public/games.json` contains an array of game objects:

```json
[
  {
    "id": "7-wonders-duel",
    "name": "7 Wonders Duel",
    "owner": "Rob",
    "players": { "min": 2, "max": 2 },
    "playtime": { "min": 30, "max": 30 },
    "complexity": 2.2,
    "genres": ["strategy", "card drafting"],
    "description": "Draft cards to build your civilisation and outmanoeuvre your opponent. Easy to learn, surprisingly deep.",
    "image": "7-wonders-duel.jpg",
    "bggUrl": "https://boardgamegeek.com/boardgame/173346"
  }
]
```

### Field Notes

- `id` — kebab-case slug, unique per game.
- `owner` — string, always `"Rob"` for v1. The UI does NOT display or filter by owner yet. Include the field in the schema so it's ready when other people's games are added later.
- `players.min` / `players.max` — integer. Player count filter should match games where the selected number falls within this range (i.e. `min <= selected && max >= selected`).
- `playtime.min` / `playtime.max` — integer, in minutes.
- `complexity` — float, BGG weight scale (1.0–5.0). Displayed as a human-readable label:
  - 1.0–1.9 → "Light"
  - 2.0–2.9 → "Medium"
  - 3.0–3.9 → "Heavy"
  - 4.0–5.0 → "Expert"
- `genres` — array of lowercase strings. Used for multi-select filter. Genre list is derived dynamically from whatever values exist in the data (no hardcoded genre list).
- `description` — 1–2 sentences targeted at non-gamers. Describes the vibe, not the mechanics.
- `image` — filename string. For v1, images may not exist for all games. Render a **coloured placeholder with the game name** when the image is missing or the field is empty. Placeholder colour can be derived from a hash of the game name for visual variety.
- `bggUrl` — optional. If present, render as a small "View on BGG" link in the detail view.

## UI Specification

### Layout

Single page. No routing needed. Mobile-first responsive design.

Structure (top to bottom):
1. **Header** — app title ("Board Game Library" or similar), minimal.
2. **Search bar** — text input, filters game list by name (case-insensitive substring match is fine, no need for fuzzy search libraries).
3. **Filter controls** — horizontal bar or collapsible section:
   - **Player count** — "How many players?" dropdown or number input. Filters to games where the selected count is within the game's min–max range.
   - **Complexity** — multi-select chips: Light, Medium, Heavy, Expert. Selecting one or more shows games in those bands.
   - **Genre** — multi-select chips. Dynamically populated from all unique genres across the dataset.
4. **Active filter pills** — show currently active filters with an × to remove each, plus a "Clear all" option.
5. **Game grid** — responsive card grid (CSS grid or flex). 1 column on mobile, 2–3 on tablet, 3–4 on desktop.
6. **Empty state** — friendly message when no games match filters ("No games match your filters. Try adjusting your search.").

### Game Card

Each card shows:
- Game image (or coloured placeholder)
- Game name (prominent)
- Player count range (e.g. "2–4 players")
- Playtime range (e.g. "30–60 min")
- Complexity badge with label and colour coding:
  - Light → green
  - Medium → yellow/amber
  - Heavy → orange
  - Expert → red
- Genre tags (small, muted chips)

Clicking/tapping a card expands it (inline expand or modal — your call, but inline expand is simpler) to show:
- Full description
- BGG link (if `bggUrl` exists)

### Filter Behaviour

- All filters are AND-combined (search text AND player count AND complexity AND genre must all match).
- Genre filter is OR within itself (selecting "strategy" and "party" shows games that have either genre).
- Clearing all filters shows the full collection.
- Filters should feel instant — no loading states needed, it's all client-side over a small dataset (likely <200 games).

### Design Direction

- Clean, minimal, modern. Think a simple product catalog, not a gaming site.
- Light background, no dark mode for v1.
- Use a clean sans-serif font (system font stack or Inter from Google Fonts).
- Avoid visual clutter. Generous whitespace. Cards should breathe.
- No animations beyond basic hover/expand transitions.
- Australian English in any UI copy (e.g. "colour" not "color" in user-facing text — CSS class names are fine as-is).

## Sample Data

Seed `games.json` with these 8 games for development and testing. Data should be accurate:

```json
[
  {
    "id": "7-wonders-duel",
    "name": "7 Wonders Duel",
    "owner": "Rob",
    "players": { "min": 2, "max": 2 },
    "playtime": { "min": 30, "max": 30 },
    "complexity": 2.2,
    "genres": ["strategy", "card drafting"],
    "description": "Draft cards across three ages to build your civilisation and outmanoeuvre your opponent. Easy to pick up, surprisingly deep.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/173346"
  },
  {
    "id": "catan",
    "name": "Catan",
    "owner": "Rob",
    "players": { "min": 3, "max": 4 },
    "playtime": { "min": 60, "max": 120 },
    "complexity": 2.3,
    "genres": ["strategy", "negotiation"],
    "description": "Trade resources and build settlements on an island. The one that got a lot of people into board games.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/13"
  },
  {
    "id": "codenames",
    "name": "Codenames",
    "owner": "Rob",
    "players": { "min": 4, "max": 8 },
    "playtime": { "min": 15, "max": 30 },
    "complexity": 1.3,
    "genres": ["party", "word game"],
    "description": "Two teams compete to guess words from one-word clues. Great for big groups and always generates laughs.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/178900"
  },
  {
    "id": "pandemic",
    "name": "Pandemic",
    "owner": "Rob",
    "players": { "min": 2, "max": 4 },
    "playtime": { "min": 45, "max": 60 },
    "complexity": 2.4,
    "genres": ["cooperative", "strategy"],
    "description": "Work together as a team to stop global outbreaks. Everyone wins or everyone loses — no backstabbing here.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/30549"
  },
  {
    "id": "ticket-to-ride",
    "name": "Ticket to Ride",
    "owner": "Rob",
    "players": { "min": 2, "max": 5 },
    "playtime": { "min": 30, "max": 60 },
    "complexity": 1.8,
    "genres": ["family", "strategy"],
    "description": "Collect train cards and claim railway routes across the map. Simple rules, satisfying strategy.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/9209"
  },
  {
    "id": "wingspan",
    "name": "Wingspan",
    "owner": "Rob",
    "players": { "min": 1, "max": 5 },
    "playtime": { "min": 40, "max": 70 },
    "complexity": 2.4,
    "genres": ["strategy", "engine building"],
    "description": "Build the best bird sanctuary by attracting birds to your wildlife preserve. Beautiful art, relaxing gameplay.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/266192"
  },
  {
    "id": "gloomhaven-jaws-of-the-lion",
    "name": "Gloomhaven: Jaws of the Lion",
    "owner": "Rob",
    "players": { "min": 1, "max": 4 },
    "playtime": { "min": 60, "max": 120 },
    "complexity": 3.6,
    "genres": ["cooperative", "dungeon crawler", "campaign"],
    "description": "A tactical dungeon-crawling campaign that teaches you as you play. Serious commitment but very rewarding.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/291457"
  },
  {
    "id": "sushi-go-party",
    "name": "Sushi Go Party!",
    "owner": "Rob",
    "players": { "min": 2, "max": 8 },
    "playtime": { "min": 20, "max": 30 },
    "complexity": 1.3,
    "genres": ["party", "card drafting"],
    "description": "Pass cards around the table and collect the best combo of sushi dishes. Dead simple, plays in 20 minutes.",
    "image": "",
    "bggUrl": "https://boardgamegeek.com/boardgame/192291"
  }
]
```

## Build Steps

Execute in this order:

### 1. Scaffold the project
- `npm create vite@latest board-game-catalog -- --template react`
- Install Tailwind CSS v4 (follow current Vite + Tailwind docs)
- Verify dev server runs with a hello world

### 2. Set up data layer
- Create `public/games.json` with the sample data above
- Create a `useGames` hook that fetches and returns the games array
- Create filter/search utility functions (pure functions, easy to test)

### 3. Build the game card grid
- `GameCard` component — displays a single game with placeholder image, name, players, playtime, complexity badge, genre tags
- `GameGrid` component — responsive grid layout rendering `GameCard` components
- Placeholder image: generate a background colour from a hash of the game name, display the game name centred in white text

### 4. Build search and filters
- Search input — filters by name (case-insensitive substring)
- Player count filter — number input or dropdown
- Complexity filter — multi-select chips (Light / Medium / Heavy / Expert)
- Genre filter — dynamically generated multi-select chips from data
- Active filter pills with × dismiss and "Clear all"
- All filters AND-combined, genres OR within themselves

### 5. Build game detail expand
- Click/tap a card to expand and show full description + BGG link
- Keep it simple — inline expand below the card or a lightweight modal

### 6. Polish
- Empty state message when no results match
- Responsive layout testing (mobile, tablet, desktop)
- Clean up spacing, typography, colour consistency
- Ensure Australian English in all user-facing copy

### 7. Production build
- `npm run build` — verify `dist/` output is clean and self-contained
- Test the production build locally with `npx serve dist`

## What NOT to Build

Do not add any of the following. These are deliberately excluded from v1:

- User authentication or login
- Admin panel or game editing UI
- Owner filter or owner display on cards
- Ratings or personal scores
- Wishlist or "want to play" lists
- Play logging or session tracking
- Sort controls (alphabetical, by complexity, etc.)
- Dark mode
- Animations beyond basic CSS transitions
- Backend API or database
- BGG import pipeline
- Image upload functionality

## File Structure

```
board-game-catalog/
├── public/
│   └── games.json
├── src/
│   ├── components/
│   │   ├── GameCard.jsx
│   │   ├── GameGrid.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── FilterPills.jsx
│   │   └── GameDetail.jsx
│   ├── hooks/
│   │   └── useGames.js
│   ├── utils/
│   │   ├── filters.js
│   │   └── complexity.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js (if needed for v4)
```
