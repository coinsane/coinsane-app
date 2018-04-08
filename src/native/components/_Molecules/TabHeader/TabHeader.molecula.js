import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import styles from './TabHeader.styles';

const TabHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
};

TabHeader.propTypes = {
  title: PropTypes.string,
};

export default TabHeader;
