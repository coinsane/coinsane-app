import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Left, Button, Title, Right } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import Icon from './Icon';
import CoinCard from './CoinCard';
import { Actions } from 'react-native-router-flux';

import { AreaChart, YAxis } from 'react-native-svg-charts'
import { LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'

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

  const data = [ 50, 10, 40, 95, 5, 85, 91, 35, 53, 4, 24, 50 ];
  const contentInset = { top: 20, bottom: 20 };

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
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
              dataPoints={data}
              contentInset={contentInset}
              labelStyle={{ color: '#8D8A96' }}
              formatLabel={value => `${value}`}
          />
          <AreaChart
            style={ { flex: 1, marginLeft: 20 } }
            dataPoints={ data }
            svg={{
              stroke: '#31E981',
            }}
            contentInset={contentInset}
            curve={shape.curveLinear}
            renderGradient={({ id }) => (
              <LinearGradient id={id} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={'#31E981'} stopOpacity={0.2}/>
                <Stop offset={'100%'} stopColor={'#31E981'} stopOpacity={0}/>
              </LinearGradient>
            )}
          />
        </View>
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
