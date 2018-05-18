import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSettings } from '../redux/state/settings/settings.actioncreators';
import { getPages } from '../redux/state/pages/pages.actioncreators';

class Settings extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({}).isRequired,
    pages: PropTypes.shape({}).isRequired,
    getSettings: PropTypes.func.isRequired,
    getPages: PropTypes.func.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
