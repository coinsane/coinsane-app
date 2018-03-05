import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

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
    fontSize: typography.size14,
    letterSpacing: 1,
    fontFamily: typography.fontMedium,
    marginBottom: 20,
    marginTop: 5,
  },
});