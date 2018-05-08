import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';

import styles from './SummaryInfo.styles';
import CoinsanePctsText from '../../_Atoms/CoinsanePctsText/CoinsanePctsText.component';

const SummaryInfo = ({
  label, value, symbol, isLast,
}) => (
  <View style={[styles.container, isLast && styles.lastItem]}>
    <Text style={styles.label}>{label.toUpperCase()}</Text>
    {
      symbol === '%' ?
        <CoinsanePctsText style={styles.value} value={value} /> :
        <Text style={styles.value} numberOfLines={1}>{value} {symbol}</Text>
    }
  </View>
);

SummaryInfo.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  symbol: PropTypes.string,
  isLast: PropTypes.bool,
};

SummaryInfo.defaultProps = {
  value: '',
  symbol: '',
  isLast: false,
};

export default SummaryInfo;
