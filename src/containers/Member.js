import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Member extends Component {

  render = () => {
    const { Layout, auth, navigation } = this.props;

    return <Layout auth={auth} drawer={navigation.drawer} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth || {},
  navigation: state.navigation || {},
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
