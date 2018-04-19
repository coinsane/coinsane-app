import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { getPortfolios, getTotals, addPortfolio, removePortfolio, updatePortfolio, setPortfoliosError, selectPortfolio, setCoinData, updatePeriod } from '../redux/state/portfolios/portfolios.actioncreators';
import { updateProccessTransaction } from '../redux/state/inProcess/inProcess.actioncreators';
import { getTransactionsList, addTransaction, getCourse, removeCoin, getCoinHisto, setCoinsError } from '../redux/state/coin/coin.actioncreators';
import { getAvaliableMarkets, clearMarkets } from '../redux/state/markets/markets.actioncreators';
import { getAvaliableCurrencies, updateCurrentCurrency } from '../redux/state/currencies/currencies.actioncreators';

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
    getCourse: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    getTransactionsList: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    setPortfoliosError: PropTypes.func.isRequired,
    getCoinHisto: PropTypes.func,
    setCoinsError: PropTypes.func.isRequired,
    setCoinData: PropTypes.func.isRequired,
    updateCurrentCurrency: PropTypes.func.isRequired,
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
  fetchPortfolios = (symbol) => {
    const {
      portfolios,
      getPortfolios,
      setPortfoliosError,
      currencies,
    } = this.props;
    return getPortfolios(symbol || currencies.currecnt)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return setPortfoliosError(err);
      });
  }

  addTransaction = (portfolio) => {
    // add portfolioId (passed as object) to proccess transaction peace of state
    this.props.updateProccessTransaction({ portfolio });
    // show SelectCoin screen
    Actions.selector({
      preLoad: () => {
        this.props.getAvaliableMarkets();
        this.props.getAvaliableCurrencies();
      },
      clear: () => {
        //this.props.clearMarkets();
      },
      title: 'Select coin',
      listItemType: 'arrow',
      navigationType: 'close',
      searchBar: true,
      listName: 'markets',
      selectAction: (item) => { // id - of selected item
        this.props.updateProccessTransaction({ coin: item._id, coinItem: item });
        Actions.createNewTransaction();
      },
      closeType: 'close'
    });
    //return this.props.addTransaction(newCoin);
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
    return this.props.updateCurrentCurrency(data);
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

  _getCoinHisto = (data) => {
    return this.props.getCoinHisto(data);
  }

  _getCourse = (data) => {
    return this.props.getCourse(data);
  }

  _getTransactionsList = (data) => {
    return this.props.getTransactionsList(data);
  }

  render = () => {
    const { Layout, portfolios, navigation, match, coin, currencies } = this.props;
    const coinId = (match && match.params && match.params.coinId) ? match.params.coinId : null;
    const portfolioId = (match && match.params && match.params.portfolioId) ? match.params.portfolioId : null;
console.log('portfolios.changePct', portfolios.changePct)
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
        currency={currencies.current}
        currencies={currencies.active}
        period={portfolios.period}
        getTotals={this._getTotals}
        activePortfolio={portfolios.selected}
        coinData={coin.list}
        portfoliosFetch={(symbol) => this.fetchPortfolios(symbol)}

        getCourse={this._getCourse}
        addTransaction={this.addTransaction}
        getTransactionsList={this._getTransactionsList}
        transactionsList={coin.transactions}
        removeCoin={this.removeCoin}
        getCoinHisto={this._getCoinHisto}
      />
    );
  }
}

const mapStateToProps = state => {
  // console.log('coins mapStateToProps', state)
  return {
    portfolios: state.portfolios || {},
    navigation: state.navigation || {},
    coin: state.coin || {},
    currencies: state.currencies || {},
  };
};

const mapDispatchToProps = {
  getPortfolios,
  getTotals,
  addTransaction,
  getCourse,
  getTransactionsList,
  removePortfolio,
  updatePortfolio,
  selectPortfolio,
  addPortfolio,
  removeCoin,
  getCoinHisto,
  setPortfoliosError,
  setCoinsError,
  setCoinData,
  updateCurrentCurrency,
  updatePeriod,
  updateProccessTransaction,
  getAvaliableMarkets,
  getAvaliableCurrencies
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinListing);
