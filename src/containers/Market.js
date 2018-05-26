import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAvailableMarkets, clearMarkets, getMarketCap } from '../redux/state/markets/markets.actioncreators';
import { selectCurrency } from '../redux/state/settings/settings.actioncreators';

class Market extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}).isRequired,
    }).isRequired,
    markets: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.string).isRequired,
      items: PropTypes.shape({}).isRequired,
      cap: PropTypes.shape({}).isRequired,
    }).isRequired,
    selectCurrency: PropTypes.func.isRequired,
    getMarketCap: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getMarketCap();
    this.props.getAvailableMarkets({ limit: 10, offset: 0 });
  }

  updateCurrency() {
    this.props.getMarketCap();
    this.props.selectCurrency();
  }

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
        cap={markets.cap}
        markets={markets.list}
        coins={markets.items}
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
  clearMarkets,
  selectCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
