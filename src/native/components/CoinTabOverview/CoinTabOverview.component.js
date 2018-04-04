import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Left, Button, Title, Right, Tabs, Tab, TabHeading } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import Config from '../../../constants/config';
import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';
import CoinCard from '../CoinCard/CoinCard.component';
import { Actions } from 'react-native-router-flux';

import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import Chart from '../_Organisms/Chart/Chart.component';

import { AreaChart, YAxis } from 'react-native-svg-charts';
import { LinearGradient, Stop, G, Line } from 'react-native-svg';
import * as shape from 'd3-shape';

import styles from './CoinTabOverview.styles';
import { colors, base } from '../../styles';

class CoinTabOverview extends Component {
  static propTypes = {
    error: PropTypes.string,
    coinId: PropTypes.string.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    coinData: PropTypes.arrayOf(PropTypes.number),
    getCoinHisto: PropTypes.func,
    currency: PropTypes.string,
    currencies: PropTypes.arrayOf(PropTypes.string),
    updateCurrency: PropTypes.func,
  }

  static defaultProps = {
    error: null,
  }

  componentDidMount() {
    const {
      portfolios,
      coinId,
    } = this.props;

    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i++) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item._id === coinId);
        if (coin) break;
      }
    }
  }

  render () {
    const {
      error,
      portfolios,
      coinId,
      coinData,
      getCoinHisto,
      currency,
      currencies,
      updateCurrency,
    } = this.props;
    // Error
    if (error) return <Error content={error} />;

    // Get this Coin from all portfolios
    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i++) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item._id === coinId);
        if (coin) break;
      }
    }

    // Coin not found
    if (!coin) return <Error content={ErrorMessages.coin404} />;

    const contentInset = { top: 20, bottom: 20 };

    console.log('coin', coin)

    return (
      <Content style={base.contentContainer}>
        <CoinsaneSummary
          value={coin.amount * coin.market.prices[currency].price}
          currency={currency}
          buttons={currencies}
          changePct={coin.market.prices[currency].changePctDay}
          updateCurrency={updateCurrency}
          updateChart={() => {}}
        />
        <Chart
          dataPoints={coinData}
        />
        <View style={styles.cointab__graphButtonsContainer}>
          { ['1h', '1d', '1w', '1m', '3m', '6m', '1y'].map(period => (
            <Button key={period} small transparent onPress={() => getCoinHisto({fsym: coin.market.symbol, tsym: 'BTC', range: period})}>
              <Text style={styles.cointab__graphButtonsText}>
                {period.toUpperCase()}
              </Text>
            </Button>
          )) }
        </View>

        <Spacer size={25} />
        <CoinCard
          key={coin._id}
          coin={coin}
          symbol={'BTC'}
        ></CoinCard>
        <Spacer size={20} />
      </Content>
    );
  }
}

export default CoinTabOverview;
