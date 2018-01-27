import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListView } from 'react-native';

import { getPortfolios, createPortfolio, removePortfolio, addCoin, removeCoin, setError } from '../actions/portfolios';

import { Firebase, FirebaseRef } from '../lib/firebase';
import { getUID } from '../lib/utils';

class CoinListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    createPortfolio: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    addCoin: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    getPortfolios: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchPortfolios();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchPortfolios = () => {
    return this.props.getPortfolios()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  createPortfolio = () => {
    const newPortfolio = {
      title: 'portfolio_title'
    };
    return this.props.createPortfolio(newPortfolio);
  }

  removePortfolio = (portfolioId) => {
    return this.props.removePortfolio(portfolioId);
  }

  removeCoin = (coinId) => {
    return this.props.removeCoin(coinId);
  }

  addCoin = (portfolioId) => {
    const newCoin = {
      title: 'coin_title'
    };
    console.log('addCoin', portfolioId);
    return this.props.addCoin(portfolioId, newCoin);
  }

  render = () => {
    const { Layout, portfolios, list, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        coinId={id}
        error={portfolios.error}
        loading={portfolios.loading}
        portfolios={portfolios.portfolios}
        createPortfolio={this.createPortfolio}
        removePortfolio={this.removePortfolio}
        removeCoin={this.removeCoin}
        list={list}
        addCoin={this.addCoin}
        reFetch={() => this.fetchPortfolios()}
      />
    );
  }
}

const rowHasChanged = (r1, r2) => r1._id !== r2._id;
const sectionHeaderHasChanged = (s1, s2) => s1._id !== s2._id;

const ds = new ListView.DataSource({ rowHasChanged, sectionHeaderHasChanged });



const mapStateToProps = state => {
  // console.log('coins mapStateToProps', state.portfolios)
  return {
    portfolios: state.portfolios || {},
    list: ds.cloneWithRowsAndSections(state.portfolios.portfolios),
  };
};

const mapDispatchToProps = {
  getPortfolios,
  createPortfolio,
  removePortfolio,
  addCoin,
  removeCoin,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinListing);
