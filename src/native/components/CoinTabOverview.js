import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Left, Button, Title, Right, Tabs, Tab, TabHeading } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Config from '../../constants/config';
import Error from './Error';
import Spacer from './Spacer';
import Icon from './Icon';
import CoinCard from './CoinCard';
import { Actions } from 'react-native-router-flux';
import { getUID } from '../../lib/utils';

import { AreaChart, YAxis } from 'react-native-svg-charts'
import { LinearGradient, Stop, G, Line } from 'react-native-svg'
import * as shape from 'd3-shape'

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
          stroke={'#2F2A40'}
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
    setCoinData: PropTypes.func,
    coinData: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    error: null,
  }

  async getCoinHisto({fsym = 'BTC', tsym = 'USD', range = '3m'}) {
    const UID = await getUID();
    if (!UID) return reject('auth problem');
    const Authorization = `${Config.appName} token=${UID}`;
    return fetch(`${Config.apiUri}/histo?fsym=${fsym}&tsym=${tsym}&range=${range}`, { headers: { Authorization } })
      .then((response) => response.json())
      .then((responseJson) => {
        const mapObj = responseJson.data || responseJson;
        const data = mapObj.map(tick => parseFloat(tick.close));
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _setCoinData({fsym = 'BTC', tsym = 'USD', range = '3m'}) {
    const {
      setCoinData
    } = this.props;
    this.getCoinHisto({fsym, tsym, range}).then(data => setCoinData(data));
  }


  componentDidMount() {
    const {
      portfolios,
      coinId,
      setCoinData,
      coinData
    } = this.props;

    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i++) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item.id === coinId);
        if (coin) break;
      }
    }

    this._setCoinData({fsym: coin.symbol});
  }

  render () {
    const {
      error,
      portfolios,
      coinId,
      setCoinData,
      coinData
    } = this.props;
    // Error
    if (error) return <Error content={error} />;

    // Get this Coin from all portfolios
    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i++) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item.id === coinId);
        if (coin) break;
      }
    }

    // Coin not found
    if (!coin) return <Error content={ErrorMessages.coin404} />;

    // const data = [ 50, 10, 40, 95, 5, 85, 91, 35, 53, 4, 24, 50 ];
    const contentInset = { top: 20, bottom: 20 };

    return (
      <Content style={{ backgroundColor: '#1B152D' }}>

        <View style={{ height: 170, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, position: 'relative' }}>
          <YAxis
            style={{ position: 'absolute', top: 0, bottom: 0, left: 5 }}
            dataPoints={coinData}
            numberOfTicks={3}
            contentInset={contentInset}
            labelStyle={{ color: '#8D8A96' }}
            formatLabel={value => `${value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
          />
          <AreaChart
            style={{ flex: 1 }}
            dataPoints={coinData}
            svg={{ stroke: '#31E981' }}
            contentInset={contentInset}
            curve={shape.curveLinear}
            renderGradient={({ id }) => (
              <LinearGradient id={id} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={'#31E981'} stopOpacity={0.2}/>
                <Stop offset={'100%'} stopColor={'#31E981'} stopOpacity={0}/>
              </LinearGradient>
            )}
            renderGrid={CustomGrid}
          />
        </View>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          { ['1h', '1d', '1w', '1m', '3m', '6m', '1y'].map(period => (
            <Button key={period} small transparent onPress={() => this._setCoinData({fsym: coin.symbol, range: period})}>
              <Text style={{ color: '#8D8A96', fontSize: 14, fontFamily: 'Lato-Medium' }}>
                {period.toUpperCase()}
              </Text>
            </Button>
          )) }
        </View>

        <Spacer size={25} />
        <CoinCard
          key={coin.id}
          coin={coin}
        ></CoinCard>
        <Spacer size={20} />
      </Content>
    );
  }
}

export default CoinTabOverview;
