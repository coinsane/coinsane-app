import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './Empty.styles';

const EmptyState = ({ description }) => (
  <View style={styles.container}>
    <Text style={styles.container__text}>{description}</Text>
  </View>
);

EmptyState.propTypes = {
  description: PropTypes.string.isRequired,
};

export default EmptyState;
