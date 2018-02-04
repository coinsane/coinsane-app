import React from 'react';
import { Text } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const PortfolioSelect = () => {
  return (
    <TouchableOpacity onPress={() => Actions.portfolioSelect() } style={styles.rightButton}>
      <Text>Select Portfolio</Text>
    </TouchableOpacity>
  )
};

export default PortfolioSelect;

const styles = StyleSheet.create({
  rightButton: {
    paddingRight: 8,
    top: 6,
  },
})
