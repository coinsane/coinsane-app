import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './CoinsaneSummaryText.styles';
import { nFormat } from '../../../../lib/utils';

const CoinsaneSummaryText = ({
  value,
  currency,
}) => {
  const decimal = currency.decimal > 6 ? 6 : currency.decimal;
  const displayValue = nFormat(value, decimal);
  return (
    <Text style={styles.text}>{displayValue}</Text>
  );
};

CoinsaneSummaryText.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.shape({}).isRequired,
};

export default CoinsaneSummaryText;
