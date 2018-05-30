import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { updatePortfolios, updatePortfolioChart, updatePortfolioPeriod, updatePortfolioCurrency, getTotals, addPortfolio, removePortfolio, updatePortfolio, selectPortfolio, setCoinData, updatePeriod, updateCollapsed } from '../redux/state/portfolios/portfolios.actioncreators';
import { updateProcessTransaction } from '../redux/state/inProcess/inProcess.actioncreators';
import { getTransactionsList, addTransaction, getPrice, removeCoin, getCoinHisto, setCoinsError, getCoinMarkets } from '../redux/state/coin/coin.actioncreators';
import { getAvailableMarkets, clearMarkets, getMarketCap } from '../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../redux/state/currencies/currencies.actioncreators';
import { selectCurrency } from '../redux/state/settings/settings.actioncreators';

class Coins extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    coin: PropTypes.shape({
      items: PropTypes.shape({}),
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

    clearMarkets: PropTypes.func.isRequired,
    getMarketCap: PropTypes.func.isRequired,
    markets: PropTypes.shape({}).isRequired,

    auth: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,

    getTotals: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    getTransactionsList: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    getCoinMarkets: PropTypes.func.isRequired,
    setCoinData: PropTypes.func.isRequired,
    selectCurrency: PropTypes.func.isRequired,
    updatePeriod: PropTypes.func.isRequired,
    updateProcessTransaction: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}),
      currency: PropTypes.string,
      periods: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
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
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    return id ? coin.items[id] : null;
  };

  addTransaction = (portfolio) => {
    // add portfolioId (passed as object) to process transaction peace of state
    this.props.updateProcessTransaction({ portfolio });
    // show SelectCoin screen
    Actions.selector({
      preLoad: () => {
        this.props.getAvailableMarkets({});
        this.props.getAvailableCurrencies({});
      },
      clear: () => {
        this.props.clearMarkets();
      },
      title: 'Select coin',
      listItemType: 'arrow',
      navigationType: 'close',
      searchBar: true,
      listName: 'markets',
      selectAction: (item) => {
        Actions.pop();
        Actions.createNewTransaction({ coinItem: item });
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
    } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    const market = (match && match.params && match.params.market) ? match.params.market : null;
    const portfolioId = match && match.params && match.params.portfolioId
      ? match.params.portfolioId :
      null;

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
        period={portfolios.period}
        getTotals={this.props.getTotals}
        activePortfolio={portfolios.selected}
        coinData={coin.list}
        coins={coin.items}

        fetchPortfolios={this.fetchPortfolios}
        updatePortfolioChart={this.props.updatePortfolioChart}
        updatePortfolioPeriod={this.props.updatePortfolioPeriod}
        updatePortfolioCurrency={this.props.updatePortfolioCurrency}

        currency={this.getCurrency()}
        coin={this.getCoin()}

        getPrice={this.props.getPrice}
        addTransaction={this.addTransaction}
        getTransactionsList={this.props.getTransactionsList}

        transactionsList={coin.transactions}
        transactionsLoading={coin.transactionsLoading}
        transactionsError={coin.transactionsError}

        getMarketCap={this.props.getMarketCap}
        removeCoin={this.props.removeCoin}
        getCoinHisto={this.props.getCoinHisto}
        getCoinMarkets={this.props.getCoinMarkets}
        updateCollapsed={this.props.updateCollapsed}
        collapsedList={portfolios.collapsed}
        exchanges={coin.markets}
        settings={settings}
        markets={markets}
        periods={settings.periods}
      />
    );
  }
}

const mapStateToProps = state => ({
  portfolios: state.portfolios,
  navigation: state.navigation,
  coin: state.coin,
  currencies: state.currencies,
  settings: state.settings,
  markets: state.markets,
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
  getTransactionsList,
  removePortfolio,
  updatePortfolio,
  selectPortfolio,
  addPortfolio,
  removeCoin,
  getCoinHisto,
  getCoinMarkets,
  setCoinsError,
  setCoinData,
  selectCurrency,
  updatePeriod,
  updateProcessTransaction,
  getAvailableMarkets,
  getAvailableCurrencies,
  updateCollapsed,
  clearMarkets,
  getMarketCap,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
