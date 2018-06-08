import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../styles';

export default StyleSheet.create({
  currency__buttonText: {
    fontSize: 13,
    color: colors.textGray,
    fontFamily: fonts.fontMedium,
    letterSpacing: 1,
  },
  currency__buttonTextActive: {
    color: colors.white,
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
    backgroundColor: colors.btnBgDark,
  },
  period__buttonText: {
    color: colors.textGray,
    fontFamily: fonts.fontMedium,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
  },
  period__buttonTextActive: {
    color: colors.white,
  },
});
