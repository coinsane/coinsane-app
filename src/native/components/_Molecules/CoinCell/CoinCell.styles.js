import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../styles';

export default StyleSheet.create({
  listItemContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0,
    alignContent: 'center',
  },
  listItem__thumbnail: {
    width: 32,
    height: 32,
    marginRight: 5,
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
    alignSelf: 'center',
  },
  listItem__left: {
    flex: 0,
    marginRight: 0,
    paddingRight: 10,
    alignItems: 'center',
    alignSelf: 'center',
    height: 44,
  },
  listItem__right: {
    flex: 0,
    marginRight: 0,
    paddingRight: 0,
    alignItems: 'flex-end',
    alignSelf: 'center',
    height: 44,
  },
  listItem__text: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 4,
    fontSize: 16,
    fontFamily: fonts.fontRegular,
  },
  listItem__text_footer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 4,
    fontSize: 13,
    lineHeight: 13,
    color: colors.textGray,
    fontFamily: fonts.fontMedium,
  },
});
