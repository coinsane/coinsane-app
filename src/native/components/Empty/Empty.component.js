import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import FastImage from 'react-native-fast-image';

import { base } from '../../styles';
import styles from './Empty.styles';

const EmptyState = ({ image, description, action, buttonLabel, imageWidth, imageHeight }) => (
  <View style={styles.container}>
    {
      image &&
      <FastImage
        source={{ uri: image }}
        style={[styles.image, { width: imageWidth, height: imageHeight }]}
      />
    }
    <Text style={styles.container__text}>{description}</Text>
    {
      action &&
      buttonLabel &&
      <Button
        small
        bordered
        full
        style={[base.list__button, {
          marginTop: 30,
          height: 50,
        }]}
        onPress={() => action()}
      >
        <Text style={base.list__buttonText}>{buttonLabel}</Text>
      </Button>
    }
  </View>
);

EmptyState.propTypes = {
  description: PropTypes.string.isRequired,
  action: PropTypes.func,
  image: PropTypes.string,
  buttonLabel: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
};

EmptyState.defaultProps = {
  action: null,
  image: null,
  buttonLabel: null,
  imageWidth: 100,
  imageHeight: 100,
};

export default EmptyState;
