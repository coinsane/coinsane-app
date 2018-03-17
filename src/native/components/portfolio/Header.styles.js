import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

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
    paddingLeft: 15,
  },
  body__arrowIcon: {
    transform: [{ rotate: '270deg' }, { translateX: -4 }],
    marginRight: 8,
  },
  body__text: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: typography.size16,
    fontFamily: typography.fontBold,
    color: colors.textGray,
  },
  right: {
    flex: 0.5,
    paddingRight: 15,
  },
  right__text: {
    color: colors.textGray,
    fontSize: typography.size12,
    fontFamily: typography.fontRegular,
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
