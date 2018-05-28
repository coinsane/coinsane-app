import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles';

export default StyleSheet.create({
  totalContainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total__buttons: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  total__buttonText: {
    fontSize: 12,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    letterSpacing: 1,
  },
  total__buttonTextActive: {
    color: colors.white,
  },
  total__summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  total__summaryLeft: {
    flex: 0.2,
    marginLeft: 20,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total__summaryRight: {
    flex: 0.2,
    marginRight: 20,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total__summaryText: {
    fontSize: 10,
    fontFamily: typography.fontMedium,
    letterSpacing: 0.5,
    paddingBottom: 4,
  },
  total__summaryBody: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total__pct: {
    marginTop: 8,
    color: colors.textGray,
    fontSize: 14,
    fontFamily: typography.fontRegular,
    letterSpacing: 0.5,
  },
  subValue: {
    color: colors.textGray,
    fontFamily: typography.fontRegular,
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
