const devMode = (__DEV__ === true);

export default {
  // App Details
  appName: 'Coinsane',
  apiUri: devMode ? 'http://localhost:8080' : 'https://api.coinsane.space',
  // apiUri: 'https://api.coinsane.space',
  fileUri: 'https://coinsane.ams3.digitaloceanspaces.com',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: devMode ? 'UA-78876204-3' : 'UA-78876204-2',

  oneSignalAppId: 'ab6c9212-b299-433e-bd3e-d5dd189ecd92',

  BTC: '5a9c5e5244d0ad001eed91cd',
  USD: '5a9db9c3ce2c75001e71555d',
};
