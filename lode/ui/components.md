# Component Inventory

The 8 shared components in `src/lib/components/`. All are mounted globally by `+layout.svelte` except where noted.

| Component                 | Mounted         | Purpose                                                   |
| ------------------------- | --------------- | --------------------------------------------------------- |
| `Analytics.svelte`        | layout          | Google Analytics (gtag) injection + SPA pageview tracking |
| `ThemeToggle.svelte`      | layout          | Dark mode button + FOUC head script                       |
| `NavigationButton.svelte` | layout          | Fixed bottom prev/next arrows across `MAIN_PAGE`          |
| `ScrollHome.svelte`       | layout          | Fixed bottom-left "home" arrow                            |
| `HelperButton.svelte`     | layout          | Fixed bottom-right "?" opening a floating link menu       |
| `Social.svelte`           | `/` page        | Row of social icon links from `SOCIAL_LINKS`              |
| `Stack.svelte`            | `/about` page   | Tech-stack icon grid from `STACKS`                        |
| `Card.svelte`             | `/project` page | One project card; props spread from a `PROJECT` entry     |

## Contracts

### Analytics

Activates only when `env.PUBLIC_GOOGLE_ANALYTICS` is set: injects `googletagmanager.com/gtag.js` in `svelte:head`, shims `window.gtag`, and on route change re-sends `config` with `page_title` + `page_path`. No-ops entirely without the env var.

### ThemeToggle

Inline head script resolves the theme (`localStorage.theme`, falling back to `prefers-color-scheme`) before paint; button toggles the `dark` class on `<html>`, updates `isDarkMode`, persists `localStorage.theme`. Details: [ui/theme.md](theme.md).

### NavigationButton

`$state` array `navButtonDisabled[prev, next]` derived in `$effect` from `$currentSection`: index 0 → prev hidden; `max-1` → next hidden; `-1` (off-menu) → both hidden. Disabled buttons get `opacity: 0` (still occupying space).

### ScrollHome

Visible when `$currentSection > 1 || $currentSection === -1`; click sets `currentSection` to 0 and `goto("/")`.

### HelperButton

Local `helperActive = $state(false)`; the trigger button uses a local `clickOutside` Svelte action (capture-phase document click listener) to close the menu. Menu links: status page, `/support`, blog.

### Social

`{#each SOCIAL_LINKS}` → external anchors (`rel="noopener noreferer nofollow"`, `aria-label`), icon rendered as `<it.icon>` with spread props from the virtual icon import.

### Stack

Picks `iconDark` over `icon` when `$isDarkMode`; re-syncs `isDarkMode` from `<html>` class in `onMount`. Renders `<img src={...}>` from SVG asset imports (not inline SVG).

### Card

Props: `{ title, description, url, source?, stacks }` — matches the `Project` interface, so `<Card {...it} />` spread works. `getParsedSource()` shortens GitHub URLs to `owner/repo`. Stacks render as pink pill badges.

## Invariants

- Floating buttons all use the global `.nav-button` class and `fixed` positioning (`bottom-5`/`bottom-14` + `right-5`/`right-14`); keep new chrome out of those corners.
- Icon links always carry `aria-label` + `role="button"`; external links always `rel="noopener noreferer"` + `target="_blank"`.
- Content never hardcodes in components — it comes from `src/lib/constants/` (see [content/constants.md](../content/constants.md)).
