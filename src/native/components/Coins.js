import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, SectionList, TouchableOpacity, RefreshControl, Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, List, ListItem, Separator, Header, Title } from 'native-base';
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

    const showCoin = item => Actions.coin({ match: { params: { id: String(item.id) } } });

    const portfoliosList = activePortfolio ? portfolios.filter(portfolio => portfolio.id === activePortfolio) : portfolios;

    const totals = {
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

    return (
      <Container>
        <Header style={{ backgroundColor: '#1B152D', borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={() => Actions.drawerOpen()}>
              <Icon name='Menu' height='22' width='22' />
            </Button>
          </Left>
          <Body>
            <Title>{activePortfolio ? portfoliosList[0].title : 'All Portfolios'}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => Actions.portfolioSelect()}>
              <Icon name='Portfolio' height='22' width='22' />
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: '#1B152D' }}>
          <PortfolioTotal totals={totals} />
          <Chart />
          {
            portfoliosList.length ? portfoliosList.map(portfolio => (
              <List key={portfolio.id} style={{ borderColor: '#2F2A40', borderBottomWidth: 1, paddingLeft: 10, paddingRight: 10 }}>
                <PortfolioHeader show={!activePortfolio} title={portfolio.title} />
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
                <Button small bordered full onPress={() => addCoin(portfolio.id)} style={{ borderColor: '#2F2A40', borderRadius: 5, paddingTop: 15, paddingBottom: 15 }}>
                  <Text style={{ color: '#8D8A96', fontWeight: 'normal' }}>+ ADD NEW COIN</Text>
                </Button>
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
      </Container>
    );
  }
}

export default CoinListing;
