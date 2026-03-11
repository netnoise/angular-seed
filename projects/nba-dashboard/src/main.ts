import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

async function prepareApp() {
  if (!environment.production) {
    // We try to import the mocks from the main app's src folder
    // This assumes they are shared in the monorepo context
    try {
      const { worker } = await import('../../../src/mocks/browser');
      return worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: './mockServiceWorker.js',
        },
      });
    } catch (e) {
      console.warn('MSW not available, skipping mocks initialization', e);
    }
  }
  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
});
