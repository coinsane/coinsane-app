import React from 'react';
import PropTypes from 'prop-types';
import { Item, Label, Input } from 'native-base';
import { base, colors, typography } from '../../../styles';

const CoinsaneStackedLabel = ({
  label,
  propName,
  clearTextOnFocus,
  keyboardType,
  onChangeText,
  onBlur,
  value,
}) => (
  <Item stackedLabel style={base.listItem__labelInputContainer}>
    <Label style={[base.listItem__labelText, typography.smallest, { color: colors.textGray }]}>
      {label}
    </Label>
    <Input
      clearTextOnFocus={clearTextOnFocus}
      keyboardType={keyboardType}
      onChangeText={v => onChangeText(propName, v)}
      onBlur={() => onBlur(propName)}
      value={value}
      style={base.listItem__labelInput}
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
};

CoinsaneStackedLabel.defaultProps = {
  keyboardType: 'numeric',
  clearTextOnFocus: false,
};

export default CoinsaneStackedLabel;
