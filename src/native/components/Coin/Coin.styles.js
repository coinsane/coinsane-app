import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

export default StyleSheet.create({
  coinHeader: {
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0,
  },
  header__body: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header__thumbnail: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  header__title: {
    fontFamily: typography.fontRegular,
    marginLeft: 8,
    marginRight: 4,
  },
  header__title_suffix: {
    fontFamily: typography.fontMedium,
    color: colors.textGray,
  },
});
