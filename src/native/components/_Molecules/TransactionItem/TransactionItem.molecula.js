import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';

import styles from './TransactionItem.styles';
import Spacer from '../../Spacer/Spacer.component';
import CoinsanePctText from '../../_Atoms/CoinsanePctText/CoinsanePctText.atom';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

const TransactionItem = ({
  date,
  category,
  categoryColor,
  amount,
  total,
  currency,
  buy,
}) => {
  const totalDisplay = buy ? total : -Math.abs(total);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{buy ? 'Buy' : 'Sell'}</Text>
      </View>
      {
        category ?
          <View style={styles.body}>
            <CoinsaneIcon name="Category" fill={categoryColor} width="12" height="16" />
            <Text style={styles.text}>{category}</Text>
          </View> :
          <Spacer size={0} />
      }
      <View style={styles.footer}>
        <Text style={styles.amount}>{amount}</Text>
        <CoinsanePctText value={totalDisplay} symbol={currency} positive={!!buy} negative={!buy} />
      </View>
    </View>
  );
};

TransactionItem.propTypes = {
  date: PropTypes.string.isRequired,
  category: PropTypes.string,
  categoryColor: PropTypes.string,
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  buy: PropTypes.bool.isRequired,
};

TransactionItem.defaultProps = {
  category: 'No category',
  categoryColor: '#7ED4D8',
};

export default TransactionItem;
