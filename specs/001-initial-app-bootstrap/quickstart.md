# Quickstart Guide: Angular Seed

**Feature**: Initial App Bootstrap
**Date**: 2026-02-02

This guide provides the essential steps to get the Angular Seed project up and running.

---

## 1. Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: `v18.x` (LTS)
- **npm**: `v9.x+` (or a compatible package manager like Yarn or pnpm)
- **Git**: For cloning the repository.

You can use a Node version manager like `nvm` to easily switch to the required version:
```sh
nvm install 18
nvm use 18
```

The project will contain a `.nvmrc` file to automate this.

---

## 2. Installation & Setup

Follow these steps to install dependencies and run the application.

1.  **Clone the Repository**
    ```sh
    # Replace with the actual repository URL
    git clone <repository-url>
    cd angular-seed
    ```

2.  **Install Dependencies**
    This command will install all the necessary packages defined in `package.json`.
    ```sh
    npm install
    ```

---

## 3. Development Server

To run the application locally with a live-reloading development server:

1.  **Start the Application**
    ```sh
    npm start
    ```

2.  **Access the Application**
    Open your web browser and navigate to: **http://localhost:4200/**

You should see the minimal application shell, indicating that the setup is successful.

---

## 4. How to Add a New Feature

This project uses a feature-based architecture. To add a new feature (e.g., "Login"):

1.  **Create a Feature Directory**
    Create a new directory under `src/app/features/`.
    ```
    src/app/features/login/
    ```

2.  **Create Components and Services**
    Add your standalone components and services inside this new directory.
    ```
    src/app/features/login/
    ├── login-page.component.ts
    └── auth.service.ts
    ```

3.  **Add Routing**
    Define routes for your feature and add them to the main application routing configuration.

For detailed guidelines, refer to the project's main `README.md` and the documentation on project structure.

---

## 5. How to Customize the Theme

Theming is managed via SCSS and CSS Custom Properties.

1.  **Locate Theme Variables**
    Find the main theme file (e.g., `src/styles/theme/_variables.scss`).

2.  **Modify CSS Custom Properties**
    Update the CSS variables to change colors, fonts, or spacing.
    ```css
    /* Example: in _variables.scss */
    :root {
      --primary-color: #007bff; /* Change this value */
      --background-color: #f8f9fa; /* Change this value */
    }
    ```

Changes will be reflected across the application wherever these variables are used.
