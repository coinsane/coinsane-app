import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Tabs, Tab, TabHeading, View } from 'native-base';
import FastImage from 'react-native-fast-image';

import ErrorMessages from '../../../constants/errors';
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
    market: PropTypes.shape({}).isRequired,
    exchanges: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    transactionsList: PropTypes.arrayOf(PropTypes.shape({})),
    transactionsLoading: PropTypes.bool.isRequired,
    transactionsError: PropTypes.string,
    markets: PropTypes.shape({}).isRequired,
    coinData: PropTypes.shape({}).isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    getCoinMarkets: PropTypes.func.isRequired,
    getTransactionsList: PropTypes.func.isRequired,
    symbol: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: null,
    id: null,
    coin: null,
    transactionsList: [{}],
    transactionsError: null,
  };

  componentDidMount() {
    const {
      id,
      market,
      symbol,
      getCoinHisto,
      getCoinMarkets,
      getTransactionsList,
      period,
    } = this.props;

    let tempCurrency = symbol;

    if (market.symbol === symbol) {
      // update currency
      tempCurrency = 'USD';
    }

    getCoinHisto({ fsym: market.symbol, tsym: tempCurrency, range: period });
    getCoinMarkets({ fsym: market.symbol, tsym: symbol });
    getTransactionsList(id);
  }

  render() {
    const {
      error,
      id,
      coin,
      market,
      exchanges,
      coinData,
      addTransaction,
      transactionsList,
      transactionsLoading,
      transactionsError,
      getCoinHisto,
      symbol,
      currencies,
      updateCurrency,
      getPrice,
      markets,
      getCoinMarkets,
      period,
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
      <View
        style={styles.header__body}
      >
        <FastImage source={icon} style={styles.header__thumbnail} />
        <Text style={styles.header__title}>
          {market.name}
        </Text>
        <Text style={styles.header__title_suffix}>
          {market.symbol}
        </Text>
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
              coinData={coinData}
              getCoinHisto={getCoinHisto}
              currency={symbol}
              currencies={currencies}
              updateCurrency={updateCurrency}
              period={period}
              getCoinMarkets={getCoinMarkets}
              exchanges={exchanges}
            />
          </Tab>
          <Tab heading={tabHeading('Transactions')}>
            <CoinTabTransactions
              error={error}
              coin={coin}
              market={market}
              coinId={id}
              selectedCurrency={symbol}
              getPrice={getPrice}
              addTransaction={addTransaction}
              transactionsList={transactionsList}
              transactionsLoading={transactionsLoading}
              transactionsError={transactionsError}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Coin;
