import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

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
});
