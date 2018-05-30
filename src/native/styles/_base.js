import { StyleSheet } from 'react-native';
import colors from './_colors';
import typography from './_typography';

export default StyleSheet.create({
  white: { color: colors.white },
  textCenter: { textAlign: 'center' },
  headerContainer: { borderBottomWidth: 0 },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.bgGray,
  },
  footer: {
    backgroundColor: colors.bgGray,
    borderTopWidth: 0,
    height: 50,
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
    fontFamily: typography.fontMedium,
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
    fontFamily: typography.fontMedium,
  },
  // List item shared input field with label
  listItem__labelInputContainer: {
    paddingLeft: 10,
    borderBottomColor: colors.bgGray,
    marginLeft: 0
  },
  listItem__labelText: {
    paddingTop: 0,
    paddingRight: 0
  },
  listItem__labelInput: {
    height: 21,
    paddingLeft: 0
  },
  // form with input for name
  form__titleContainer: {
    marginLeft: 0,
    borderBottomColor: colors.blackBorder,
  },
  form__titleLabel: {
    color: colors.textGray,
    fontSize: typography.size12,
    letterSpacing: 1,
    fontFamily: typography.fontRegular,
  },
  form__titleInput: {
    fontSize: typography.size17,
    letterSpacing: -0.25,
    fontFamily: typography.fontRegular,
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
    fontSize: typography.size17,
    letterSpacing: -0.25,
    fontFamily: typography.fontRegular,
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
