import { StyleSheet } from 'react-native';

import { colors, fonts } from 'src/styles';

export default StyleSheet.create({
  positive: {
    color: colors.primaryGreen,
  },
  negative: {
    color: colors.primaryPink,
  },
  text: {
    color: colors.textGray,
    fontFamily: fonts.fontRegular,
  },
  white: {
    color: colors.white,
  },
});
