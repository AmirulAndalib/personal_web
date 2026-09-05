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
bun run lint       # prettier --check . && eslint .
bun run format     # prettier --write .
```

**Invariant**: after any code change, `bun run check` and `bun run lint` must pass.

## Svelte conventions

- Svelte 5 runes are the default: `let x = $state(...)`, `$derived(...)`, `$effect(...)`, `let { foo } = $props()`, `{@render children()}` in the layout.
- Cross-page shared state still uses classic `writable` stores from `src/lib/stores/index.ts` (`currentSection`, `isDarkMode`) read with `$store` syntax — both styles coexist deliberately.
- `onMount` is used to sync store values from `document`/`window` (e.g. re-reading the `dark` class, current pathname).
- Component-local styles use plain CSS or `lang="scss"`; global tokens live in `src/app.css` (`@layer base`), never in component `<style>` blocks.

## Styling conventions

- Tailwind utility classes inline in markup; `dark:` variants paired with light styles for every color choice.
- Dark mode is class-based (`darkMode: "class"` in `tailwind.config.js`); never rely on `prefers-color-scheme` in components — the FOUC script + `ThemeToggle` own that decision (see [ui/theme.md](ui/theme.md)).
- Dynamic Tailwind classes (e.g. `hoverColor` in `Social.ts`) must be written as complete literal strings so Tailwind's JIT scanner finds them in `./src/**/*.{html,js,svelte,ts}`.
- Page enter/exit animation uses `svelte/transition` (`slide`, `fly`, `scale`) with staggered delays (300–1300ms) — follow the existing delay ramp when adding sections.

## Link & SEO conventions

- Every external `<a>` uses `rel="noopener noreferer"` (+ `nofollow` for social links) and `target="_blank"`; every icon-only link has an `aria-label`.
- All `<title>`/meta/OG/Twitter tags are owned by `src/routes/+layout.svelte` — pages don't set their own head, except `ThemeToggle`'s FOUC script and `Analytics`' gtag script.
- Public env vars are read via `$env/dynamic/public` (`PUBLIC_BASE_URL`, `PUBLIC_GOOGLE_ANALYTICS`); see [app/summary.md](app/summary.md).

## Lode discipline

- One topic per file in `lode/`, Mermaid-only diagrams, relative links, <250 lines per file.
- After any behavior/structure change, update the affected lode file in the same session; the Lode describes *current state*, not history.
- Session scraps go to `lode/tmp/` (git-ignored); only durable knowledge enters the main lode.
