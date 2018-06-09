import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../../styles';

export default StyleSheet.create({
  container: {
    borderColor: colors.btnBgBlack,
    backgroundColor: colors.bgGray,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
    color: colors.textGray,
    alignSelf: 'center',
  },
  title: {
    color: colors.textGray,
    fontFamily: fonts.fontBold,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
  },
});
