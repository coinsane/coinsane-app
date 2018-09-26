import { StyleSheet } from 'react-native';
import { colors, fonts } from 'src/styles';

export default StyleSheet.create({
  container: {
    borderColor: colors.inputBg,
    borderBottomWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  label: {
    fontFamily: fonts.fontRegular,
    fontSize: 12,
    color: colors.textGray,
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    fontFamily: fonts.fontRegular,
    fontSize: 16,
    letterSpacing: -0.25,
    marginLeft: 0,
    marginRight: 0,
  },
  rightIconContainer: {
    alignSelf: 'flex-end',
  },
});
