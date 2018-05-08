import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './CoinsaneSummaryText.styles';
import { nFormat } from '../../../../lib/utils';

const CoinsaneSummaryText = ({
  value,
  currency,
}) => {
  const fixed = currency === 'BTC' ? 6 : 2;
  // .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  const displayValue = currency === 'BTC' ? `${nFormat(parseFloat(value), fixed)}` : `${nFormat(parseFloat(value), fixed)}`;
  return (
    <Text style={styles.text}>{displayValue}</Text>
  );
};

CoinsaneSummaryText.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default CoinsaneSummaryText;
