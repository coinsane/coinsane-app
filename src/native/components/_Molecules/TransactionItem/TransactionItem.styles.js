import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  body: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  amount: {
    fontSize: 20,
    fontFamily: typography.fontBold,
    letterSpacing: -0.35,
  },
  text: {
    fontSize: 12,
    fontFamily: typography.fontRegular,
    color: colors.textGray,
  },
});
