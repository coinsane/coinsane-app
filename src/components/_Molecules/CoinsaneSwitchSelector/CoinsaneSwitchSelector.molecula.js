import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base'
import SwitchSelector from 'react-native-switch-selector';
import { colors } from 'src/styles/index';
import styles from './CoinsaneSwitchSelector.styles';

const CoinsaneSwitchSelector = ({
  options,
  onPress,
  initial,
}) => (
  <View style={styles.body}>
    <SwitchSelector
      options={options}
      initial={initial}
      onPress={onPress}
      buttonColor={colors.inputBg}
      backgroundColor={colors.bgGray}
      borderColor={colors.inputBg}
      textColor={colors.textGray}
      bold
      hasPadding
      valuePadding={2}
    />
  </View>
);

CoinsaneSwitchSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onPress: PropTypes.func,
  initial: PropTypes.number,
};

CoinsaneSwitchSelector.defaultProps = {
  onPress: null,
  initial: 0,
};

export default CoinsaneSwitchSelector;
