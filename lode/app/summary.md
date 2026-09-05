# App Shell

How the SvelteKit app is wired: config, adapters, preprocessing, environment, and the global layout.

## Build configuration

`svelte.config.js` uses **`@sveltejs/adapter-cloudflare`** as the active adapter (deployed to Cloudflare). `adapter-auto` and `adapter-node` are installed as ready alternatives — switching adapters is a one-line change plus a rebuild.

Styles are preprocessed through `vitePreprocess(sveltePreprocess({ postcss: true, defaults: { style: "postcss" } }))`, which is what lets `<style lang="scss">` blocks and Tailwind's PostCSS pipeline coexist.

```mermaid
graph TD
  subgraph Layout["+layout.svelte"]
    A[Analytics] --- TT[ThemeToggle]
    CH[children] --- SH[ScrollHome]
    NB[NavigationButton] --- HB[HelperButton]
  end
  L[svelte.config.js] -->|adapter| CF[Cloudflare]
  CSS[app.css] --> Layout
  E[$env/dynamic/public] --> A
  E --> SEO[OG/Twitter meta]
```

## Environment contract

Public runtime env vars (copy `.env.example` → `.env`):

| Variable | Used by | Effect when empty |
| --- | --- | --- |
| `PUBLIC_BASE_URL` | layout OG `og:url` meta | tag renders with empty content |
| `PUBLIC_GOOGLE_ANALYTICS` | `Analytics.svelte` | gtag script tag and tracking are skipped entirely |

**Invariant**: env vars are always read through `$env/dynamic/public`, never `import.meta.env` or hardcoded values.

## Global layout (`src/routes/+layout.svelte`)

The layout owns all SEO head tags: `<title>` is `Gaung Ramadhan` on `/` and `Gaung Ramadhan | <path>` elsewhere; description, canonical, OG, and Twitter meta are static. It imports `../app.css`, then renders, in order: `Analytics`, `ThemeToggle`, page children (`{@render children()}`), `ScrollHome`, `NavigationButton`, `HelperButton`. Pages therefore never mount their own navigation chrome — see [routes.md](routes.md) and [ui/components.md](../ui/components.md).
