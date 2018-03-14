import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPortfolios, getTotals, addPortfolio, removePortfolio, updatePortfolio, setPortfoliosError, selectPortfolio, setCoinData, updateCurrency, updatePeriod } from '../actions/portfolios';
import { addCoin, removeCoin, setCoinsError } from '../actions/coins';

class CoinListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      drawer: PropTypes.shape(),
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getPortfolios: PropTypes.func.isRequired,
    getTotals: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    addCoin: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    setPortfoliosError: PropTypes.func.isRequired,
    setCoinsError: PropTypes.func.isRequired,
    setCoinData: PropTypes.func.isRequired,
    updateCurrency: PropTypes.func.isRequired,
    updatePeriod: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => {
    return Promise.resolve()
      .then(this.fetchPortfolios)
  };

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchPortfolios = () => {
    const {
      portfolios,
      getPortfolios,
      setPortfoliosError,
    } = this.props;
    return getPortfolios(portfolios.currency)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return setPortfoliosError(err);
      });
  }

  addCoin = (portfolioId) => {
    const mockMarkets = [41122,41125,411271,411496,411620,411647,41192,412081,412112,412197,412267,413886,41587,41590,41592,41819,418671,41868,418694,41871,418778,419209,41962,41967,41971,419711,41974];
    const marketId = mockMarkets[Math.floor(Math.random() * mockMarkets.length)]
    const amount = Math.round(0.5 + Math.random() * 2000);
    const newCoin = { marketId, amount, portfolioId };
    return this.props.addCoin(newCoin);
  }

  removePortfolio = (portfolioId) => {
    return this.props.removePortfolio(portfolioId);
  }

  editPortfolio = (portfolio) => {
    return this.props.updatePortfolio(portfolio);
  }

  _addPortfolio = (portfolio) => {
    return this.props.addPortfolio(portfolio);
  }

  _selectPortfolio = (portfolioId) => {
    return this.props.selectPortfolio(portfolioId);
  }

  _setCoinData = (data) => {
    return this.props.setCoinData(data);
  }

  _updateCurrency = (data) => {
    return this.props.updateCurrency(data);
  }

  _updatePeriod = (data) => {
    return this.props.updatePeriod(data);
  }

  _getTotals = (data) => {
    return this.props.getTotals(data);
  }

  removeCoin = (coinId) => {
    return this.props.removeCoin(coinId);
  }

  render = () => {
    const { Layout, portfolios, navigation, match } = this.props;
    const coinId = (match && match.params && match.params.coinId) ? match.params.coinId : null;
    const portfolioId = (match && match.params && match.params.portfolioId) ? match.params.portfolioId : null;


    return (
      <Layout
        coinId={coinId}
        portfolioId={portfolioId}

        portfoliosError={portfolios.error}
        portfoliosLoading={portfolios.loading}
        portfolios={portfolios.list}
        portfoliosChart={portfolios.chart}
        changePct={portfolios.changePct}
        lastTotal={portfolios.lastTotal}
        drawer={navigation.drawer}
        removePortfolio={this.removePortfolio}
        selectPortfolio={this._selectPortfolio}
        editPortfolio={this.editPortfolio}
        addPortfolio={this._addPortfolio}
        setCoinData={this._setCoinData}
        updateCurrency={this._updateCurrency}
        updatePeriod={this._updatePeriod}
        currency={portfolios.currency}
        period={portfolios.period}
        getTotals={this._getTotals}
        activePortfolio={portfolios.selected}
        coinData={portfolios.coinData}
        portfoliosFetch={() => this.fetchPortfolios()}

        addCoin={this.addCoin}
        removeCoin={this.removeCoin}
      />
    );
  }
}

const mapStateToProps = state => {
  // console.log('coins mapStateToProps', state)
  return {
    portfolios: state.portfolios || {},
    navigation: state.navigation || {},
    // coins: state.coins || {},
  };
};

const mapDispatchToProps = {
  getPortfolios,
  getTotals,
  // getCoins,
  addCoin,
  removePortfolio,
  updatePortfolio,
  selectPortfolio,
  addPortfolio,
  removeCoin,
  setPortfoliosError,
  setCoinsError,
  setCoinData,
  updateCurrency,
  updatePeriod,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinListing);
