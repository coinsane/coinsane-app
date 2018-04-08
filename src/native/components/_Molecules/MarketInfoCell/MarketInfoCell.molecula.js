import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import SummaryInfo from '../SummaryInfo/SummaryInfo.molecula';
import styles from './MarketInfoCell.styles';
import { typography, colors } from '../../../styles';

const MarketInfoCell = ({ list }) => {

  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <Text style={[styles.col1, styles.header]}>Source</Text>
        <Text style={[styles.col2, styles.header]}>Vol(24h)</Text>
        <Text style={[styles.col3, styles.header]}>Price</Text>
        <Text style={[styles.col4, styles.header]}>Vol(%)</Text>
      </View>
      {list.map(({ source, pair, volume, price, changePct }, i) => (
        <View style={styles.row} key={i}>
          <View style={[styles.col1]}>
            <Text style={styles.source}>{source}</Text>
            <Text style={styles.pair}>{pair}</Text>
          </View>
          <Text style={[styles.col2, styles.body]}>{volume}</Text>
          <Text style={[styles.col3, styles.body]}>{price}</Text>
          <Text style={[styles.col4, styles.body]}>{changePct}</Text>
        </View>
      ))}
    </View>
  )
};

MarketInfoCell.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
};

MarketInfoCell.defaultProps = {
};

export default MarketInfoCell;
