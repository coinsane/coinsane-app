import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

export default StyleSheet.create({
  market__header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
  market__header_text: {
    color: colors.textGray,
    fontFamily: typography.fontMedium,
    fontSize: 12,
  },
  market__header_row1: {
    flex: 0.36,
    marginRight: 10,
  },
  market__header_row2: {
    flex: 0.26,
  },
  market__header_row3: {
    flex: 0.38,
    textAlign: 'right',
  },
});
