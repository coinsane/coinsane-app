import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Item, Input } from 'native-base';

import I18n from '../../../../i18n';
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
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: I18n.t('placeholder.search'),
  };

  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus = () => this.props.getAvailableMarkets({});

  onChangeText = (q = '') => {
    if (q.length > 1) this.props.changeSearchTerm({ q });
    else this.props.getAvailableMarkets({});
  };

  render() {
    const { placeholder } = this.props;
    return (
      <Item style={styles.search}>
        <CoinsaneIcon name="Search" width={20} height={20} fill={colors.textGray} />
        <Input
          autoCorrect={false}
          clearTextOnFocus
          placeholder={placeholder}
          placeholderTextColor={colors.textGray}
          style={styles.input}
          onFocus={this.onFocus}
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
