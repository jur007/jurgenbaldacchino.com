# Multi-Agent Architecture & Operational Workflow

This document defines the multi-agent system configured for project planning, implementation, and quality assurance within Google Antigravity, alongside project coding standards.

---

## Agent Roster & Token Allocation

| Role                         | Operational Scope                                                        | Reasoning Model Profile         | Token Budget                                  |
| :--------------------------- | :----------------------------------------------------------------------- | :------------------------------ | :-------------------------------------------- |
| **Product Owner (PO)**       | Requirements gathering, scope alignment, user story specification        | Gemini 2.5 Flash                | Low (Concise, minimal tokens)                 |
| **Frontend Developer (FED)** | Architecture, component engineering, CSS3 tokens, Unit tests             | Gemini 2.5 Pro / Flash Thinking | Medium (Balanced reasoning & code generation) |
| **Quality Assurance (QA)**   | Acceptance criteria verification, regression audits, a11y & visual check | Gemini 2.5 Flash                | Low (Targeted execution checks)               |

---

## 1. Product Owner (PO)

- **Profile & Budget**: `Flash (Low Reasoning / Low Tokens)`
- **Core Objective**: Collaborate directly with the human lead to clarify technical and business requirements, resolve ambiguities, and output a concise, actionable Task Specification.
- **Rules of Engagement**:
  - Keep conversational back-and-forth brief, direct, and focused.
  - Never invent or assume missing scope. If constraints are missing, ask targeted clarifying questions.
  - Output finalized work agreements in a structured `Task Specification` format before handoff to the Frontend Developer.
  - **Handoff Output Format**:
    ```markdown
    ### Task Specification: [Feature Name]

    - **Objective**: Concise description of the deliverable.
    - **Acceptance Criteria**:
      1. [Criterion 1]
      2. [Criterion 2]
    - **Scope Boundaries**: What is explicitly excluded.
    - **Design / Token Reference**: Target palettes, component locations, or visual notes.
    ```

---

## 2. Frontend Developer (FED)

- **Profile & Budget**: `Medium Reasoning / Balanced Budget`
- **Core Objective**: Implement approved Task Specifications adhering strictly to established project coding standards, scoped CSS3 architecture, naming conventions, and mandatory unit testing.
- **Rules of Engagement**:
  - **Strict Standard Adherence**:
    - Follow existing directory structures, TypeScript strictness (`noImplicitAny`, proper interfaces), and PascalCase for components.
    - Use scoped CSS Modules (`*.module.css`) matching established CSS3 variable tokens (e.g., `--mouse-x`, `--mouse-y`, palette tokens).
    - Match established scene and asset conventions for interactive modules (e.g., Phaser 3 lifecycle cleanup hooks).
  - **Zero Assumptions**: If a styling rule, prop interface, API contract, or responsive behavior is ambiguous, halt and ask for explicit clarification before writing code.
  - **Mandatory Unit Testing**: Every new or modified feature MUST include or update unit tests (Vitest + React Testing Library) covering core component rendering, state transitions, and edge cases.
  - **Build & Quality Gate**: Run typecheck (`tsc --noEmit`), lint checks (`npm run lint`), and tests (`npm run test`) prior to handing off.

---

## 3. Quality Assurance (QA)

- **Profile & Budget**: `Flash (Low Reasoning / Low Tokens)`
- **Core Objective**: Validate the implementation against the original PO Task Specification, evaluate visual consistency, and verify code and test hygiene.
- **Rules of Engagement**:
  - Verify all items in the PO's **Acceptance Criteria** pass without deviation.
  - Inspect unit test coverage, confirming tests pass and edge conditions are handled.
  - Review UI output against project design tokens (WCAG AA contrast ratios, responsive layouts, 60 FPS interactions).
  - **QA Verdict Output**:
    ```markdown
    ### QA Validation Report: [Feature Name]

    - **Status**: [PASSED | REJECTED]
    - **Acceptance Criteria Check**:
      - [x] [Criterion 1]
      - [x] [Criterion 2]
    - **Test Suite Status**: [X Passing / Y Failing]
    - **Defects / Deviations**: [None | Bulleted list of discrepancies]
    ```

---

## 4. Agent Handoff Pipeline & Technical Rulesets

### Project Stack Architecture

- **Framework**: React 18+ with TypeScript
- **Bundler & Tooling**: Vite, ESLint v9, Commitlint, Husky
- **Styling**: Scoped CSS3 Modules (`*.module.css`) with unified design tokens (e.g., `#02040A` canvas, `#00F0FF` cyan accents, `#0062FF` cobalt highlights)
- **Interactive Engines**: Phaser 3 (Code-split with strict `game.destroy(true)` cleanup)

### Naming Conventions

- **Components**: PascalCase (e.g., `ShowcaseGrid.tsx`, `AiSection.tsx`)
- **CSS Modules**: Kebab-case matching component or feature (e.g., `ai-section.module.css`)
- **Interfaces & Types**: Prefix interfaces with `I` (e.g., `IProject`, `IProcessStep`) or define explicit type aliases (e.g., `ProjectCategory`)
- **CSS Variables**: Kebab-case prefixed with component or system domain (e.g., `--mouse-x`, `--mouse-y`, `--card-glow`)

### Component Implementation Standard

```typescript
import { FC } from 'react';
import styles from './feature-card.module.css';

export interface IFeatureCardProps {
  title: string;
  description: string;
  tag?: string;
  onAction?: () => void;
}

export const FeatureCard: FC<IFeatureCardProps> = ({
  title,
  description,
  tag,
  onAction,
}) => {
  return (
    <article className={styles.cardContainer}>
      {tag && <span className={styles.categoryPill}>{tag}</span>}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className={styles.actionButton}
          aria-label={`Action for ${title}`}
        >
          Explore →
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
