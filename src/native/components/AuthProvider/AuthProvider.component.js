import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import * as DeviceInfo from 'react-native-device-info';

import ga from '../../../lib/ga';
import Loading from '../Loading/Loading.component';
import Empty from '../Empty/Empty.component';

import i18n from '../../../i18n';

class AuthProvider extends Component {
  static propTypes = {
    getToken: PropTypes.func.isRequired,
    status: PropTypes.shape({
      loading: PropTypes.boolean,
      info: PropTypes.string,
      error: PropTypes.string,
      success: PropTypes.boolean,
      network: PropTypes.boolean,
    }),
    reconnect: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    status: null,
  };

  componentWillMount() {
    const deviceId = DeviceInfo.getUniqueID();
    ga.setClient(deviceId);
    this.props.getToken({ deviceId });
  }

  componentDidMount() {
    this.props.getToken();
  }

  renderContent = () => {
    if (this.props.auth.token) {
      return <View style={{ flex: 1 }}>{this.props.children}</View>;
    } else if (this.props.status.network === false) {
      return (
        <Empty
          description={i18n.t('authorization.error.networkTokenError')}
          image={require('../../../images/network.png')}
          imageWidth={200}
          imageHeight={230}
          buttonLabel={i18n.t('authorization.reconnect')}
          action={this.props.reconnect}
        />
      );
    }

    return <Loading />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

export default AuthProvider;
