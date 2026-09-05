# Security Headers

Every server response passes through `src/hooks.server.ts`, which sets a fixed security header set after resolution.

```ts
// src/hooks.server.ts (verbatim)
const securityHeaders = {
  "Content-Security-Policy": "upgrade-insecure-requests",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000;",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Xss-Protection": "1; mode=block"
}

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)
  Object.entries(securityHeaders).forEach(([name, value]) => {
    response.headers.set(name, value)
  })
  return response
}
```

## Rationale

- `CSP: upgrade-insecure-requests` is deliberately minimal because the page loads cross-origin resources (Google Fonts, Google Tag Manager, arbitrary project/social links) — a strict `script-src`/`style-src` policy would break them.
- `X-Frame-Options: DENY` prevents clickjacking/framing of the site.
- HSTS with a one-year `max-age` forces HTTPS on supporting browsers.

## Invariants

- Headers are applied to **all** responses — there is no route-specific logic and none should be added without updating this lode.
- Any new external script/font added to the site must be checked against the CSP above; if a stricter CSP is ever introduced, the FOUC inline script in `ThemeToggle` and the gtag injection in `Analytics` will need `'unsafe-inline'`/nonce handling.

Related: [app/summary.md](summary.md), [ui/theme.md](../ui/theme.md)
