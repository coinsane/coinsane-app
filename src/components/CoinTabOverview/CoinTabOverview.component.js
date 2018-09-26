import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, SectionList } from 'react-native';
import { List, Button, Text } from 'native-base';
import get from 'lodash/get';

import { i18n, math } from 'src/services';

import { Loading, Spacer } from 'src/components/Base';
import Summary from 'src/components/_Molecules/Summary';

import CoinsaneButton from 'src/components/_Atoms/CoinsaneButton/CoinsaneButton.component';

import SummaryCell from 'src/components/_Molecules/SummaryCell';
import MarketInfoCell from 'src/components/_Molecules/MarketInfoCell/MarketInfoCell.molecula';
import TabHeader from 'src/components/_Molecules/TabHeader/TabHeader.molecula';
import Chart from 'src/components/_Organisms/Chart/Chart.component';

import styles from './CoinTabOverview.styles';
import { base } from 'src/styles';
import withPreventDoubleClick from 'src/hocs';

const ButtonEx = withPreventDoubleClick(Button);

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
    getExchanges: PropTypes.func.isRequired,
    updateCoinsPeriod: PropTypes.func.isRequired,
    currency: PropTypes.shape({}).isRequired,
    symbol: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    exchanges: PropTypes.shape({}).isRequired,
    collapsedList: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    loadMoreExchanges: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
    periods: PropTypes.arrayOf(PropTypes.string).isRequired,
    refreshing: PropTypes.bool.isRequired,
  };

  static defaultProps = {
  };

  componentDidMount() {
    const {
      market,
      getExchanges,
      symbol: tsym,
    } = this.props;

    const fsym = market.symbol;
    const marketId = market._id;

    getExchanges({ marketId, fsym, tsym });
  }

  updateCurrency = (tsym) => {
    const {
      market,
      getCoinHisto,
      getExchanges,
      updateCurrency,
      period: range,
    } = this.props;
    const fsym = market.symbol;
    const marketId = market._id;
    updateCurrency(tsym);
    getCoinHisto({ marketId, fsym, tsym, range });
    getExchanges({ marketId, fsym, tsym });
  };

  updatePeriod = (range) => {
    const {
      market,
      getCoinHisto,
      updateCoinsPeriod,
      symbol: tsym,
    } = this.props;
    const marketId = market._id;
    const fsym = market.symbol;
    updateCoinsPeriod(range);
    getCoinHisto({ marketId, fsym, tsym, range });
  };

  handleRefresh = () => {
    const {
      refreshing,
      market,
      getExchanges,
      getCoinHisto,
      symbol: tsym,
      period: range,
    } = this.props;

    if (!refreshing) {
      const fsym = market.symbol;
      const marketId = market._id;
      getCoinHisto({ marketId, fsym, tsym, range, refreshing: true });
      getExchanges({ marketId, fsym, tsym });
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
      loading,
    } = this.props;

    const marketPrice = get(market, `prices[${symbol}]`, {});

    const summaryList = [
      {
        label: i18n.t('markets.mcap'),
        value: math.nFormat(marketPrice.marketCap, 2),
      },
      {
        label: i18n.t('markets.vol24'),
        value: math.nFormat(marketPrice.totalVolume24HTo, 2),
      },
      {
        label: i18n.t('markets.supply'),
        value: math.cFormat(math.nFormat(marketPrice.supply, 2), market.symbol),
      },
    ];

    const currencyButtons = Object.keys(currencies).filter(key => key !== market.symbol);

    const low = chart.low ? math.nFormat(chart.low, currency.decimal) : 0;
    const high = chart.high ? math.nFormat(chart.high, currency.decimal) : 0;
    const value = math.nFormat(marketPrice.price, currency.decimal);
    return (
      <View>
        <Spacer size={20} />
        <Summary
          value={value}
          currency={currency}
          buttons={currencyButtons}
          subValue={parseFloat(chart.pct, 2)}
          updateCurrency={this.updateCurrency}
          leftTitle={i18n.t('coins.low')}
          leftValue={low}
          rightTitle={i18n.t('coins.high')}
          rightValue={high}
          loading={loading}
        />
        <View style={styles.chartWrapper}>
          <Chart
            data={chart.data}
            currency={currency}
            loading={loading}
          />
        </View>
        <View style={styles.range}>
          { periods.map(key => (
            <CoinsaneButton
              key={key}
              type="period"
              value={i18n.t(`periods.period${key}`)}
              uppercase
              onPress={() => this.updatePeriod(key)}
              active={period === key}
            />
          )) }
        </View>
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
    if (this.isCollapsed(section.type)) return null;
    const {
      exchanges,
      market,
    } = this.props;

    if (section.type === 'exchanges') {
      if (exchanges.loading) return <Loading size={25} />;
      const loadMore = exchanges.count > exchanges.page + 1;
      return loadMore ?
        <View style={[base.list__buttonContainer, styles.buttonContainer]}>
          <Spacer size={20} />
          <ButtonEx
            small
            bordered
            full
            style={base.list__button}
            onPress={() => this.props.loadMoreExchanges({ marketId: market._id })}
          >
            <Text style={base.list__buttonText}>{i18n.t('coins.loadMore')}</Text>
          </ButtonEx>
        </View> :
        <Spacer size={30} />;
    }
    return <Spacer size={30} />;
  };

  getSectionData(name) {
    const {
      market,
      symbol,
      exchanges,
    } = this.props;
    if (this.isCollapsed(name)) return [];
    let list = [];
    if (exchanges.list) {
      exchanges.list.forEach((listItem, index) => {
        if (index < exchanges.page + 1) {
          list = [...list, ...listItem.map(item => ({
            source: item.market,
            pair: `${market.symbol}/${symbol}`,
            volume: math.nFormat(item.volume, 2),
            price: math.nFormat(parseFloat(item.price), 2),
          }))];
        }
      });
    }
    return list;
  }

  render() {
    const {
      market,
      symbol,
      exchanges,
      refreshing,
    } = this.props;

    const sections = [
      {
        title: i18n.t('coins.exchanges'),
        type: 'exchanges',
        loading: exchanges.loading,
        count: exchanges.count,
        page: 0,
        data: this.getSectionData('exchanges'),
      },
      // {
      //   title: i18n.t('coins.news'),
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
