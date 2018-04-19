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

import CoinsaneButton from '../_Atoms/CoinsaneButton/CoinsaneButton.component';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import SummaryCell from '../_Molecules/SummaryCell/SummaryCell.molecula';
import MarketInfoCell from '../_Molecules/MarketInfoCell/MarketInfoCell.molecula';
import TabHeader from '../_Molecules/TabHeader/TabHeader.molecula';
import Chart from '../_Organisms/Chart/Chart.component';

import { AreaChart, YAxis } from 'react-native-svg-charts';
import { LinearGradient, Stop, G, Line } from 'react-native-svg';
import * as shape from 'd3-shape';

import styles from './CoinTabOverview.styles';
import { colors, base } from '../../styles';

class CoinTabOverview extends Component {
  static propTypes = {
    error: PropTypes.string,
    coin: PropTypes.shape({}),
    coinId: PropTypes.string.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    coinData: PropTypes.shape({}),
    getCoinHisto: PropTypes.func,
    currency: PropTypes.string,
    currencies: PropTypes.arrayOf(PropTypes.string),
    updateCurrency: PropTypes.func,
    period: PropTypes.string,
  }

  static defaultProps = {
    error: null,
  }

  render () {
    const {
      error,
      portfolios,
      coin,
      coinId,
      coinData,
      getCoinHisto,
      currency,
      currencies,
      updateCurrency,
      period,
    } = this.props;
    // Error
    if (error) return <Error content={error} />;

    const contentInset = { top: 20, bottom: 20 };

    const periods = ['1h', '1d', '1w', '1m', '3m', '6m', '1y'];

    const summaryList = [
      {
        label: 'Market Cap',
        value: '$8,682,770'
      },
      {
        label: 'Vol (24h)',
        value: '$4,622,770'
      },
      {
        label: 'Supply',
        value: '16,868 BTC'
      },
    ];

    const marketsList = [
        {
          source: 'Bitfinex',
          pair: 'BTC/USD',
          volume: '$560,05M',
          price: '$8006.7',
          changePct: 7.95,
        },
        {
          source: 'OKEx',
          pair: 'ETH/BTC',
          volume: '$287,09M',
          price: '$8056.2',
          changePct: 4.07,
        },
        {
          source: 'OKEx',
          pair: 'ETH/BTC',
          volume: '$287,09M',
          price: '$8056.2',
          changePct: 4.07,
        },
      ];

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
          { periods.map(key => (
            <CoinsaneButton
              key={key}
              type={'period'}
              value={key}
              uppercase={true}
              onPress={() => getCoinHisto({fsym: coin.market.symbol, tsym: currency, range: key})}
              active={period === key}
            />
          )) }
        </View>
        <Spacer size={10} />
        <SummaryCell
          summaryList={summaryList}
        />
        <Spacer size={20} />
        <TabHeader title="Markets" />
        <MarketInfoCell
          list={marketsList}
        />
        <Spacer size={20} />
        {/* <TabHeader title="News" />
        <Spacer size={50} /> */}
      </Content>
    );
  }
}

export default CoinTabOverview;
