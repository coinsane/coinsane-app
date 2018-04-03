import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import Icon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import CoinsanePctsText from '../_Atoms/CoinsanePctsText/CoinsanePctsText.component';
import CoinsaneSummaryText from '../_Atoms/CoinsaneSummaryText/CoinsaneSummaryText.component';
import CoinsaneButton from '../_Atoms/CoinsaneButton/CoinsaneButton.component';
import styles from './Total.styles';
import { typography, colors } from '../../styles';

const PortfolioTotal = ({ lastTotal, changePct, currency, updateCurrency, updateChart }) => {

  const currencies = ['BTC', 'USD', 'RUB'];

  function _updateCurrency(currency) {
    updateCurrency(currency); // TODO update them together with saga
    updateChart(currency);
  }

  return (
    <View style={styles.totalContainer}>
      <View style={styles.total__buttons}>
        {currencies.map(key => (
          <CoinsaneButton
            key={key}
            type={'currency'}
            value={key}
            uppercase={true}
            onPress={() => _updateCurrency(key)}
            active={currency === key}
          />
        ))}
      </View>
      <CoinsaneSummaryText value={lastTotal} currency={currency} />
      <CoinsanePctsText value={changePct} />
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
  currency: 'BTC'
};

export default PortfolioTotal;
