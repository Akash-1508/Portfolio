# Portfolio client

Vite + React portfolio: Tailwind v4, GSAP / ScrollTrigger, Framer Motion, Lenis smooth scroll, React Router.

## Scripts

| Command           | Purpose              |
| ----------------- | -------------------- |
| `npm run dev`     | Dev server (Vite)    |
| `npm run build`   | Production build     |
| `npm run preview` | Preview built output |

## Project tree

`node_modules/` and `dist/` are omitted.

```
client/
├── index.html                 # HTML shell, title/meta
├── package.json
├── vite.config.js             # Vite + Tailwind plugin, /api/config middleware
├── tsconfig.json              # Path alias @ → src (if used)
├── .env.example
├── public/
│   └── api/
│       └── config.json        # Optional JSON served at GET /api/config (dev)
└── src/
    ├── main.jsx               # React mount, GSAP plugin, providers stack
    ├── App.jsx                # Router, PageLoader, ScrollProgress, CustomCursor, routes
    ├── config/
    │   └── defaultConfig.js   # Default portfolio JSON shape (merge base)
    ├── context/
    │   ├── AppContext.jsx     # Site data: fetch /api/config, merge constants, useApp()
    │   ├── ThemeContext.jsx   # Light/dark + CSS variables
    │   └── SmoothScrollContext.jsx  # Lenis + ScrollTrigger proxy + scroll CSS vars
    ├── styles/
    │   └── global.css         # Base styles, Lenis html rules, theme tokens usage
    ├── utils/
    │   ├── constants.js       # NAV_LINKS, copy, projects, skills, experience, etc.
    │   ├── animations.js      # Shared GSAP / motion helpers
    │   └── motionVariants.js  # Framer Motion page variants
    ├── hooks/
    │   └── useTypingEffect.js
    ├── lib/
    │   └── utils.js           # cn() / small helpers
    ├── pages/
    │   ├── Home.jsx           # One-page layout: Navbar, lazy sections, Footer
    │   ├── Admin.jsx          # Optional admin / theme tooling
    │   ├── NotFound.jsx
    │   └── UiDemos.jsx
    ├── sections/              # Page sections (edit content/layout here)
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Projects.jsx
    │   ├── Experience.jsx
    │   ├── Education.jsx
    │   ├── Certifications.jsx
    │   └── Contact.jsx
    └── components/
        ├── Navbar.jsx
        ├── Footer.jsx
        ├── PageLoader.jsx
        ├── ScrollProgress.jsx
        ├── CustomCursor.jsx
        ├── ThemeToggle.jsx
        ├── SectionWrapper.jsx
        ├── SectionHeading.jsx
        ├── SectionSkeleton.jsx
        ├── Container.jsx
        ├── ScrollToTop.jsx
        ├── ProjectCard.jsx
        ├── PrimaryButton.jsx
        ├── SecondaryButton.jsx
        └── ui/                  # Reusable UI primitives
            ├── button.jsx
            ├── card.jsx
            ├── badge.jsx
            ├── radio-group.jsx
            ├── liquid-radio.jsx
            └── radial-orbital-timeline.jsx
```

## Where to control what

| Goal | Start here |
| ---- | ---------- |
| **All text, nav labels, projects, skills, jobs, education, certs** | `src/utils/constants.js` |
| **Override content without editing code** (optional) | `public/api/config.json` (same shape as defaults); dev server exposes `GET /api/config` via `vite.config.js` |
| **Default JSON shape / fallbacks** | `src/config/defaultConfig.js` |
| **Runtime merge + theme tint from config** | `src/context/AppContext.jsx` — `useApp()` in components |
| **Which sections appear on Home and order** | `src/pages/Home.jsx` (lazy imports + JSX) |
| **Per-section layout and copy wiring** | `src/sections/*.jsx` |
| **Global chrome** (loader, cursor, scroll bar, routes) | `src/App.jsx` |
| **Providers order** (theme → app data → Lenis) | `src/main.jsx` |
| **Smooth scroll feel + GSAP scroll sync** | `src/context/SmoothScrollContext.jsx` |
| **Light/dark palette** | `src/context/ThemeContext.jsx` + `src/styles/global.css` |
| **Site `<title>` / meta** | `index.html` |
| **Aliases / build / config API** | `vite.config.js` |

Quick path: change **`constants.js`** for bundled defaults; add or edit **`public/api/config.json`** if you want hot-swappable JSON in dev or in production behind `/api/config`.
