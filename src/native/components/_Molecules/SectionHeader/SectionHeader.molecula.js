import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, View, Icon } from 'native-base';

import styles from './SectionHeader.styles';

const SectionHeader = ({ title }) => (
  <View style={styles.container}>
    <ListItem style={styles.listItem}>
      <Body style={styles.body}>
        <Text numberOfLines={1} style={styles.body__text}>{title}</Text>
      </Body>
    </ListItem>
  </View>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

SectionHeader.defaultProps = {};

export default SectionHeader;
