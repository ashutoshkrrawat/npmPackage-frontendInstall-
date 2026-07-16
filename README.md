# frontendinstall 🚀

> **One command. A complete, production-ready React frontend — instantly.**

A zero-configuration CLI that scaffolds a modern **React 19 + Vite 7 + Tailwind CSS v4** project with routing, dark mode theming, UI primitives, and a clean folder structure — all wired up and ready to run.

[![npm version](https://img.shields.io/npm/v/frontendinstall)](https://www.npmjs.com/package/frontendinstall)
[![license](https://img.shields.io/npm/l/frontendinstall)](./LICENSE)

---

## ⚡ Quick Start

No installation needed. Just run:

```bash
npx frontendinstall
```

Or with a custom project name:

```bash
npx frontendinstall my-app
```

Then:

```bash
cd my-app
npm run dev
```

That's it. Your app is live at `http://localhost:5173` 🎉

---

## 📦 Installation (Optional — Global)

If you prefer to have `frontendinstall` always available without `npx`:

```bash
npm install -g frontendinstall
```

Then use it anywhere:

```bash
frontendinstall my-project
```

---

## 🛠️ CLI Usage

```
frontendinstall [project-name]
```

| Argument       | Type     | Default      | Description                              |
|----------------|----------|--------------|------------------------------------------|
| `project-name` | `string` | `frontend`   | Name of the folder to scaffold into      |

### Examples

```bash
# Scaffold into a folder named "frontend" (default)
npx frontendinstall

# Scaffold into a folder named "dashboard"
npx frontendinstall dashboard

# Scaffold into a folder named "my-saas-app"
npx frontendinstall my-saas-app
```

> ⚠️ If the target folder already exists, the CLI will exit with an error. Delete or rename the existing folder first.

---

## 📁 Generated Project Structure

```
my-app/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── .prettierrc
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Root component with routing
    ├── Layout.jsx            # Shared layout (header + footer)
    ├── index.css             # Tailwind v4 base styles
    ├── assets/               # Static assets
    ├── components/
    │   ├── ErrorBoundary.jsx # Global error boundary
    │   └── theme-provider.jsx# next-themes dark mode wrapper
    ├── context/              # React context files (empty, ready to use)
    ├── hooks/                # Custom hooks (empty, ready to use)
    ├── lib/
    │   └── utils.js          # cn() helper (clsx + tailwind-merge)
    ├── pages/
    │   ├── index.js          # Barrel export for all pages
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Test.jsx
    │   └── NotFound.jsx      # 404 fallback route
    └── utils/                # Utility functions (empty, ready to use)
```

---

## 🔋 What's Included

### Core Stack

| Technology         | Version  | Purpose                            |
|--------------------|----------|------------------------------------|
| React              | ^19.1.1  | UI library                         |
| Vite               | ^7.1.7   | Build tool & dev server            |
| Tailwind CSS       | ^4.1.16  | Utility-first CSS framework        |
| React Router DOM   | ^7.9.5   | Client-side routing                |

### UI & Theming

| Package                   | Purpose                                      |
|---------------------------|----------------------------------------------|
| `next-themes`             | Dark/light mode toggle with system sync      |
| `@radix-ui/react-label`   | Accessible label primitive                   |
| `@radix-ui/react-slot`    | Component composition utility                |
| `@radix-ui/react-tabs`    | Accessible tabs primitive                    |
| `lucide-react`            | Icon library (600+ icons)                    |
| `sonner`                  | Toast notification system                    |
| `class-variance-authority`| Variant-based component styling              |
| `clsx` + `tailwind-merge` | Safe class merging via `cn()` utility        |

### Pre-configured Routes

| Route     | Component       | Description             |
|-----------|-----------------|-------------------------|
| `/`       | `Home.jsx`      | Main landing page       |
| `/about`  | `About.jsx`     | About page              |
| `/test`   | `Test.jsx`      | Testing/sandbox page    |
| `/*`      | `NotFound.jsx`  | 404 catch-all           |

### Dev Tooling

| Tool       | Config File        | Purpose                      |
|------------|--------------------|------------------------------|
| ESLint     | `eslint.config.js` | Code linting (flat config)   |
| Prettier   | `.prettierrc`      | Code formatting              |

---

## 🧩 Available Scripts (in generated project)

After scaffolding, `cd` into your project and use these scripts:

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint across the project
npm run format    # Run Prettier to auto-format all files
```

---

## 🌙 Dark Mode

Dark mode is powered by `next-themes` with class-based toggling. The `ThemeProvider` is pre-wired in `App.jsx` with `defaultTheme="dark"`.

To toggle the theme in your app, use the `useTheme` hook:

```jsx
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

---

## 🎨 Using the `cn()` Utility

The `cn` helper in `src/lib/utils.js` merges Tailwind classes safely, preventing conflicts:

```js
import { cn } from '@/lib/utils'

// Conditionally apply classes
<div className={cn('px-4 py-2', isActive && 'bg-indigo-600', 'text-white')}>
```

---

## 🔗 Path Aliases

The `@/` alias is pre-configured in `vite.config.js` to point to `src/`:

```js
import { cn } from '@/lib/utils'
import MyComponent from '@/components/MyComponent'
```

---

## 🐛 Troubleshooting

**Folder already exists error:**
```
❌ Error: Folder "my-app" already exists at: /path/to/my-app
```
Delete or rename the existing folder, then re-run the command.

**`npm install` failed during scaffolding:**
The CLI will notify you. Manually run:
```bash
cd my-app
npm install
```

**Command not found (`frontendinstall`):**
If installed globally, ensure your npm global bin directory is in your `PATH`. Run `npm bin -g` to find the path, then add it to your shell config.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push and open a PR

---

## 📄 License

ISC © [ashutosh_kr_dev](https://www.npmjs.com/~ashutosh_kr_dev)
