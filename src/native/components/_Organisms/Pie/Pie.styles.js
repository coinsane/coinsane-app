import { StyleSheet } from 'react-native';
import { fonts } from '../../../styles/index';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  chart: {
    flex: 0.5,
    width: 160,
    height: 160,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 20,
  },
  legend: {
    flex: 0.5,
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 10,
  },
  legend__item: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  legend__title: {
    marginLeft: 10,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: fonts.fontMedium,
    paddingTop: 4,
    paddingBottom: 4,
  },
});
