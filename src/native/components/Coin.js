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
      coin = portfolio.coins.find(item => item.id === coinId);
      if (coin) break;
    }
  }

  // Coin not found
  if (!coin) return <Error content={ErrorMessages.coin404} />;

  return (
    <Container>
      <Content padder style={{ backgroundColor: '#232033' }}>
        <Spacer size={25} />
        <H3>{coin.title}</H3>
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
