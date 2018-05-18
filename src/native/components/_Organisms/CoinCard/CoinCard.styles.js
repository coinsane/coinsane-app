import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles/index';

export default StyleSheet.create({
  coinCard__container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  coinCard_nameBock: {
    paddingRight: 20,
  },
  coinCard__listItem_portfolio: {
    backgroundColor: colors.btnBgBlack,
    borderBottomWidth: 0,
    borderRadius: 4,
    marginLeft: 0,
    paddingLeft: 15,
    marginBottom: 15,
  },
  coinCard__listItem_market: {
    borderColor: colors.btnBgBlack,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 15,
  },
  coinCard__errorItem: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 15,
    marginBottom: 15,
  },
  coinCard__left: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  coinCard__body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coinCard__right: {
    flex: 0.4,
  },
  coinCard__thumbnail: {
    marginTop: 4,
    marginRight: 10,
  },
  coinCard__textContainer: {
    marginBottom: 6,
    fontFamily: typography.fontMedium,
  },
  coinCard__textSymbol: {
    fontSize: 14,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
  coinCard__textAmount: {
    paddingLeft: 4,
    fontSize: 14,
    color: colors.white,
    fontFamily: typography.fontMedium,
  },
  coinCard__subtext: {
    fontSize: 14,
    color: colors.textGray,
    fontFamily: typography.fontRegular,
  },
  right__text: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: typography.fontMedium,
  },
  coinCard__footer: {
    marginBottom: 15,
  },
  coinCard__footerButton: {
    borderColor: colors.blackBorder,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  coinCard__footerButtonText: {
    color: colors.textGray,
    fontWeight: 'normal',
  },
});
