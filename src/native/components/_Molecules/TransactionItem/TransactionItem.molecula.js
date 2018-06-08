import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Body, Right } from 'native-base';
import moment from 'moment';

import I18n from '../../../../i18n';
import { nFormat, cFormat } from '../../../../lib/utils';
import styles from './TransactionItem.styles';
import { colors } from '../../../styles';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

const TransactionItem = ({
  category,
  amount,
  total,
  pair,
  pairSymbol,
  type,
  date,
}) => {
  let pairDisplay = cFormat(nFormat(Math.abs(total), 2), pair.symbol);
  let amountDisplay = `+${Math.abs(amount)}`;

  if (type === 'exchange') {
    if (pairSymbol) {
      if (amount < 0) {
        amountDisplay = `-${Math.abs(total)}`;
        pairDisplay = cFormat(nFormat(Math.abs(amount), 8), pairSymbol);
      } else {
        amountDisplay = `+${Math.abs(amount)}`;
        pairDisplay = cFormat(nFormat(Math.abs(total), 8), pair.symbol);
      }
    } else {
      amountDisplay = Math.abs(total);
      pairDisplay = cFormat(nFormat(Math.abs(amount), 8), pair.symbol);
    }
  } else if (type === 'sell') {
    amountDisplay = `-${amount}`;
  }

  const time = moment(date).format('HH:mm');

  const categoryTitle = type === 'exchange' ?
    I18n.t('categories.exchange') :
    category ?
      category.title :
      I18n.t('categories.empty');
  const categoryColor = type === 'exchange' ? colors.mediumGray : colors.iconDark;
  const categoryIcon = type === 'exchange' ? '↔' : categoryTitle.charAt(0);

  return (
    <View style={styles.container}>
      <Body style={styles.body}>
        <View style={styles.iconContainer}>
          <CoinsaneIcon name="Category" fill={categoryColor} width={36} />
          <Text style={styles.iconText}>{categoryIcon}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.category}>{categoryTitle}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </Body>
      <Right style={styles.right}>
        <Text style={styles.amount}>{amountDisplay}</Text>
        <Text style={styles.text}>{pairDisplay}</Text>
      </Right>
    </View>
  );
};

TransactionItem.propTypes = {
  category: PropTypes.shape({}),
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pair: PropTypes.shape({}).isRequired,
  pairSymbol: PropTypes.string,
  type: PropTypes.oneOf(['buy', 'sell', 'exchange']).isRequired,
  date: PropTypes.string.isRequired,
};

TransactionItem.defaultProps = {
  category: null,
  pairSymbol: null,
};

export default TransactionItem;
