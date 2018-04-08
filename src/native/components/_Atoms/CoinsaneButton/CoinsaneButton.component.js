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
  let buttonStyle = [];
  let textStyle = [];

  switch (type) {
    case 'currency': {
      textStyle = [styles.currency__buttonText, active && styles.currency__buttonTextActive];
      break;
    }
    case 'period': {
      buttonStyle = [styles.period__button, active && styles.period__buttonActive];
      textStyle = [styles.period__buttonText, active && styles.period__buttonTextActive];
      break;
    }
    default:
  }

  return (
    <Button
      small
      transparent
      onPress={onPress}
      style={buttonStyle}
    >
      <Text style={textStyle}>{displayValue}</Text>
    </Button>
  )
};

export default CoinsaneButton;
