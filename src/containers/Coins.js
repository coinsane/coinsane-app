import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPortfolios, removePortfolio, setPortfoliosError } from '../actions/portfolios';
import { addCoin, removeCoin, setCoinsError } from '../actions/coins';

class CoinListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    // coins: PropTypes.shape({
    //   loading: PropTypes.bool.isRequired,
    //   error: PropTypes.string,
    //   list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getPortfolios: PropTypes.func.isRequired,
    addCoin: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    setPortfoliosError: PropTypes.func.isRequired,
    setCoinsError: PropTypes.func.isRequired,
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
    return this.props.getPortfolios()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setPortfoliosError(err);
      });
  }

  addCoin = (portfolioId) => {
    const title = `Coin ${Math.random()}`;
    const newCoin = { title, portfolioId };
    return this.props.addCoin(newCoin);
  }

  removePortfolio = (portfolioId) => {
    return this.props.removePortfolio(portfolioId);
  }

  removeCoin = (coinId) => {
    return this.props.removeCoin(coinId);
  }

  render = () => {
    const { Layout, portfolios, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        coinId={id}

        portfoliosError={portfolios.error}
        portfoliosLoading={portfolios.loading}
        portfolios={portfolios.list}
        removePortfolio={this.removePortfolio}
        activePortfolio={portfolios.selected}
        portfoliosFetch={() => this.fetchPortfolios()}

        // coinsError={coins.error}
        // coinsLoading={coins.loading}
        // coins={coins.list}
        addCoin={this.addCoin}
        removeCoin={this.removeCoin}
        // coinsFetch={() => this.fetchCoins()}
      />
    );
  }
}

const mapStateToProps = state => {
  // console.log('coins mapStateToProps', state)
  return {
    portfolios: state.portfolios || {},
    // coins: state.coins || {},
  };
};

const mapDispatchToProps = {
  getPortfolios,
  // getCoins,
  addCoin,
  removePortfolio,
  removeCoin,
  setPortfoliosError,
  setCoinsError,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinListing);
