import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import FastImage from 'react-native-fast-image';

import { base } from 'src/native/styles';

import styles from './Empty.styles';

interface IProps {
  description: string;
  action?: () => void;
  image?: string;
  buttonLabel?: string;
  imageWidth?: number;
  imageHeight?: number;
}

class Empty extends React.PureComponent<IProps> {
  render () {
    const {
      image,
      description,
      action,
      buttonLabel,
      imageWidth = 100,
      imageHeight = 100,
    } = this.props;
    return (
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
  }
}

export default Empty;
