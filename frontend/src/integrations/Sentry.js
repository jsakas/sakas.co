import * as Sentry from '@sentry/browser';


const configure = () => {
  Sentry.init({
    dsn: 'https://397f977dc2f54c389889c797628f737d@sentry.io/1319362'
  });
  
  global.Sentry = Sentry;
};

APP_ENV == 'production' && configure(); 
