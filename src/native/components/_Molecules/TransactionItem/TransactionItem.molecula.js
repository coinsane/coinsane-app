import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Body, Right } from 'native-base';

import I18n from '../../../../i18n';
import { nFormat, cFormat } from '../../../../lib/utils';
import styles from './TransactionItem.styles';
import { colors } from '../../../styles';
import CoinsanePctText from '../../_Atoms/CoinsanePctText/CoinsanePctText.atom';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

const TransactionItem = ({
  category,
  categoryColor,
  amount,
  total,
  currency,
  type,
}) => {
  const buy = type === 'buy';
  const totalDisplay = buy ? cFormat(nFormat(total, 2), currency) : `-${cFormat(nFormat(total, 2), currency)}`;
  return (
    <View style={styles.container}>
      <Body style={styles.body}>
        <View style={styles.category}>
          <CoinsaneIcon name="Category" fill={categoryColor} width="12" height="16" />
          <Text style={styles.text}>{category || I18n.t('categories.empty')}</Text>
        </View>
        <Text style={styles.amount}>{amount}</Text>
      </Body>
      <Right style={styles.right}>
        <CoinsanePctText value={totalDisplay} symbol="" positive={buy} negative={!buy} />
      </Right>
    </View>
  );
};

TransactionItem.propTypes = {
  category: PropTypes.string,
  categoryColor: PropTypes.string,
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['buy', 'sell', 'exchange']).isRequired,
};

TransactionItem.defaultProps = {
  category: I18n.t('categories.empty'),
  categoryColor: colors.category1,
};

export default TransactionItem;
