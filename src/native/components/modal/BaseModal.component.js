import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './BaseModal.styles';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const BaseModal = ({ children, verticalPercent, horizontalPercent, hideClose }) => {
  const height = verticalPercent ?
    deviceHeight * verticalPercent :
    Platform.OS === 'android' ?
      deviceHeight - 24 :
      deviceHeight;
  const width = horizontalPercent ?
    deviceHeight * horizontalPercent :
    deviceWidth;

  const renderClose = () => !hideClose &&
    <View style={styles.closeBtnContainer}>
      <TouchableOpacity onPress={Actions.pop}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>;

  return (
    <View style={[styles.container, { height, width }]}>
      {renderClose()}
      {children}
    </View>
  );
};

BaseModal.propTypes = {
  children: PropTypes.node.isRequired,
  verticalPercent: PropTypes.number,
  horizontalPercent: PropTypes.number,
  hideClose: PropTypes.bool,
};

BaseModal.defaultProps = {
  verticalPercent: 0,
  horizontalPercent: 0,
  hideClose: false,
};

export default BaseModal;
