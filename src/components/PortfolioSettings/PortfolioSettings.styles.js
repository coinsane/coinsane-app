import { StyleSheet } from 'react-native';
import { colors, fonts } from 'src/styles';

export default StyleSheet.create({
  form__button: { marginTop: 15, marginBottom: 15 },
  form__buttonText: {
    color: colors.primaryPink,
    fontSize: 16,
    fontFamily: fonts.fontRegular,
    paddingLeft: 0,
    paddingRight: 0,
  },
});
