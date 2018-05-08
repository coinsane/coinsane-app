import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

import styles from './Loading.styles';
import { colors } from '../../styles';

const About = () => (
  <View style={styles.loadingContainer}>
    <Spinner size={50} type="ThreeBounce" color={colors.white} />
  </View>
);

export default About;
