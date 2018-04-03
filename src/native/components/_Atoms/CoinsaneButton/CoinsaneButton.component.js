import React from 'react';
import { Button, Text } from 'native-base';
import styles from './CoinsaneButton.styles';

const CoinsaneButton = ({
  value,
  type,
  active,
  uppercase,
  onPress
}) => {
  const displayValue = uppercase ? value.toUpperCase() : value;
  let textStyle = [styles.total__buttonText, active && styles.total__buttonTextActive]
  console.log('displayValue', displayValue)

  return (
    <Button
      small
      transparent
      onPress={onPress}
    >
      <Text style={textStyle}>{displayValue}</Text>
    </Button>
  )
};

export default CoinsaneButton;
