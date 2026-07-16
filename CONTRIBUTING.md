# Contributing

Thank you for contributing to this project.

This repository follows a consistent branching strategy, commit convention, and engineering workflow to keep the codebase clean and maintainable.

---

# Branch Naming

Use branch names in the following format:

```text
<type>/<number>-<description>
```

## Rules

- `<type>` must be one of the supported types.
- `<number>` must contain exactly **four digits**.
- `<description>` must use **lowercase kebab-case**.
- No spaces.
- No underscores.
- No uppercase letters.
- No trailing hyphens.
- No consecutive hyphens.

## Supported Types

- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`
- `perf`
- `build`
- `ci`

## Examples

```text
feat/0001-add-project-scaffold
feat/0002-add-path-aliases
fix/0003-resolve-mobile-overflow
refactor/0004-simplify-component-structure
chore/0005-configure-husky
docs/0006-update-readme
```

## Protected Branches

The following branches are exempt from validation:

```text
main
master
develop
development
```

## Validate Branch Manually

```bash
npm run validate:branch
```

---

# Commit Messages

This project follows the **Conventional Commits** specification.

Format:

```text
<type>(<optional-scope>): <subject>
```

The scope is optional but encouraged whenever it provides useful context.

## Rules

- Commit type must be lowercase.
- Subject must not be empty.
- Subject must start with a lowercase letter.
- Subject must **not** end with a period (`.`).

## Examples

```text
feat(button): add loading state
feat(hero): implement landing section
fix(navbar): prevent mobile overflow
refactor(layout): simplify page structure
chore(tooling): configure commitlint
docs(readme): update installation guide
test(button): add accessibility tests
perf(images): lazy load project thumbnails
```

## Validate Commit Messages Manually

Validate a commit message file:

```bash
npx commitlint --edit <commit-message-file>
```

Validate the latest commit:

```bash
npx commitlint --from HEAD~1 --to HEAD
```

---

# Development Workflow

1. Create a branch following the branch naming convention.
2. Implement your changes.
3. Stage your files.
4. Commit using the Conventional Commits format.
5. Open a Pull Request.

During `git commit`, the following checks are performed automatically:

- ✅ Branch name validation
- ✅ Commit message validation
- ✅ ESLint (staged files)
- ✅ Prettier (staged files)

Continuous Integration (GitHub Actions) performs:

- Type checking
- Linting
- Tests
- Production build
