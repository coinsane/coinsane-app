import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  coinsHeader: { borderBottomWidth: 0 },
  header__arrow: {
    fontSize: 18,
    transform: [
      { rotate: '270deg' },
      { translateX: -3 },
      { translateY: -5 },
    ],
  },
  range: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    height: 26,
    marginTop: 14,
    marginBottom: 20,
    marginLeft: 7,
    marginRight: 7,
  },
  coins__contentHeaderText: {
    color: colors.textGray,
    fontSize: 14,
    fontFamily: fonts.fontMedium,
  },
  coins__buttonPeriod: {
    height: 26,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 3,
  },
  coins__buttonPeriodActive: {
    backgroundColor: colors.btnBgDark,
  },
  coins__buttonPeriodText: {
    color: colors.textGray,
    fontSize: 14,
    fontFamily: fonts.fontMedium,
    paddingLeft: 12,
    paddingRight: 12,
  },
  coins__buttonPeriodTextActive: {
    color: colors.white,
  },
  coins__nocoinsRow: {
    backgroundColor: colors.btnBgBlack,
    borderBottomWidth: 0,
    borderRadius: 4,
    marginLeft: 0,
    paddingLeft: 15,
    marginBottom: 15,
  },
  coins__nocoinsRowText: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: colors.btnBgBlack,
    width: 75,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dotActive: {
    backgroundColor: colors.textGray,
    width: 75,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  pagination: {
    bottom: 0,
  },
});
