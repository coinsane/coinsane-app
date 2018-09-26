import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './CoinsaneSummaryText.styles';

const CoinsaneSummaryText = ({ value }) => <Text numberOfLines={1} style={styles.text}>{value}</Text>;

CoinsaneSummaryText.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default CoinsaneSummaryText;
