import React from 'react';
import { Text } from 'native-base';
import styles from './CoinsanePctsText.styles';

const CoinsanePctsText = ({
  value
}) => {
  const color = value && parseFloat(value) >= 0 ? styles.positive : styles.negative;
  const displayValue = `${value || 0}%`;
  return (
    <Text style={[styles.text, color]}>{displayValue}</Text>
  )
};

export default CoinsanePctsText;
