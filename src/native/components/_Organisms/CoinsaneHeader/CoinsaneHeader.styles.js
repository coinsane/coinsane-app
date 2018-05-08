import { StyleSheet } from 'react-native';
import { colors } from '../../../styles';

export default StyleSheet.create({
  header: {
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0,
  },
  header__left: {
    flex: 0.15,
  },
  header__right: {
    flex: 0.15,
  },
  header__body: {
    flex: 0.7,
  },
  header__title: {
  },
  header__thumbnail: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  header__text: {
    color: colors.textGray,
  },
});
