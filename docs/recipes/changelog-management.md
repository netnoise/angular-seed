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

_Right before the final PR approval:_

- Copy the refined bullets from `specs/{feature_id}/changes.md`.
- Open the root `CHANGELOG.md`.
- Create a heading for the feature under `## [Unreleased]`.
- Paste the bullets and delete the local `changes.md`.

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
