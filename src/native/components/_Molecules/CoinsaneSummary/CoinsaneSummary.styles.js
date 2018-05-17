import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles';

export default StyleSheet.create({
  totalContainer: {
    flex: 1,
    marginTop: 10,
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
    fontSize: typography.size12,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    letterSpacing: 1,
  },
  total__buttonTextActive: {
    color: '#fff',
  },
  total__summary: {
    fontSize: typography.h1,
    letterSpacing: -1,
  },
  total__pct: {
    marginTop: 8,
    color: colors.textGray,
    fontSize: typography.size14,
    fontFamily: typography.fontRegular,
    letterSpacing: .5
  },
  subValue: {
    color: colors.textGray,
    fontSize: 14,
    fontFamily: typography.fontRegular,
    letterSpacing: 0.5,
  },
});
