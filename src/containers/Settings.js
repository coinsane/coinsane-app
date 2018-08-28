import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSettings, updateCurrencies } from '../redux/state/settings/settings.actioncreators';
import { getPages } from '../redux/state/pages/pages.actioncreators';
import { getAvailableMarkets, clearMarkets, changeSearchTerm, currencySearch } from '../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../redux/state/currencies/currencies.actioncreators';

class Settings extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({}).isRequired,
    pages: PropTypes.shape({}).isRequired,
    getSettings: PropTypes.func.isRequired,
    getPages: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    clearMarkets: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    currencySearch: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    updateCurrencies: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSettings();
    this.props.getPages();
  }

  render = () => {
    const {
      Layout,
      navigation,
      settings,
      pages,
    } = this.props;

    return (
      <Layout
        drawer={navigation.drawer}
        settings={settings}
        pages={pages.items}
        currencySearch={this.props.currencySearch}
        clearMarkets={this.props.clearMarkets}
        updateCurrencies={this.props.updateCurrencies}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  settings: state.settings,
  pages: state.pages,
});

const mapDispatchToProps = {
  getSettings,
  getPages,
  getAvailableMarkets,
  clearMarkets,
  changeSearchTerm,
  getAvailableCurrencies,
  currencySearch,
  updateCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
