import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

export default StyleSheet.create({
  search: {
    backgroundColor: colors.inputBg,
    borderRadius: 4,
    borderBottomWidth: 0
  },
  icon: {
    color: colors.textGray,
    paddingLeft: 10,
    fontSize: 20
  }
});