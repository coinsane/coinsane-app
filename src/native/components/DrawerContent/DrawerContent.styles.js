import { StyleSheet } from 'react-native';
import { fonts } from '../../styles';

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: 'transparent',
    width: 220,
  },
  listItem: {
    borderBottomWidth: 0,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
  },
  text: {
    fontFamily: fonts.fontRegular,
    fontSize: 18,
    letterSpacing: -0.3,
  },
});
