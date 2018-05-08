import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, View, Button, Text, Body, Right, Thumbnail } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import { nFormat } from '../../../lib/utils';

import styles from './CoinCard.styles';
import { colors, base, typography } from '../../styles';

const CoinCard = ({
  coin,
  addTransaction,
  showCoin,
  symbol,
  activePortfolio,
  isCollapsed,
  isLoading,
}) => {
  if (!coin) {
    return (
      <ListItem style={styles.coinCard__errorItem}>
        <Text style={{ textAlign: base.textCenter }}>{ErrorMessages.coin404}</Text>
      </ListItem>
    );
  }

  const fixed = symbol === 'BTC' ? 6 : 2;

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
    ? `${nFormat(coinCard.totalPrice, fixed)} ${symbol}`
    : `${coinCard.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`;

  if (isLoading) {
    coinCard.priceDisplay = '';
    coinCard.totalPriceDisplay = '';
    coinCard.changePct = '';
  }

  return (
    (activePortfolio || !isCollapsed) && <View style={styles.coinCard__container}>
      <ListItem
        style={styles.coinCard__listItem}
        button
        onPress={() => showCoin(coin)}
      >
        <Body style={styles.coinCard__body}>
          <Thumbnail small square source={coinCard.icon} style={styles.coinCard__thumbnail} />
          <View>
            <Text style={styles.coinCard__textContainer}>
              <Text style={styles.coinCard__textSymbol}>{coinCard.symbol} </Text>
              <Text style={styles.coinCard__textAmount}>{coinCard.amount}</Text>
            </Text>
            <Text style={styles.coinCard__subtext}>{coinCard.priceDisplay}</Text>
          </View>
        </Body>
        <Right style={styles.rightContainer}>
          <Text numberOfLines={1} style={styles.right__text}>{coinCard.totalPriceDisplay}</Text>
          <Text style={{ fontSize: 14, color: changeColor, fontFamily: typography.fontRegular }}>
            {coinCard.changePct}
          </Text>
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
            onPress={() => addTransaction(coin.last)}
          >
            <Text style={styles.coinCard__footerButtonText}>+ ADD NEW COIN</Text>
          </Button>
        </View>
      }
    </View>
  );
};

CoinCard.propTypes = {
  coin: PropTypes.shape({}).isRequired,
  addTransaction: PropTypes.func.isRequired,
  showCoin: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  activePortfolio: PropTypes.string,
  isCollapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
};

CoinCard.defaultProps = {
  activePortfolio: 'all',
  isCollapsed: false,
  isLoading: false,
};

export default CoinCard;
