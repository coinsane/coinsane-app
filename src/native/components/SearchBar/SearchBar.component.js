import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { TextInput } from 'react-native';
import { changeSearchTerm, getAvaliableCoins } from '../../../actions/coins';
import styles from './SearchBar.styles';
import { colors } from '../../styles';

class SearchBar extends Component {
  
  render() {
    return (
      <Item style={styles.search}>
        <Icon name="ios-search" style={styles.icon} />
        <Input
          placeholder="Search"
          placeholderTextColor={colors.textGray} 
          style={styles.input}
          onChangeText={text => { (text && text.length > 1) ? this.props.changeSearchTerm(text) : this.props.getAvaliableCoins(); }} 
        />
      </Item>
    );
  }
}

export default connect(null, { changeSearchTerm, getAvaliableCoins })(SearchBar);
