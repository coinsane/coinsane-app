import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';

import styles from './SummaryInfo.styles';
import CoinsanePctText from '../../_Atoms/CoinsanePctText/CoinsanePctText.atom';

const SummaryInfo = ({
  label, value, symbol, isLast,
}) => (
  <View style={[styles.container, isLast && styles.lastItem]}>
    <Text style={styles.label}>{label.toUpperCase()}</Text>
    <CoinsanePctText style={styles.value} value={value} symbol={symbol} />
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
