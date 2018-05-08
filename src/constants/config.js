const devMode = (__DEV__ === true);

export default {
  // App Details
  appName: 'Coinsane',
  apiUri: devMode ? 'http://localhost:8080' : 'https://api.coinsane.tech',
  // apiUri: 'https://api.coinsane.tech',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: devMode ? 'UA-78876204-3' : 'UA-78876204-2',
};
