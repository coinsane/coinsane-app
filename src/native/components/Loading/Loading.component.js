import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

import styles from './Loading.styles';
import { colors } from '../../styles';

const Loading = ({ size }) => (
  <View style={styles.container}>
    <Spinner size={size} type="ThreeBounce" color={colors.white} />
  </View>
);

Loading.propTypes = {
  size: PropTypes.number,
};

Loading.defaultProps = {
  size: 50,
};

export default Loading;
