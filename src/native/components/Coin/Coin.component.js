import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Left, Button, Title, Right, Tabs, Tab, TabHeading, Thumbnail } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import Config from '../../../constants/config';
import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import CoinCard from '../CoinCard/CoinCard.component';
import CoinTabOverview from '../CoinTabOverview/CoinTabOverview.component';
import CoinTabTransactions from '../CoinTabTransactions/CoinTabTransactions.component';
import { Actions } from 'react-native-router-flux';
import { getUID } from '../../../lib/utils';

import styles from './Coin.styles';
import { colors, typography } from '../../styles';

class CoinView extends Component {
  static propTypes = {
    error: PropTypes.string,
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

  componentDidMount() {
    const {
      portfolios,
      coinId,
      getCoinHisto,
    } = this.props;

    let coin = null;
    if (coinId && portfolios) {
      for (let i = 0; i < portfolios.length; i++) {
        const portfolio = portfolios[i];
        coin = portfolio.coins.find(item => item._id === coinId);
        if (coin) break;
      }
    }

    getCoinHisto({fsym: coin.market.symbol, tsym: 'BTC', range: '1m' });
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
      period,
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

    const icon = { uri: coin.imageUrl };

    return (
      <Container>
        <Header
          style={styles.coinHeader}
          hasTabs
        >
          <StatusBar barStyle="light-content" />
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <CoinsaneIcon name='Back' width={28} fill={colors.white} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.coinHeader__body}>
              <Thumbnail small square source={icon} style={styles.coinHeader__thumbnail} />
              <Text>{coin.market.name}</Text>
              <Text style={[styles.coinHeader__text, typography.small]}>&nbsp;{coin.market.symbol}</Text>
            </Title>
          </Body>
          <Right></Right>
        </Header>
        <Tabs style={{ backgroundColor: colors.bgGray }} tabBarUnderlineStyle={{ height: 1 }}>
          <Tab heading={
            <TabHeading style={{ backgroundColor: colors.bgGray }}>
              <Text>OVERVIEW</Text>
            </TabHeading>
          }>
            <CoinTabOverview
              error={error}
              portfolios={portfolios}
              coinId={coinId}
              coinData={coinData}
              getCoinHisto={getCoinHisto}
              currency={currency}
              currencies={currencies}
              updateCurrency={updateCurrency}
              period={period}
            />
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: colors.bgGray }}>
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
