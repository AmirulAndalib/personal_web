# Terminology

Repository of short domain terms used across this project and its Lode.

- **Main page** - One of the three ordered routes in `MAIN_PAGE`: `/`, `/about`, `/project`. Only these participate in prev/next navigation.
- **Off-menu page** - Any route outside `MAIN_PAGE` (e.g. `/support`, the 404 catch-all). `currentSection` is `-1` there; prev/next buttons hide.
- **Section index** - Value of the `currentSection` store: the index into `MAIN_PAGE`, or `-1` for off-menu pages.
- **Constants** - The typed TS modules in `src/lib/constants/` (`MainPage`, `Project`, `Social`, `Stack`). Single source of truth for site content.
- **Store** - Svelte `writable` store from `src/lib/stores/index.ts`. Only two exist: `currentSection`, `isDarkMode`.
- **Runes** - Svelte 5 reactivity primitives (`$state`, `$derived`, `$effect`, `$props`) used in components alongside the legacy stores.
- **Dark class** - The `dark` class on `<html>` that switches all Tailwind `dark:` variants. Managed by `ThemeToggle`.
- **iconDark** - Optional alternate SVG on a `Stack` entry shown when dark mode is active (used when the light icon is invisible on dark backgrounds, e.g. Next.js).
- **Icon import** - `unplugin-icons` virtual module import; two equivalent syntaxes exist: `virtual:icons/<set>/<name>` and `~icons/<set>/<name>`.
- **Helper menu** - Floating "?" button (`HelperButton`) opening a small link menu: service status, support, blog.
- **nav-button** - Shared Tailwind component class defined in `src/app.css` for the floating navigation buttons (hover scale, zinc colors).
- **Adapter** - SvelteKit deployment target. `adapter-cloudflare` only; Docker/ghcr publishing was removed.
- **FOUC script** - Inline `<svelte:head>` script in `ThemeToggle` that applies the dark class before first paint to avoid a light flash.
