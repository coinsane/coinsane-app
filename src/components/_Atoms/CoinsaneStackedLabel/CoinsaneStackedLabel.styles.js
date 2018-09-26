import { StyleSheet } from 'react-native';
import { colors, fonts } from 'src/styles';

export default StyleSheet.create({
  item: {
    paddingLeft: 0,
    marginLeft: 0,
    borderBottomColor: colors.bgGray,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: 45,
  },
  label: {
    paddingTop: 0,
    paddingRight: 0,
    fontFamily: fonts.fontRegular,
    fontSize: 12,
    color: colors.textGray,
  },
  input: {
    // height: 24,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: -5,
  },
});
