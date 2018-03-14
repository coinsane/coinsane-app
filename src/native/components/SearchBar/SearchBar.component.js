import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import styles from './SearchBar.styles';
import { colors } from '../../styles';

export default class SearchBar extends Component {
  render() {
    return (
      <Item style={styles.search}>
        <Icon name="ios-search" style={styles.icon} />
        <Input placeholder="Search" placeholderTextColor={colors.textGray} style={styles.input} />
      </Item>
    );
  }
}
