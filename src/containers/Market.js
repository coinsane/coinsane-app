import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAvailableMarkets, changeSearchTerm, clearMarkets, getMarketCap } from '../redux/state/markets/markets.actioncreators';
import { selectCurrency } from '../redux/state/settings/settings.actioncreators';

class Market extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}).isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
    markets: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.string).isRequired,
      items: PropTypes.shape({}).isRequired,
      cap: PropTypes.shape({}).isRequired,
    }).isRequired,
    selectCurrency: PropTypes.func.isRequired,
    getMarketCap: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getMarketCap();
    // this.props.getAvailableMarkets({});
  }

  getCurrency = () => {
    const {
      currencies,
      currency,
    } = this.props.settings;
    return currencies[currency] || {};
  };


  updateCurrency = (currency) => {
    this.props.getMarketCap(currency);
    this.props.selectCurrency(currency);
  };

  render = () => {
    const {
      Layout,
      navigation,
      settings,
      markets,
    } = this.props;

    return (
      <Layout
        drawer={navigation.drawer}
        currencies={settings.currencies}
        currency={settings.currency}
        updateCurrency={this.updateCurrency}
        getAvailableMarkets={this.props.getAvailableMarkets}
        changeSearchTerm={this.props.changeSearchTerm}
        getCurrency={this.getCurrency()}
        markets={markets}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  settings: state.settings,
  markets: state.markets,
});

const mapDispatchToProps = {
  getMarketCap,
  getAvailableMarkets,
  changeSearchTerm,
  clearMarkets,
  selectCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
