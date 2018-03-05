import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import Icon from '../Icon/Icon.component';
import styles from './Total.styles';
import { typography, colors } from '../../styles';

const PortfolioTotal = ({ totals, changePct }) => {

  const totalDisplay = totals && totals.USD ? `${totals.USD.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0.00';
  const changeColor = changePct && parseFloat(changePct) > 0 ? colors.primaryGreen : colors.primaryPink;
  const changePctDisplay = `${changePct}%`;

  return (
    <View style={styles.totalContainer}>
      <Text style={styles.total__title}>TOTAL</Text>
      <Text style={styles.total__summary}>{totalDisplay}</Text>
      <Text style={{ fontSize: typography.size14, color: changeColor, fontFamily: typography.fontRegular, letterSpacing: .5 }}>{changePctDisplay}</Text>
    </View>
  )
};

PortfolioTotal.propTypes = {
  totals: PropTypes.shape({}),
  changePct: PropTypes.string,
};

PortfolioTotal.defaultProps = {
};

export default PortfolioTotal;