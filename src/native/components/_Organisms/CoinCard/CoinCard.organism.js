import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, View, Button, Text, Body, Right, Thumbnail } from 'native-base';

import { nFormat } from '../../../../lib/utils';
import I18n from '../../../../i18n';
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

  const getCoinPrice = _market => parseFloat(_market.prices[symbol].price);
  const getPctChange = _market => _market.prices[symbol].changePctDay;

  const coinCard = {
    icon: { uri: `https://www.cryptocompare.com${market.imageUrl}` },
    symbol,
    amount: amount || 0,
    changePct: '0',
    price: 0,
    priceDisplay: '0',
    totalPrice: 0,
    totalPriceDisplay: '0',
  };


  if (type === 'portfolio') {
    coinCard.amount = amount || 0;
  }

  if (symbol === 'BTC') {
    coinCard.price = 1.000000;
    coinCard.changePct = '0%';
  } else {
    coinCard.price = getCoinPrice(market).toFixed(currency.decimal);
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

  return (
    (activePortfolio || !isCollapsed) && <View style={styles.coinCard__container}>
      <ListItem
        style={styles.coinCard__listItem}
        button
        onPress={() => showCoin(coinId)}
      >
        <Body style={styles.coinCard__body}>
          <Thumbnail small square source={coinCard.icon} style={styles.coinCard__thumbnail} />
          <View>
            <Text style={styles.coinCard__textContainer}>
              <Text style={styles.coinCard__textSymbol}>{coinCard.symbol} </Text>
              <Text style={styles.coinCard__textAmount}>{coinCard.amount}</Text>
            </Text>
            <Text style={[styles.coinCard__subtext, isLoading && typography.textPlaceholder]}>{coinCard.priceDisplay}</Text>
          </View>
        </Body>
        <Right style={styles.rightContainer}>
          <Text numberOfLines={1} style={[styles.right__text, isLoading && typography.textPlaceholder]}>{coinCard.totalPriceDisplay}</Text>
          <Text style={[{ fontSize: 14, color: changeColor, fontFamily: typography.fontRegular }, isLoading && typography.textPlaceholder]}>
            {coinCard.changePct}
          </Text>
        </Right>
      </ListItem>
      {
        portfolioId && !activePortfolio &&
        <View style={styles.coinCard__footer}>
          <Button
            small
            bordered
            full
            style={styles.coinCard__footerButton}
            onPress={() => addTransaction(portfolioId)}
          >
            <Text style={styles.coinCard__footerButtonText}>{I18n.t('buttons.addNewCoin')}</Text>
          </Button>
        </View>
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
