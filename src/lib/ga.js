import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import Config from 'src/constants/config';

export default new GoogleAnalyticsTracker(Config.gaTrackingId);
