import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  segmentControl: {
    flex: 1,
    borderColor: colors.inputBg,
		borderWidth: 1,
		borderRadius: 18
  },
  segmentBtn: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0,
  },
  listItemContainer: {
    borderColor: colors.inputBg,
    borderBottomWidth: 1,
    paddingLeft: 5,
    marginLeft: 0,
    
  },
  listItem__rightButton: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent'
  },
  listItem__rightButtonText: {
    alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    color: colors.white
  },
  listItem__rightIconContainer: {
    alignSelf: 'center'
  },
  listItem__rightIcon: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 15
  },
  listItem__subTitle: {
    color: colors.textGray
  },
  
});
