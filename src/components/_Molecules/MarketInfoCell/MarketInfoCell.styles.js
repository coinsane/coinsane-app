import { StyleSheet } from 'react-native';
import { fonts, colors } from 'src/styles';

export default StyleSheet.create({
  container: {

  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  headerText: {
    color: colors.textGray,
    fontSize: 12,
    fontFamily: fonts.fontBold,
  },
  body: {
    fontSize: 14,
    fontFamily: fonts.fontMedium,
    paddingTop: 8
  },
  source: {
    fontSize: 12,
    fontFamily: fonts.fontMedium,
    flex: 1,
    marginBottom: 5,
  },
  pair: {
    fontSize: 12,
    fontFamily: fonts.fontMedium,
    color: colors.textGray,
    flex: 1,
  },
  col1: {
    flex: 0.36,
  },
  col2: {
    flex: 0.32,
    textAlign: 'right',
  },
  col3: {
    flex: 0.32,
    textAlign: 'right',
  },
});
