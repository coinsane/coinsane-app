import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import Icon from '../Icon/Icon.component';
import styles from './Total.styles';
import { typography, colors } from '../../styles';

const PortfolioTotal = ({ lastTotal, changePct, currency = 'BTC', updateCurrency, updateChart }) => {

  const currencies = ['BTC', 'USD', 'RUB'];
  let fixed = currency === 'BTC' ? 6 : 2;

  // const totalDisplay = totals && totals.USD ? `${totals.USD.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0.00';
  const totalDisplay = currency === 'BTC' ? `${parseFloat(lastTotal).toFixed(fixed)} ${currency}` : `${parseFloat(lastTotal).toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${currency}`;
  const changeColor = changePct && parseFloat(changePct) > 0 ? colors.primaryGreen : colors.primaryPink;
  const changePctDisplay = `${changePct}%`;

  function _updateCurrency(currency) {
    updateCurrency(currency).then(() => updateChart(currency))
  }

  return (
    <View style={styles.totalContainer}>
      <View style={styles.total__buttons}>
        { currencies.map(currencyKey => (
          <Button
            key={currencyKey} small transparent
            onPress={() => _updateCurrency(currencyKey)}
          >
            <Text style={[styles.total__buttonText, currency === currencyKey && styles.total__buttonTextActive]}>
              {currencyKey.toUpperCase()}
            </Text>
          </Button>
        )) }
      </View>
      <Text style={styles.total__summary}>{totalDisplay}</Text>
      <Text style={[styles.total__pct, { color: changeColor }]}>{changePctDisplay}</Text>
    </View>
  )
};

PortfolioTotal.propTypes = {
  lastTotal: PropTypes.number,
  changePct: PropTypes.string,
  currency: PropTypes.string,
  updateCurrency: PropTypes.func,
  updateChart: PropTypes.func,
};

PortfolioTotal.defaultProps = {
};

export default PortfolioTotal;
