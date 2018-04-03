import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles';

export default StyleSheet.create({
  total__buttonText: {
    fontSize: typography.size12,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    letterSpacing: 1,
  },
  total__buttonTextActive: {
    color: '#fff',
  },
});
