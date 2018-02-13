import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, SectionList, TouchableOpacity, RefreshControl, Image, StyleSheet, StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, List, ListItem, Separator, Header, Title, Subtitle, Footer } from 'native-base';
import Icon from './Icon';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Lead from './Lead';
import Spacer from './Spacer';
import PortfolioTotal from './portfolio/Total';
import PortfolioHeader from './portfolio/Header';
import Chart from './Chart';
import CoinCard from './CoinCard';
import Colors from '../../../native-base-theme/variables/commonColor';

class CoinListing extends Component {
  static propTypes = {
    portfoliosError: PropTypes.string,
    portfoliosLoading: PropTypes.bool.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    drawer: PropTypes.shape({}),
    portfoliosFetch: PropTypes.func,
    addPortfolio: PropTypes.func,
    removePortfolio: PropTypes.func,
    addCoin: PropTypes.func,
    removeCoin: PropTypes.func,
    activePortfolio: PropTypes.string,
  }

  static defaultProps = {
    portfoliosError: null,
    portfoliosFetch: null,
  }

  render() {
    const {
      portfoliosError,
      portfoliosLoading,
      portfolios,
      drawer,
      addPortfolio,
      removePortfolio,
      portfoliosFetch,
      addCoin,
      removeCoin,
      activePortfolio,
    } = this.props;

    // Loading
    if (portfoliosLoading) return <Loading />;

    // // Error
    if (portfoliosError) return <Error content={error} />;

    const keyExtractor = item => item.id;

    const showCoin = item => Actions.coin({ match: { params: { coinId: String(item.id) } } });
    const editPortfolio = item => Actions.portfolioSettings({ match: { params: { portfolioId: String(item) } } });

    const portfoliosList = activePortfolio ? portfolios.filter(portfolio => portfolio.id === activePortfolio) : portfolios;

    const totals = {
      BTC: 0,
      USD: 0,
      RUB: 0
    };

    const changePct = {
      BTC: 0,
      USD: 0,
      RUB: 0
    };

    portfoliosList.forEach(portfolio => {
      if (portfolio.total) Object.keys(portfolio.total).forEach(symbol => {
        if (!totals[symbol]) totals[symbol] = portfolio.total[symbol];
        else totals[symbol] += portfolio.total[symbol];
      });
    });

    const getChangePct = prices => {
      const changes = {};
      if (prices) Object.keys(prices).forEach(symbol => {
        changes[symbol] = prices[symbol].changePctDay;
      });
      return changes;
    }

    return (
      <Container style={{ backgroundColor: '#1B152D' }}>
        <Header style={{ borderBottomWidth: 0 }}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => drawer.open()}>
              <Icon name='Menu' width={28} />
            </Button>
          </Left>
          <Body>
            <Title button onPress={() => Actions.portfolioSelect()}>
              <Icon name='Arrow' width={15} height={15} fill={'#8D8A96'} style={{ transform: [{ rotate: '270deg'}, { translateX: -3 }, { translateY: -5 }] }} />
              <Text>{activePortfolio && portfoliosList.length ? portfoliosList[0].title : 'All Portfolios'}</Text>
            </Title>
          </Body>
          <Right>
            {activePortfolio && <Button transparent onPress={() => editPortfolio ? editPortfolio(activePortfolio) : ''}>
              <Icon name='Edit' width={28} />
            </Button>}
          </Right>
        </Header>
        <Content style={{ shadowOpacity: 0, elevation: 0 }}>
          <PortfolioTotal totals={totals} changePct={changePct} />
          <Chart />
          {
            portfoliosList.length ? portfoliosList.map(portfolio => (
              <List key={portfolio.id} style={{ borderColor: '#2F2A40', borderTopWidth: 1, paddingLeft: 10, paddingRight: 10 }}>
                <PortfolioHeader show={!activePortfolio} title={portfolio.title} totals={portfolio.total} changePct={getChangePct(portfolio.prices)} />
                {
                  portfolio.coins && portfolio.coins.length ? portfolio.coins.map(coin => (
                    <CoinCard
                      key={coin.id}
                      coin={coin}
                      showCoin={showCoin}
                      removeCoin={removeCoin}
                    ></CoinCard>
                  )) : (
                    <ListItem style={{ backgroundColor: '#282239', borderBottomWidth: 0, borderRadius: 4, marginLeft: 0, paddingLeft: 15, marginBottom: 15 }}>
                      <Text style={{ fontSize: 14, color: '#8D8A96', textAlign: 'center', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>No coins here</Text>
                    </ListItem>
                  )
                }
                { activePortfolio ? <View /> : <Button small bordered full onPress={() => addCoin(portfolio.id)} style={{ borderColor: '#2F2A40', borderRadius: 5, paddingTop: 15, paddingBottom: 15 }}>
                  <Text style={{ color: '#8D8A96', fontWeight: 'normal' }}>+ ADD NEW COIN</Text>
                </Button> }
                <Spacer size={10} />
              </List>
            )) : (
              <List>
                <ListItem style={{ backgroundColor: '#282239', borderBottomWidth: 0, borderRadius: 4, marginLeft: 0, paddingLeft: 15, marginBottom: 15 }}>
                  <Text style={{ fontSize: 14, color: '#8D8A96', textAlign: 'center', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>List is empty</Text>
                </ListItem>
              </List>
            )
          }
          <Spacer size={50} />
        </Content>
        { activePortfolio && <Footer style={{ backgroundColor: '#1B152D', marginBottom: 15, paddingBottom: 15, borderTopWidth: 0 }}>
          <Button small bordered full onPress={() => addCoin(activePortfolio)} style={{ flex: 1, borderColor: '#2F2A40', borderRadius: 5, marginTop: 15, paddingTop: 25, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>
            <Text style={{ color: '#8D8A96', fontFamily: 'Lato-Medium' }}>+ ADD NEW COIN</Text>
          </Button>
        </Footer> }
      </Container>
    );
  }
}

export default CoinListing;
