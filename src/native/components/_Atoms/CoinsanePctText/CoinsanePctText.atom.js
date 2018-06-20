import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './CoinsanePctText.styles';

const CoinsanePctText = ({
  value,
  symbol,
  size,
  positive,
  negative,
}) => {
  if (symbol === '%') {
    const color = value >= 0 ? styles.positive : styles.negative;
    const prefix = value >= 0 ? '+' : '-';
    const displayValue = `${prefix}${parseFloat(Math.abs(value)).toFixed(2) || 0}${symbol}`;
    return <Text numberOfLines={1} style={[styles.text, color, { fontSize: size }]}>{displayValue}</Text>;
  }
  let color = {};
  if (positive) {
    color = styles.positive;
  }
  if (negative) {
    color = styles.negative;
  }
  return <Text numberOfLines={1} style={[styles.text, styles.white, color, { fontSize: size }]}>{value}</Text>;
};

CoinsanePctText.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  symbol: PropTypes.string,
  size: PropTypes.number,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
};

CoinsanePctText.defaultProps = {
  value: 0,
  symbol: '%',
  size: 14,
  positive: null,
  negative: null,
};


export default CoinsanePctText;
