# Angular Demo Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli). It demonstrates a basic Angular setup with Angular Material and Jest for testing.

## Prerequisites

Ensure you have Node.js and npm installed. It's also recommended to install the Angular CLI globally:
```bash
npm install -g @angular/cli
```

## Installation

1. Clone the repository (if applicable).
2. Navigate to the project directory.
3. Install the dependencies:
   ```bash
   npm install
   ```

## Development Server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
ng serve
# or
npm start
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

```bash
ng build
# For production build:
ng build --configuration production
```

## Running Unit Tests with Jest

Run `ng test` or `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

```bash
ng test
# or
npm test
```

To run tests in watch mode:
```bash
ng test --watch
# or using the script from package.json:
npm run test:watch
```

This project uses `jest-preset-angular` and `@angular-builders/jest` to integrate Jest with the Angular CLI. Test files are typically located next to the component or service they are testing and have the `.spec.ts` extension.
Configuration files for Jest include:
- `jest.config.js`
- `setup-jest.ts`
- `tsconfig.spec.json` (modified for Jest)
- `angular.json` (test architect updated to use Jest builder)
