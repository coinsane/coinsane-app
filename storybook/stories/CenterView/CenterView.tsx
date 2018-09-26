import React from 'react';
import { View } from 'react-native';
import styles from './CenterView.styles';

interface IProps {
  children: any;
}

class CenterView extends React.PureComponent<IProps> {
  render () {
    return (
      <View style={styles.main}>
        {children}
      </View>
    );
  }
}

export default CenterView;
