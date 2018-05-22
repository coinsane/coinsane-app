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
    coin: PropTypes.shape({}).isRequired,
    coinData: PropTypes.shape({}).isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    markets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  render() {
    const {
      error,
      coin,
      coinData,
      getCoinHisto,
      currency,
      currencies,
      markets,
      updateCurrency,
      period,
    } = this.props;
    // Error
    if (error) return <Error content={error} />;

    const periods = ['1h', '1d', '1w', '1m', '3m', '6m', '1y'];

    const summaryList = [
      {
        label: 'Market Cap',
        value: nFormat(coin.market.prices[currency].marketCap, 2),
      },
      {
        label: 'Vol (24h)',
        value: nFormat(coin.market.prices[currency].totalVolume24HTo, 2),
      },
      {
        label: 'Supply',
        value: nFormat(coin.market.prices[currency].supply, 2),
      },
    ];

    const marketsList = markets ?
      markets.map((market) => {
        return {
          source: market.market,
          pair: `${coin.market.symbol}/${currency}`,
          volume: nFormat(market.volume, 2),
          price: nFormat(parseFloat(market.price), 2),
          changePct: 0,
        };
      }) : [];

    return (
      <Content style={base.contentContainer}>
        <CoinsaneSummary
          style={{ flex: 0.6 }}
          value={coin.market.prices[currency].price}
          currency={currency}
          buttons={Object.keys(currencies)}
          subValue={coin.market.prices[currency].changePctDay}
          updateCurrency={updateCurrency}
          leftTitle="LOW"
          leftValue={coin.market.prices[currency].low24H}
          rightTitle="HIGH"
          rightValue={coin.market.prices[currency].high24H}
        />
        <Chart
          dataPoints={coinData}
        />
        <View style={styles.cointab__graphButtonsContainer}>
          { periods.map(key => (
            <CoinsaneButton
              key={key}
              type="period"
              value={key}
              uppercase
              onPress={() => getCoinHisto({ fsym: coin.market.symbol, tsym: currency, range: key })}
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
          list={marketsList}
        />
        <Spacer size={20} />
        {/* <TabHeader title="News" />
        <Spacer size={50} /> */}
      </Content>
    );
  }
}

export default CoinTabOverview;
