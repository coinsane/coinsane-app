import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { updatePortfolios, updatePortfolioChart, updatePortfolioPeriod, updatePortfolioCurrency, getTotals, addPortfolio, removePortfolio, updatePortfolio, setPortfoliosError, selectPortfolio, setCoinData, updatePeriod, updateCollapsed } from '../redux/state/portfolios/portfolios.actioncreators';
import { updateProcessTransaction } from '../redux/state/inProcess/inProcess.actioncreators';
import { getTransactionsList, addTransaction, getPrice, removeCoin, getCoinHisto, setCoinsError, getCoinMarkets } from '../redux/state/coin/coin.actioncreators';
import { getAvailableMarkets, clearMarkets, getMarketCap } from '../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies, selectCurrency } from '../redux/state/currencies/currencies.actioncreators';

class Coins extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    coin: PropTypes.shape({}).isRequired,
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

    getTotals: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    getTransactionsList: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    setPortfoliosError: PropTypes.func.isRequired,
    getCoinHisto: PropTypes.func.isRequired,
    getCoinMarkets: PropTypes.func.isRequired,
    setCoinData: PropTypes.func.isRequired,
    selectCurrency: PropTypes.func.isRequired,
    updatePeriod: PropTypes.func.isRequired,
    updateProcessTransaction: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    settings: PropTypes.shape({}).isRequired,
    currencies: PropTypes.shape({
      current: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    match: null,
  };

  fetchPortfolios = symbol => this.props.updatePortfolios(symbol || this.props.currencies.current);

  addTransaction = (portfolio) => {
    // add portfolioId (passed as object) to process transaction peace of state
    this.props.updateProcessTransaction({ portfolio });
    // show SelectCoin screen
    Actions.selector({
      preLoad: () => {
        this.props.getAvailableMarkets();
        this.props.getAvailableCurrencies();
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

  render = () => {
    const {
      Layout,
      portfolios,
      navigation,
      match,
      coin,
      currencies,
      settings,
      markets,
    } = this.props;
    const coinId = (match && match.params && match.params.coinId) ? match.params.coinId : null;
    const portfolioId = match && match.params && match.params.portfolioId
      ? match.params.portfolioId :
      null;

    return (
      <Layout
        coinId={coinId}
        portfolioId={portfolioId}

        portfoliosError={portfolios.error}
        portfoliosLoading={portfolios.loading}
        portfolios={portfolios.list}
        portfoliosChart={portfolios.chart}
        currency={portfolios.currency}
        coinCurrency={currencies.current}
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

        fetchPortfolios={this.fetchPortfolios}
        updatePortfolioChart={this.props.updatePortfolioChart}
        updatePortfolioPeriod={this.props.updatePortfolioPeriod}
        updatePortfolioCurrency={this.props.updatePortfolioCurrency}

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
        markets={coin.markets}
        settings={settings}
        marketsList={markets}
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
  setPortfoliosError,
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
