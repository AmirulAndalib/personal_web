# Constants Reference

Exact shapes and invariants of the four content constants. All live in `src/lib/constants/`, barrel-exported by `index.ts`.

## `MAIN_PAGE` — `MainPage.ts`

```ts
export const MAIN_PAGE = ["/", "/about", "/project"]
```

- **Ordered** — array index is the section index used by `currentSection`; `/` must remain element 0. See [app/routes.md](../app/routes.md).

## `PROJECT` — `Project.ts`

```ts
interface Project {
  title: string
  description: string
  stacks: string[] // free-form labels rendered as pills; NOT validated against STACKS
  url: string // live/demo link (required)
  source?: string // source-code link; GitHub URLs get displayed as "owner/repo"
}
```

- Rendered 1:1 by `Card` on `/project` via `<Card {...it} />` — keep this interface in sync with `Card`'s `Props`.

## `SOCIAL_LINKS` — `Social.ts`

```ts
import Github from "virtual:icons/mdi/github"   // unplugin-icons virtual import
// ...
export const SOCIAL_LINKS = [
  { link: "https://github.com/MrMissx",
    hoverColor: "hover:text-gray-800 dark:hover:text-gray-200",  // literal Tailwind classes
    label: "Github", icon: Github }, ...
]
```

- `hoverColor` strings are **literal Tailwind classes** — they must be written in full inside this `.ts` file so Tailwind v4's automatic source scanning picks them up. Composing them dynamically (e.g. `` `hover:text-${c}` ``) silently produces no CSS.
- `icon` values are Svelte components from `virtual:icons/<set>/<name>` (or `~icons/...` — both syntaxes work); render with `<it.icon>` in `Social.svelte`.

## `STACKS` — `Stack.ts`

```ts
import Docker from "$lib/assets/icons/docker.svg" // static SVG asset → URL string
export interface Stack {
  label: string
  icon: string // SVG asset URL
  iconDark?: string // alternate logo for dark backgrounds (e.g. nextjs-dark.svg)
  url: string // tech homepage
}
```

- Rendered by `Stack.svelte` as `<img>` tags (URLs, not inline SVG) — that's why `iconDark` swapping exists; see [ui/theme.md](../ui/theme.md).
- Adding a stack icon = drop the SVG in `src/lib/assets/icons/`, import it, append an entry.

## General invariants

- Constants hold **data only** — no imports of components, no DOM access.
- Every exported const is a `UPPER_SNAKE` array; interfaces are PascalCase and exported so pages/components can type against them.
