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
import { colors, typography } from '../../styles';

class CoinView extends Component {
  static propTypes = {
    error: PropTypes.string,
    coinId: PropTypes.string.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    transactionsList: PropTypes.arrayOf(PropTypes.shape({})),
    transactionsLoading: PropTypes.bool.isRequired,
    transactionsError: PropTypes.string,
    markets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
    transactionsList: [{}],
    transactionsError: null,
  };

  componentDidMount() {
    const {
      portfolios,
      coinId,
      symbol,
      getCoinHisto,
      getCoinMarkets,
      getTransactionsList,
      period,
    } = this.props;

    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i += 1) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item._id === coinId);
        if (coin) break;
      }
    }

    let tempCurrency = symbol;

    if (coin.market.symbol === symbol) {
      // update currency
      tempCurrency = 'USD';
    }

    getCoinHisto({ fsym: coin.market.symbol, tsym: tempCurrency, range: period });
    getCoinMarkets({ fsym: coin.market.symbol, tsym: symbol });
    getTransactionsList(coinId);
  }

  render() {
    const {
      error,
      portfolios,
      coinId,
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

    // Get this Coin from all portfolios
    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i++) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item._id === coinId);
        if (coin) break;
      }
    }

    // Coin not found
    if (!coin) return <Error content={ErrorMessages.coin404} />;

    const icon = { uri: `https://www.cryptocompare.com${coin.market.imageUrl}` };

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
          {coin.market.name}
        </Text>
        <Text style={styles.header__title_suffix}>
          {coin.market.symbol}
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
              portfolios={portfolios}
              coin={coin}
              coinId={coinId}
              coinData={coinData}
              getCoinHisto={getCoinHisto}
              currency={symbol}
              currencies={currencies}
              updateCurrency={updateCurrency}
              period={period}
              getCoinMarkets={getCoinMarkets}
              markets={markets}
            />
          </Tab>
          <Tab heading={tabHeading('Transactions')}>
            <CoinTabTransactions
              error={error}
              coin={coin}
              coinId={coinId}
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

export default CoinView;
