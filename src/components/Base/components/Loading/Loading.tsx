import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

import { colors } from 'src/styles';

import styles from './Loading.styles';

interface IProps {
  size?: number;
}

class Loading extends React.PureComponent<IProps> {
  render () {
    const {
      size = 25,
    } = this.props;
    return (
      <View style={styles.container}>
        <Spinner size={size} type="ThreeBounce" color={colors.white} />
      </View>
    );
  }
}

export default Loading;
