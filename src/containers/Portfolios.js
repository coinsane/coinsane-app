import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import get from 'lodash/get';

import { updatePortfolios, updatePortfolioChart, updatePortfolioPeriod, updatePortfolioCurrency, getTotals, addPortfolio, removePortfolio, updatePortfolio, selectPortfolio, updatePeriod, updateCollapsed } from '../redux/state/portfolios/portfolios.actioncreators';
import { updateDraftTransaction } from '../redux/state/transactions/transactions.actioncreators';
import { removeCoin } from '../redux/state/coin/coin.actioncreators';
import { getAvailableMarkets, clearMarkets, changeSearchTerm } from '../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../redux/state/currencies/currencies.actioncreators';
import { selectCurrency, hideOnboarding } from '../redux/state/settings/settings.actioncreators';
import I18n from '../i18n';

class Portfolios extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.string),
      items: PropTypes.shape({}),
      chart: PropTypes.shape({}),
    }).isRequired,
    markets: PropTypes.shape({}).isRequired,
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
    updateDraftTransaction: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}),
      currency: PropTypes.string,
      onboarding: PropTypes.bool,
      periods: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    hideOnboarding: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    match: {},
  };

  getCurrency = () => {
    const { currencies, currency } = this.props.settings;
    return currencies[currency] || {};
  };

  getChart = () => {
    const { portfolios, settings } = this.props;
    const activePortfolio = portfolios.selected || 'all';
    const period = portfolios.period || '1d';
    return get(portfolios, `chart[${activePortfolio}][${period}:${settings.currency}]`, {
      data: {},
      low: 0,
      high: 0,
      pct: 0,
    });
  };

  addCoin = (portfolio) => {
    this.props.updateDraftTransaction({ portfolio, create: true });
    Actions.selector({
      preLoad: (data) => {
        this.props.changeSearchTerm(data);
        this.props.getAvailableCurrencies({});
      },
      clear: () => this.props.clearMarkets(),
      title: I18n.t('coins.titleSelect'),
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
  };

  fetchPortfolios = ({ symbol, refreshing }) => {
    if (this.props.auth.token) {
      this.props.updatePortfolios({ symbol, refreshing });
    }
  };

  render = () => {
    const {
      Layout,
      portfolios,
      navigation,
      match,
      settings,
      markets,
      coin,
    } = this.props;

    const id = match.params && match.params.portfolioId ? match.params.portfolioId : null;

    return (
      <Layout
        drawer={navigation.drawer}

        id={id}
        portfolios={portfolios.items}
        list={portfolios.list}
        error={portfolios.error}
        loading={portfolios.loading}
        refreshing={portfolios.refreshing}
        charts={portfolios.chart}
        chart={this.getChart()}
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
        onboarding={settings.onboarding}
        hideOnboarding={this.props.hideOnboarding}

        updateCurrency={this.props.selectCurrency}
        updatePeriod={this.props.updatePeriod}
        getAvailableMarkets={this.props.getAvailableMarkets}

        markets={markets}
        coins={coin.items}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  portfolios: state.portfolios,
  markets: state.markets,
  coin: state.coin,
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
  updateDraftTransaction,
  getAvailableMarkets,
  getAvailableCurrencies,
  updateCollapsed,
  clearMarkets,
  removeCoin,
  hideOnboarding,
  changeSearchTerm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolios);
