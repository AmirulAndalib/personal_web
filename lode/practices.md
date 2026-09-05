# Practices

Patterns and conventions this project follows. Keep new code consistent with these.

## Tooling & commands

Package manager is **bun** (`bun.lockb`). Scripts from `package.json`:

```bash
bun install        # install dependencies
bun run dev        # vite dev server
bun run build      # production build (Cloudflare adapter)
bun run preview    # preview the build
bun run check      # svelte-check typecheck (run after every change)
bun run lint       # prettier --check . && eslint . (flat config: eslint.config.js)
bun run format     # prettier --write .
```

**Invariant**: after any code change, `bun run check` and `bun run lint` must pass.

**TypeScript version pin**: TypeScript stays on the **6.0.x** (JS-based) line. Do **not** bump to TS 7 (the Go-native rewrite) — `svelte-check`, `@sveltejs/kit`, and `typescript-eslint` all cap their peer ranges below it (`^6.0.0` / `<6.1.0`) and the whole toolchain breaks.

## Svelte conventions

- Svelte 5 runes are the default: `let x = $state(...)`, `$derived(...)`, `$effect(...)`, `let { foo } = $props()`, `{@render children()}` in the layout.
- Cross-page shared state still uses classic `writable` stores from `src/lib/stores/index.ts` (`currentSection`, `isDarkMode`) read with `$store` syntax — both styles coexist deliberately.
- `onMount` is used to sync store values from `document`/`window` (e.g. re-reading the `dark` class, current pathname).
- Component-local styles use plain CSS or `lang="scss"`; global tokens live in `src/app.css` (`@layer base`), never in component `<style>` blocks.

## Styling conventions

- Tailwind utility classes inline in markup; `dark:` variants paired with light styles for every color choice.
- Tailwind **v4** (CSS-first) via the `@tailwindcss/vite` plugin; no `tailwind.config.js`/PostCSS. Brand tokens live in `@theme` inside `src/app.css`.
- Dark mode is class-based; the `dark:` variant is registered with `@custom-variant dark (&:where(.dark, .dark *))` in `src/app.css` — never rely on `prefers-color-scheme` in components (see [ui/theme.md](ui/theme.md)).
- Dynamic Tailwind classes (e.g. `hoverColor` in `Social.ts`) must be written as complete literal strings so Tailwind v4's automatic source scanning picks them up.
- Page enter/exit animation uses `svelte/transition` (`slide`, `fly`, `scale`) with staggered delays (300–1300ms) — follow the existing delay ramp when adding sections.

## Link & SEO conventions

- Every external `<a>` uses `rel="noopener noreferer"` (+ `nofollow` for social links) and `target="_blank"`; every icon-only link has an `aria-label`.
- All `<title>`/meta/OG/Twitter tags are owned by `src/routes/+layout.svelte` — pages don't set their own head, except `ThemeToggle`'s FOUC script and `Analytics`' gtag script.
- Public env vars are read via `$env/dynamic/public` (`PUBLIC_BASE_URL`, `PUBLIC_GOOGLE_ANALYTICS`); see [app/summary.md](app/summary.md).

## Lode discipline

- One topic per file in `lode/`, Mermaid-only diagrams, relative links, <250 lines per file.
- After any behavior/structure change, update the affected lode file in the same session; the Lode describes _current state_, not history.
- Session scraps go to `lode/tmp/` (git-ignored); only durable knowledge enters the main lode.
