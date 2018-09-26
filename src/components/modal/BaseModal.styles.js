import { StyleSheet } from 'react-native';
import { colors } from 'src/styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 24,
    left: 0,
    right: 0,
    backgroundColor: colors.bgGray,
  },
  closeBtnContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
