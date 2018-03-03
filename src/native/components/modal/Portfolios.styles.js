import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0,
  },
  listItem: {
    paddingBottom: 25,
    marginLeft: 0,
  },
  listItem__portfolio: {
    borderTopWidth: 1,
    borderTopColor: colors.blackBorder,
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 0,
  },
  listItem__text: {
    fontSize: typography.size17,
    fontFamily: typography.fontRegular,
  },
});