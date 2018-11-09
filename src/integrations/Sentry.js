import { init } from '@sentry/browser';

APP_ENV == 'production' && init({
  dsn: 'https://397f977dc2f54c389889c797628f737d@sentry.io/1319362'
});
