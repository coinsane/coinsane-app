import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { TextInput } from 'react-native';
import { changeSearchTerm, getAvaliableMarkets } from '../../../../redux/state/markets/markets.actioncreators';
import styles from './SearchBar.styles';
import { colors } from '../../../styles';

class SearchBar extends Component {
  
  render() {
    return (
      <Item style={styles.search}>
        <Icon name="ios-search" style={styles.icon} />
        <Input
          placeholder="Search"
          placeholderTextColor={colors.textGray} 
          style={styles.input}
          onChangeText={text => { (text && text.length > 1) ? this.props.changeSearchTerm(text) : this.props.getAvaliableMarkets(); }} 
        />
      </Item>
    );
  }
}

export default connect(null, { changeSearchTerm, getAvaliableMarkets })(SearchBar);
