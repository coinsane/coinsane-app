import React from 'react';
import { View } from 'react-native';

interface IProps {
  height?: number;
}

class Spacer extends React.PureComponent<IProps> {
  render () {
    const {
      height = 0,
    } = this.props;
    return <View style={{ flex: 1, height }} />;
  }
}

export default Spacer;
