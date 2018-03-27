import { StyleSheet } from 'react-native';
import colors from './_colors';
import typography from './_typography';

export default StyleSheet.create({
  white: { color: colors.white },
  textCenter: { textAlign: 'center' },
  headerContainer: { borderBottomWidth: 0 },
  contentContainer: { backgroundColor: colors.bgGray },
  //footer with btn
  footer: {
    backgroundColor: colors.inputBg,
    borderTopWidth: 0,
    height: 45,
    marginTop: 15
  },
  footer__button: {
    flex: 1,
    height: 45,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  footer__buttonText: {
    color: colors.white,
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
});
