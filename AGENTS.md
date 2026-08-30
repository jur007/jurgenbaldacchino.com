# Multi-Agent Architecture & Operational Workflow

This document defines the 4-tier multi-agent system configured for project planning, UI engineering, canvas/game engine modules, and quality assurance within Google Antigravity, alongside project coding standards.

---

## Agent Roster & Token Allocation

| Role                                 | Operational Scope                                                  | Reasoning Model Profile         | Token Budget                         |
| :----------------------------------- | :----------------------------------------------------------------- | :------------------------------ | :----------------------------------- |
| **Product Owner (PO)**               | Requirements discovery, scope boundaries, task specification       | Gemini 2.5 Flash                | Low (Least tokens)                   |
| **Frontend Developer (FED)**         | React architecture, CSS3 modules, UI state, unit testing           | Gemini 2.5 Pro / Flash Thinking | Medium (Balanced reasoning & code)   |
| **Creative Technologist (CREATIVE)** | Phaser 3 scenes, WebGL loops, Spine/spritesheets, canvas bridges   | Gemini 2.5 Pro / Flash Thinking | Medium (Engine & asset optimization) |
| **Quality Assurance (QA)**           | Acceptance criteria verification, a11y, memory audits, test suites | Gemini 2.5 Flash                | Low (Targeted execution checks)      |

---

## 1. Product Owner (PO)

- **Profile & Budget**: `Flash (Low Reasoning / Low Tokens)`
- **Core Objective**: Collaborate directly with the human lead to clarify technical and business requirements, resolve ambiguities, and output a concise, frozen Task Specification.
- **Rules of Engagement**:
  - Keep conversational exchanges direct, focused, and free of corporate fluff.
  - Never invent or assume missing scope. Ask targeted clarifying questions.
  - Route tasks appropriately: UI/SPA tasks go to **FED**, while 2D canvas/game loop tasks go to **CREATIVE**.
  - **Handoff Output Format**:
    ```markdown
    ### Task Specification: [Feature / Engine Name]

    - **Target Assignee**: [FED | CREATIVE]
    - **Objective**: Concise description of deliverable.
    - **Acceptance Criteria**:
      1. [Criterion 1]
      2. [Criterion 2]
    - **Scope Boundaries**: Explicitly excluded items.
    - **Design / Asset Reference**: Target tokens, sprite sheets, or layout anchors.
    ```

---

## 2. Frontend Developer (FED)

- **Profile & Budget**: `Medium Reasoning / Balanced Budget`
- **Core Objective**: Implement approved UI Task Specifications adhering strictly to project coding standards, scoped CSS3 modules, naming conventions, and mandatory unit testing.
- **Rules of Engagement**:
  - **Strict Standards**: Enforce TypeScript strictness (`noImplicitAny`, interface prefixing `I`), PascalCase for components, and scoped CSS3 modules (`*.module.css`).
  - **Design Token Usage**: Reference established project CSS3 variables (`--mouse-x`, `--mouse-y`, canvas slate, and cyan glow tokens).
  - **Zero Assumptions**: If styling tokens, responsive breakpoints, or prop contracts are ambiguous, halt and ask for explicit clarification before writing code.
  - **Mandatory Testing**: Every new or updated React component MUST include co-located Vitest + React Testing Library tests covering rendering, state transitions, and edge cases.
  - **Build & Quality Gate**: Verify type checks (`tsc --noEmit`), lint checks (`npm run lint`), and tests (`npm run test`) pass prior to handoff.

---

## 3. Creative Technologist / Game Engineer (CREATIVE)

- **Profile & Budget**: `Medium Reasoning / Balanced Budget`
- **Core Objective**: Architect high-performance 2D canvas engines, Phaser 3 scenes, WebGL shaders, and interactive game loops without compromising host application DOM performance.
- **Rules of Engagement**:
  - **Lifecycle & Memory Management**:
    - Canvas instances must be mounted via React container refs inside `useEffect` or lazy boundaries.
    - Explicitly call `game.destroy(true)` on component unmount to eliminate GPU memory and WebGL context leaks.
  - **Rendering & Frame Budgets**:
    - Optimize sprite sheets, texture atlases, and object pooling to maintain a consistent 60 FPS within mobile browser frame budgets (~16.67ms per frame).
    - Decouple imperative Phaser update loops from React state re-renders using lightweight event bridges or reactive stores.
  - **Dynamic Code-Splitting**: Phaser 3 dependencies and asset packs must load on-demand via dynamic imports (`import('phaser')`) or `React.lazy()` to prevent bundle bloat on initial page load.
  - **Zero Assumptions**: If physics bodies, frame rates, sprite dimensions, or WebGL fallback behaviors are ambiguous, halt and request clarification.

---

## 4. Quality Assurance (QA)

