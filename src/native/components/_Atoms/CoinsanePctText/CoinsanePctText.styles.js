import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles';

export default StyleSheet.create({
  positive: {
    color: colors.primaryGreen,
  },
  negative: {
    color: colors.primaryPink,
  },
  text: {
    color: colors.textGray,
    fontFamily: typography.fontRegular,
  },
  white: {
    color: colors.white,
  },
});
