# PORT Events - Frontend Application

A modern, responsive event management platform built with React, TypeScript, and Vite.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── StatCard.tsx
│   │   └── EventCardPreview.tsx
│   ├── pages/              # Main page components
│   │   ├── Home.tsx
│   │   ├── Events.tsx
│   │   ├── Workshops.tsx
│   │   └── Register.tsx
│   ├── sections/           # Page-specific sections
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── FeaturedEventsSection.tsx
│   │   └── CoordinatorsSection.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/          # Application constants and data
│   │   └── index.ts
│   ├── assets/             # Static assets
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

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
