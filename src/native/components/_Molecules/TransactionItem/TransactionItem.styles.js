import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#2C263F',
    borderBottomWidth: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  body: {
    marginBottom: 5,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: typography.fontRegular,
    color: colors.textGray,
  },
  amount: {
    fontSize: 20,
    fontFamily: typography.fontBold,
    letterSpacing: -.35,
    marginTop: 3,
  }
});
