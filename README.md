# PORT Events - Frontend Application

A modern, responsive event management frontend built with React, TypeScript, and Vite.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── assets/             # Static assets (images, icons) — includes `assets/workshops/`
│   ├── components/         # Reusable UI components (Navbar, Footer, cards)
│   ├── pages/              # Top-level pages (Home, Events, Workshops)
│   ├── sections/           # Page sections (Hero, Timeline, Stats, etc.)
│   ├── constants/          # App data and constants (WORKSHOPS, EVENTS)
│   ├── types/              # TypeScript interfaces (Event, Workshop, Coordinator)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Notable updates

- Workshop images are now local assets under `src/assets/workshops/` and imported from `src/constants/index.ts`.
- `Workshop` types were updated (`Workshop.instructor.image` exists in types and constants), but the `Workshops` page renders a initials avatar instead of directly using instructor images to avoid layout/typing issues.
- If your editor shows a hint about `react/jsx-runtime`, install the React types (see Troubleshooting).

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` if needed and set any keys (e.g., `GEMINI_API_KEY`) used by the app.

3. Start the development server:
```bash
npm run dev
```

The app defaults to Vite's dev server (commonly on `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

## Troubleshooting / Editor Hints

- If TypeScript/IDE warns: "Could not find a declaration file for module 'react/jsx-runtime'", install the React type definitions:

```bash
npm i -D @types/react @types/react-dom
```

- If you update types in `src/types/index.ts`, restart your TypeScript server / editor to pick up changes.

## Technologies

- React 19
- TypeScript
- Vite
- React Router DOM
- Framer Motion
- Tailwind CSS
- Lucide React

## Path Aliases

Configured in `vite.config.ts`:
- `@` → `./src`
- `@components` → `./src/components`
- `@pages` → `./src/pages`
- `@sections` → `./src/sections`
- `@types` → `./src/types`
- `@constants` → `./src/constants`
- `@assets` → `./src/assets`

View app in AI Studio: https://ai.studio/apps/drive/1sX7Ob_94THyYXGBHZf8REDDu0b3I3LEh
