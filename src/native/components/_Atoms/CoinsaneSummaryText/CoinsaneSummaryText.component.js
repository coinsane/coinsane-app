import React from 'react';
import { Text } from 'native-base';
import styles from './CoinsaneSummaryText.styles';

const CoinsaneSummaryText = ({
  value,
  currency,
}) => {
  const fixed = currency === 'BTC' ? 6 : 2;
  const displayValue = currency === 'BTC' ? `${parseFloat(value).toFixed(fixed)} ${currency}` : `${parseFloat(value).toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${currency}`;
  return (
    <Text style={styles.text}>{displayValue}</Text>
  )
};

export default CoinsaneSummaryText;
