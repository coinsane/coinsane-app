import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import CoinsanePctsText from '../../_Atoms/CoinsanePctsText/CoinsanePctsText.component';
import CoinsaneSummaryText from '../../_Atoms/CoinsaneSummaryText/CoinsaneSummaryText.component';
import CoinsaneButton from '../../_Atoms/CoinsaneButton/CoinsaneButton.component';
import styles from './CoinsaneSummary.styles';
import { typography, colors } from '../../../styles';

const CoinsaneSummary = ({ value, changePct, currency, updateCurrency, updateChart, buttons }) => {

  function _updateCurrency(currency) {
    updateCurrency(currency); // TODO update them together with saga
    updateChart(currency);
  }

  return (
    <View style={styles.totalContainer}>
      <View style={styles.total__buttons}>
        {buttons.map(key => (
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
      <CoinsaneSummaryText value={value} currency={currency} />
      <CoinsanePctsText value={changePct} />
    </View>
  )
};

CoinsaneSummary.propTypes = {
  value: PropTypes.number,
  changePct: PropTypes.number,
  currency: PropTypes.string,
  updateCurrency: PropTypes.func,
  updateChart: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.string),
};

CoinsaneSummary.defaultProps = {
  currency: 'BTC'
};

export default CoinsaneSummary;
