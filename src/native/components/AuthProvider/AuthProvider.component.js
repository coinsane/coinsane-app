import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import DeviceInfo from 'react-native-device-info';

import Loading from '../Loading/Loading.component';

class AuthProvider extends Component {
  static propTypes = {
    getToken: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
    children: PropTypes.node.isRequired,
  };

  componentWillMount() {
    const deviceId = DeviceInfo.getUniqueID();
    this.props.getToken({ deviceId });
  }

  render() {
    return (
      this.props.auth.token ?
        <View style={{ flex: 1 }}>{this.props.children}</View> :
        <Loading />
    );
  }
}

export default AuthProvider;
