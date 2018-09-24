import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  body: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  footer: {
    alignItems: 'center',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  form: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  headTitle: {
    color: colors.textGray,
    fontSize: 12,
    fontFamily: fonts.fontMedium,
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderBottomWidth: 0,
    borderRadius: 4,
    marginLeft: 0,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputText: {
    color: colors.white,
    fontSize: 16,
  },
  text: {
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    fontSize: 16,
    fontFamily: fonts.fontMedium,
    color: colors.white,
    marginBottom: 30,
  },
});
