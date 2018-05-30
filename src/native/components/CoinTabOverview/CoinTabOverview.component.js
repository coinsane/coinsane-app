import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Content } from 'native-base';
import { nFormat } from '../../../lib/utils';
import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';

import CoinsaneButton from '../_Atoms/CoinsaneButton/CoinsaneButton.component';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import SummaryCell from '../_Molecules/SummaryCell/SummaryCell.molecula';
import MarketInfoCell from '../_Molecules/MarketInfoCell/MarketInfoCell.molecula';
import TabHeader from '../_Molecules/TabHeader/TabHeader.molecula';
import Chart from '../_Organisms/Chart/Chart.component';

import styles from './CoinTabOverview.styles';
import { base } from '../../styles';

class CoinTabOverview extends Component {
  static propTypes = {
    error: PropTypes.string,
    market: PropTypes.shape({}).isRequired,
    coinData: PropTypes.shape({}).isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    exchanges: PropTypes.arrayOf(PropTypes.shape({})),
    updateCurrency: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: null,
    exchanges: [],
  };

  render() {
    const {
      error,
      market,
      coinData,
      getCoinHisto,
      currency,
      currencies,
      exchanges,
      updateCurrency,
      period,
    } = this.props;
    // Error
    if (error) return <Error content={error} />;

    const periods = ['1h', '1d', '1w', '1m', '3m', '6m', '1y'];

    const summaryList = [
      {
        label: 'Market Cap',
        value: nFormat(market.prices[currency].marketCap, 2),
      },
      {
        label: 'Vol (24h)',
        value: nFormat(market.prices[currency].totalVolume24HTo, 2),
      },
      {
        label: 'Supply',
        value: nFormat(market.prices[currency].supply, 2),
      },
    ];

    const exchangesList = exchanges.map(exchange => ({
      source: exchange.market,
      pair: `${exchange.symbol}/${currency}`,
      volume: nFormat(exchange.volume, 2),
      price: nFormat(parseFloat(exchange.price), 2),
      changePct: 0,
    }));

    return (
      <Content style={base.contentContainer}>
        <CoinsaneSummary
          style={{ flex: 0.6 }}
          value={market.prices[currency].price}
          currency={currencies[currency]}
          buttons={Object.keys(currencies)}
          subValue={market.prices[currency].changePctDay}
          updateCurrency={updateCurrency}
          leftTitle="LOW"
          leftValue={market.prices[currency].low24H}
          rightTitle="HIGH"
          rightValue={market.prices[currency].high24H}
        />
        <Chart
          data={coinData}
          currency={currencies[currency]}
        />
        <View style={styles.cointab__graphButtonsContainer}>
          { periods.map(key => (
            <CoinsaneButton
              key={key}
              type="period"
              value={key}
              uppercase
              onPress={() => getCoinHisto({ fsym: market.symbol, tsym: currency, range: key })}
              active={period === key}
            />
          )) }
        </View>
        <Spacer size={10} />
        <SummaryCell
          summaryList={summaryList}
        />
        <Spacer size={20} />
        <TabHeader title="Markets" />
        <MarketInfoCell
          list={exchangesList}
        />
        <Spacer size={20} />
        {/* <TabHeader title="News" />
        <Spacer size={50} /> */}
      </Content>
    );
  }
}

export default CoinTabOverview;
