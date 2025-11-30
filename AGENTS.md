# Codebase context for AI agents

---

## ⚠️ IMPORTANT: Shell Environment Setup

**CRITICAL**: Before running ANY `pnpm` or `node` commands, you MUST first run:

```bash
nvm use 24
```

This loads Node.js v24.11.1 into the shell environment. Without this, pnpm and node commands will fail with "command not found" errors.

### Example Command Pattern

```bash
# WRONG - Will fail
pnpm build

# CORRECT - Always load nvm first
nvm use 24 && pnpm build
```

### Why This Is Needed

- The shell doesn't automatically load Node.js from nvm
- Node.js is installed via nvm in `~/.nvm/versions/node/v24.11.1/`
- Each new shell session requires loading nvm explicitly

---

## Project Overview

**Graz** is a React hooks library for building applications in the Cosmos ecosystem. It provides a comprehensive set of hooks and utilities for wallet connections, signing clients, token transfers, smart contract interactions, and multi-chain support.

### Key Features

- 20+ React hooks for Cosmos wallet interactions
- Multi-wallet support (Keplr, Leap, Cosmostation, Vectis, Station, XDefi, Metamask Snap, WalletConnect, Compass, Initia, OKX, Para, Cosmiframe)
- Multi-chain support (connect and interact with multiple chains simultaneously)
- Built on `@tanstack/react-query` and `zustand` for state management
- TypeScript-first with full type safety
- Tree-shakeable and optimized for production

### Tech Stack

- **TypeScript** - Primary language
- **React** (>=19) - UI library
- **Next.js** - react framework
- **Astro.js** - web framework
- **TailwindCss** - Utility first CSS framework
- **@tanstack/react-query** - Data fetching and caching
- **Zustand** - State management (stores wallet state, session, configuration)
- **Turbo** - Monorepo build system
- **pnpm** - Package manager

---

## Key Files Reference

### Essential Files for Understanding Codebase

1. **`packages/eslint-config`**: Shared eslint config
2. **`packages/typescript-config`**: Shared typescript config that is extended in tsconfig of every app
3. **`packages/ui`**: Shared UI components for all the apps. Uses tailwind and shadcn. Any new shadcn component is to be added here and then imported
4. **`apps/bio`**: An astro.js application
5. **`apps/blog`**: An next.js application
6. **`apps/portfolio`**: An next.js application

### Configuration Files

- **`turbo.json`**: Turborepo build pipeline
- **`.nvmrc`**: node version
- **`pnpm-workspace.yaml`**: Workspace configuration
- **`packages/eslint-config/package.json`**: Dependencies and exports of eslint-config
- **`packages/typescript-config/package.json`**: Dependencies and exports of typescript-config
- **`packages/ui/package.json`**: Dependencies and exports of ui

---

## Resources and Links

- **GitHub**: https://github.com/BlankRiser/monorepo

---

## Common Patterns and Gotchas

### 1. SSR Safety

TODO

---

## When Working on This Codebase

### Adding a New Hook

TODO

### Modifying Zustand Store Schema

TODO

### Debugging Tips

- **Check stores**: Use Zustand devtools
- **React Query**: Use React Query Devtools

---

## Library instructions

### TypeScript

- Only create an abstraction if it’s actually needed
- Prefer clear function/variable names over inline comments
- Avoid helper functions when a simple inline expression would suffice
- Use `knip` to remove unused code if making large changes
- The `gh` CLI is installed, use it
- Don’t use emojis

### React

- Avoid massive JSX blocks and compose smaller components
- Colocate code that changes together
- Avoid `useEffect` unless absolutely needed

### Tailwind

- Mostly use built-in values, occasionally allow dynamic values, rarely globals
- Always use v4 + global CSS file format + shadcn/ui

### Next

- Prefer fetching data in RSC (page can still be static)
- Use next/font + next/script when applicable
- next/image above the fold should have `sync` / `eager` / use `priority` sparingly
- Be mindful of serialized prop size for RSC → child components

### TypeScript

- Don’t unnecessarily add `try`/`catch`
- Don’t cast to `any`
