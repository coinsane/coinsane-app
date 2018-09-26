import { StyleSheet } from 'react-native';

export default StyleSheet.flatten({
  row: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  buttons: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    position: 'relative',
  },
});
