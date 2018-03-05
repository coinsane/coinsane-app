import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

export default StyleSheet.create({
  totalContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total__title: {
    fontSize: typography.size14,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    letterSpacing: 1,
  },
  total__summary: {
    fontSize: typography.size36,
    fontFamily: typography.fontLight,
    letterSpacing: -1,
  },
});