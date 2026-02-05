# SDD Recipe: "Accumulate Local, Publish Global"

**Changelog Management for Squash-Merge Workflows**

## 🥘 Overview

In a "Squash and Merge" environment, individual commit history is lost when a feature branch joins `main`. To prevent your project history from becoming a series of vague "Feature #123 completed" messages, we use this protocol to ensure the **Document History** (CHANGELOG.md) remains granular even when the **Git History** is flat.

---

## 🛒 Ingredients

- `specs/{feature_id}/changes.md`: Your local scratchpad.
- `CHANGELOG.md`: The root project record.
- **Spec-Driven Development (SDD)**: The framework for your workflow.

---

## 👩‍🍳 Preparation

Before starting implementation:

1. Create a `changes.md` file inside your active specification directory.
2. (Optional) Add a standard task to your `tasks.md`:
   `[ ] T### Update root CHANGELOG.md with contents of changes.md`

---

## 📖 Instructions

### 1. The Accumulation (Simmering)

_While you are coding and testing:_

- Every time you finish a sub-task or fix a bug, add a bullet point to `specs/{feature_id}/changes.md`.
- **Don't wait until the end.** Recording changes "hot" ensures you don't forget the small but important technical wins (e.g., "Optimized SVG loading," "Fixed race condition in AuthService").

### 2. The Refinement (Seasoning)

_During the 'Polish' phase of your feature:_

- Review your `changes.md`.
- Group items into **Added**, **Changed**, **Fixed**, or **Security**.
- Rewrite cryptic dev-notes into clear, team-friendly descriptions.

### 3. The Publication (Serving)

_Right before the final PR approval or merging to main:_

- Copy the refined bullets from `specs/{feature_id}/changes.md`.
- Open the root `CHANGELOG.md`.
- Ensure there is a `## [Unreleased]` section at the top.
- Paste the bullets under `## [Unreleased]` and delete the local `changes.md`.

### 4. The Release (The Manual Transmission)

Once your changes are on the main branch (or ready to be tagged):

1. **Run the Bump Script**:

   ```bash
   npm run version:bump [patch|minor|major]
   ```

   _This updates `package.json`, `package-lock.json`, `CHANGELOG.md`, and `src/app/version.ts`._

   Convenience scripts:
   - `npm run version:bump:patch|minor|major`
   - `npm run version:bump:prerelease` (defaults to `rc`)
   - `npm run version:release:patch|minor|major` (includes strict checks)
   - `npm run version:release:prerelease` (strict checks + `rc`)

   Optional safety flags:
   - `--require-specs-clean`: Fails if any `specs/**/changes.md` files remain.
   - `--require-unreleased`: Fails if `## [Unreleased]` is empty.
   - `--dry-run`: Prints actions without writing files.
   - `--preid <id>`: Use with `prerelease` to bump pre-release tags (e.g. `rc`, `beta`).
   - `--version x.y.z`: Set an explicit version (SemVer).

2. **Commit & Tag (Manual)**:

   ```bash
   git add .
   git commit -m "chore: release vX.Y.Z"
   git tag vX.Y.Z
   git push origin main --tags
   ```

3. **Optional Automation**:
   If you want the script to handle the git steps for you, add the `--git` flag:
   ```bash
   npm run version:bump [type] -- --git
   ```

---

## 💡 Pro-Tips

- **Avoid Merge Conflicts**: By working in your local `specs/` folder, multiple teammates can develop different features without touching the root `CHANGELOG.md` until the very last moment.
- **Granularity is King**: Because Git will squash your 50 commits into one, these bullet points are the _only_ surviving evidence of your hard work. Be specific!
- **Automation Ready**: This pattern is easy for AI agents (like Gemini CLI) to follow autonomously if defined in the `tasks.md`.

---

## 🍽 Example Root Entry

```markdown
## [0.2.0] - 2026-03-15

### Feature #042 - User Profile Dashboard

- Added `ProfileHeaderComponent` with responsive avatar support.
- Implemented Signal-based state for user preferences.
- Fixed a bug where CSS Custom Properties were not updating on theme toggle.
- Integrated AXE accessibility checks into the dashboard test suite.
```
