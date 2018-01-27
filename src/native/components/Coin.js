import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

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
      coin = portfolio.data.find(item => item.id === coinId);
      if (coin) break;
    }
  }

  // Coin not found
  if (!coin) return <Error content={ErrorMessages.coin404} />;

  return (
    <Container>
      <Content padder>

        <Spacer size={25} />
        <H3>{coin.name}</H3>
        <Text>{coin.symbol}</Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this coin</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>percent_change_7d: {coin.percent_change_7d}</Text>
              <Text>percent_change_24h: {coin.percent_change_24h}</Text>
              <Text>percent_change_1h: {coin.percent_change_1h}</Text>
              <Text>price_btc: {coin.price_btc}</Text>
              <Text>price_usd: {coin.price_usd}</Text>
            </Body>
          </CardItem>
        </Card>

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
