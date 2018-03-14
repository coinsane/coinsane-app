import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, View, Button, Text, Body, Left, Right, SwipeRow, Thumbnail } from 'native-base';
import ErrorMessages from '../../../constants/errors';

import styles from './CoinCard.styles';
import { colors, base, typography } from '../../styles';

const CoinCard = ({
  coin,
  addCoin,
  showCoin,
  removeCoin,
  symbol,
  activePortfolio
}) => {
  if (!coin) return (
    <ListItem style={styles.coinCard__errorItem}>
      <Text style={{ textAlign: base.textCenter }}>{ErrorMessages.coin404}</Text>
    </ListItem>
  );

  let fixed = symbol === 'BTC' ? 6 : 2;

  const coinCard = {
    icon: { uri: `https://www.cryptocompare.com${coin.market.imageUrl}` },
    symbol: coin.market.symbol,
    amount: coin.amount || 0,
    changePct: '0',
    price: 0,
    priceDisplay: '0',
    totalPrice: 0,
    totalPriceDisplay: '0'
  };


  if (coin.market.symbol === 'BTC' && symbol === 'BTC') {
    coinCard.price = 1.000000;
    coinCard.totalPrice = (coinCard.amount * coinCard.price).toFixed(fixed);
    coinCard.changePct = '0%';
  } else {
    coinCard.price = parseFloat(coin.market.prices[symbol].price).toFixed(fixed);
    coinCard.totalPrice = (coinCard.amount * coinCard.price).toFixed(fixed);
    coinCard.changePct = coin.market.prices && coin.market.prices[symbol] && coin.market.prices[symbol].changePctDay
      ? `${(coin.market.prices[symbol].changePctDay > 0 ? '+' : '')}${coin.market.prices[symbol].changePctDay.toFixed(2)}%`
      : '0%';
  }

  const priceSplit = coinCard.price.toString().split('.');
  coinCard.priceDisplay = priceSplit.length > 1
    ? `${priceSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${priceSplit[1].slice(0, fixed)} ${symbol}`
    : `${coinCard.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`;

  const changeColor = parseFloat(coinCard.changePct) > 0 ? colors.primaryGreen : colors.primaryPink;

  const totalPriceSplit = coinCard.totalPrice.toString().split('.');
  coinCard.totalPriceDisplay = totalPriceSplit.length > 1
    ? `${totalPriceSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${totalPriceSplit[1].slice(0, fixed)} ${symbol}`
    : `${coinCard.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`

  // const amountSplit = amount.toString().split('.');
  // const totalDisplay = amountSplit.length > 1
  //   ? `${amountSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${amountSplit[1].slice(0, fixed)} ${symbol}`
  //   : `${amount.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`

  // const icon = { uri: `https://www.cryptocompare.com${coin.market.imageUrl}` };
  // const coinSymbol = coin.market.symbol;
  // const amount = coin.amount || 0;
  // const price = coin.market.symbol === 'BTC' ? amount : parseFloat(coin.market.prices[symbol].price);

  // const priceSplit = price.toString().split('.');
  // const priceDisplay = priceSplit.length > 1
  //   ? `${priceSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${priceSplit[1].slice(0, fixed)} ${symbol}`
  //   : `${price.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`;

  // const changePctDay = coin.market.prices && coin.market.prices[symbol] && coin.market.prices[symbol].changePctDay ? `${(coin.market.prices[symbol].changePctDay > 0 ? '+' : '')}${coin.market.prices[symbol].changePctDay.toFixed(2)}` : 0;
  // const changeColor = changePctDay && changePctDay > 0 ? colors.primaryGreen : colors.primaryPink;

  // const totalAmount = symbol === 'BTC' ? amount : amount * price;
  // const totalAmountSplit = totalAmount.toString().split('.');
  // const totalAmountDisplay = totalAmountSplit.length > 1
  //   ? `${totalAmountSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${totalAmountSplit[1].slice(0, fixed)} ${symbol}`
  //   : `${totalAmount.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`
  // const totalAmountDisplay = `$${totalAmount.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

  return (
    <View style={styles.coinCard__container}>
      <ListItem
        style={styles.coinCard__listItem}
        button
        onPress={() => showCoin ? showCoin(coin) : ''}
      >
        <Body style={styles.coinCard__body}>
          <Thumbnail small square source={coinCard.icon} style={styles.coinCard__thumbnail} />
          <View>
            <Text style={styles.coinCard__textContainer}>
              <Text style={styles.coinCard__textSymbol}>{coinCard.symbol}</Text>  <Text style={styles.coinCard__textAmount}>{coinCard.amount}</Text>
            </Text>
            <Text style={styles.coinCard__subtext}>{coinCard.priceDisplay}</Text>
          </View>
        </Body>
        <Right style={styles.rightContainer}>
          <Text numberOfLines={1} style={styles.right__text}>{coinCard.totalPriceDisplay}</Text>
          <Text style={{ fontSize: typography.size14, color: changeColor, fontFamily: typography.fontRegular }}>{coinCard.changePct}</Text>
        </Right>
      </ListItem>
      {
        coin.last && !activePortfolio &&
        <View style={styles.coinCard__footer}>
          <Button
            small
            bordered
            full
            style={styles.coinCard__footerButton}
            onPress={() => addCoin(coin.last)}
          >
            <Text style={styles.coinCard__footerButtonText}>+ ADD NEW COIN</Text>
          </Button>
        </View>
      }
    </View>
  );
};

CoinCard.propTypes = {
  coin: PropTypes.shape({}),
  addCoin: PropTypes.func,
  showCoin: PropTypes.func,
  removeCoin: PropTypes.func,
  symbol: PropTypes.string,
  activePortfolio: PropTypes.string,
};

CoinCard.defaultProps = {
};

export default CoinCard;
