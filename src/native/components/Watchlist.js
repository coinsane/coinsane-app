import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Left, Button, Body, Title, Right, Container, Content, Text } from 'native-base';
import Spacer from './Spacer';
import Lead from './Lead';
import Icon from './Icon';

const Watchlist = ({ drawer}) => (
  <Container>
    <Header style={{ borderBottomWidth: 0 }}>
      <StatusBar barStyle="light-content"/>
      <Left>
        <Button transparent onPress={() => drawer.open()}>
          <Icon name='Menu' width={28} fill={'#fff'} />
        </Button>
      </Left>
      <Body>
        <Title>Watchlist</Title>
      </Body>
      <Right>
      </Right>
    </Header>
    <Content padder style={{ backgroundColor: '#1B152D' }}>
      <Text>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>
    </Content>
  </Container>
);

Watchlist.propTypes = {
  drawer: PropTypes.shape({}),
};

export default Watchlist;
