import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-native-switch-pro';
import styles from './CoinsaneSwitch.styles';
import { colors } from 'src/styles';

const CoinsaneSwitch = ({
  defaultValue,
  onSyncPress,
}) => (
  <Switch
    onSyncPress={onSyncPress}
    defaultValue={defaultValue}
    backgroundActive={colors.primaryGreen}
    backgroundInactive={colors.btnBgBlack}
    circleColorInactive={colors.textGray}
    width={44}
    height={23}
    circleStyle={styles.circle}
    style={styles.switchItem}
  />
);

CoinsaneSwitch.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  onSyncPress: PropTypes.func.isRequired,
};

CoinsaneSwitch.defaultProps = {};

export default CoinsaneSwitch;
