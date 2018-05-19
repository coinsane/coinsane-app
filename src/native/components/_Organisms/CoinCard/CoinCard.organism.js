import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, View, Text, Body, Left, Right, Thumbnail } from 'native-base';

import { nFormat } from '../../../../lib/utils';
import styles from './CoinCard.styles';
import { colors, typography } from '../../../styles/index';

const CoinCard = ({
  type,
  coinId,
  amount,
  market,
  addTransaction,
  showCoin,
  currency,
  activePortfolio,
  isCollapsed,
  isLoading,
  portfolioId,
}) => {
  const symbol = currency.code;

  const getCoinPrice = (_market) => {
    return _market.prices ? parseFloat(_market.prices[symbol].price) : 0;
  };
  const getPctChange = (_market) => {
    return _market.prices ? _market.prices[symbol].changePctDay : 0;
  };
  const getMarketCap = (_market) => {
    return _market.prices ? nFormat(_market.prices[symbol].marketCap, 2) : 0;
  };
  const getVolume24h = (_market) => {
    return _market.prices ? nFormat(_market.prices[symbol].totalVolume24HTo, 2) : 0;
  };

  const coinCard = {
    icon: { uri: `https://www.cryptocompare.com${market.imageUrl}` },
    order: market.order,
    symbol: market.symbol,
    name: market.name,
    amount: amount || 0,
    changePct: '0',
    price: 0,
    marketCap: 0,
    volume24h: 0,
    priceDisplay: '0',
    totalPrice: 0,
    totalPriceDisplay: '0',
  };


  if (type === 'portfolio') {
    coinCard.amount = amount || 0;
  }

  if (symbol === 'BTC' && market.symbol === 'BTC') {
    coinCard.price = 1.000000;
    coinCard.changePct = '0%';
  } else {
    coinCard.price = getCoinPrice(market).toFixed(currency.decimal);
    coinCard.marketCap = getMarketCap(market);
    coinCard.volume24h = getVolume24h(market);
    coinCard.changePct = getPctChange(market) ? `${(getPctChange(market) > 0 ? '+' : '')}${getPctChange(market).toFixed(2)}%` : '0%';
  }

  coinCard.totalPrice = (coinCard.amount * coinCard.price).toFixed(currency.decimal);

  const priceSplit = coinCard.price.toString().split('.');
  coinCard.priceDisplay = priceSplit.length > 1
    ? `${priceSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${priceSplit[1].slice(0, currency.decimal)} ${symbol}`
    : `${coinCard.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`;

  const changeColor = parseFloat(coinCard.changePct) > 0 ? colors.primaryGreen : colors.primaryPink;

  const totalPriceSplit = coinCard.totalPrice.toString().split('.');
  coinCard.totalPriceDisplay = totalPriceSplit.length > 1
    ? `${nFormat(coinCard.totalPrice, currency.decimal)} ${symbol}`
    : `${coinCard.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}`;


  const portfolioCard = () => (
    (activePortfolio || !isCollapsed) &&
    <ListItem
      style={styles.coinCard__listItem_portfolio}
      button
      onPress={() => showCoin(coinId)}
    >
      <Body style={styles.coinCard__body_portfolio}>
        <Thumbnail
          small
          square
          source={coinCard.icon}
          style={[styles.coinCard__thumbnail, styles.coinCard__thumbnail_portfolio]}
        />
        <View>
          <Text style={styles.coinCard__text}>
            <Text style={styles.coinCard__textSymbol}>{coinCard.symbol} </Text>
            <Text style={styles.coinCard__textAmount}>{coinCard.amount}</Text>
          </Text>
          <Text
            style={[
              styles.coinCard__subtext,
              isLoading && typography.textPlaceholder,
            ]}
          >
            {coinCard.priceDisplay}
          </Text>
        </View>
      </Body>
      <Right style={styles.coinCard__right_portfolio}>
        <Text
          numberOfLines={1}
          style={[
            styles.right__text,
            isLoading && typography.textPlaceholder
          ]}
        >
          {coinCard.totalPriceDisplay}
        </Text>
        <Text
          style={[
            { fontSize: 14, color: changeColor, fontFamily: typography.fontRegular },
            isLoading && typography.textPlaceholder
          ]}
        >
          {coinCard.changePct}
        </Text>
      </Right>
    </ListItem>
  );

  const marketCard = () => (
    <ListItem
      button
      style={styles.coinCard__listItem_market}
      onPress={() => showCoin(coinId)}
    >
      <Text style={styles.coinCard_order}>{coinCard.order}</Text>
      <Left style={styles.coinCard__left}>
        <Thumbnail
          square
          source={coinCard.icon}
          style={[styles.coinCard__thumbnail, styles.coinCard__thumbnail_market]}
        />
        <View style={styles.coinCard__title}>
          <Text
            numberOfLines={1}
            style={styles.coinCard__text}
          >
            {coinCard.symbol}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              styles.coinCard__subtext,
              isLoading && typography.textPlaceholder,
            ]}
          >
            {coinCard.name}
          </Text>
        </View>
      </Left>
      <Body style={styles.coinCard__body}>
        <Text
          numberOfLines={1}
          style={[
            styles.coinCard__text,
            isLoading && typography.textPlaceholder,
          ]}
        >
          {coinCard.marketCap}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.coinCard__subtext,
            isLoading && typography.textPlaceholder,
          ]}
        >
          {coinCard.volume24h}
        </Text>
      </Body>
      <Right style={styles.coinCard__right}>
        <Text
          numberOfLines={1}
          style={[
            styles.coinCard__text,
            isLoading && typography.textPlaceholder,
          ]}
        >
          {coinCard.priceDisplay}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.coinCard__subtext,
            { color: changeColor },
            isLoading && typography.textPlaceholder,
          ]}
        >
          {coinCard.changePct}
        </Text>
      </Right>
    </ListItem>
  );

  return (
    <View style={styles.coinCard__container}>
      {
        type === 'portfolio' ?
          portfolioCard() :
          marketCard()
      }
    </View>
  );
};

CoinCard.propTypes = {
  type: PropTypes.oneOf(['portfolio', 'market']).isRequired,
  coinId: PropTypes.string,
  market: PropTypes.shape({}).isRequired,
  amount: PropTypes.number,
  addTransaction: PropTypes.func.isRequired,
  showCoin: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.oneOf(['market', 'currency']),
    system: PropTypes.bool,
    imageUrl: PropTypes.string,
    symbol: PropTypes.string,
    code: PropTypes.string,
    decimal: PropTypes.number,
  }).isRequired,
  activePortfolio: PropTypes.string,
  isCollapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
  portfolioId: PropTypes.string,
};

CoinCard.defaultProps = {
  coinId: null,
  amount: null,
  activePortfolio: 'all',
  isCollapsed: false,
  isLoading: false,
  portfolioId: null,
};

export default CoinCard;
