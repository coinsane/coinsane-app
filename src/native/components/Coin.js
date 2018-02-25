import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Left, Button, Title, Right, Tabs, Tab, TabHeading, Thumbnail } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Config from '../../constants/config';
import Error from './Error';
import Spacer from './Spacer';
import Icon from './Icon';
import CoinCard from './CoinCard';
import CoinTabOverview from './CoinTabOverview';
import CoinTabTransactions from './CoinTabTransactions';
import { Actions } from 'react-native-router-flux';
import { getUID } from '../../lib/utils';

class CoinView extends Component {
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

    this.getCoinHisto({fsym: coin.symbol}).then(data => {
      setCoinData(data);
    });
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

    const icon = { uri: coin.imageUrl };

    return (
      <Container>
        <Header style={{ backgroundColor: '#1B152D', borderBottomWidth: 0 }} hasTabs>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='Back' width={28} fill={'#fff'} />
            </Button>
          </Left>
          <Body>
            <Title style={{ flexDirection: 'row', flexWrap:'wrap' }}>
              <Thumbnail small square source={icon} style={{ height: 24, width: 24, marginRight: 10 }} />
              <Text>{coin.name}</Text>
              <Text style={{ color: '#8D8A96', fontSize: 14 }}>&nbsp;{coin.symbol}</Text>
            </Title>
          </Body>
          <Right></Right>
        </Header>
        <Tabs style={{ backgroundColor: '#1B152D' }} tabBarUnderlineStyle={{ height: 1 }}>
          <Tab heading={
            <TabHeading style={{ backgroundColor: '#1B152D' }}>
              <Text>OVERVIEW</Text>
            </TabHeading>
          }>
            <CoinTabOverview
              error={error}
              portfolios={portfolios}
              coinId={coinId}
              setCoinData={setCoinData}
              coinData={coinData}
            />
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: '#1B152D' }}>
              <Text>TRANSACTIONS</Text>
            </TabHeading>
          }>
            <CoinTabTransactions />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default CoinView;
