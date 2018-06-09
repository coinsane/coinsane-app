import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, SectionList } from 'react-native';
import { List, Button, Text } from 'native-base';

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
    collapsedList: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
    periods: PropTypes.arrayOf(PropTypes.string).isRequired,
    refreshing: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    error: null,
    exchanges: [],
  };

  componentDidMount() {
    const {
      market,
      getCoinMarkets,
      symbol: tsym,
    } = this.props;

    const fsym = market.symbol;

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

  handleRefresh = () => {
    const {
      refreshing,
      market,
      getCoinMarkets,
      getCoinHisto,
      symbol: tsym,
      period: range,
    } = this.props;

    if (!refreshing) {
      const fsym = market.symbol;
      getCoinHisto({ market: market._id, fsym, tsym, range, refreshing: true });
      getCoinMarkets({ fsym, tsym });
    }
  };

  isCollapsed = name => this.props.collapsedList.indexOf(name) !== -1;

  renderHeader = () => {
    const {
      market,
      chart,
      currency,
      symbol,
      currencies,
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

    const currencyButtons = Object.keys(currencies).filter(key => key !== market.symbol);

    const low = chart.low ? nFormat(chart.low, currency.decimal) : 0;
    const high = chart.high ? nFormat(chart.high, currency.decimal) : 0;
    const value = nFormat(market.prices[symbol].price, currency.decimal);
    return (
      <View>
        <Spacer size={20} />
        <CoinsaneSummary
          value={value}
          currency={currency}
          buttons={currencyButtons}
          subValue={parseFloat(chart.pct, 2)}
          updateCurrency={this.updateCurrency}
          leftTitle={I18n.t('coins.low')}
          leftValue={low}
          rightTitle={I18n.t('coins.high')}
          rightValue={high}
        />
        <Chart
          data={chart.data}
          currency={currency}
        />
        <View style={styles.period}>
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
      </View>
    );
  };

  renderSectionHeader = ({ section }) => {
    const { market } = this.props;
    return (
      <TabHeader
        title={section.title}
        onPress={() => this.props.updateCollapsed({ marketId: market._id, collapse: section.type })}
        isCollapsed={this.isCollapsed(section.type)}
      />
    );
  };

  renderItem = ({ item, section, index }) => {
    if (section.type === 'exchanges') {
      return (
        <MarketInfoCell
          item={item}
          isFirst={index === 0}
        />
      );
    }
    return <Spacer size={30} />;
  };

  renderSeparator = () => <Spacer size={15} />;

  renderSectionFooter = ({ section }) => {
    const loadMore = true;
    return !this.isCollapsed(section.type) && (
      loadMore ?
        <View style={[base.list__buttonContainer, styles.buttonContainer]}>
          <Spacer size={20} />
          <Button
            small
            bordered
            full
            style={base.list__button}
            // onPress={() => ()}
          >
            <Text style={base.list__buttonText}>{I18n.t('coins.loadMore')}</Text>
          </Button>
        </View> :
        <Spacer size={30} />
    );
  };

  render() {
    const {
      market,
      symbol,
      exchanges,
      refreshing,
    } = this.props;

    const sections = [
      {
        title: I18n.t('coins.exchanges'),
        type: 'exchanges',
        data: !this.isCollapsed('exchanges') ? exchanges.map(exchange => ({
          source: exchange.market,
          pair: `${market.symbol}/${symbol}`,
          volume: nFormat(exchange.volume, 2),
          price: nFormat(parseFloat(exchange.price), 2),
          changePct: 0,
        })) : [],
      },
      // {
      //   title: I18n.t('coins.news'),
      //   type: 'news',
      //   data: [],
      // },
    ];

    return (
      <List style={base.contentContainer}>
        <SectionList
          sections={sections}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          renderSectionFooter={this.renderSectionFooter}
          keyExtractor={(item, index) => index}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={refreshing}
          // extraData={portfolios}
        />
      </List>
    );
  }
}

export default CoinTabOverview;
