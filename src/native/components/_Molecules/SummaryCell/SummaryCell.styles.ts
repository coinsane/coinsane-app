import { StyleSheet } from 'react-native';
import { colors } from 'src/native/styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  background: {
    backgroundColor: colors.btnBgBlack,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blackBorder,
  },
});
