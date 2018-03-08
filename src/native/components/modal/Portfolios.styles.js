import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0,
  },
  listItem: {
    paddingBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  listItem__portfolio: {
    borderTopWidth: 1,
    borderTopColor: colors.blackBorder,
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  listItem__text: {
    fontSize: typography.size17,
    fontFamily: typography.fontRegular,
  },
});
