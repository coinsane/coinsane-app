import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../../styles';

export default StyleSheet.flatten({
  container: {
    borderBottomColor: colors.btnBgBlack,
    borderBottomWidth: 1,
  },
  listItem: {
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: colors.bgPrimary,
    borderBottomWidth: 0,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 0.4,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  body__arrowIcon: {
    marginRight: 8,
    fontSize: 18,
    color: colors.textGray,
    alignSelf: 'center',
  },
  body__text: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 15,
    fontFamily: fonts.fontBold,
    color: colors.textGray,
    alignSelf: 'center',
  },
});
