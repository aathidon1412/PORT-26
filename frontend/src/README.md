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
│   ├── assets/             # Static assets (images, icons, etc.)
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Public static files
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file (if needed):
   ```bash
   cp .env.example .env.local
   ```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 🎨 Technologies Used

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## 📁 Component Organization

### Components (`src/components/`)
Reusable, standalone UI components that can be used across different pages:
- **Navbar** - Main navigation bar with responsive menu
- **Footer** - Site footer with links and contact info
- **StatCard** - Animated statistics display card
- **EventCardPreview** - Event preview card component

### Pages (`src/pages/`)
Top-level page components that correspond to routes:
- **Home** - Landing page with hero, stats, and featured content
- **Events** - Complete event listing with filters
- **Workshops** - Workshop showcase with registration
- **Register** - Multi-step registration form

### Sections (`src/sections/`)
Larger page sections that compose pages:
- **HeroSection** - Hero banner with call-to-action
- **StatsSection** - Statistics overview
- **AboutSection** - Department information
- **TimelineSection** - Event timeline with multiple tracks
- **FeaturedEventsSection** - Highlighted events grid
- **CoordinatorsSection** - Contact information

## 🔧 Configuration

### Path Aliases

The following path aliases are configured in `vite.config.ts`:

- `@` → `./src`
- `@components` → `./src/components`
- `@pages` → `./src/pages`
- `@sections` → `./src/sections`
- `@types` → `./src/types`
- `@constants` → `./src/constants`
- `@assets` → `./src/assets`

Usage example:
```typescript
import Navbar from '@components/Navbar';
import { EVENTS } from '@constants';
import { Event } from '@types';
```

## 📝 Code Style

- Use functional components with TypeScript
- Follow React hooks best practices
- Use meaningful component and variable names
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Maintain consistent file naming (PascalCase for components)

## 🤝 Contributing

1. Follow the established folder structure
2. Create new components in appropriate directories
3. Update types in `src/types/` for new data structures
4. Add constants in `src/constants/` for static data
5. Write clean, well-documented code

## 📄 License

All rights reserved © 2026 PORT Events
