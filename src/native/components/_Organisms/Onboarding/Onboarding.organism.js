import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

import Config from '../../../../constants/config';
import styles from './Onboarding.styles';
import CoinCard from '../../_Organisms/CoinCard/CoinCard.organism';
import TransactionItem from '../../_Molecules/TransactionItem/TransactionItem.molecula';
import { colors } from '../../../styles/index';


class Onboarding extends Component {
  static propTypes = {
    currency: PropTypes.shape({}).isRequired,
    market: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      skip: true,
      start: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <Swiper
          index={0}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.dotActive} />}
          paginationStyle={styles.pagination}
          loop={false}
          showsButtons
          buttonWrapperStyle={styles.buttonWrapper}
          prevButton={<Text style={styles.buttonText}>PREV</Text>}
          nextButton={<Text style={styles.buttonText}>NEXT</Text>}
          onIndexChanged={(index) => {
            if (index === 2) {
              this.setState({ ...this.state, start: true });
            } else if (index === 0) {
              this.setState({ ...this.state, skip: true });
            } else {
              this.setState({ ...this.state, skip: false, start: false })
            }
          }}
        >
          <View style={styles.slide}>
            <View style={styles.slideImagesWrapper}>
              <View style={styles.slideImageWrapper__back}>
                <FastImage source={{ uri: `${Config.apiUri}/img/screen2.png` }} style={styles.slideImage__back} />
              </View>
              <FastImage source={{ uri: `${Config.apiUri}/img/screen1.png` }} style={styles.slideImage__front} />
            </View>
            <Text style={styles.slideText}>Add and edit portfolio manually or automatically. Switch over portfolios and see changes.</Text>
          </View>
          <View style={styles.slide}>
            <View style={styles.slideImagesWrapper}>
              <View style={styles.slideImageWrapper__back}>
                <FastImage source={{ uri: `${Config.apiUri}/img/screen4.png` }} style={styles.slideImage__back} />
              </View>
              <FastImage source={{ uri: `${Config.apiUri}/img/screen3.png` }} style={styles.slideImage__front} />
              <View style={styles.slideTransactionWrapper}>
                <TransactionItem
                  noSwipe
                  _id={'1'}
                  category={{ title: 'Investments' }}
                  amount={0.85411}
                  total={this.props.market.prices.USD.price * 0.85411}
                  pair={{ symbol: 'USD' }}
                  pairSymbol={'BTC'}
                  type={'buy'}
                  date={`${new Date().toISOString()}`}
                  delTransaction={() => {}}
                  backgroundColor={colors.onboardingCard}
                />
              </View>
            </View>
            <Text style={styles.slideText}>Chose coins, add transactions and track changes in portfolio and on the exchanges.</Text>
          </View>
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
            <Text style={styles.slideText}>Here some text about market and market filtering here some text about market </Text>
          </View>
        </Swiper>
        { this.state.skip && <Text style={styles.buttonSkip}>SKIP</Text> }
        { this.state.start && <Text style={styles.buttonStart}>START</Text> }
      </View>
    );
  }
}

export default Onboarding;
