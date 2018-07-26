import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import DeviceInfo from 'react-native-device-info';

import ga from '../../../lib/ga';
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
    ga.setClient(deviceId);
    this.props.getToken({ deviceId });
  }

  render() {
    const { auth, children} = this.props;
    return (
      auth.token ?
        <View style={{ flex: 1 }}>{children}</View> :
        <Loading />
    );
  }
}

export default AuthProvider;
