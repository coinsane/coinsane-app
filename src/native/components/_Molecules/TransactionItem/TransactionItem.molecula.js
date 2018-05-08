import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'native-base';
import styles from './TransactionItem.styles';
import Spacer from '../../Spacer/Spacer.component';

import CoinsanePctsText from '../../_Atoms/CoinsanePctsText/CoinsanePctsText.component';
import CoinsaneAmount from '../../_Atoms/CoinsaneAmount/CoinsaneAmount.component';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

const categoryRow = function() {

}

const TransactionItem = ({ date, category, categoryColor, amount, total, currency, buy }) => {
  // getCourse
  total = buy ? total : -Math.abs(total);
  categoryColor = categoryColor || '#7ED4D8';
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{buy ? 'Buy' : 'Sell'}</Text>
      </View>
      {
        category ?
        <View style={styles.body}>
          <CoinsaneIcon name='Category' fill={categoryColor} width={'12'} height={'16'} />
          <Text style={styles.text}>{category}</Text>
        </View> : <Spacer size={0} />
      }
      <View style={styles.footer}>
        <Text style={styles.amount}>{amount}</Text>
        <CoinsanePctsText value={total} currency={currency} />
      </View>
    </View>
  )
};

TransactionItem.propTypes = {
};

export default TransactionItem;
