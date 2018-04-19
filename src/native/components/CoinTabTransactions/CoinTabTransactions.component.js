import React from 'react';
import PropTypes from 'prop-types';
import { Text, Content, Container, Footer, Button, View } from 'native-base';
import Spacer from '../Spacer/Spacer.component';

import { base } from '../../styles';

import SummaryCell from '../_Molecules/SummaryCell/SummaryCell.molecula';
import TransactionItem from '../_Molecules/TransactionItem/TransactionItem.molecula';

const CoinTabTransactions = ({ coin, transactionsList, currency, getCourse }) => {
  console.log('CoinTabTransactions', transactionsList)

  const summaryList = [
    {
      label: 'Coins',
      value: 0
    },
    {
      label: 'Total',
      value:  0,
      symbol: currency
    },
    {
      label: 'Profit',
      symbol: '%'
    },
  ];

  const updateSummary = (amount, total, itemCurrency, histo, buy) => {

    let itemTotal = histo[currency] * total;

    if (buy) {
      summaryList[0].value += amount;
      summaryList[1].value += itemTotal;
    } else {
      summaryList[0].value -= amount;
      summaryList[1].value -= itemTotal;
    }

    summaryList[2].value = parseFloat(coin.amount * coin.market.prices[currency].price  / summaryList[1].value * 100 - 100);
  }

  const addTransaction = () => {};

  return (
    <Container style={base.contentContainer}>
      <Content>
        <SummaryCell
          summaryList={summaryList}
          background={true}
        />
        <Spacer size={20} />
        <View>
          {transactionsList.map(({_id, date, category, amount, total, currency, histo, buy}, i) => {
            // total convert to current currency
            updateSummary(amount, total, currency, histo, buy);
            return (
              <TransactionItem
                key={_id}
                date={date}
                category={category ? category.title : ''}
                amount={amount}
                total={total}
                currency={currency ? currency.symbol : ''}
                buy={buy}
              />
            )
          })}
        </View>
      </Content>
      <Footer style={base.footer}>
        <Button
          small
          full
          bordered
          onPress={() => addTransaction()}
          style={base.footer__button}
        >
          <Text style={base.footer__buttonText}>+ ADD NEW TRANSACTION</Text>
        </Button>
      </Footer>
    </Container>
  );
};

CoinTabTransactions.propTypes = {
};

CoinTabTransactions.defaultProps = {
};

export default CoinTabTransactions;
