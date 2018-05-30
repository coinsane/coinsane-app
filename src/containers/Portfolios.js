import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { updatePortfolios, updatePortfolioChart, updatePortfolioPeriod, updatePortfolioCurrency, getTotals, addPortfolio, removePortfolio, updatePortfolio, selectPortfolio, updatePeriod, updateCollapsed } from '../redux/state/portfolios/portfolios.actioncreators';
import { updateProcessTransaction } from '../redux/state/inProcess/inProcess.actioncreators';
import { removeCoin } from '../redux/state/coin/coin.actioncreators';
import { getAvailableMarkets, clearMarkets } from '../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../redux/state/currencies/currencies.actioncreators';
import { selectCurrency } from '../redux/state/settings/settings.actioncreators';

class Portfolios extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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

    auth: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,

    removeCoin: PropTypes.func.isRequired,
    getTotals: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
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
    match: {},
  };

  getCurrency = () => {
    const {
      currencies,
      currency,
    } = this.props.settings;
    return currencies[currency] || {};
  };

  addCoin = (portfolio) => {
    this.props.updateProcessTransaction({ portfolio });
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
      settings,
    } = this.props;

    const id = match.params && match.params.portfolioId ? match.params.portfolioId : null;

    return (
      <Layout
        drawer={navigation.drawer}

        id={id}
        list={portfolios.list}
        error={portfolios.error}
        loading={portfolios.loading}
        chart={portfolios.chart}
        changePct={portfolios.changePct}
        lastTotal={portfolios.lastTotal}
        period={portfolios.period}
        activePortfolio={portfolios.selected}
        collapsedList={portfolios.collapsed}

        removePortfolio={this.props.removePortfolio}
        selectPortfolio={this.props.selectPortfolio}
        editPortfolio={this.props.updatePortfolio}
        addPortfolio={this.props.addPortfolio}
        addCoin={this.addCoin}
        removeCoin={this.props.removeCoin}

        fetchPortfolios={this.fetchPortfolios}
        updatePortfolioChart={this.props.updatePortfolioChart}
        updatePortfolioPeriod={this.props.updatePortfolioPeriod}
        updatePortfolioCurrency={this.props.updatePortfolioCurrency}
        updateCollapsed={this.props.updateCollapsed}
        getTotals={this.props.getTotals}

        currencies={settings.currencies}
        currency={this.getCurrency()}
        symbol={settings.currency}
        periods={settings.periods}

        updateCurrency={this.props.selectCurrency}
        updatePeriod={this.props.updatePeriod}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  portfolios: state.portfolios,
  settings: state.settings,
  auth: state.auth,
});

const mapDispatchToProps = {
  updatePortfolios,
  updatePortfolioChart,
  updatePortfolioPeriod,
  updatePortfolioCurrency,

  getTotals,
  removePortfolio,
  updatePortfolio,
  selectPortfolio,
  addPortfolio,
  selectCurrency,
  updatePeriod,
  updateProcessTransaction,
  getAvailableMarkets,
  getAvailableCurrencies,
  updateCollapsed,
  clearMarkets,
  removeCoin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolios);
