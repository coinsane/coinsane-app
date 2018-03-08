import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

export default StyleSheet.create({
  coinCard__container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  coinCard__listItem: {
    backgroundColor: colors.btnBgBlack,
    borderBottomWidth: 0,
    borderRadius: 4,
    marginLeft: 0,
    paddingLeft: 15,
    marginBottom: 15,
  },
  coinCard__errorItem: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 15,
    marginBottom: 15,
  },
  coinCard__body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coinCard__thumbnail: {
    marginTop: 4,
    marginRight: 10,
  },
  coinCard__textContainer: {
    marginBottom: 6,
  },
  coinCard__textSymbol: {
    fontSize: typography.size14,
    color: colors.textGray,
    fontFamily: typography.fontMedium,
  },
  coinCard__textAmount: {
    fontSize: typography.size14,
    color: colors.white,
    fontFamily: typography.fontMedium,
  },
  coinCard__subtext: {
    fontSize: typography.size14,
    color: colors.textGray,
    fontFamily: typography.fontRegular,
  },
  rightContainer: { flex: 0.4 },
  right__text: {
    fontSize: typography.size14,
    marginBottom: 6,
    fontFamily: typography.fontMedium,
  },
  coinCard__footer: {
    paddingBottom: 15,
    // borderColor: colors.blackBorder,
    // borderBottomWidth: 1,
  },
  coinCard__footerButton: {
    borderColor: colors.blackBorder,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
  },
  coinCard__footerButtonText: {
    color: colors.textGray,
    fontWeight: 'normal',
  },
});
