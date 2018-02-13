import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Market extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}),
  }

  render = () => {
    const { Layout, navigation } = this.props;

    return <Layout drawer={navigation.drawer} />;
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation || {},
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
