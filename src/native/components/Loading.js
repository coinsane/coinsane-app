import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';

import styles from './Loading.styles';
import { colors } from '../styles';

const About = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.white} />
  </View>
);

export default About;
