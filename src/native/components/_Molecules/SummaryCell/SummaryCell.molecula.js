import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import SummaryInfo from '../SummaryInfo/SummaryInfo.molecula';
import styles from './SummaryCell.styles';

const SummaryCell = ({ summaryList, background }) => (
  <View style={[styles.container, background && styles.background]}>
    {summaryList.map(({ label, value, symbol }, i) => (
      <SummaryInfo
        key={label}
        label={label}
        value={value}
        symbol={symbol}
        isLast={i === summaryList.length - 1}
      />
    ))}
  </View>
);

SummaryCell.propTypes = {
  summaryList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    symbol: PropTypes.string,
  })).isRequired,
  background: PropTypes.bool,
};

SummaryCell.defaultProps = {
  background: false,
};

export default SummaryCell;
