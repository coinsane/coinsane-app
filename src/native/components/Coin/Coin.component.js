import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Tabs, Tab, TabHeading, Thumbnail } from 'native-base';

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
    markets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    coinData: PropTypes.shape({}).isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    getCoinMarkets: PropTypes.func.isRequired,
    getTransactionsList: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    getCourse: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: null,
    transactionsList: [{}],
  };

  componentDidMount() {
    const {
      portfolios,
      coinId,
      currency,
      getCoinHisto,
      getCoinMarkets,
      getTransactionsList,
      period,
      currencies,
    } = this.props;

    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i += 1) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item._id === coinId);
        if (coin) break;
      }
    }

    console.log('currencies', currencies);

    let tempCurrency = currency;

    if (coin.market.symbol === currency) {
      // update currency
      tempCurrency = 'USD';
    }

    getCoinHisto({ fsym: coin.market.symbol, tsym: tempCurrency, range: period });
    getCoinMarkets({ fsym: coin.market.symbol, tsym: currency });
    getTransactionsList(coinId);
  }

  render() {
    const {
      error,
      portfolios,
      coinId,
      coinData,
      transactionsList,
      getCoinHisto,
      currency,
      currencies,
      updateCurrency,
      getCourse,
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
      <Text style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Text>
          <Thumbnail
            small
            square
            source={icon}
            style={[styles.coinHeader__thumbnail, { top: 6 }]}
          />
          &nbsp;
        </Text>
        <Text style={{paddingBottom: 10}}>{coin.market.name}</Text>
        <Text style={[styles.coinHeader__text, typography.small]}>
          &nbsp;{coin.market.symbol}
        </Text>
      </Text>
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
              currency={currency}
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
              selectedCurrency={currency}
              getCourse={getCourse}
              transactionsList={transactionsList}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default CoinView;
