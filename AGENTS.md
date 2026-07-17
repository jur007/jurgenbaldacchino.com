# Project coding standards

## React and TypeScript

- Use named exported arrow-function components. A default export may be retained for compatibility.
- Prefix component prop and domain interfaces with `I`, for example `IPageLayout`.
- Use straightforward enums for fixed component variants and sizes.
- Use `import type` when `verbatimModuleSyntax` requires a type-only import.
- Name event callbacks with the `handle...` prefix and include the event when useful, for example
  `handleContactClick`.
- Keep reusable constants and interfaces above the component.
- Group imports in this order: React, third-party packages, local styles, then project modules.
- Use double quotes, no semicolons, trailing commas, and a 100-character print width.

## CSS

- Use CSS Modules for component classes.
- Name CSS Module classes in camelCase, for example `heroSection` and `buttonPrimary`.
- Access classes through the imported `styles` object; do not use raw component class strings.
- Keep CSS custom properties in kebab-case.
- Prefer design tokens over repeated literal colours, spacing, radii, shadows, and transitions.
- Order layout declarations before visual decoration and interaction states.

## Components and files

- Use kebab-case for component directories and filenames.
- Re-export public components from the component directory's `index.ts`.
- Keep global resets and design tokens in `src/styles`; keep component styling in CSS Modules.
- Preserve semantic HTML, keyboard focus visibility, reduced-motion support, and responsive behaviour.

## Verification

Run these commands before completing a change:

```bash
npm run format:check
npm run lint
npm run test:run
npm run build
```
