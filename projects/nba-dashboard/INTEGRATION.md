# NBA Dashboard Integration Guide

## Overview

The NBA Analytics Dashboard is a standalone Angular application that can be mounted into the host application.

## Host Integration

### Routing

The dashboard is mounted at the `/nba` route in the host application.

```typescript
// In host app.routes.ts
{
  path: 'nba',
  loadChildren: () => import('../../projects/nba-dashboard/src/app/app.routes').then(m => m.routes),
}
```

### Access URLs

- Dashboard Home: `http://localhost:4200/nba`
- Dashboard Page: `http://localhost:4200/nba/dashboard`

### Standalone Development

The NBA dashboard can be developed and tested independently:

```bash
npm run ng serve nba-dashboard -- --port=4201
```

Access at: `http://localhost:4201`

## Build Configuration

### Development Build

```bash
npm run ng build nba-dashboard
```

### Production Build

```bash
npm run ng build nba-dashboard --configuration=production
```

Output: `dist/nba-dashboard/`

## Style Isolation

The dashboard uses:

- **Tailwind CSS** for utility-first styling (scoped configuration)
- **PrimeNG** for UI components
- **SCSS** for component styles

Styles are isolated using Angular's component encapsulation.

## Dependencies

- **D3.js**: Shot chart visualizations
- **Zod**: Runtime API response validation
- **PrimeNG**: Data tables and UI components
- **Tailwind CSS**: Utility styling
