import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Content } from 'native-base';

import { nFormat, cFormat } from '../../../lib/utils';
import Spacer from '../Spacer/Spacer.component';

import I18n from '../../../i18n';
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
    market: PropTypes.shape({}).isRequired,
    chart: PropTypes.shape({
      data: PropTypes.shape({}),
      low: PropTypes.number,
      high: PropTypes.number,
      pct: PropTypes.number,
    }).isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    getCoinMarkets: PropTypes.func.isRequired,
    updateCoinsPeriod: PropTypes.func.isRequired,
    currency: PropTypes.shape({}).isRequired,
    symbol: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    exchanges: PropTypes.arrayOf(PropTypes.shape({})),
    updateCurrency: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
    periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    error: null,
    exchanges: [],
  };

  componentDidMount() {
    const {
      market,
      getCoinMarkets,
      symbol,
    } = this.props;

    const fsym = market.symbol;
    const tsym = symbol;

    getCoinMarkets({ fsym, tsym });
  }

  updateCurrency = (tsym) => {
    const {
      market,
      getCoinHisto,
      getCoinMarkets,
      updateCurrency,
      period,
    } = this.props;
    updateCurrency(tsym);
    getCoinHisto({ market: market._id, fsym: market.symbol, tsym, range: period });
    getCoinMarkets({ fsym: market.symbol, tsym });
  };

  updatePeriod = (range) => {
    const {
      market,
      getCoinHisto,
      updateCoinsPeriod,
      symbol,
    } = this.props;
    updateCoinsPeriod(range);
    getCoinHisto({ market: market._id, fsym: market.symbol, tsym: symbol, range });
  };

  render() {
    const {
      market,
      chart,
      currency,
      symbol,
      currencies,
      exchanges,
      period,
      periods,
    } = this.props;

    const summaryList = [
      {
        label: I18n.t('markets.mcap'),
        value: nFormat(market.prices[symbol].marketCap, 2),
      },
      {
        label: I18n.t('markets.vol24'),
        value: nFormat(market.prices[symbol].totalVolume24HTo, 2),
      },
      {
        label: I18n.t('markets.supply'),
        value: cFormat(nFormat(market.prices[symbol].supply, 2), market.symbol),
      },
    ];

    const exchangesList = exchanges.map(exchange => ({
      source: exchange.market,
      pair: `${market.symbol}/${symbol}`,
      volume: nFormat(exchange.volume, 2),
      price: nFormat(parseFloat(exchange.price), 2),
      changePct: 0,
    }));

    const currencyButtons = Object.keys(currencies).filter(key => key !== market.symbol);
    const decimal = currency.decimal > 6 ? 6 : currency.decimal;

    return (
      <Content style={[base.contentContainer, { paddingTop: 20 }]}>
        <CoinsaneSummary
          style={{ flex: 0.6 }}
          value={market.prices[symbol].price}
          currency={currency}
          buttons={currencyButtons}
          subValue={parseFloat(chart.pct, 2)}
          updateCurrency={this.updateCurrency}
          leftTitle={I18n.t('coins.low')}
          leftValue={chart.low && nFormat(chart.low, decimal)}
          rightTitle={I18n.t('coins.high')}
          rightValue={chart.high && nFormat(chart.high, decimal)}
        />
        <Chart
          data={chart.data}
          currency={currency}
        />
        <View style={styles.cointab__graphButtonsContainer}>
          { periods.map(key => (
            <CoinsaneButton
              key={key}
              type="period"
              value={key}
              uppercase
              onPress={() => this.updatePeriod(key)}
              active={period === key}
            />
          )) }
        </View>
        <Spacer size={10} />
        <SummaryCell
          summaryList={summaryList}
        />
        <Spacer size={20} />
        <TabHeader title={I18n.t('coins.exchanges')} />
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
