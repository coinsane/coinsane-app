import React from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';
import styles from './Error.styles';

const ErrorModal = () => (
  <Modal hideClose>
    <View flex={1} style={styles.errorContainer}>
      <Text>Error Modal</Text>
      <Text>Slides up from the bottom, and covers the entire screen with no transparency</Text>
      <Button title="Close" onPress={Actions.pop} />
    </View>
  </Modal>
);


export default ErrorModal;
