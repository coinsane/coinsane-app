import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Tabs, Tab, TabHeading, View } from 'native-base';
import FastImage from 'react-native-fast-image';

import Error from '../Error/Error.component';
import CoinTabOverview from '../CoinTabOverview/CoinTabOverview.component';
import CoinTabTransactions from '../CoinTabTransactions/CoinTabTransactions.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';

import styles from './Coin.styles';
import { colors } from '../../styles';

class Coin extends Component {
  static propTypes = {
    error: PropTypes.string,
    id: PropTypes.string,
    coin: PropTypes.shape({}),
    currency: PropTypes.shape({}).isRequired,
    market: PropTypes.shape({}).isRequired,
    markets: PropTypes.shape({}).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    exchanges: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    transactionsLoading: PropTypes.bool.isRequired,
    transactionsRefreshing: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool.isRequired,
    transactionsError: PropTypes.string,
    getCoinHisto: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    getCoinMarkets: PropTypes.func.isRequired,
    getTransactions: PropTypes.func.isRequired,
    symbol: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    coins: PropTypes.shape({}).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    updateCoinsPeriod: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
    periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    error: null,
    id: null,
    coin: null,
    transactionsList: [{}],
    transactionsError: null,
  };

  componentWillMount() {
    const {
      market,
      getCoinHisto,
      updateCurrency,
      currencies,
      symbol,
      period,
    } = this.props;

    const fsym = market.symbol;
    let tsym = symbol;

    if (market.symbol === symbol) {
      tsym = Object.keys(currencies).filter(key => key !== market.symbol)[0];
      updateCurrency(tsym);
    }

    getCoinHisto({ market: market._id, fsym, tsym, range: period });
  }

  render() {
    const {
      error,
      id,
      coin,
      market,
      exchanges,
      addTransaction,
      transactions,
      transactionsLoading,
      transactionsRefreshing,
      transactionsError,
      getCoinHisto,
      symbol,
      currencies,
      updateCurrency,
      getPrice,
      currency,
      getCoinMarkets,
      period,
      getTransactions,
      periods,
      updateCoinsPeriod,
      updateCollapsed,
      collapsedList,
      chart,
      coins,
      markets,
      refreshing,
    } = this.props;
    // Error
    if (error) return <Error content={error} />;

    const icon = { uri: `https://www.cryptocompare.com${market.imageUrl}` };

    const tabHeading = title => (
      <TabHeading style={{ backgroundColor: colors.bgGray }}>
        <Text>{title.toUpperCase()}</Text>
      </TabHeading>
    );

    const HeaderTitle = () => (
      <View style={styles.header__body}>
        <FastImage source={icon} style={styles.header__thumbnail} />
        <Text style={styles.header__title}>{market.name}</Text>
        <Text style={styles.header__title_suffix}>{market.symbol}</Text>
      </View>
    );

    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Back"
          title={<HeaderTitle />}
        />
        <Tabs style={{ backgroundColor: colors.bgGray }} tabBarUnderlineStyle={{ height: 1 }}>
          <Tab heading={tabHeading('Overview')}>
            <CoinTabOverview
              error={error}
              market={market}
              coinId={id}
              chart={chart}
              getCoinHisto={getCoinHisto}
              currency={currency}
              symbol={symbol}
              currencies={currencies}
              updateCurrency={updateCurrency}
              period={period}
              getCoinMarkets={getCoinMarkets}
              updateCoinsPeriod={updateCoinsPeriod}
              exchanges={exchanges}
              periods={periods}
              updateCollapsed={updateCollapsed}
              refreshing={refreshing}
              collapsedList={collapsedList}
            />
          </Tab>
          <Tab heading={tabHeading('Transactions')}>
            <CoinTabTransactions
              error={error}
              coin={coin}
              coins={coins}
              markets={markets}
              currency={currency}
              symbol={symbol}
              market={market}
              coinId={id}
              selectedCurrency={symbol}
              getPrice={getPrice}
              addTransaction={addTransaction}
              transactions={transactions}
              transactionsLoading={transactionsLoading}
              transactionsRefreshing={transactionsRefreshing}
              transactionsError={transactionsError}
              getTransactions={getTransactions}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Coin;
