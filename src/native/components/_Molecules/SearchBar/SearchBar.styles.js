import { StyleSheet } from 'react-native';
import { colors } from '../../../styles';

export default StyleSheet.create({
  search: {
    paddingLeft: 10,
    backgroundColor: colors.inputBg,
    borderRadius: 4,
    borderBottomWidth: 0,
    margin: 15,
    marginLeft: 15,
  },
  input: {
    height: 40,
    fontSize: 13,
    lineHeight: 13,
    top: 0,
  },
});
