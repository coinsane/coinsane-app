import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Tabs, Tab, TabHeading, View } from 'native-base';
import FastImage from 'react-native-fast-image';

import ga from '../../../lib/ga';
import Error from '../Error/Error.component';
import CoinTabOverview from '../CoinTabOverview/CoinTabOverview.component';
import CoinTabTransactions from '../CoinTabTransactions/CoinTabTransactions.component';
import Header from 'src/native/components/_Organisms/Header';

import styles from './Coin.styles';
import { colors } from '../../styles';

class Coin extends Component {
  static propTypes = {
    error: PropTypes.string,
    id: PropTypes.string,
    coin: PropTypes.shape({}),
    currency: PropTypes.shape({}).isRequired,
    market: PropTypes.shape({}).isRequired,
    portfolio: PropTypes.shape({}).isRequired,
    markets: PropTypes.shape({}).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    exchanges: PropTypes.shape({}).isRequired,
    transactionsLoading: PropTypes.bool.isRequired,
    transactionsRefreshing: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    transactionsError: PropTypes.string,
    getCoinHisto: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    loadMoreExchanges: PropTypes.func.isRequired,
    getExchanges: PropTypes.func.isRequired,
    getTransactions: PropTypes.func.isRequired,
    symbol: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    coins: PropTypes.shape({}).isRequired,
    chart: PropTypes.shape({}).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    updateCoinsPeriod: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
    periods: PropTypes.arrayOf(PropTypes.string).isRequired,
    collapsedList: PropTypes.arrayOf(PropTypes.string).isRequired,
    delTransaction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
    id: null,
    coin: null,
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
      getExchanges,
    } = this.props;

    const fsym = market.symbol;
    const marketId = market._id;
    let tsym = symbol;

    if (market.symbol === symbol) {
      tsym = Object.keys(currencies).filter(key => key !== market.symbol)[0];
      if (tsym) {
        updateCurrency(tsym);
        getExchanges({ marketId, fsym, tsym });
      }
    }

    getCoinHisto({ marketId, fsym, tsym, range: period });
  }

  componentDidMount() {
    ga.trackScreenView('Coin');
  }

  render() {
    const {
      error,
      id,
      coin,
      market,
      portfolio,
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
      getExchanges,
      period,
      getTransactions,
      periods,
      updateCoinsPeriod,
      updateCollapsed,
      collapsedList,
      chart,
      loadMoreExchanges,
      coins,
      markets,
      refreshing,
      loading,
      delTransaction,
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
        <Header
          leftIcon="Back"
          title={<HeaderTitle />}
        />
        <Tabs locked style={{ backgroundColor: colors.bgGray }} tabBarUnderlineStyle={{ height: 1 }}>
          <Tab heading={tabHeading('Overview')} tabStyle={{ elevation: 0 }}>
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
              getExchanges={getExchanges}
              updateCoinsPeriod={updateCoinsPeriod}
              exchanges={exchanges}
              periods={periods}
              updateCollapsed={updateCollapsed}
              refreshing={refreshing}
              loading={loading}
              collapsedList={collapsedList}
              loadMoreExchanges={loadMoreExchanges}
            />
          </Tab>
          <Tab heading={tabHeading('Transactions')} tabStyle={{ elevation: 0 }}>
            <CoinTabTransactions
              error={error}
              coin={coin}
              coins={coins}
              markets={markets}
              portfolio={portfolio}
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
              delTransaction={delTransaction}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Coin;
