import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  settings__header: {
    backgroundColor: colors.bgGray,
    borderBottomColor: colors.blackBorder,
  },
  settings__container: {
    backgroundColor: colors.bgGray,
    paddingTop: 15,
    paddingLeft: 15,
  },
  settings_list: {
    paddingBottom: 25,
  },
  settings_listItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blackBorder,
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 0,
    marginRight: 0,
  },
  settings_listItem__withIcon: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  settings_listItem__withLabel: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  settings_listItem__label: {
    letterSpacing: 1,
    flex: 1,
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 8,
  },
  settings_listItem__text: {
    fontSize: 17,
    fontFamily: fonts.fontRegular,
  },
  settings_listItem__textWithLabel: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  settings_listItem__text_withIcon: {
    paddingLeft: 15,
  },
  container__text: {
    color: colors.textGray,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: fonts.fontMedium,
    marginBottom: 15,
    marginTop: 5,
  },
});
