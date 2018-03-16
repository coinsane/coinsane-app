import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  coinHeader: {
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0,
  },
  coinHeader__body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coinHeader__thumbnail: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  coinHeader__text: {
    color: colors.textGray
  },
});