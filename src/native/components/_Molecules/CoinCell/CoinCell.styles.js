import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles';

export default StyleSheet.create({
  listItemContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
  },
  listItem__thumbnail: {
    width: 32,
    height: 32,
    marginRight: 10,
    alignSelf: 'center',
    borderRadius: 16,
  },
  listItem__leftIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  listItem__rightIcon: {
    color: colors.textGray,
  },
  listItem__subTitle: {
    color: colors.textGray,
  },
  listItem__body: {
    marginLeft: 0,
  },
  listItem__right: {
    marginRight: 0,
    paddingRight: 0,
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  listItem__text: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 4,
    fontSize: 15,
    fontFamily: typography.fontRegular,
  },
  listItem__text_footer: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 13,
    lineHeight: 13,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
});
