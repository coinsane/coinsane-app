import { StyleSheet } from 'react-native';
import { typography, colors, fonts } from '../../../styles';

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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    position: 'relative',
  },
  iconText: {
    fontFamily: fonts.fontMedium,
    fontSize: 14,
    position: 'absolute',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  right: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  category: {
    fontSize: 13,
    fontFamily: fonts.fontBold,
    color: colors.textGray,
  },
  amount: {
    fontSize: 18,
    fontFamily: fonts.fontBold,
    letterSpacing: -0.35,
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.fontRegular,
    color: colors.textGray,
  },
  time: {
    fontSize: 12,
    fontFamily: fonts.fontLight,
    color: colors.textGray,
  }
});
