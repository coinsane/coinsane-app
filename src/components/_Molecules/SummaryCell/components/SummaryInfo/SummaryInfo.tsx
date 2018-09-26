import React from 'react';
import { View, Text } from 'native-base';

import TextPct from 'src/components/_Atoms/TextPct';

import styles from './SummaryInfo.styles';

interface IProps {
  label: string;
  value: number;
  symbol: string;
  isLast: boolean;
}

class SummaryInfo extends React.PureComponent<IProps> {
  render() {
    const {
      label,
      value = 0,
      symbol = '',
      isLast = false,
    } = this.props;
    return (
      <View style={[styles.container, isLast && styles.lastItem]}>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <TextPct value={value} symbol={symbol} style={styles.value} />
      </View>
    );
  }
}

export default SummaryInfo;
