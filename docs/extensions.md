# Extension Points Documentation

This project is designed to be easily extensible with third-party libraries and custom services.

## HTTP Interceptors

To add a new HTTP interceptor:

1. Create a functional interceptor in `src/app/core/interceptors/`.
2. Register it in `src/app/app.config.ts` using `provideHttpClient(withInterceptors([...]))`.

## State Management

We recommend using Signals for state management. For complex state, consider:

- **Signal Store**: Creating a service that provides signals for state and methods for updates.
- **Third-party libraries**: NgRx Signal Store or similar can be integrated by adding providers to `app.config.ts`.

Example Signal Store pattern:

```typescript
@Injectable({ providedIn: 'root' })
export class MyStore {
  private state = signal<MyState>(initialState);
  readonly data = computed(() => this.state().data);

  updateData(newData: any) {
    this.state.update(s => ({ ...s, data: newData }));
  }
}
```

## UI Component Libraries

To integrate a UI library (e.g., Angular Material, PrimeNG):

1. Install the library via npm.
2. Add necessary providers (e.g., `provideAnimations()`) to `app.config.ts`.
3. Import components directly into your standalone components as needed.

## Environment Configuration

Use `src/environments/` to define environment-specific variables. These are automatically swapped during the build process based on the target configuration.
