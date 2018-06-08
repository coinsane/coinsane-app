import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#2F2A40',
    borderRightWidth: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastItem: {
    borderRightWidth: 0,
  },
  label: {
    color: colors.textGray,
    fontFamily: fonts.fontMedium,
    fontSize: 11,
    marginBottom: 6,
  },
  value: {
    fontSize: 11,
    fontFamily: fonts.fontRegular,
  },
});
