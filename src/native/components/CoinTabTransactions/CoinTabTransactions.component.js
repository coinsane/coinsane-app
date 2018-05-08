import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Content, Container, Footer, Button, View } from 'native-base';
import Spacer from '../Spacer/Spacer.component';

import { base } from '../../styles';

import SummaryCell from '../_Molecules/SummaryCell/SummaryCell.molecula';
import TransactionItem from '../_Molecules/TransactionItem/TransactionItem.molecula';
import { nFormat } from '../../../lib/utils';

class CoinTabTransactions extends Component {
  static propTypes = {
    coin: PropTypes.shape({}).isRequired,
    transactionsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedCurrency: PropTypes.string.isRequired,
  };

  render() {
    const { coin, transactionsList, selectedCurrency } = this.props;
    console.log('transactionsList', transactionsList);
    const summaryList = [
      {
        label: 'Coins',
        value: 0,
      },
      {
        label: `Total, ${selectedCurrency}`,
        value: 0,
      },
      {
        label: 'Profit',
        value: 0,
        symbol: '%',
      },
    ];

    const coinPrice = coin.amount * coin.market.prices[selectedCurrency].price;

    if (transactionsList.length && transactionsList[0].amount) {
      transactionsList.forEach(({
        amount, total, histo, buy,
      }, i) => {
        const itemTotal = histo[selectedCurrency] * total;

        if (buy) {
          summaryList[0].value += amount;
          summaryList[1].value += itemTotal;
        } else {
          summaryList[0].value -= amount;
          summaryList[1].value -= itemTotal;
        }

        summaryList[2].value = (coinPrice / summaryList[1].value) * 100;
        summaryList[2].value = parseFloat(summaryList[2].value - 100);

        if (transactionsList.length - 1 === i) {
          summaryList[1].value = nFormat(coinPrice, 2);
        }
      });
    }

    const addTransaction = () => {};

    return (
      <Container style={base.contentContainer}>
        <Content>
          <SummaryCell
            summaryList={summaryList}
            background
          />
          <Spacer size={20} />
          <View>
            {
              transactionsList.length && transactionsList[0].amount ?
                transactionsList.map(({
                                        _id, date, category, amount, total, currency, buy,
                                      }) => (
                                        <TransactionItem
                                          key={_id}
                                          date={date}
                                          category={category ? category.title : ''}
                                          amount={amount}
                                          total={total}
                                          currency={currency ? currency.symbol : ''}
                                          buy={buy}
                                        />
                )) :
                <Spacer size={20} />
            }
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
  }
}

export default CoinTabTransactions;
