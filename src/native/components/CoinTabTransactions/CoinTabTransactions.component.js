import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Content, Container, Footer, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spacer from '../Spacer/Spacer.component';

import { base } from '../../styles';

import SummaryCell from '../_Molecules/SummaryCell/SummaryCell.molecula';
import TransactionItem from '../_Molecules/TransactionItem/TransactionItem.molecula';
import Loading from '../Loading/Loading.component';
import Empty from '../Empty/Empty.component';
import { nFormat } from '../../../lib/utils';
import I18n from '../../../i18n';

class CoinTabTransactions extends Component {
  static propTypes = {
    coin: PropTypes.shape({}),
    market: PropTypes.shape({}).isRequired,
    transactionsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedCurrency: PropTypes.string.isRequired,
    transactionsLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    coin: null,
  };

  getSummaryList = () => {
    const {
      coin,
      market,
      transactionsList,
      selectedCurrency,
    } = this.props;

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

    if (transactionsList.length && transactionsList[0].amount) {
      const coinPrice = coin ? coin.amount * market.prices[selectedCurrency].price : 0;

      transactionsList.forEach(({ amount, total, histo, buy }, i) => {
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

    return summaryList;
  };

  render() {
    const {
      coin, transactionsList, transactionsLoading,
    } = this.props;

    if (transactionsList.length) transactionsList.reverse();

    return (
      <Container style={base.contentContainer}>
        <Content>
          <SummaryCell
            summaryList={this.getSummaryList()}
            background
          />
          <Spacer size={20} />
          <View>
            {
              !coin ? <Empty description={I18n.t('empty.transactions')} /> :
                transactionsLoading ?
                  <Loading /> :
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
            onPress={() => Actions.createNewTransaction({
              coinItem: coin,
              portfolioId: coin.portfolioId,
            })}
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
