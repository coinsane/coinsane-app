const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Coinsane',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-78876204-3' : 'UA-78876204-2',
};
