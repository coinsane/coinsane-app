import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles';

export default StyleSheet.create({
  currency__buttonText: {
    fontSize: typography.size12,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    letterSpacing: 1,
  },
  currency__buttonTextActive: {
    color: '#fff',
  },
  period__button: {
    height: 26,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 3,
  },
  period__buttonActive: {
    backgroundColor: '#251F38',
  },
  period__buttonText: {
    color: colors.textGray,
    fontSize: typography.size14,
    fontFamily: typography.fontMedium,
    paddingLeft: 12,
    paddingRight: 12,
  },
  period__buttonTextActive: {
    color: '#fff',
  },
});
