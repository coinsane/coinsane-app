import { StyleSheet } from 'react-native';

import { fonts, colors } from 'src/native/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    marginBottom: 15,
  },
  container__text: {
    fontSize: 16,
    color: colors.textGray,
    fontFamily: fonts.fontMedium,
    textAlign: 'center',
    width: '80%',
  },
  image: {
    marginBottom: 20,
  },
});
