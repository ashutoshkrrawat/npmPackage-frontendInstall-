# frontendinstall 🚀

A lightweight CLI package that automatically scaffolds a modern React 19 + Vite 7 + Tailwind CSS v4.0 project pre-configured with React Router v7, Radix UI layout components, next-themes dark mode support, and Sonner toast notifications in a single command.

## Quick Start (Local Development)

To test the generator locally:

1. **Install globally or link package**:
   In the CLI root directory (`npmPackage2.0`), make the package executable by linking it:
   ```bash
   npm link
   ```

2. **Run the generator command**:
   In any directory where you want to scaffold a new project, run:
   ```bash
   frontendinstall
   ```
   *Note: If you want to specify a custom folder name instead of the default `frontend`, run:*
   ```bash
   frontendinstall my-custom-app-name
   ```

3. **Run your new application**:
   ```bash
   cd frontend
   npm run dev
   ```

---

## What gets generated?

- **`vite.config.js`**: Tailored config loading `@tailwindcss/vite` and `@vitejs/plugin-react` alongside path aliases (`@/`).
- **`src/index.css`**: Tailwind v4 integration setting up native CSS variables and class-based dark mode (`@variant dark (&:where(.dark, .dark *));`).
- **`src/main.jsx`**: Fully wrapped with React Router's `BrowserRouter`, `ThemeProvider` from `next-themes`, and Sonner's `Toaster` notifications.
- **`src/App.jsx`**: A high-fidelity dark-mode-ready dashboard displaying custom navigation, tabs (Radix), interactive inputs, and toast buttons.
- **`src/lib/utils.js`**: Preconfigured helper function `cn` using `clsx` and `tailwind-merge` to combine Tailwind classes cleanly.
- **Linters & Formatters**:
  - `eslint.config.js` with ESM support.
  - `.prettierrc` configuration file.

## Publishing to npm

To make it available globally via `npx frontendinstall`:

1. Login to your npm account:
   ```bash
   npm login
   ```
2. Publish the package:
   ```bash
   npm publish
   ```
3. Users can then immediately run:
   ```bash
   npx frontendinstall
   ```
