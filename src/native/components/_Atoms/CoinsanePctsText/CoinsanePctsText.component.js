import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './CoinsanePctsText.styles';

const CoinsanePctsText = ({
  value,
  currency,
}) => {
  const color = value >= 0 ? styles.positive : styles.negative;
  const symbol = value >= 0 ? '+' : '-';
  const displayValue = `${symbol}${parseFloat(Math.abs(value)).toFixed(2) || 0}${currency || '%'}`;
  return (
    <Text style={[styles.text, color]}>{displayValue}</Text>
  )
};

CoinsanePctsText.propTypes = {
  value: PropTypes.number.isRequired,
};


export default CoinsanePctsText;
