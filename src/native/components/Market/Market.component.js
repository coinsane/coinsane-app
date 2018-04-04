import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Left, Button, Body, Title, Right, Container, Content, Text } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import Lead from '../Lead/Lead.component';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './Market.styles';
import { base, colors } from '../../styles';

const Market = ({ drawer }) => (
  <Container>
    <Header style={styles.market__header}>
      <StatusBar barStyle="light-content"/>
      <Left>
        <Button transparent onPress={() => drawer.open()}>
          <CoinsaneIcon name='Menu' width={28} fill={colors.white} />
        </Button>
      </Left>
      <Body>
        <Title>Markets</Title>
      </Body>
      <Right>
      </Right>
    </Header>
    <Content padder style={base.contentContainer}>
      <Text>Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>
    </Content>
  </Container>
);

Market.propTypes = {
  drawer: PropTypes.shape({}),
};

export default Market;
