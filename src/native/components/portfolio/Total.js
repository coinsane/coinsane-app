import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';

const PortfolioTotal = ({ size, totals }) => {
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <Text style={{ fontSize: 14, textAlign: 'center', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#8D8A96' }}>TOTAL</Text>
      <Text style={{ fontSize: 36, textAlign: 'center', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>${totals.USD.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      <Text style={{ fontSize: 14, textAlign: 'center', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#31E981', marginBottom: 10 }}>2.13%</Text>
    </View>
  )
};

PortfolioTotal.propTypes = {
  size: PropTypes.number,
  totals: PropTypes.shape({}),
};

PortfolioTotal.defaultProps = {
  size: 200,
};

export default PortfolioTotal;
