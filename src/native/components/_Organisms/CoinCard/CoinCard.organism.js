import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem, View, Text, Body, Left, Right, Button } from 'native-base';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';

import I18n from '../../../../i18n';
import { nFormat, cFormat, round } from '../../../../lib/utils';
import styles from './CoinCard.styles';
import SwipeRow from '../../_Molecules/SwipeRow/SwipeRow.molecula';
import { base, colors, typography } from '../../../styles/index';

class CoinCard extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['portfolio', 'market']).isRequired,
    id: PropTypes.string,
    market: PropTypes.shape({}).isRequired,
    amount: PropTypes.number,
    order: PropTypes.number,
    addCoin: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
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
    isLast: PropTypes.bool,
  };

  static defaultProps = {
    id: null,
    amount: null,
    activePortfolio: 'all',
    isCollapsed: false,
    isLoading: false,
    portfolioId: null,
    isLast: false,
    order: 0,
  };

  render() {
    const {
      type,
      id,
      order,
      amount,
      market,
      addCoin,
      showCoin,
      currency,
      activePortfolio,
      isCollapsed,
      isLoading,
      portfolioId,
      isLast,
    } = this.props;

    const symbol = currency.code;
    const decimal = currency.decimal > 6 ? 6 : currency.decimal;

    const getPctChange = _market => get(_market, `prices[${symbol}].changePctDay`, 0);
    const getCoinPrice = _market => parseFloat(get(_market, `prices[${symbol}].price`, 0));
    const getMarketCap = _market => nFormat(get(_market, `prices[${symbol}].marketCap`, 0), 2, 1);
    const getVolume24h = _market => nFormat(get(_market, `prices[${symbol}].totalVolume24HTo`, 0), 2, 1);

    const textPlaceholder = isLoading && typography.textPlaceholder;


    const coinCard = {
      icon: { uri: `https://www.cryptocompare.com${market.imageUrl}` },
      order,
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
      coinCard.amount = round(amount, 13) || 0;
    }

    if (symbol === market.symbol) {
      coinCard.price = 1;
      coinCard.changePct = '0%';
      coinCard.marketCap = getMarketCap(market);
      coinCard.volume24h = getVolume24h(market);
    } else {
      coinCard.price = getCoinPrice(market);
      coinCard.marketCap = getMarketCap(market);
      coinCard.volume24h = getVolume24h(market);
      coinCard.changePct = getPctChange(market) ? `${(getPctChange(market) > 0 ? '+' : '')}${getPctChange(market).toFixed(2)}%` : '0%';
    }

    const changeColor = parseFloat(coinCard.changePct) < 0 ? colors.primaryPink : colors.primaryGreen;

    coinCard.totalPrice = (coinCard.amount * coinCard.price).toFixed(decimal);
    coinCard.priceDisplay = cFormat(nFormat(coinCard.price, currency.decimal), currency.symbol);
    coinCard.totalPriceDisplay = cFormat(nFormat(coinCard.totalPrice, decimal), currency.symbol);

    const buttons = [
      {
        icon: 'Close',
        color: colors.primaryPink,
        onPress: () => this.props.removeCoin({ id, portfolioId }),
      },
    ];

    const ButtonPortfolio = () => (
      isLast && !activePortfolio &&
      <View style={base.list__buttonContainer}>
        <Button
          small
          bordered
          full
          style={base.list__button}
          onPress={() => addCoin(portfolioId)}
        >
          <Text style={base.list__buttonText}>{I18n.t('coins.addButton')}</Text>
        </Button>
      </View>
    );

    const PortfolioCard = () => {
      if (isCollapsed && !activePortfolio) return null;
      if (!coinCard.amount) return <ButtonPortfolio />;
      return (
        <View>
          <View style={styles.portfolio__container}>
            <SwipeRow
              buttons={buttons}
              backgroundColor={colors.bgGray}
              itemBackground={colors.btnBgBlack}
              height={64}
              right={25}
            >
              <ListItem
                button
                style={styles.portfolio__item}
                onPress={() => showCoin({ market, id })}
              >
                <FastImage source={coinCard.icon} style={styles.portfolio__thumbnail} />
                <View style={styles.portfolio__body}>
                  <View style={styles.portfolio__row}>
                    <Text
                      numberOfLines={1}
                      style={[styles.portfolio__row_text, styles.portfolio__row_textLeft]}
                    >
                      <Text style={styles.portfolio__textSymbol}>{coinCard.symbol}&nbsp;</Text>
                      <Text style={styles.portfolio__textAmount}>{coinCard.amount}</Text>
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.portfolio__row_text,
                        styles.portfolio__row_textRight,
                        textPlaceholder,
                      ]}
                    >
                      {coinCard.totalPriceDisplay}
                    </Text>
                  </View>
                  <View style={styles.portfolio__row}>
                    <Text style={[styles.portfolio__textFooter, textPlaceholder]}>
                      {coinCard.priceDisplay}
                    </Text>
                    <Text style={[styles.portfolio__textFooter, { color: changeColor }, textPlaceholder]}>
                      {coinCard.changePct}
                    </Text>
                  </View>
                </View>
              </ListItem>
            </SwipeRow>
          </View>
          <ButtonPortfolio />
        </View>
      );
    };

    const MarketCard = () => (
      <View style={styles.market__container}>
        <ListItem
          button
          style={styles.market_item}
          onPress={() => showCoin({ market, id })}
        >
          <Text style={styles.market_order}>{coinCard.order}</Text>
          <Left style={styles.market__left}>
            <FastImage source={coinCard.icon} style={styles.market__thumbnail} />
            <View style={styles.market__title}>
              <Text
                numberOfLines={1}
                style={styles.market__text}
              >
                {coinCard.symbol}
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.market__text_footer,
                  textPlaceholder,
                ]}
              >
                {coinCard.name}
              </Text>
            </View>
          </Left>
          <Body style={styles.market__body}>
            <Text
              numberOfLines={1}
              style={[
                styles.market__text,
                textPlaceholder,
              ]}
            >
              {coinCard.marketCap}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.market__text_footer,
                textPlaceholder,
              ]}
            >
              {coinCard.volume24h}
            </Text>
          </Body>
          <Right style={styles.market__right}>
            <Text
              style={[
                styles.market__text,
                textPlaceholder,
              ]}
            >
              {coinCard.priceDisplay}
            </Text>
            <Text
              style={[
                styles.market__text_footer,
                { color: changeColor },
                textPlaceholder,
              ]}
            >
              {coinCard.changePct}
            </Text>
          </Right>
        </ListItem>
      </View>
    );

    return type === 'portfolio' ? <PortfolioCard /> : <MarketCard />;
  }
}

export default CoinCard;
