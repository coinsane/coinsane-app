import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Title } from 'native-base';
import Header from 'src/native/components/_Organisms/Header';

import { base } from '../../styles';

const Watchlist = ({ drawer }) => (
  <Container>
    <Header
      leftIcon="Menu"
      leftAction={() => drawer.open()}
      title={<Title style={base.title}>Watchlist</Title>}
    />
    <Content padder style={base.contentContainer}>
      <Text>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>
    </Content>
  </Container>
);

Watchlist.propTypes = {
  drawer: PropTypes.shape({}).isRequired,
};

export default Watchlist;
