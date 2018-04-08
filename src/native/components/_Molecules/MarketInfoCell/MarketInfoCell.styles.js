import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../styles';

export default StyleSheet.create({
  container: {

    marginLeft: 15,
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10
  },
  rowHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 15,
  },
  header: {
    color: colors.textGray,
    fontSize: 12,
    fontFamily: typography.fontBold
  },
  body: {
    fontSize: 14,
    fontFamily: typography.fontMedium,
    paddingTop: 8
  },
  source: {
    fontSize: 12,
    fontFamily: typography.fontMedium,
    flex: 1,
    marginBottom: 5,
  },
  pair: {
    fontSize: 12,
    fontFamily: typography.fontMedium,
    color: colors.textGray,
    flex: 1,
  },
  col1: {
    flex: 0.32,
  },
  col2: {
    flex: 0.26,
  },
  col3: {
    flex: 0.26,
  },
  col4: {
    flex: 0.16,
    textAlign: 'right',
  },
});
