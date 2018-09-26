import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import DeviceInfo from 'react-native-device-info';

import { Loading, Empty } from 'src/components/Base';

import { analytics, i18n } from 'src/services';
import Config from 'src/constants/config';

class AuthProvider extends Component {
  static propTypes = {
    getToken: PropTypes.func.isRequired,
    network: PropTypes.bool,
    reconnect: PropTypes.func.isRequired,
    token: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    network: true,
    token: '',
  };

  componentDidMount() {
    const deviceId = DeviceInfo.getUniqueID();
    this.props.getToken({ deviceId });
  }

  renderContent = () => {
    if (this.props.token) {
      return <View style={{ flex: 1 }}>{this.props.children}</View>;
    }

    if (!this.props.network) {
      return (
        <Empty
          description={i18n.t('auth.error.networkTokenError')}
          image={`${Config.fileUri}/states/network.png`}
          imageWidth={200}
          imageHeight={230}
          buttonLabel={i18n.t('auth.reconnect')}
          action={this.props.reconnect}
        />
      );
    }

    return <Loading />;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

export default AuthProvider;
