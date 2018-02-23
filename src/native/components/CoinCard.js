import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, View, Button, Text, Body, Left, Right, SwipeRow, Thumbnail } from 'native-base';
import ErrorMessages from '../../constants/errors';

const CoinCard = ({
  coin,
  showCoin,
  removeCoin,
  activePortfolio
}) => {
  if (!coin) return (
    <ListItem style={{ backgroundColor: 'transparent', borderBottomWidth: 0, marginLeft: 0, paddingLeft: 15, marginBottom: 15 }}>
      <Text style={{ textAlign: 'center' }}>{ErrorMessages.coin404}</Text>
    </ListItem>
  );

  const icon = { uri: coin.imageUrl };
  const symbol = coin.symbol;
  const amount = coin.amount || 0;
  const price = coin.prices && coin.prices.USD && coin.prices.USD.price ? parseFloat(coin.prices.USD.price) : 0;
  const priceDisplay = `$${price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  const changePctDay = coin.prices && coin.prices.USD && coin.prices.USD.changePctDay ? `${(coin.prices.USD.changePctDay > 0 ? '+' : '')}${coin.prices.USD.changePctDay.toFixed(2)}` : 0;
  const changeColor = changePctDay && changePctDay > 0 ? '#31E981' : '#F61067';
  const totalAmount = coin.total.USD;
  const totalAmountDisplay = `$${totalAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

  return (
    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
      <ListItem
        style={{ backgroundColor: '#282239', borderBottomWidth: 0, borderRadius: 4, marginLeft: 0, paddingLeft: 15, marginBottom: 15 }}
        button
        onPress={() => showCoin ? showCoin(coin) : ''}
      >
        <Body style={{ flexDirection: 'row', flexWrap:'wrap' }}>
          <Thumbnail small square source={icon} style={{ marginTop: 4, marginRight: 10 }} />
          <View>
            <Text style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 14, color: '#8D8A96', fontFamily: 'Lato-Medium' }}>{symbol}</Text>  <Text style={{ fontSize: 14, fontFamily: 'Lato-Medium' }}>{amount}</Text>
            </Text>
            <Text style={{ fontSize: 14, color: '#8D8A96', fontFamily: 'Lato-Regular' }}>{priceDisplay}</Text>
          </View>
        </Body>
        <Right style={{ flex: 0.4 }}>
          <Text style={{ fontSize: 14, marginBottom: 6, fontFamily: 'Lato-Medium' }}>{totalAmountDisplay}</Text>
          <Text style={{ fontSize: 14, color: changeColor, fontFamily: 'Lato-Regular' }}>{changePctDay}%</Text>
        </Right>
      </ListItem>
      {
        coin.last && !activePortfolio &&
        <View style={{ paddingBottom: 15, borderColor: '#2F2A40', borderBottomWidth: 1 }}>
          <Button small bordered full
            style={{ borderColor: '#2F2A40', borderRadius: 5, paddingTop: 15, paddingBottom: 15, marginBottom: 15 }}
            onPress={() => addCoin(coin.last)}
          >
            <Text style={{ color: '#8D8A96', fontWeight: 'normal' }}>+ ADD NEW COIN</Text>
          </Button>
        </View>
      }
    </View>
  );
};

CoinCard.propTypes = {
  coin: PropTypes.shape({}),
  showCoin: PropTypes.func,
  removeCoin: PropTypes.func,
  activePortfolio: PropTypes.string,
};

CoinCard.defaultProps = {
};

export default CoinCard;
