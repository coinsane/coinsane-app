import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Item, Input } from 'native-base';

import { i18n } from 'src/services';
import { colors } from 'src/styles';
import {
  changeSearchTerm,
  getAvailableMarkets,
  currencySearch,
} from 'src/actions/marketsActions';
import { getAvailableCurrencies } from 'src/actions/currenciesActions';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './SearchBar.styles';

class SearchBar extends Component {
  static propTypes = {
    changeSearchTerm: PropTypes.func.isRequired,
    currencySearch: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    placeholder: i18n.t('placeholder.search'),
    type: 'markets',
  };

  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus = () => {
    if (this.props.type === 'markets') this.props.getAvailableMarkets({});
    if (this.props.type === 'currencies') this.props.getAvailableCurrencies({});
  };

  onChangeText = (q = '') => {
    if (this.props.type === 'markets') this.props.changeSearchTerm({ q });
    if (this.props.type === 'currencies') this.props.currencySearch({ q });
    // if (q.length > 1) this.props.changeSearchTerm({ q });
    // else this.props.getAvailableMarkets({});
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
  currencySearch,
  changeSearchTerm,
  getAvailableMarkets,
  getAvailableCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
