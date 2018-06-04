import React from 'react';
import PropTypes from 'prop-types';
import { Item, Label, Input } from 'native-base';
import { base, colors } from '../../../styles';

const CoinsaneStackedLabel = ({
  label,
  propName,
  clearTextOnFocus,
  autoFocus,
  keyboardType,
  onChangeText,
  onBlur,
  value,
  placeholder,
}) => (
  <Item stackedLabel style={base.listItem__labelInputContainer}>
    <Label style={base.listItem__labelText}>
      {label}
    </Label>
    <Input
      autoFocus={autoFocus}
      clearTextOnFocus={clearTextOnFocus}
      keyboardType={keyboardType}
      onChangeText={v => onChangeText(propName, v)}
      onBlur={() => onBlur(propName)}
      value={value}
      style={base.listItem__labelInput}
      placeholderTextColor={colors.textGray}
      placeholder={placeholder}
    />
  </Item>
);

CoinsaneStackedLabel.propTypes = {
  label: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  clearTextOnFocus: PropTypes.bool,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

CoinsaneStackedLabel.defaultProps = {
  keyboardType: 'numeric',
  clearTextOnFocus: false,
  autoFocus: false,
  placeholder: null,
};

export default CoinsaneStackedLabel;
