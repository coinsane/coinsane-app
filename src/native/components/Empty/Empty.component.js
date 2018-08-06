import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { Button } from 'native-base';

import { base } from '../../styles';
import styles from './Empty.styles';

const EmptyState = ({ image, description, action, buttonLabel, imageWidth, imageHeight }) => (
  <View style={styles.container}>
    <Image style={{ width: imageWidth || 100, height: imageHeight || 100, marginBottom: 20 }} source={image} />
    <Text style={styles.container__text}>{description}</Text>
    { action &&
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
};

EmptyState.defaultProps = {
  action: null,
  image: null,
};

export default EmptyState;
