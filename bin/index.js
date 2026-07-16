#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
}

console.log(`${colors.cyan}${colors.bold}🚀 Welcome to the Frontend Kit Scaffolder!${colors.reset}\n`)

const targetDirName = process.argv[2] || 'frontend'
const targetPath = path.resolve(process.cwd(), targetDirName)

if (fs.existsSync(targetPath)) {
  console.error(`${colors.red}❌ Error: Folder "${targetDirName}" already exists at: ${targetPath}${colors.reset}`)
  console.log(`Please delete the folder first or choose another name.`)
  process.exit(1)
}

console.log(`Creating directory tree for: ${colors.green}${targetDirName}${colors.reset}...`)
fs.mkdirSync(targetPath, { recursive: true })

// Create the clean directory structure
const subDirs = [
  'src/assets',
  'src/components',
  'src/context',
  'src/hooks',
  'src/lib',
  'src/pages',
  'src/utils'
]

subDirs.forEach(dir => {
  fs.mkdirSync(path.join(targetPath, dir), { recursive: true })
})

const templates = {}

// 1. package.json
templates['package.json'] = `{
  "name": "${targetDirName}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.13",
    "@tailwindcss/vite": "^4.1.16",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.548.0",
    "next-themes": "^0.4.6",
    "prettier": "^3.6.2",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.5",
    "socket.io-client": "^4.8.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.16"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/node": "^24.9.2",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "tw-animate-css": "^1.4.0",
    "vite": "^7.1.7"
  }
}`

// 2. vite.config.js
templates['vite.config.js'] = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})`

// 3. eslint.config.js
templates['eslint.config.js'] = `import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'off',
    },
  },
 ]`

// 4. .prettierrc
templates['.prettierrc'] = `{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}`

// 5. index.html
templates['index.html'] = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Tailwind v4 App</title>
  </head>
  <body class="bg-zinc-950 text-zinc-50 antialiased min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`

// 6. src/index.css
templates['src/index.css'] = `@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

body {
  font-family: ui-sans-serif, system-ui, sans-serif;
}`

// 7. src/main.jsx
templates['src/main.jsx'] = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`

// 8. src/App.jsx
templates['src/App.jsx'] = `import { Home, About, NotFound, Test } from './pages'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from './Layout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App`

// 9. src/Layout.jsx
templates['src/Layout.jsx'] = `import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <header className="border-b border-zinc-900 py-4 px-6 bg-zinc-950 flex items-center justify-between shadow-sm">
        <span className="font-extrabold text-xl text-indigo-500">Frontend Application</span>
        <nav className="flex items-center gap-4 text-sm font-semibold text-zinc-400">
          <Link to="/" className="hover:text-zinc-100 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-zinc-100 transition-colors">About</Link>
          <Link to="/test" className="hover:text-zinc-100 transition-colors">Test</Link>
        </nav>
      </header>

      <main className="flex-grow p-6 max-w-5xl w-full mx-auto">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-900 py-4 text-center text-xs text-zinc-500 bg-zinc-950">
        Scaffolded by frontendinstall
      </footer>
    </div>
  )
}`

// 10. src/pages/index.js
templates['src/pages/index.js'] = `export { default as Home } from './Home.jsx'
export { default as About } from './About.jsx'
export { default as Test } from './Test.jsx'
export { default as NotFound } from './NotFound.jsx'`

// 11. src/pages/Home.jsx
templates['src/pages/Home.jsx'] = `import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-sm font-semibold">
        Tailwind CSS v4.0 Active
      </div>
      <h1 className="text-4xl font-extrabold text-slate-100">
        Home View
      </h1>
      <p className="text-slate-400 max-w-md text-base leading-relaxed">
        Your project routing structure is set up with all core folders. This is the main landing page!
      </p>
    </div>
  )
}`

// 12. src/pages/About.jsx
templates['src/pages/About.jsx'] = `import React from 'react'

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-100">
        About View
      </h1>
      <p className="text-slate-400 max-w-md text-base leading-relaxed">
        This is the about page. Setup with React Router nested layout routing.
      </p>
    </div>
  )
}`

// 13. src/pages/Test.jsx
templates['src/pages/Test.jsx'] = `import React from 'react'

export default function Test() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
      <h1 className="text-4xl font-extrabold text-slate-100">
        Test View
      </h1>
      <p className="text-slate-400 max-w-md text-base leading-relaxed">
        Testing ground. Try click behaviors or check styling rules here.
      </p>
      <button
        onClick={() => alert('React state action works!')}
        className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md cursor-pointer"
      >
        Test Event Handler
      </button>
    </div>
  )
}`

// 14. src/pages/NotFound.jsx
templates['src/pages/NotFound.jsx'] = `import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
      <h1 className="text-6xl font-black text-red-500">404</h1>
      <h2 className="text-2xl font-bold text-slate-200">Page Not Found</h2>
      <p className="text-slate-400 max-w-md text-base">
        The requested route does not exist.
      </p>
      <Link to="/" className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 rounded-xl transition-colors cursor-pointer">
        Go Back Home
      </Link>
    </div>
  )
}`

// 15. src/components/ErrorBoundary.jsx
templates['src/components/ErrorBoundary.jsx'] = `import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-500">Something went wrong.</h1>
          <p className="text-zinc-400 max-w-md font-mono text-xs bg-zinc-900 p-4 rounded border border-zinc-800">
            {this.state.error?.toString()}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg border border-zinc-700 transition-all cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}`

// 16. src/components/theme-provider.jsx
templates['src/components/theme-provider.jsx'] = `import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemeProvider attribute="class" {...props}>
      {children}
    </NextThemeProvider>
  )
}`

// 17. src/lib/utils.js
templates['src/lib/utils.js'] = `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}`

// Loop through each template definition and write it
Object.entries(templates).forEach(([filePath, content]) => {
  const fullPath = path.join(targetPath, filePath)
  console.log(`Writing template file: ${colors.yellow}${filePath}${colors.reset}`)
  fs.writeFileSync(fullPath, content, 'utf8')
})

console.log(`\n${colors.cyan}📦 Starting package installation inside ${colors.bold}${targetDirName}${colors.cyan}...${colors.reset}`)
console.log(`This may take a moment. Running ${colors.bold}npm install${colors.reset}...\n`)

try {
  execSync('npm install', {
    cwd: targetPath,
    stdio: 'inherit'
  })
  console.log(`\n${colors.green}✨ Done! The project was successfully scaffolded and all dependencies installed.${colors.reset}`)
  console.log(`\nTo get started, run these commands:`)
  console.log(`${colors.magenta}  cd ${targetDirName}${colors.reset}`)
  console.log(`${colors.magenta}  npm run dev${colors.reset}\n`)
} catch (error) {
  console.error(`\n${colors.red}❌ Error occurred while running npm install:${colors.reset}`)
  console.error(error.message)
  console.log(`\n${colors.yellow}⚠️ Please run "npm install" manually inside the "${targetDirName}" folder.${colors.reset}`)
}
