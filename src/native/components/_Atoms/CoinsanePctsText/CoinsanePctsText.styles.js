import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles';

export default StyleSheet.create({
  positive: {
    color: colors.primaryGreen
  },
  negative: {
    color: colors.primaryPink
  },
  text: {
    marginTop: 8,
    color: colors.textGray,
    fontSize: typography.size14,
    fontFamily: typography.fontRegular,
    letterSpacing: .5
  },
});
