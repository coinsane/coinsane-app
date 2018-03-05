import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

export default StyleSheet.create({
  cointab__view: {
    height: 170,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    position: 'relative',
  },
  cointab__axis: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 5,
  },
  cointab__axisLabel: {
    color: colors.textGray,
  },
  cointab__graphButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cointab__graphButtonsText: {
    color: colors.textGray,
    fontSize: typography.size14,
    fontFamily: typography.fontMedium,
  },
});