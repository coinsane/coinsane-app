import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import get from 'lodash/get';

import { updatePortfolios, updatePortfolioChart, updatePortfolioPeriod, updatePortfolioCurrency, getTotals, addPortfolio, removePortfolio, updatePortfolio, selectPortfolio, setCoinData, updatePeriod } from 'src/actions/portfoliosActions';
import { getPrice, removeCoin, getCoinHisto, setCoinsError, updateCoinsPeriod } from 'src/actions/coinsActions';
import { getAvailableMarkets, clearMarkets, changeSearchTerm, getMarketCap, updateCollapsed, getExchanges, loadMoreExchanges } from 'src/actions/marketsActions';
import { getAvailableCurrencies } from 'src/actions/currenciesActions';
import { selectCurrency } from 'src/actions/settingsActions';
import { getTransactions, updateDraftTransaction, addTransaction, delTransaction } from 'src/actions/transactionsActions';
import { i18n } from 'src/services';

class Coins extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.string),
      items: PropTypes.shape({}),
    }).isRequired,
    coin: PropTypes.shape({
      items: PropTypes.shape({}),
      period: PropTypes.string,
      refreshing: PropTypes.bool,
      loading: PropTypes.bool,
    }).isRequired,
    transactions: PropTypes.shape({
      items: PropTypes.shape({}),
      loading: PropTypes.bool,
      refreshing: PropTypes.bool,
    }).isRequired,
    navigation: PropTypes.shape({
      drawer: PropTypes.shape({}),
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),

    updatePortfolios: PropTypes.func.isRequired,
    updatePortfolioChart: PropTypes.func.isRequired,
    updatePortfolioPeriod: PropTypes.func.isRequired,
    updatePortfolioCurrency: PropTypes.func.isRequired,

    loadMoreExchanges: PropTypes.func.isRequired,
    clearMarkets: PropTypes.func.isRequired,
    getMarketCap: PropTypes.func.isRequired,
    markets: PropTypes.shape({
      items: PropTypes.shape({}),
      chart: PropTypes.shape({}),
    }).isRequired,

    auth: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,

    getTotals: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    getTransactions: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    getExchanges: PropTypes.func.isRequired,
    setCoinData: PropTypes.func.isRequired,
    selectCurrency: PropTypes.func.isRequired,
    updatePeriod: PropTypes.func.isRequired,
    updateDraftTransaction: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    updateCoinsPeriod: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}),
      currency: PropTypes.string,
      periods: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    delTransaction: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    match: null,
  };

  getCurrency = () => {
    const {
      currencies,
      currency,
    } = this.props.settings;
    return currencies[currency] || {};
  };

  getCoin = () => {
    const {
      match,
      coin,
    } = this.props;
    const id = get(match, 'params.id', null);
    return get(coin, `items[${id}]`, {});
  };

  getTransactions = () => {
    const { items } = this.props.transactions;
    const coin = this.getCoin();
    const transactions = coin ? coin.transactions : null;
    return transactions ? transactions.map(id => items[id]).reverse() : [];
  };

  getChart = () => {
    const {
      match,
      coin,
      settings,
      markets,
    } = this.props;
    const marketId = get(match, 'params.market._id', null);
    const market = get(markets, `items[${marketId}]`, {});
    return get(market, `chart[${coin.period}:${settings.currency}]`, {
      data: {},
      low: 0,
      high: 0,
      pct: 0,
    });
  };

  getPortfolio = () => {
    const { portfolios } = this.props;
    const coin = this.getCoin();
    if (!coin) return {};
    return get(portfolios, `items[${coin.portfolio}]`, {});
  };

  getExchanges = () => {
    const { match, markets } = this.props;
    const marketId = get(match, 'params.market._id', null);
    const market = get(markets, `items[${marketId}]`, {});
    return market && market.exchanges ? market.exchanges : {
      list: [],
      loading: false,
      count: 0,
    };
  };

  getCollapsed = () => get(this.props.match, 'params.market.collapsed', []);

  addTransaction = (portfolio) => {
    this.props.updateDraftTransaction({ portfolio, create: true });
    // show SelectCoin screen
    Actions.selector({
      preLoad: (data) => {
        this.props.changeSearchTerm(data);
        this.props.getAvailableCurrencies({});
      },
      clear: () => this.props.clearMarkets(),
      title: i18n.t('coins.titleSelect'),
      listItemType: 'arrow',
      navigationType: 'close',
      searchBar: true,
      listName: 'markets',
      selectAction: (market) => {
        Actions.pop();
        Actions.createNewTransaction({ market });
      },
      closeType: 'close',
    });
    // return this.props.addTransaction(newCoin);
  };

  fetchPortfolios = (symbol) => {
    if (this.props.auth.token) this.props.updatePortfolios(symbol || this.props.settings.currency)
  };

  render = () => {
    const {
      Layout,
      portfolios,
      navigation,
      match,
      coin,
      settings,
      markets,
      transactions,
    } = this.props;
    const id = get(match, 'params.id', null);
    const marketId = get(match, 'params.market._id', null);
    const market = get(markets, `items[${marketId}]`, {});
    const portfolioId = get(markets, 'params.portfolioId', null);

    return (
      <Layout
        id={id}
        market={market}
        portfolioId={portfolioId}

        symbol={settings.currency}
        changePct={portfolios.changePct}
        lastTotal={portfolios.lastTotal}
        drawer={navigation.drawer}
        removePortfolio={this.props.removePortfolio}
        selectPortfolio={this.props.selectPortfolio}
        editPortfolio={this.props.updatePortfolio}
        addPortfolio={this.props.addPortfolio}
        setCoinData={this.props.setCoinData}
        updateCurrency={this.props.selectCurrency}
        updatePeriod={this.props.updatePeriod}
        currencies={settings.currencies}
        getTotals={this.props.getTotals}
        activePortfolio={portfolios.selected}
        coinData={coin.list}
        coins={coin.items}
        refreshing={coin.refreshing}
        loading={coin.loading}

        fetchPortfolios={this.fetchPortfolios}
        updatePortfolioChart={this.props.updatePortfolioChart}
        updatePortfolioPeriod={this.props.updatePortfolioPeriod}
        updatePortfolioCurrency={this.props.updatePortfolioCurrency}

        currency={this.getCurrency()}
        coin={this.getCoin()}
        transactions={this.getTransactions()}
        chart={this.getChart()}
        portfolio={this.getPortfolio()}

        getPrice={this.props.getPrice}
        addTransaction={this.addTransaction}
        getTransactions={this.props.getTransactions}

        transactionsLoading={transactions.loading}
        transactionsRefreshing={transactions.refreshing}
        transactionsError={transactions.error}

        getMarketCap={this.props.getMarketCap}
        removeCoin={this.props.removeCoin}
        getCoinHisto={this.props.getCoinHisto}
        getExchanges={this.props.getExchanges}
        exchanges={this.getExchanges()}
        loadMoreExchanges={this.props.loadMoreExchanges}
        settings={settings}
        markets={markets}
        periods={settings.periods}
        period={coin.period}
        updateCoinsPeriod={this.props.updateCoinsPeriod}
        updateCollapsed={this.props.updateCollapsed}
        collapsedList={this.getCollapsed()}
        delTransaction={this.props.delTransaction}
      />
    );
  }
}

const mapStateToProps = state => ({
  portfolios: state.portfolios,
  navigation: state.navigation,
  coin: state.coin,
  settings: state.settings,
  markets: state.markets,
  transactions: state.transactions,
  auth: state.auth,
});

const mapDispatchToProps = {
  updatePortfolios,
  updatePortfolioChart,
  updatePortfolioPeriod,
  updatePortfolioCurrency,

  getTotals,
  addTransaction,
  getPrice,
  getTransactions,
  removePortfolio,
  updatePortfolio,
  selectPortfolio,
  addPortfolio,
  removeCoin,
  getCoinHisto,
  getExchanges,
  setCoinsError,
  setCoinData,
  selectCurrency,
  updatePeriod,
  updateDraftTransaction,
  getAvailableMarkets,
  getAvailableCurrencies,
  updateCollapsed,
  clearMarkets,
  getMarketCap,
  updateCoinsPeriod,
  loadMoreExchanges,
  delTransaction,
  changeSearchTerm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
