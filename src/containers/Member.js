import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../actions/member';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    getMemberData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
    navigation: PropTypes.shape({}),
  }

  componentDidMount = () => this.props.getMemberData();

  render = () => {
    const { Layout, member, memberLogout, navigation } = this.props;

    return <Layout member={member} logout={memberLogout} drawer={navigation.drawer} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  navigation: state.navigation || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
