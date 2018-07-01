import { StyleSheet } from 'react-native';
import { fonts } from '../../styles';

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: 'transparent',
  },
  list: {
    marginTop: 100,
  },
  listItem: {
    borderBottomWidth: 0,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: fonts.fontRegular,
    fontSize: 18,
    letterSpacing: -0.3,
    height: 21,
    width: 200,
    marginLeft: 10,
  },
});
