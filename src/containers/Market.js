import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMarketCap } from '../redux/state/markets/markets.actioncreators';
import { selectCurrency } from '../redux/state/currencies/currencies.actioncreators';

class Market extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}).isRequired,
    }).isRequired,
    markets: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      cap: PropTypes.shape({}).isRequired,
    }).isRequired,

    selectCurrency: PropTypes.func.isRequired,
    getMarketCap: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getMarketCap();
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
        updateCurrency={this.props.selectCurrency}
        cap={markets.cap}
        markets={markets.list}
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
  selectCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
