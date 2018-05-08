import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';

import { base } from '../../styles';

const Watchlist = ({ drawer }) => (
  <Container>
    <CoinsaneHeader
      leftIcon="Menu"
      leftAction={() => drawer.open()}
      title={<Text>Watchlist</Text>}
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
