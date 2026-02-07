# Project Structure

This project follows a feature-based modular architecture to ensure scalability, maintainability, and clear separation of concerns.

## Directory Overview

### `src/app/core/`

The `core` directory contains singleton services, universal guards, HTTP interceptors, and global models. These should only be imported in the `app.config.ts` (or the root module) and are intended to be instantiated only once.

- `guards/`: Global route guards.
- `interceptors/`: HTTP interceptors for global request/response handling.
- `services/`: Singleton services (e.g., AuthService, AppConfigService).
- `models/`: Global interfaces and types.

### `src/app/shared/`

The `shared` directory contains reusable components, directives, and pipes that are used across multiple features. Shared elements should be stateless and not depend on specific features.

- `components/`: Reusable UI components (e.g., Buttons, Loaders).
- `directives/`: Common directives.
- `pipes/`: Common pipes.

### `src/app/features/`

The `features` directory contains the domain logic of the application, organized by feature. Each feature should be as self-contained as possible.

- `home/`: Example feature containing its own components, services, and routes.

## Guidelines

- **Lazy Loading**: All features should be lazy-loaded via the main `app.routes.ts`.
- **Standalone Components**: Use standalone components for everything.
- **OnPush**: Use `ChangeDetectionStrategy.OnPush` for all components.
- **BEM**: Use BEM methodology for component styling.
