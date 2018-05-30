import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../styles/index';

export default StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
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
    borderWidth: 1,
    borderColor: colors.blackBorder,
    borderRadius: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  portfolio__buttonText: {
    color: colors.textGray,
    fontFamily: typography.fontRegular,
  },
  market_item: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: 64,
  },
  market__thumbnail: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  market_order: {
    color: colors.textGray,
    fontFamily: typography.fontRegular,
    fontSize: 11,
    marginTop: 5,
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  market__left: {
    flex: 0.42,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginRight: 10,
  },
  market__body: {
    flex: 0.25,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  market__right: {
    flex: 0.33,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  market__title: {
    flex: 1,
  },
  market__text: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 4,
    fontSize: 15,
    fontFamily: typography.fontRegular,
  },
  market__text_footer: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 13,
    lineHeight: 13,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
});
