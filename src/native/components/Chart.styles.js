import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  chartContainer: {
    height: 170,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    position: 'relative',
  },
  axis: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 5,
  },
});