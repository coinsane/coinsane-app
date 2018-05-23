import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles/index';

export default StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  portfolio__item: {
    backgroundColor: colors.btnBgBlack,
    borderBottomWidth: 0,
    borderRadius: 4,
    marginLeft: 0,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 12,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  portfolio__thumbnail: {
    width: 32,
    height: 32,
    marginRight: 10,
    alignSelf: 'center',
    borderRadius: 16,
  },
  portfolio__body: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  portfolio__row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  portfolio__row_text: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 2,
    fontSize: 15,
    fontFamily: typography.fontRegular,
  },
  portfolio__row_textLeft: {
    flex: 0.5,
  },
  portfolio__row_textRight: {
    flex: 0.5,
    textAlign: 'right',
  },
  portfolio__textSymbol: {
    fontSize: 15,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
  portfolio__textAmount: {
    fontSize: 15,
    color: colors.white,
    fontFamily: typography.fontMedium,
  },
  portfolio__textFooter: {
    fontSize: 13,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
  portfolio__buttonContainer: {
    marginBottom: 15,
  },
  portfolio__button: {
    borderColor: colors.blackBorder,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  portfolio__buttonText: {
    color: colors.textGray,
    fontFamily: typography.fontRegular,
  },
  coinCard_nameBock: {
    paddingRight: 20,
  },
  coinCard_order: {
    color: colors.textGray,
    fontFamily: typography.fontRegular,
    fontSize: 11,
    marginTop: 5,
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  coinCard__listItem_market: {
    borderColor: colors.btnBgBlack,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: 70,
  },
  coinCard__thumbnail: {
    marginRight: 10,
    alignSelf: 'center',
  },
  coinCard__thumbnail_market: {
    marginLeft: 15,
    width: 30,
    height: 30,
  },
  coinCard__errorItem: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 15,
    marginBottom: 15,
  },
  coinCard__left: {
    flex: 0.42,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginRight: 10,
  },
  coinCard__body: {
    flex: 0.25,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  coinCard__right: {
    flex: 0.33,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  coinCard__body_portfolio: {
    flex: 0.6,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  coinCard__right_portfolio: {
    flex: 0.4,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  coinCard__title: {
    flex: 1,
  },
  coinCard__text: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 4,
    fontSize: 15,
    fontFamily: typography.fontRegular,
  },
  coinCard__textSymbol: {
    fontSize: 15,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
  coinCard__textAmount: {
    fontSize: 15,
    paddingLeft: 4,
    color: colors.white,
    fontFamily: typography.fontMedium,
  },
  coinCard__subtext: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 13,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
  right__text: {
    fontSize: 15,
    marginBottom: 4,
    fontFamily: typography.fontMedium,
  },
});
