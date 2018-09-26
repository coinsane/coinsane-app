import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, H3 } from 'native-base';

import { base } from 'src/styles';

const Error = ({ title, content }) => (
  <Container>
    <Content style={base.contentContainer}>
      <H3>{title}</H3>
      <Text>{content}</Text>
    </Content>
  </Container>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'Uh oh',
  content: 'An unexpected error came up',
};

export default Error;