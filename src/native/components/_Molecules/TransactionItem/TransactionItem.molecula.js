import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Body, Right } from 'native-base';
import moment from 'moment';

import I18n from '../../../../i18n';
import { nFormat, cFormat } from '../../../../lib/utils';
import styles from './TransactionItem.styles';
import { colors } from '../../../styles';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import SwipeRow from '../../_Molecules/SwipeRow/SwipeRow.molecula';

class TransactionItem extends Component {
  static propTypes = {
    category: PropTypes.shape({}),
    amount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    pair: PropTypes.shape({}).isRequired,
    pairSymbol: PropTypes.string,
    type: PropTypes.oneOf(['buy', 'sell', 'exchange']).isRequired,
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    delTransaction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    category: null,
    pairSymbol: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      damping: 1 - 0.6,
      tension: 300,
    };
  }

  render() {
    const {
      _id: transactionId,
      category,
      amount,
      total,
      pair,
      pairSymbol,
      type,
      date,
    } = this.props;

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

    const buttons = [
      // {
      //   icon: 'Edit',
      //   color: colors.white,
      //   onPress: () => {},
      // },
      {
        icon: 'Close',
        color: colors.primaryPink,
        onPress: () => this.props.delTransaction({ transactionId }),
      },
    ];

    return (
      <View style={styles.container}>
        <SwipeRow
          damping={this.state.damping}
          tension={this.state.tension}
          buttons={buttons}
        >
          <View style={styles.swipeItem}>
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
        </SwipeRow>
      </View>
    );
  }
}

export default TransactionItem;
