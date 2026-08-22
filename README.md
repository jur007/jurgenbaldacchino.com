# jurgenbaldacchino.com

Personal engineering portfolio and technical leadership showcase for **Jurgen Baldacchino** (Head of Frontend & React Engineer).

Built with **React 19**, **TypeScript**, **Vite**, and **CSS Modules**, engineered for speed, strict accessibility (WCAG AA), and modular architecture.

---

## ⚡ Tech Stack

- **Core:** React 19, TypeScript
- **Build Tool & Bundler:** Vite 8
- **Styling:** CSS Modules with Design Tokens (CSS custom properties, 0 runtime overhead)
- **Security & Spam Protection:** Cloudflare Turnstile
- **Testing:** Vitest, Testing Library (`@testing-library/react`, `@testing-library/user-event`)
- **Code Quality & Linting:** ESLint 9 (flat config), Prettier
- **Git Hooks & Standards:** Husky, Commitlint (Conventional Commits), lint-staged
- **CI/CD:** GitHub Actions automated quality pipeline

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Installation

```bash
npm install
```

### Development Server

Starts the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

---

## 🛠️ Scripts & Quality Gates

| Command                 | Description                                                     |
| :---------------------- | :-------------------------------------------------------------- |
| `npm run dev`           | Starts the local Vite development server                        |
| `npm run build`         | Typechecks with `tsc` and compiles production bundle to `dist/` |
| `npm run preview`       | Previews the local production build                             |
| `npm run test`          | Runs the test suite in watch mode with Vitest                   |
| `npm run test:run`      | Runs the full unit test suite once                              |
| `npm run test:coverage` | Generates a test coverage report                                |
| `npm run lint`          | Lints all files using ESLint                                    |
| `npm run lint:fix`      | Automatically fixes autofixable ESLint issues                   |
| `npm run format:check`  | Verifies code formatting with Prettier                          |
| `npm run format`        | Formats all files with Prettier                                 |
| `npm run typecheck`     | Runs static type checking across the project                    |

---

## 🏛️ Project Architecture

```text
jurgenbaldacchino.com/
├── public/               # Static assets & favicons
├── src/
│   ├── assets/           # Optimized images & media assets
│   ├── components/       # Self-contained, modular UI components
│   │   ├── about-section/
│   │   ├── ai-section/
│   │   ├── badge/
│   │   ├── button/
│   │   ├── card/
│   │   ├── chat-section/
│   │   ├── home-section/
│   │   ├── input/
│   │   ├── page-layout/
│   │   └── site-footer/
│   ├── pages/            # Page routing components
│   ├── styles/           # Global design tokens (colors, typography, grid)
│   ├── test/             # Test setup and shared mocks
│   ├── utils/            # Utility helpers
│   ├── App.tsx           # Client-side router and root layout
│   └── main.tsx          # Application entry point
├── .github/workflows/    # GitHub Actions CI/CD workflows
└── index.html            # HTML entry point with semantic metadata
```

---

## 📄 License

Private repository. © [Jurgen Baldacchino](https://jurgenbaldacchino.com). All rights reserved.
