import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import styles from './TransactionItem.styles';

import CoinsanePctsText from '../../_Atoms/CoinsanePctsText/CoinsanePctsText.component';
import CoinsaneAmount from '../../_Atoms/CoinsaneAmount/CoinsaneAmount.component';

const TransactionItem = ({ time, category, value, currencyAmount, type }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{time}</Text>
        <Text style={styles.text}>{type}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{category}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.amount}>{value}</Text>
        <CoinsanePctsText value={currencyAmount} />
      </View>
    </View>
  )
};

TransactionItem.propTypes = {

};

export default TransactionItem;
