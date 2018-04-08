import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    borderColor: '#2C263F',
    borderTopWidth: 1,
  },
  title: {
    color: colors.textGray,
    fontFamily: typography.fontBold,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});
