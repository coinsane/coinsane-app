import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0,
  },
  listItem: {
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  listItem__portfolio: {
    borderTopWidth: 1,
    borderTopColor: colors.blackBorder,
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  listItem__text: {
    fontSize: 16,
    fontFamily: typography.fontRegular,
  },
});
