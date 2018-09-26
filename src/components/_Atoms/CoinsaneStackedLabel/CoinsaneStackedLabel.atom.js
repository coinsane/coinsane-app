import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Label, Input } from 'native-base';

import styles from './CoinsaneStackedLabel.styles';
import { colors } from 'src/styles';

class CoinsaneStackedLabel extends Component {
  render() {
    const {
      label,
      propName,
      clearTextOnFocus,
      autoFocus,
      keyboardType,
      returnKeyType,
      selectTextOnFocus,
      onChangeText,
      onBlur,
      value,
      placeholder,
    } = this.props;
    return (
      <Item stackedLabel style={styles.item}>
        <Label style={styles.label}>{label}</Label>
        <Input
          autoFocus={autoFocus}
          clearTextOnFocus={clearTextOnFocus}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onChangeText={v => onChangeText(propName, v)}
          onBlur={v => onBlur(propName, v)}
          value={value}
          selectTextOnFocus={selectTextOnFocus}
          style={styles.input}
          placeholderTextColor={colors.textGray}
          placeholder={placeholder}
        />
      </Item>
    );
  }
}

CoinsaneStackedLabel.propTypes = {
  label: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  clearTextOnFocus: PropTypes.bool,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  selectTextOnFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

CoinsaneStackedLabel.defaultProps = {
  keyboardType: 'numeric',
  returnKeyType: 'done',
  clearTextOnFocus: false,
  autoFocus: false,
  selectTextOnFocus: false,
  placeholder: null,
  onChangeText: () => {},
  onBlur: () => {},
};

export default CoinsaneStackedLabel;
