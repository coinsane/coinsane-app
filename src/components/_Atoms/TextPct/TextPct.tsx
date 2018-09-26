import React from 'react';
import { Text } from 'native-base';

import styles from './TextPct.styles';

interface IProps {
  value: number;
  symbol?: string;
  size?: number;
  positive?: boolean;
  negative?: boolean;
  style?: {};
}

class TextPct extends React.PureComponent<IProps> {
  render () {
    const {
      value,
      symbol,
      size = 14,
      positive,
      negative,
    } = this.props;
    if (symbol === '%') {
      if (Number.isNaN(value)) return null;
      const color = value >= 0 ? styles.positive : styles.negative;
      const prefix = value >= 0 ? '+' : '-';
      const displayValue = `${prefix}${Math.abs(value).toFixed(2)}${symbol}`;
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
  }
}

export default TextPct;
