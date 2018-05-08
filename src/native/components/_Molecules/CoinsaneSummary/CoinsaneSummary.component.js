import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import CoinsanePctsText from '../../_Atoms/CoinsanePctsText/CoinsanePctsText.component';
import CoinsaneSummaryText from '../../_Atoms/CoinsaneSummaryText/CoinsaneSummaryText.component';
import CoinsaneButton from '../../_Atoms/CoinsaneButton/CoinsaneButton.component';
import styles from './CoinsaneSummary.styles';

const CoinsaneSummary = ({
  value, changePct, currency, updateCurrency, buttons,
}) => (
  <View style={styles.totalContainer}>
    <View style={styles.total__buttons}>
      {buttons.map(key => (
        <CoinsaneButton
          key={key}
          type="currency"
          value={key}
          uppercase
          onPress={() => updateCurrency(key)}
          active={currency === key}
        />
        ))}
    </View>
    <CoinsaneSummaryText value={value} currency={currency} />
    <CoinsanePctsText value={changePct} />
  </View>
);

CoinsaneSummary.propTypes = {
  value: PropTypes.number.isRequired,
  changePct: PropTypes.number.isRequired,
  currency: PropTypes.string,
  updateCurrency: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CoinsaneSummary.defaultProps = {
  currency: 'BTC',
};

export default CoinsaneSummary;
