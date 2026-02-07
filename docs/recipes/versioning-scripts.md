# Versioning Scripts & Options

This document details the usage of the custom versioning script (`tools/version-bump.mjs`) and its associated `npm` commands.

---

## 🚀 Version Bump Command

The primary command for managing project versions is `npm run version:bump`. It supports Semantic Versioning (SemVer) and integrates with your `package.json`, `CHANGELOG.md`, and in-app version display.

**Basic Usage**:

```bash
npm run version:bump [patch|minor|major|prerelease]
```

- If no type is specified, it defaults to `patch`.

---

## ✨ Convenience Scripts

For common use cases, `package.json` provides helper scripts:

- `npm run version:bump:patch`
- `npm run version:bump:minor`
- `npm run version:bump:major`
- `npm run version:bump:prerelease` (defaults to `rc` as preid)

---

## 🛠 Optional Flags

These flags can be appended to the `npm run version:bump` command (or its convenience scripts) by separating them with `--`:

- `--git`: **Automatically creates a Git commit and tag.** This flag is for convenience; manual `git add/commit/tag` is the default.
- `--allow-dirty`: Allows Git operations (with `--git`) even if the working tree has uncommitted changes. Use with caution.
- `--dry-run`: Simulates the version bump process without actually writing any files. Useful for previewing changes.
- `--require-unreleased`: Fails the script if the `CHANGELOG.md`'s `## [Unreleased]` section is empty. Enforces changelog discipline.
- `--require-specs-clean`: Fails if any `specs/**/changes.md` files exist, ensuring all local changelog fragments are merged before release.
- `--version x.y.z`: Sets an explicit version directly, bypassing the SemVer bump logic. Use `npm run version:bump -- --version 1.2.3`.
- `--preid <id>`: Specifies the pre-release identifier (e.g., `alpha`, `beta`, `rc`) for `prerelease` bumps. Defaults to `rc`. Use `npm run version:bump prerelease -- --preid beta`.

---

## 📄 Example Usage

```bash
# Bump a minor version, don't commit to git
npm run version:bump minor

# Bump a patch version and automatically commit/tag
npm run version:bump -- --git

# Create a release candidate
npm run version:bump prerelease -- --preid rc

# Simulate a major bump
npm run version:bump major -- --dry-run
```
