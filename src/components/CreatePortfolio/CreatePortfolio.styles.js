import { StyleSheet } from 'react-native';
import { colors, fonts } from 'src/styles';

export default StyleSheet.create({
  contentHeader: {
    backgroundColor: colors.bgGray,
    borderBottomColor: colors.blackBorder,
  },
  content: {
    backgroundColor: colors.bgGray,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  content__text: {
    color: colors.textGray,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: fonts.fontMedium,
    marginBottom: 20,
    marginTop: 5,
  },
  content__text_top: {
    marginTop: 20,
  },
  btn: {
    borderColor: colors.blackBorder,
    borderRadius: 5,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 30,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 30,
  },
  btn__text: {
    color: colors.textGray,
  },
});
