import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Left, Button, Title, Right, Tabs, Tab, TabHeading } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import Config from '../../../constants/config';
import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';
import Icon from '../Icon/Icon.component';
import CoinCard from '../CoinCard/CoinCard.component';
import { Actions } from 'react-native-router-flux';
import { getUID } from '../../../lib/utils';

import { AreaChart, YAxis } from 'react-native-svg-charts';
import { LinearGradient, Stop, G, Line } from 'react-native-svg';
import * as shape from 'd3-shape';

import styles from './CoinTabOverview.styles';
import { colors, base } from '../../styles';

function maxAvgMin(arr) {
    var max = arr[0];
    var min = arr[0];
    var sum = arr[0]; //changed from original post
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
        sum = sum + arr[i];
    }
    return [max, sum/arr.length, min]; //changed from original post
}

const CustomGrid = ({ x, y, dataPoints, ticks }) => (
  <G>
    {
      maxAvgMin(ticks).map(tick => (
        <Line
          key={tick}
          x1={'0%'}
          x2={'100%'}
          y1={y(tick)}
          y2={y(tick)}
          stroke={colors.blackBorder}
        />
      ))
    }
  </G>
)

class CoinTabOverview extends Component {
  static propTypes = {
    error: PropTypes.string,
    coinId: PropTypes.string.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    coinData: PropTypes.arrayOf(PropTypes.number),
    getCoinHisto: PropTypes.func,
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

    return (
      <Content style={base.contentContainer}>

        <View style={styles.cointab__view}>
          <YAxis
            style={styles.cointab__axis}
            dataPoints={coinData}
            numberOfTicks={3}
            contentInset={contentInset}
            labelStyle={styles.cointab__axisLabel}
            formatLabel={value => `${value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
          />
          <AreaChart
            style={{ flex: 1 }}
            dataPoints={coinData}
            svg={{ stroke: colors.primaryGreen }}
            contentInset={contentInset}
            curve={shape.curveLinear}
            renderGradient={({ id }) => (
              <LinearGradient id={id} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={colors.primaryGreen} stopOpacity={0.2}/>
                <Stop offset={'100%'} stopColor={colors.primaryGreen} stopOpacity={0}/>
              </LinearGradient>
            )}
            renderGrid={CustomGrid}
          />
        </View>
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
