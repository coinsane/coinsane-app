import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Text, View } from 'native-base';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import get from 'lodash/get';

import I18n from '../../../../i18n';
import Config from '../../../../constants/config';
import styles from './Onboarding.styles';
import CoinCard from '../../_Organisms/CoinCard/CoinCard.organism';
import TransactionItem from '../../_Molecules/TransactionItem/TransactionItem.molecula';
import { colors } from '../../../styles/index';


class Onboarding extends Component {
  static propTypes = {
    currency: PropTypes.shape({}).isRequired,
    market: PropTypes.shape({}).isRequired,
    hideOnboarding: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      skip: true,
      start: false,
    };
    this.onIndexChanged = this.onIndexChanged.bind(this);
  }

  onIndexChanged(index) {
    const state = { ...this.state, skip: false, start: false };
    if (index === 0) state.skip = true;
    if (index === 2) state.start = true;
    this.setState(state);
  }

  render() {
    const SlideOne = () => (
      <View style={styles.slide}>
        <View style={styles.slideImagesWrapper}>
          <View style={styles.slideImageWrapper__back}>
            <FastImage source={{ uri: `${Config.apiUri}/img/screen2.png` }} style={styles.slideImage__back} />
          </View>
          <FastImage source={{ uri: `${Config.apiUri}/img/screen1.png` }} style={styles.slideImage__front} />
        </View>
        <Text style={styles.slideText}>{I18n.t('onboarding.oneText')}</Text>
      </View>
    );

    const SlideTwo = ({ price, amount, symbol, category, pair }) => (
      <View style={styles.slide}>
        <View style={styles.slideImagesWrapper}>
          <View style={styles.slideImageWrapper__back}>
            <FastImage source={{ uri: `${Config.apiUri}/img/screen4.png` }} style={styles.slideImage__back} />
          </View>
          <FastImage source={{ uri: `${Config.apiUri}/img/screen3.png` }} style={styles.slideImage__front} />
          <View style={styles.slideTransactionWrapper}>
            <TransactionItem
              noSwipe
              _id="0"
              category={{ title: category }}
              amount={amount}
              total={price * amount}
              pair={{ symbol }}
              pairSymbol={pair}
              type="buy"
              date={`${new Date().toISOString()}`}
              delTransaction={() => {}}
              backgroundColor={colors.onboardingCard}
            />
          </View>
        </View>
        <Text style={styles.slideText}>{I18n.t('onboarding.twoText')}</Text>
      </View>
    );

    const SlideThree = () => (
      <View style={styles.slide}>
        <View style={styles.slideImagesWrapper}>
          <View style={styles.slideImageWrapper__back}>
            <FastImage source={{ uri: `${Config.apiUri}/img/screen6.png` }} style={styles.slideImage__back} />
          </View>
          <FastImage source={{ uri: `${Config.apiUri}/img/screen5.png` }} style={styles.slideImage__front} />
          <View style={styles.slideMarketWrapper}>
            <CoinCard
              type="market"
              order={1}
              market={this.props.market}
              currency={this.props.currency}
              showCoin={() => {}}
              addCoin={() => {}}
              removeCoin={() => {}}
            />
          </View>
        </View>
        <Text style={styles.slideText}>{I18n.t('onboarding.threeText')}</Text>
      </View>
    );

    const NavButton = ({ show, title }) => {
      const style = this.state.skip ? styles.buttonSkip : styles.buttonStart;
      return show &&
        <TouchableHighlight onPress={this.props.hideOnboarding}>
          <Text style={style}>{title}</Text>
        </TouchableHighlight>;
    };

    const price = get(this.props.market, 'prices.USD.price', 0);

    return (
      <View style={styles.slider}>
        <Swiper
          index={0}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.dotActive} />}
          paginationStyle={styles.pagination}
          loop={false}
          showsButtons
          buttonWrapperStyle={styles.buttonWrapper}
          prevButton={<Text style={styles.buttonText}>{I18n.t('onboarding.prev')}</Text>}
          nextButton={<Text style={styles.buttonText}>{I18n.t('onboarding.next')}</Text>}
          onIndexChanged={this.onIndexChanged}
        >
          <SlideOne />
          <SlideTwo
            price={price}
            amount={0.85411}
            symbol="USD"
            pair="BTC"
            category={I18n.t('onboarding.category')}
          />
          <SlideThree />
        </Swiper>
        <NavButton show={this.state.skip} title={I18n.t('onboarding.skip')} />
        <NavButton show={this.state.start} title={I18n.t('onboarding.start')} />
      </View>
    );
  }
}

export default Onboarding;
