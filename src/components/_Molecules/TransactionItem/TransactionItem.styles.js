import { StyleSheet } from 'react-native';
import { colors, fonts } from 'src/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    position: 'relative',
    backgroundColor: colors.bgPrimary,
  },
  swipeItem: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.bgGray,
  },
  body: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 60,
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
    marginLeft: 5,
  },
  right: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
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
  },
});
