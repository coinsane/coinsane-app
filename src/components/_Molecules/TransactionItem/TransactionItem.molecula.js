import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Body, Right } from 'native-base';
import moment from 'moment';

import { i18n, math } from 'src/services';
import styles from './TransactionItem.styles';
import { colors } from 'src/styles';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import SwipeRow from 'src/components/_Molecules/SwipeRow/SwipeRow.molecula';

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
    noSwipe: PropTypes.bool,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    category: null,
    pairSymbol: null,
    noSwipe: false,
    backgroundColor: colors.bgGray,
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
      backgroundColor,
    } = this.props;

    let pairDisplay = math.cFormat(math.nFormat(Math.abs(total), 2), pair.symbol);
    let amountDisplay = `+${Math.abs(amount)}`;

    if (type === 'exchange') {
      if (pairSymbol) {
        if (amount < 0) {
          amountDisplay = `-${Math.abs(total)}`;
          pairDisplay = math.cFormat(math.nFormat(Math.abs(amount), 8), pairSymbol);
        } else {
          amountDisplay = `+${Math.abs(amount)}`;
          pairDisplay = math.cFormat(math.nFormat(Math.abs(total), 8), pair.symbol);
        }
      } else {
        amountDisplay = Math.abs(total);
        pairDisplay = math.cFormat(math.nFormat(Math.abs(amount), 8), pair.symbol);
      }
    } else if (type === 'sell') {
      amountDisplay = `-${amount}`;
    }

    const time = moment(date).format('HH:mm');

    const categoryTitle = type === 'exchange' ?
      i18n.t('categories.exchange') :
      category ?
        category.title :
        i18n.t('categories.empty');
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

    const Transaction = () => (
      <View style={[styles.swipeItem, { backgroundColor }]}>
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

    if (this.props.noSwipe) return <Transaction />;

    return (
      <View style={styles.container}>
        <SwipeRow
          damping={this.state.damping}
          tension={this.state.tension}
          buttons={buttons}
        >
          <Transaction />
        </SwipeRow>
      </View>
    );
  }
}

export default TransactionItem;
