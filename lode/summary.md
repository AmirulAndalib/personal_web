# Project Snapshot

Personal landing page for **Gaung Ramadhan** (Mr.Miss) at `mrmiss.dev` — a static, content-light SvelteKit site presenting a hero intro, an about page with tech stack, featured projects, and a support page. Built with SvelteKit 2 + Svelte 5 (runes), styled with Tailwind CSS 3 (`darkMode: "class"`) + SCSS/PostCSS, icons via `unplugin-icons`, deployed with `@sveltejs/adapter-cloudflare`, dependencies managed with **bun**. All site content (main-page order, projects, social links, tech stack) lives as typed constants in `src/lib/constants/`; a global layout (`src/routes/+layout.svelte`) composes floating navigation/theme/analytics components around page content; navigation between the three "main" pages (`/`, `/about`, `/project`) is index-driven through the `currentSection` store; server hooks apply security headers to every response.

- **Domain docs**: [app/](app/summary.md) (shell, routes, security), [ui/](ui/summary.md) (components, theme), [content/](content/summary.md) (constants model)
- **How we work**: [practices.md](practices.md) · **Vocabulary**: [terminology.md](terminology.md) · **Index**: [lode-map.md](lode-map.md)
