import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#2F2A40',
    borderRightWidth: 1,
    flex: 1
  },
  lastItem: {
    borderRightWidth: 0,
  },
  label: {
    textAlign: 'center',
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    fontSize: 12,
    marginBottom: 15
  },
  value: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: typography.fontRegular,
  },
});
