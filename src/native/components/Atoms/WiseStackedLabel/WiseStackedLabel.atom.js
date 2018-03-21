import React from 'react';
import { Item, Label, Input } from 'native-base';
import { base, colors, typography } from '../../../styles';


const WiseStackedLabel = ({
  type,
  sublabel,
  propName,
  clearTextOnFocus,
  keyboardType,
  onChangeText,
  onBlur,
  value 
}) => (
    <Item stackedLabel style={base.listItem__labelInputContainer}>
      <Label style={[base.listItem__labelText, typography.smallest, { color: colors.textGray }]}>{ sublabel }</Label>
      <Input
        clearTextOnFocus={clearTextOnFocus}
        keyboardType={keyboardType}
        onChangeText={v => onChangeText(propName, v)}
        onBlur={e => onBlur(propName, e.target.value)}
        value={value}
        style={base.listItem__labelInput}
      />
    </Item>
);

export default WiseStackedLabel;