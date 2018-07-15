import { StyleSheet } from 'react-native';
import colors from './_colors';
import fonts from './_fonts';

export default StyleSheet.create({
  white: { color: colors.white },
  title: {
    color: colors.white,
    fontFamily: fonts.fontMedium,
    fontSize: 16,
  },
  textCenter: { textAlign: 'center' },
  headerContainer: { borderBottomWidth: 0 },
  contentBackground: {
    backgroundColor: colors.bgGray,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.bgGray,
  },
  contentPadding: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  footer: {
    backgroundColor: colors.bgGray,
    borderTopWidth: 0,
    height: 50,
    elevation: 0,
  },
  footer__button: {
    flex: 1,
    marginTop: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    height: 50,
    backgroundColor: colors.inputBg,
  },
  footer__buttonText: {
    color: colors.white,
    fontFamily: fonts.fontMedium,
  },
  footer__button_bordered: {
    flex: 1,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    backgroundColor: colors.bgGray,
    borderColor: colors.btnBgBlack,
    borderRadius: 5,
  },
  footer__buttonText_bordered: {
    color: colors.textGray,
    fontFamily: fonts.fontMedium,
  },
  list__buttonContainer: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  list__button: {
    borderWidth: 1,
    borderColor: colors.blackBorder,
    borderRadius: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  list__buttonText: {
    color: colors.textGray,
    fontFamily: fonts.fontRegular,
  },
  listItem__labelInputContainer: {
    paddingLeft: 0,
    marginLeft: 0,
    borderBottomColor: colors.bgGray,
  },
  listItem__labelText: {
    paddingTop: 0,
    paddingRight: 0,
    fontFamily: fonts.fontRegular,
    fontSize: 12,
    color: colors.textGray,
  },
  listItem__labelInput: {
    height: 24,
    paddingLeft: 0,
  },
  form__title: {
    color: colors.textGray,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: fonts.fontMedium,
    marginBottom: 20,
    marginTop: 5,
  },
  form__titleContainer: {
    marginLeft: 0,
    borderBottomColor: colors.blackBorder,
  },
  form__titleLabel: {
    color: colors.textGray,
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: fonts.fontRegular,
  },
  form__titleInput: {
    fontSize: 16,
    letterSpacing: -0.25,
    fontFamily: fonts.fontRegular,
  },
  form__switchContainer: {
    paddingBottom: 24,
    paddingTop: 24,
    borderBottomColor: colors.blackBorder,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  form__switchLabel: {
    flex: 0.8,
    color: colors.white,
    fontFamily: fonts.fontRegular,
    fontSize: 16,
  },
  form__switchInput: {
    flex: 0.2,
  },
  form__checkbox: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomColor: colors.blackBorder,
    borderBottomWidth: 1,
  },
  form__checkboxText: {
    color: colors.white,
    fontSize: 16,
    letterSpacing: -0.25,
    fontFamily: fonts.fontRegular,
  },
  gradientBottom: {
    flex: 1,
    position: 'absolute',
    height: 30,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