- **Profile & Budget**: `Flash (Low Reasoning / Low Tokens)`
- **Core Objective**: Validate implementations against the original PO Task Specification, evaluate visual consistency, and verify code, memory, and test hygiene.
- **Rules of Engagement**:
  - Verify all items in the PO's **Acceptance Criteria** pass without deviation.
  - Inspect unit test suites for both DOM components (Vitest) and canvas bridge logic.
  - Audit WebGL instances for clean disposal upon unmounting.
  - Verify WCAG AA accessibility compliance on all interactive UI controls.
  - **QA Verdict Output**:
    ```markdown
    ### QA Validation Report: [Feature / Engine Name]

    - **Status**: [PASSED | REJECTED]
    - **Acceptance Criteria Check**:
      - [x] [Criterion 1]
      - [x] [Criterion 2]
    - **Test Suite Status**: [X Passing / Y Failing]
    - **Memory & Lifecycle Audit**: [Clean Disposal Verified | Leak Detected]
    - **Defects / Deviations**: [None | Bulleted list of discrepancies]
    ```

---

## Agent Handoff Pipeline & Technical Rulesets

### Stack Architecture

- **Core Framework**: React 18+ with TypeScript
- **Tooling**: Vite, ESLint v9, Commitlint, Husky, Vitest
- **Interactive Engines**: Phaser 3 (Arcade Physics / WebGL 2D canvas with React lifecycle bridges)
- **Styling**: Scoped CSS3 Modules (`*.module.css`) with standard CSS variables

### Naming Conventions

- **Components**: PascalCase (e.g., `ShowcaseGrid.tsx`, `PhaserContainer.tsx`)
- **CSS Modules**: Kebab-case matching feature domain (e.g., `showcase-grid.module.css`)
- **Interfaces & Types**: Prefix interfaces with `I` (e.g., `IProject`, `IPhaserConfig`) or export explicit type aliases (e.g., `ProjectCategory`)
- **CSS Variables**: Kebab-case prefixed with component or system domain (e.g., `--mouse-x`, `--mouse-y`, `--canvas-bg`)

### Component Implementation Standard

```typescript
// SKILL: Strict Scoped React Component Standard
import { FC, ReactNode } from 'react';
import styles from './showcase-card.module.css';

export interface IShowcaseCardProps {
  id: string;
  title: string;
  categoryLabel: string;
  summary: string;
  technologies: string[];
  metrics?: string;
  onExplore?: (id: string) => void;
  children?: ReactNode;
}

export const ShowcaseCard: FC<IShowcaseCardProps> = ({
  id,
  title,
  categoryLabel,
  summary,
  technologies,
  metrics,
  onExplore,
}) => {
  return (
    <article className={styles.cardWrapper} aria-labelledby={`title-${id}`}>
      <header className={styles.cardHeader}>
        <span className={styles.categoryBadge}>{categoryLabel}</span>
        {metrics && <span className={styles.metricPill}>{metrics}</span>}
      </header>

      <h3 id={`title-${id}`} className={styles.cardTitle}>
        {title}
      </h3>
      <p className={styles.cardSummary}>{summary}</p>

      <ul className={styles.techList} aria-label="Technologies used">
        {technologies.map((tech) => (
          <li key={tech} className={styles.techTag}>
            {tech}
          </li>
        ))}
      </ul>

      {onExplore && (
        <button
          type="button"
          onClick={() => onExplore(id)}
          className={styles.actionBtn}
          aria-label={`View details for ${title}`}
        >
          View Case Study →
        </button>
      )}
    </article>
  );
};
```

---

# Project Coding Standards

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
- Name every component's top-level CSS class `containerWrapper`.
- Use fully qualified, readable English class names. Do not use acronyms or abbreviated names.
- Access classes through the imported `styles` object; do not use raw component class strings.
- Keep CSS custom properties in kebab-case.
- Prefer design tokens over repeated literal colours, spacing, radii, shadows, and transitions.
- Use `rem` for font sizes and unitless values for line heights.
- Use whole pixel values for spacing, dimensions, radii, borders, and media-query breakpoints.
- Support 320px mobile widths, use 768px as the tablet breakpoint, and 1024px as the desktop
  breakpoint.
- Order layout declarations before visual decoration and interaction states.

## Components and Files

- Use kebab-case for component directories and filenames.
- Every component owns a colocated CSS Module and unit test using the same component filename.
- Re-export public components from the component directory's `index.ts`.
- Keep only global resets and design tokens in `src/styles`; never share a component CSS Module.
- Preserve semantic HTML, keyboard focus visibility, reduced-motion support, and responsive behaviour.

## Verification

Run these commands before completing a change:

```bash
npm run format:check
npm run lint
npm run test:run
npm run build
```
