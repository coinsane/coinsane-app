import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles/index';

export default StyleSheet.flatten({
  container: {
    borderTopColor: colors.btnBgBlack,
    borderTopWidth: 1,
  },
  listItem: {
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  body: {
    flex: 0.6,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  body__arrowIcon: {
    marginRight: 8,
    fontSize: 18,
    color: colors.textGray,
  },
  body__text: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 15,
    fontFamily: typography.fontBold,
    color: colors.textGray,
  },
  right: {
    flex: 0.5,
  },
  right__text: {
    fontSize: 14,
    fontFamily: typography.fontRegular,
    color: colors.textGray,
  },
  headerBtn: {
    borderColor: colors.blackBorder,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  headerBtn__text: {
    color: colors.textGray,
    fontWeight: 'normal',
  },
});
