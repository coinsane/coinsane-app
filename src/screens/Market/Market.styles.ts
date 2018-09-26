import { StyleSheet } from 'react-native';
import { colors, fonts } from 'src/styles';

export default StyleSheet.create({
  market__header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15,
    paddingTop: 15,
    height: 60,
    borderBottomColor: colors.btnBgBlack,
    borderBottomWidth: 1,
  },
  market__search: {
    marginLeft: 15,
    marginRight: 15,
  },
  market__header_text: {
    color: colors.textGray,
    fontFamily: fonts.fontMedium,
    fontSize: 12,
    alignSelf: 'center',
  },
  market__header_row1: {
    flex: 0.42,
    marginRight: 10,
  },
  market__header_row2: {
    flex: 0.25,
  },
  market__header_row3: {
    flex: 0.33,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: colors.btnBgBlack,
    marginLeft: 15,
    marginRight: 15,
  },
});
