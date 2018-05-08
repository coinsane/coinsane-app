import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

export default StyleSheet.create({
  coinsHeader: { borderBottomWidth: 0 },
  coins__bodyArrowIcon: {
    transform: [
      { rotate: '270deg' },
      { translateX: -3 },
      { translateY: -5 },
    ],
  },
  coins__contentHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
  },
  coins__contentHeaderText: {
    color: colors.textGray,
    fontSize: typography.size14,
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