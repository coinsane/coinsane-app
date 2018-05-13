import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Item, Input } from 'native-base';

import {
  changeSearchTerm,
  getAvailableMarkets,
} from '../../../../redux/state/markets/markets.actioncreators';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './SearchBar.styles';
import { colors } from '../../../styles';

class SearchBar extends Component {
  static propTypes = {
    changeSearchTerm: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(value) {
    return value && value.length > 1 ?
      this.props.changeSearchTerm(value) :
      this.props.getAvailableMarkets();
  }

  render() {
    return (
      <Item style={styles.search}>
        <CoinsaneIcon name="Search" width={22} height={22} fill={colors.textGray} />
        <Input
          autoFocus
          autoCorrect={false}
          clearTextOnFocus
          placeholder="Search"
          placeholderTextColor={colors.textGray}
          style={styles.input}
          onChangeText={this.onChangeText}
        />
      </Item>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = {
  changeSearchTerm,
  getAvailableMarkets,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
