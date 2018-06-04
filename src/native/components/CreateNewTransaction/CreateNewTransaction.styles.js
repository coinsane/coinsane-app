import { StyleSheet } from 'react-native';
import { typography, colors } from '../../styles';

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
    borderBottomWidth: 0,
    paddingTop: 25,
    paddingBottom: 0,
  },
  listItem__label: {
    fontFamily: typography.fontRegular,
    fontSize: 12,
    color: colors.textGray,
    marginLeft: 0,
    marginRight: 0,
  },
  listItem__title: {
    fontFamily: typography.fontRegular,
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
  },
  listItem__rightButtonText: {
    alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    color: colors.white,
    fontFamily: typography.fontRegular,
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
    fontFamily: typography.fontMedium,
    marginBottom: 20,
    marginTop: 5,
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
    height: 36,
  },
});
