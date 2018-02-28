import variables from '../_variables';
import { StyleSheet } from 'react-native';

export default StyleSheet.flatten({
  listItemContainer: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginBottom: 4,
  },
  body: {
    flex: 0.6,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  bodyArrowIcon: {
    transform: [{ rotate: '270deg' }, { translateX: -4 }],
    marginRight: 8,
  },
  bodyText: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: variables.size16,
    fontFamily: variables.fontBold,
    color: variables.colors.textGray,
  },
  right: {
    flex: 0.4,
  },
  rightText: {
    color: variables.colors.textGray,
    fontSize: variables.size12,
    fontFamily: variables.fontRegular,
  },
  headerBtn: {
    borderColor: variables.colors.blackBorder,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  headerBtnText: {
    color: variables.colors.textGray,
    fontWeight: 'normal',
  },
});