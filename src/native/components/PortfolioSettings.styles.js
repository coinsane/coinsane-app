import { StyleSheet } from 'react-native';
import { colors, typography } from '../styles';

export default StyleSheet.create({
  settings__header: {
    backgroundColor: colors.bgGray,
    borderBottomColor: colors.blackBorder,
  },
  settings__container: {
    backgroundColor: colors.bgGray,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container__text: {
    color: colors.textGray,
    fontSize: typography.size14,
    letterSpacing: 1,
    fontFamily: typography.fontMedium,
    marginBottom: 20,
    marginTop: 5,
  },
  form__button: { marginTop: 15, marginBottom: 15 },
  form__buttonText: {
    color: colors.primaryPink,
    fontSize: typography.size17,
    fontFamily: typography.fontRegular,
    paddingLeft: 0,
    paddingRight: 0,
  },
  footer__button: {
    flex: 1,
    backgroundColor: colors.btnBgBlack,
    height: 49,
    marginTop: 15,
    marginBottom: 15,
  },
});