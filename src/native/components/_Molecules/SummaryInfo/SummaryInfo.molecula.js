import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import styles from './SummaryInfo.styles';

const SummaryInfo = ({ label, value, isLast }) => {
  return (
    <View style={[styles.container, isLast && styles.lastItem]}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
    </View>
  )
};

SummaryInfo.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isLast: PropTypes.bool,
};

SummaryInfo.defaultProps = {
  value: '',
};

export default SummaryInfo;
