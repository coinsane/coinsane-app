import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../styles/index';

export default StyleSheet.create({
  slider: {
    flex: 1,
  },
  dot: {
    backgroundColor: colors.textGray,
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
  },
  dotActive: {
    backgroundColor: colors.white,
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
  },
  slide: {
    backgroundColor: colors.bgGray,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    bottom: 20,
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fonts.fontMedium,
  },
  buttonStart: {
    fontSize: 14,
    fontFamily: fonts.fontMedium,
    position: 'absolute',
    right: 20,
    bottom: 18,
  },
  buttonSkip: {
    fontSize: 14,
    fontFamily: fonts.fontMedium,
    position: 'absolute',
    left: 20,
    bottom: 18,
  },
  slidePlaceholder: {
    height: 300,
  },
  slideText: {
    fontSize: 16,
    fontFamily: fonts.fontRegular,
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    marginBottom: 40,
    height: 60,
  },
  slideImagesWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImageWrapper__back: {
    width: 280,
    height: 326,
    position: 'absolute',
  },
  slideImage__back: {
    width: 170,
    height: 326,
    left: 0,
  },
  slideImage__front: {
    width: 205,
    height: 386,
  },
  slideTransactionWrapper: {
    width: 300,
    height: 60,
    top: 192,
    position: 'absolute',
    backgroundColor: colors.onboardingCard,
  },
  slideMarketWrapper: {
    width: 300,
    height: 64,
    top: 147,
    position: 'absolute',
    backgroundColor: colors.onboardingCard,
  },
});