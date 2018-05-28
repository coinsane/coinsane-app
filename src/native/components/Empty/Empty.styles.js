import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

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
    fontSize: 15,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    textAlign: 'center',
  },
});
