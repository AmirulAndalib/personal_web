# UI Overview

Styling stack and shared visual language of the site.

## Stack

Tailwind CSS 3 (JIT, class-based dark mode) + PostCSS + optional SCSS in components. Global styles live in `src/app.css`; Tailwind tokens extend two brand colors in `tailwind.config.js`:

```js
colors: { "primary-light": "#F5F5F5", "primary-dark": "#212121" }
```

## Global tokens (`src/app.css`)

- Fonts: **Plus Jakarta Sans** (body) and **Bebas Neue**, loaded from Google Fonts via `@import`.
- `body`: `bg-zinc-100 dark:bg-zinc-900`; `p`: zinc text that flips in dark mode.
- `.nav-button` component class (in `@layer base`) shared by `NavigationButton`, `ScrollHome`, `HelperButton`: `hover:scale-125 transform transition-all duration-300 ease-in-out`, zinc-500/zinc-400 with hover accent, transparent tap highlight.
- Custom thin rounded `::-webkit-scrollbar` (`#cad0d3` thumb, `#a8b5b8` on hover).
- `html { scroll-behavior: smooth }`.

## Motion conventions

Page/section entrances use `svelte/transition` primitives with a consistent stagger ramp:

```svelte
<section in:slide out:fly class="flex justify-center items-center h-screen ...">
  <h2 in:slide={{ delay: 300 }} ...>
  <div in:slide={{ delay: 500 }} ...>
```

- `in:slide`/`out:fly` on top-level sections; `scale` for pop-ins (`HelperButton` menu, blog button).
- Delays ramp roughly 300→1300ms; keep new sections inside this rhythm.

## Layout composition

All pages are full-viewport, centered flex sections (`h-screen` or `min-h-screen`, `mx-10 md:mx-20`, `text-center`). Floating chrome (theme toggle, home scroll, prev/next, helper menu) is mounted globally by the layout — see [ui/components.md](components.md).

## Theming

Dark mode is class-based; the full contract (FOUC script, store sync, `iconDark`) is in [ui/theme.md](theme.md).
