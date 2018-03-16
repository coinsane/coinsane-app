import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  listItemContainer: {
    borderColor: colors.inputBg,
    borderBottomWidth: 1,
    paddingLeft: 5,
    marginLeft: 0,
    
  },
  listItem__leftIcon: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  listItem__rightIconContainer: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  listItem__rightIcon: {
    color: colors.textGray
  },
  listItem__subTitle: {
    color: colors.textGray
  }
});
