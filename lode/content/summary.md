# Content Model Overview

Site content is **data, not markup**: everything editable lives in typed TS modules under `src/lib/constants/` and is re-exported through the barrel `src/lib/constants/index.ts`:

```ts
// src/lib/constants/index.ts
export * from "./MainPage"
export * from "./Project"
export * from "./Social"
export * from "./Stack"
```

```mermaid
graph LR
  MP[MainPage.ts] --> IDX["MAIN_PAGE"]
  PJ[Project.ts] --> PR["PROJECT[]"]
  SO[Social.ts] --> SL["SOCIAL_LINKS[]"]
  ST[Stack.ts] --> SK["STACKS[]"]
  IDX --> NB[NavigationButton / ScrollHome]
  PR --> CARD["Card (via /project page)"]
  SL --> SOCIAL[Social (via / page)]
  SK --> STACK[Stack (via /about page)]
```

- Editing site content (projects, links, stack) requires **no component changes** — only the constant files.
- Icons come from two places: `unplugin-icons` virtual imports (social icons, nav icons) and static SVG assets in `src/lib/assets/icons/` (stack icons, imported as URL strings for `<img>`).
- Detailed shapes and per-constant invariants: [constants.md](constants.md).
- Navigation semantics of `MAIN_PAGE`: [app/routes.md](../app/routes.md).
