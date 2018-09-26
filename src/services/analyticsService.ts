import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  Answers,
  Crashlytics,
  CustomAttributes,
} from 'react-native-fabric';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import config from 'src/constants/config';

// import { IUserProfile } from 'src/models/IUserState';

const tracker = new GoogleAnalyticsTracker(config.gaTrackingId);

const init = () => {
  const version = DeviceInfo.getVersion();
  const deviceId = DeviceInfo.getUniqueID();
  tracker.setAppName(config.appName);
  tracker.setAppVersion(version);
  tracker.setClient(deviceId);
};

// const setUser = (profile: IUserProfile) => {
//   const fullName = `${profile.forename} ${profile.surname}`.trim();
//   Crashlytics.setUserName(fullName);
//   Crashlytics.setUserEmail(profile.email);
//   Crashlytics.setUserIdentifier(profile.id);
//   tracker.setUser(profile.id);
// };

const logContentView = (
  contentName: string,
  contentType: string,
  contentId: string,
  customAttributes?: CustomAttributes,
) => {
  Answers.logContentView(contentName, contentType, contentId, customAttributes);
  tracker.trackScreenView(contentName);
};

const logLogin = (method: string, success: boolean, customAttributes?: CustomAttributes) => {
  Answers.logLogin(method, success, customAttributes);
  const category = 'Auth';
  const action = 'Login';
  tracker.trackEvent(category, action);
};

const logSignUp = (method: string, success: boolean, customAttributes?: CustomAttributes) => {
  Answers.logSignUp(method, success, customAttributes);
  const category = 'Auth';
  const action = 'SignUp';
  tracker.trackEvent(category, action);
};

const logSearch = (query: string, customAttributes?: CustomAttributes) => {
  Answers.logSearch(query, customAttributes);
};

const logShare = (
  method: string,
  contentName: string,
  contentType: string,
  contentId: string,
  customAttributes?: CustomAttributes,
) => {
  Answers.logShare(method, contentName, contentType, contentId, customAttributes);
};

const logError = (error: string) => {
  Platform.OS === 'ios'
    ? Crashlytics.recordError(error)
    : Crashlytics.logException(error);
  tracker.trackException(error, false);
};

const trackEvent = (category: string, action: string) => {
  tracker.trackEvent(category, action);
};

export default {
  init,
  logContentView,
  logError,
  logLogin,
  logSearch,
  logShare,
  logSignUp,
  // setUser,
  trackEvent,
};
