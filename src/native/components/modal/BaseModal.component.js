import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './BaseModal.styles';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const BaseModal = ({ children, verticalPercent, horizontalPercent, hideClose }) => {
  const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
  const width = horizontalPercent ? deviceHeight * horizontalPercent : deviceWidth;

  const renderClose = () => {
    if (!hideClose) {
      return (
        <View style={styles.closeBtnContainer}>
          <TouchableOpacity onPress={Actions.pop}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, { height, width }]}>
      {renderClose()}
      {children}
    </View>
  );
};

BaseModal.propTypes = {
  children: PropTypes.any,
  verticalPercent: PropTypes.number,
  horizontalPercent: PropTypes.number,
  hideClose: PropTypes.bool,
};

export default BaseModal;
