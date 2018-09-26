import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { View, Text, Icon } from 'native-base';
import styles from './TabHeader.styles';

const TabHeader = ({ title, isCollapsed, onPress }) => {
  const icon = isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down';
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <Icon name={icon} style={styles.icon} />
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool,
  onPress: PropTypes.func,
};

TabHeader.defaultProps = {
  isCollapsed: false,
  onPress: null,
};

export default TabHeader;
