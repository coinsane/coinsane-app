import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import Config from '../constants/config';

export default new GoogleAnalyticsTracker(Config.gaTrackingId);
