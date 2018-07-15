import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import styles from './MarketInfoCell.styles';

const MarketInfoCell = ({ item, isFirst }) => {
  const {
    source,
    pair,
    volume,
    price,
  } = item;
  return (
    <View>
      {
        !!isFirst &&
        <View style={styles.header}>
          <Text style={[styles.col1, styles.headerText]}>Source</Text>
          <Text style={[styles.col2, styles.headerText]}>Vol(24h)</Text>
          <Text style={[styles.col3, styles.headerText]}>Price</Text>
        </View>
      }
      <View style={styles.row}>
        <View style={[styles.col1]}>
          <Text style={styles.source}>{source}</Text>
          <Text style={styles.pair}>{pair}</Text>
        </View>
        <Text style={[styles.col2, styles.body]}>{volume}</Text>
        <Text style={[styles.col3, styles.body]}>{price}</Text>
      </View>
    </View>
  );
};

MarketInfoCell.propTypes = {
  item: PropTypes.shape({}).isRequired,
  isFirst: PropTypes.bool,
};

MarketInfoCell.defaultProps = {
  isFirst: false,
};

export default MarketInfoCell;
