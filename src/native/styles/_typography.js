import { StyleSheet } from 'react-native';
import colors from './_colors';
import fonts from './_fonts';

export default StyleSheet.create({
  h1: {
    fontFamily: fonts.fontLight,
    fontSize: 36
  },
  h2: {
    fontFamily: fonts.fontRegular,
    fontSize: 32
  },
  h3: {
    fontFamily: fonts.fontBold,
    fontSize: 20
  },
  h4: {
    fontFamily: fonts.fontBold,
    fontSize: 16
  },
  h5: {
    fontFamily: fonts.fontMedium,
    fontSize: 14
  },
  h6: {
    fontFamily: fonts.fontMedium,
    fontSize: 12
  },
  h7: {
    fontFamily: fonts.fontMedium,
    fontSize: 10
  },
  menu: {
    fontFamily: fonts.fontRegular,
    fontSize: 20
  },
  menuSmall: {
    fontFamily: fonts.fontRegular,
    fontSize: 17
  },
  p: {
    fontFamily: fonts.fontRegular,
    fontSize: 16
  },
  small: {
    fontFamily: fonts.fontRegular,
    fontSize: 14
  },
  smallest: {
    fontFamily: fonts.fontRegular,
    fontSize: 12
  },
  textPlaceholder: {
    backgroundColor: colors.textGray,
    color: colors.textGray,
    marginTop: 2,
    borderRadius: 4,
    fontSize: 10,
    overflow: 'hidden',
  },
});
