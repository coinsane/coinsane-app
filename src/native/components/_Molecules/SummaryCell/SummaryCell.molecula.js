import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import SummaryInfo from '../SummaryInfo/SummaryInfo.molecula';
import styles from './SummaryCell.styles';
import { typography, colors } from '../../../styles';

const SummaryCell = ({ summaryList, background }) => {

  return (
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
  )
};

SummaryCell.propTypes = {
  summaryList: PropTypes.arrayOf(PropTypes.shape({})),
};

SummaryCell.defaultProps = {
};

export default SummaryCell;
