import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSettings } from 'src/actions/settingsActions';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      drawer: PropTypes.shape({}),
    }).isRequired,
    auth: PropTypes.shape({}),
    settings: PropTypes.shape({}).isRequired,
    getSettings: PropTypes.func.isRequired,
  };

  static defaultProps = {
    auth: {},
  };

  _getSettings = () => this.props.getSettings();

  render = () => {
    const {
      Layout,
      auth,
      navigation,
      settings,
    } = this.props;

    return (
      <Layout
        auth={auth}
        drawer={navigation.drawer}
        getSettings={this._getSettings}
        settings={settings}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth || {},
  navigation: state.navigation || {},
  settings: state.settings,
});

const mapDispatchToProps = {
  getSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
