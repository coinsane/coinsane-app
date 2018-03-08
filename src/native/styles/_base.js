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
    backgroundColor: colors.bgGray,
    marginBottom: 15,
    paddingBottom: 15,
    borderTopWidth: 0,
  },
  footer__button: {
    flex: 1,
    borderColor: colors.blackBorder,
    borderRadius: 5,
    marginTop: 15,
    paddingTop: 25,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  footer__buttonText: {
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
  //form with input for name
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
