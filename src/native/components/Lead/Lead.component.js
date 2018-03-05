import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, H1 } from 'native-base';
import Spacer from '../Spacer/Spacer.component';

const Lead = ({ title, content }) => (
  <View>
    <H1>{title}</H1>
    {!!content &&
      <View>
        <Spacer size={10} />
        <Text>{content}</Text>
      </View>
    }
    <Spacer size={25} />
  </View>
);

Lead.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Lead.defaultProps = {
  title: 'Missing title',
  content: '',
};

export default Lead;
