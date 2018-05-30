import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

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
    marginBottom: 20,
    marginLeft: 7,
    marginRight: 7,
  },
  coins__contentHeaderText: {
    color: colors.textGray,
    fontSize: 14,
    fontFamily: typography.fontMedium,
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
    backgroundColor: '#251F38',
  },
  coins__buttonPeriodText: {
    color: colors.textGray,
    fontSize: typography.size14,
    fontFamily: typography.fontMedium,
    paddingLeft: 12,
    paddingRight: 12,
  },
  coins__buttonPeriodTextActive: {
    color: '#fff',
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
    fontSize: typography.size14,
    color: colors.textGray,
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
