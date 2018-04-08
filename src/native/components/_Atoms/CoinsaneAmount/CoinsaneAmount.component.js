import React from 'react';
import { Text } from 'native-base';

const CoinsaneAmount = ({
  value,
  currency,
}) => {
  // TODO get "fixed" by currency id
  const isFiatCurrency = currency === 'USD' || currency === 'RUB';
  const fixed = isFiatCurrency ? 2 : 8;
  const displayValue = isFiatCurrency ? `${parseFloat(value).toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : `${parseFloat(value).toFixed(fixed)}`;
  return displayValue;
};

export default CoinsaneAmount;
