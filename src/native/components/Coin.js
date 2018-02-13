import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Left, Button, Title, Right } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import Icon from './Icon';
import CoinCard from './CoinCard';
import { Actions } from 'react-native-router-flux';

const CoinView = ({
  error,
  portfolios,
  coinId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Coin from all portfolios
  let coin = null;
  if (coinId && portfolios) {
    for (let i = 0; i < portfolios.length; i++) {
      const portfolio = portfolios[i];
      coin = portfolio.coins.find(item => item.id === coinId);
      if (coin) break;
    }
  }

  // Coin not found
  if (!coin) return <Error content={ErrorMessages.coin404} />;

  return (
    <Container>
      <Header style={{ backgroundColor: '#1B152D', borderBottomWidth: 0 }}>
        <StatusBar barStyle="light-content"/>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name='Back' width={28} fill={'#fff'} />
          </Button>
        </Left>
        <Body>
          <Title>{coin.name}</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content padder style={{ backgroundColor: '#1B152D' }}>
        <Spacer size={25} />
        <CoinCard
          key={coin.id}
          coin={coin}
        ></CoinCard>
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

CoinView.propTypes = {
  error: PropTypes.string,
  coinId: PropTypes.string.isRequired,
  portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

CoinView.defaultProps = {
  error: null,
};

export default CoinView;
