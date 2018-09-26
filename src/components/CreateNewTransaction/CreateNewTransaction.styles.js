import { StyleSheet } from 'react-native';
import { fonts, colors } from 'src/styles';

export default StyleSheet.create({
  listItemContainer: {
    borderColor: colors.inputBg,
    borderBottomWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  listItemContainer_header: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 25,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  listItem__label: {
    fontFamily: fonts.fontRegular,
    fontSize: 12,
    color: colors.textGray,
    marginLeft: 0,
    marginRight: 0,
  },
  listItem__title: {
    fontFamily: fonts.fontRegular,
    fontSize: 16,
    letterSpacing: -0.25,
    marginLeft: 0,
    marginRight: 0,
  },
  listItem__rightIconContainer: {
    alignSelf: 'flex-end',
  },
  listItem__rightButton: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    height: 40,
    elevation: 0,
  },
  listItem__rightButtonText: {
    alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 10,
    color: colors.white,
    fontFamily: fonts.fontMedium,
    fontSize: 16,
  },
  listItem__rightIcon: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 15,
    color: colors.textGray,
  },
  listItem__header: {
    color: colors.textGray,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: fonts.fontMedium,
    marginBottom: 0,
    marginTop: 10,
  },
  listItem__subTitle: {
    color: colors.textGray,
  },
  listItem__textInput: {
    fontSize: 16,
    color: colors.white,
    paddingLeft: 0,
    height: 36,
  },
  listItem__textInput_growing: {
    fontSize: 16,
    color: colors.white,
    paddingLeft: 0,
  },
  dateInput: {
    height: 20,
    paddingLeft: 0,
    borderWidth: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    color: colors.white,
  },
});
