import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import styles from './SummaryInfo.styles';

import CoinsanePctsText from '../../_Atoms/CoinsanePctsText/CoinsanePctsText.component'

const SummaryInfo = ({ label, value, symbol, isLast }) => {
  return (
    <View style={[styles.container, isLast && styles.lastItem]}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      {
        symbol === '%' ?
        <CoinsanePctsText style={styles.value} value={value} /> :
        <Text style={styles.value} numberOfLines={1}>{value} {symbol}</Text>
      }
    </View>
  )
};

SummaryInfo.propTypes = {
  // label: PropTypes.string,
  // value: PropTypes.string,
  // isLast: PropTypes.bool,
};

SummaryInfo.defaultProps = {
  value: '',
};

export default SummaryInfo;
