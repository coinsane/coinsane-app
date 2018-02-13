import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import Icon from '../Icon';

const PortfolioTotal = ({ totals, changePct }) => {

  const totalDisplay = totals && totals.USD ? `${totals.USD.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0.00';
  const changeColor = changePct && changePct.USD && changePct.USD > 0 ? '#31E981' : '#F61067';
  const changePctDisplay = changePct && changePct.USD ? `${changePct.USD.toFixed(2)}%` : '0%';

  return (
    <View style={{ flex: 1, marginTop: 10, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 14, color: '#8D8A96', fontFamily: 'Lato-Medium', letterSpacing: 1 }}>TOTAL</Text>
      <Text style={{ fontSize: 36, fontFamily: 'Lato-Light', letterSpacing: -1 }}>{totalDisplay}</Text>
      <Text style={{ fontSize: 14, color: changeColor, fontFamily: 'Lato-Regular', letterSpacing: .5 }}>{changePctDisplay}</Text>
    </View>
  )
};

PortfolioTotal.propTypes = {
  totals: PropTypes.shape({}),
  changePct: PropTypes.shape({}),
};

PortfolioTotal.defaultProps = {
};

export default PortfolioTotal;
