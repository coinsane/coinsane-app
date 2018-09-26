import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList } from 'react-native';
import { Text, Container, Footer, Button, View, List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import get from 'lodash/get';

import { Loading, Empty } from 'src/components/Base';

import { base, colors } from 'src/styles';

import SummaryCell from 'src/components/_Molecules/SummaryCell';
import TransactionItem from 'src/components/_Molecules/TransactionItem/TransactionItem.molecula';
import SectionHeader from 'src/components/_Molecules/SectionHeader/SectionHeader.molecula';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import { analytics, i18n, math } from 'src/services';
import styles from './CoinTabTransactions.styles';

class CoinTabTransactions extends Component {
  static propTypes = {
    coinId: PropTypes.string,
    coin: PropTypes.shape({}),
    coins: PropTypes.shape({}).isRequired,
    portfolio: PropTypes.shape({}).isRequired,
    markets: PropTypes.shape({}).isRequired,
    currency: PropTypes.shape({}).isRequired,
    market: PropTypes.shape({}).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedCurrency: PropTypes.string.isRequired,
    transactionsLoading: PropTypes.bool.isRequired,
    transactionsRefreshing: PropTypes.bool.isRequired,
    getTransactions: PropTypes.func.isRequired,
    delTransaction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    coinId: null,
    coin: null,
  };

  componentWillMount() {
    const {
      coinId,
      getTransactions,
    } = this.props;

    if (coinId) getTransactions({ coinId });
  }

  getPairSymbol = (transaction) => {
    const { coins, markets } = this.props;
    const { coin } = transaction;
    const pairMarket = get(coins, `[${coin}].market`, null);
    return get(markets, `items[${pairMarket}].symbol`, null);
  };

  getSummaryList = () => {
    const {
      coin,
      market,
      currency,
      transactions,
      selectedCurrency,
    } = this.props;

    const summaryList = [
      { label: i18n.t('transactions.coins'), value: '-' },
      { label: i18n.t('transactions.total'), value: '-' },
      { label: i18n.t('transactions.profit'), value: '-', symbol: '' },
    ];

    if (!coin) return summaryList;

    const marketPrice = get(market, `prices[${selectedCurrency}]`, {});

    const coinPrice = coin.amount * marketPrice.price;

    if (transactions.length && transactions[0].amount) {
      summaryList[0].value = 0;
      summaryList[1].value = 0;
      summaryList[2].value = 0;

      transactions.forEach((transaction, i) => {
        const {
          amount,
          total,
          histo,
          type,
        } = transaction;
        const itemTotal = histo[selectedCurrency] * total;

        if (type === 'exchange') {
          if (amount < 0) {
            summaryList[0].value += total; // amount from pair
            summaryList[1].value += itemTotal;
          } else {
            summaryList[0].value += amount;
            summaryList[1].value += itemTotal;
          }
        } else if (type === 'buy') {
          summaryList[0].value += amount;
          summaryList[1].value += itemTotal;
        } else if (type === 'sell') {
          summaryList[0].value -= amount;
          summaryList[1].value -= itemTotal;
        }

        summaryList[2].value = (coinPrice / summaryList[1].value) * 100;
        summaryList[2].value = parseFloat(summaryList[2].value - 100);
        summaryList[2].symbol = '%';

        if (transactions.length - 1 === i) {
          summaryList[0].value = math.format(math.round(summaryList[0].value, 13));
          summaryList[1].value = math.cFormat(math.nFormat(coinPrice, currency.decimal), currency.symbol);
        }
      });
    } else {
      summaryList[0].value = math.format(coin.amount);
      summaryList[1].value = math.cFormat(math.nFormat(coinPrice, currency.decimal), currency.symbol);
    }

    return summaryList;
  };

  handleRefresh = () => {
    const { coinId, getTransactions } = this.props;
    if (coinId) getTransactions({ coinId, refreshing: true });
  };

  transactionsByDays = (transactions) => {
    const days = {};
    transactions.forEach((transaction) => {
      const day = moment(transaction.date).format('YYYY-MM-DD');
      if (!days[day]) {
        days[day] = [transaction];
      } else {
        days[day].push(transaction);
      }
    });
    return Object.keys(days).map(day => ({
      title: day,
      data: days[day],
    }));
  };

  createNewTransaction = () => {
    const {
      coinId,
      market,
      portfolio,
    } = this.props;

    if (portfolio.service) return;

    Actions.createNewTransaction({
      coinId,
      marketId: market._id,
    });
    analytics.trackEvent('transactions', 'createNewTransaction');
  };

  renderItem = ({ item }) => {
    const { delTransaction } = this.props;
    const { _id, currency, exchange } = item;
    const pair = currency || exchange;
    const pairSymbol = this.getPairSymbol(item);
    return (
      <TransactionItem
        key={_id}
        {...item}
        pair={pair}
        pairSymbol={pairSymbol}
        delTransaction={delTransaction}
      />
    );
  };

  renderSectionHeader = ({ section }) => <SectionHeader title={moment(section.title, 'YYYY-MM-DD').format('LL')} />;

  renderSeparator = () => <View style={styles.separator} />;

  renderEmpty = () => {
    const {
      transactionsLoading,
    } = this.props;
    if (transactionsLoading) return <Loading size={25} />;
    return <Empty description={i18n.t('empty.transactions')} />;
  };

  render() {
    const {
      portfolio,
      transactions,
      transactionsRefreshing,
      transactionsLoading,
    } = this.props;

    const sections = this.transactionsByDays(transactions);

    const { service } = portfolio;

    const title = get(service, 'provider.name', i18n.t('transactions.addButton'));

    return (
      <Container>
        <View style={base.contentBackground}>
          <SummaryCell
            summaryList={this.getSummaryList()}
            borderBottom
            // loading={transactionsLoading}
          />
        </View>
        <List style={base.contentContainer}>
          {
            transactionsLoading ?
              <Loading /> :
              <SectionList
                sections={sections}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                keyExtractor={(day, index) => `${day.title}-${index}`}
                ItemSeparatorComponent={this.renderSeparator}
                ListEmptyComponent={this.renderEmpty}
                onRefresh={this.handleRefresh}
                refreshing={transactionsRefreshing}
              />
          }
          <LinearGradient
            colors={[colors.gradientTo, colors.gradientFrom]}
            style={base.gradientBottom}
          />
        </List>
        <Footer style={base.footer}>
          <Button
            small
            full
            bordered
            onPress={this.createNewTransaction}
            style={base.footer__button_bordered}
          >
            { service && <CoinsaneIcon name={title} height={22} width={22} /> }
            <Text style={base.footer__buttonText_bordered}>{title.toUpperCase()}</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default CoinTabTransactions;