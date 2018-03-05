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
  activePortfolio
}) => {
  if (!coin) return (
    <ListItem style={styles.coinCard__errorItem}>
      <Text style={{ textAlign: base.textCenter }}>{ErrorMessages.coin404}</Text>
    </ListItem>
  );

  const icon = { uri: coin.imageUrl };
  const symbol = coin.symbol;
  const amount = coin.amount || 0;
  const price = coin.prices && coin.prices.USD && coin.prices.USD.price ? parseFloat(coin.prices.USD.price) : 0;
  const priceDisplay = `$${price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  const changePctDay = coin.prices && coin.prices.USD && coin.prices.USD.changePctDay ? `${(coin.prices.USD.changePctDay > 0 ? '+' : '')}${coin.prices.USD.changePctDay.toFixed(2)}` : 0;
  const changeColor = changePctDay && changePctDay > 0 ? colors.primaryGreen : colors.primaryPink;
  const totalAmount = coin.total.USD;
  const totalAmountDisplay = `$${totalAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

  return (
    <View style={styles.coinCard__container}>
      <ListItem
        style={styles.coinCard__listItem}
        button
        onPress={() => showCoin ? showCoin(coin) : ''}
      >
        <Body style={styles.coinCard__body}>
          <Thumbnail small square source={icon} style={styles.coinCard__thumbnail} />
          <View>
            <Text style={styles.coinCard__textContainer}>
              <Text style={styles.coinCard__text}>{symbol}</Text>  <Text style={styles.coinCard__text}>{amount}</Text>
            </Text>
            <Text style={styles.coinCard__subtext}>{priceDisplay}</Text>
          </View>
        </Body>
        <Right style={styles.rightContainer}>
          <Text style={styles.right__text}>{totalAmountDisplay}</Text>
          <Text style={{ fontSize: typography.size14, color: changeColor, fontFamily: typography.fontRegular }}>{changePctDay}%</Text>
        </Right>
      </ListItem>
      {
        coin.last && !activePortfolio &&
        <View style={base.footer}>
          <Button
            small
            bordered
            full
            style={base.footer__button}
            onPress={() => addCoin(coin.last)}
          >
            <Text style={base.footer__buttonText}>+ ADD NEW COIN</Text>
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
  activePortfolio: PropTypes.string,
};

CoinCard.defaultProps = {
};

export default CoinCard;
