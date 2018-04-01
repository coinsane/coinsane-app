import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, SectionList, TouchableOpacity, RefreshControl, Image, StyleSheet, StatusBar, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, List, ListItem, Separator, Header, Title, Subtitle, Footer } from 'native-base';
import Icon from '../Icon/Icon.component';
import { Actions } from 'react-native-router-flux';
import Loading from '../Loading/Loading.component';
import Error from '../Error/Error.component';
import Lead from '../Lead/Lead.component';
import Spacer from '../Spacer/Spacer.component';
import PortfolioTotal from '../portfolio/Total.component';
import PortfolioHeader from '../portfolio/Header.component';
import Chart from '../Chart/Chart.component';
import CoinCard from '../CoinCard/CoinCard.component';
import Colors from '../../../../native-base-theme/variables/commonColor';

import SGListView from 'react-native-sglistview';

import styles from './Coins.styles';
import { colors, base } from '../../styles';

class CoinListing extends Component {
  static propTypes = {
    portfoliosError: PropTypes.string,
    portfoliosLoading: PropTypes.bool.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    portfoliosChart: PropTypes.shape({}),
    changePct: PropTypes.string,
    drawer: PropTypes.shape({}),
    portfoliosFetch: PropTypes.func,
    getTotals: PropTypes.func,
    addPortfolio: PropTypes.func,
    removePortfolio: PropTypes.func,
    addTransaction: PropTypes.func,
    removeCoin: PropTypes.func,
    activePortfolio: PropTypes.string,
    updateCurrency: PropTypes.func,
    updatePeriod: PropTypes.func,
    currency: PropTypes.string,
    period: PropTypes.string,
    lastTotal: PropTypes.number,
  }

  static defaultProps = {
    portfoliosError: null,
    portfoliosFetch: null,
  }

  formatData(portfolios) {
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    portfolios.forEach(portfolio => {
      const { _id, title, total, inTotal, changePct, amount } = portfolio;
      sectionIds.push(_id);

      const coins = portfolio.coins || [];
      dataBlob[_id] = { _id, title, total, inTotal, count: coins.length, changePct, amount };

      rowIds.push([]);

      coins.forEach((coin, index) => {
        const rowId = `${_id}:${index}`;
        rowIds[rowIds.length - 1].push(rowId);
        if (coins.length - 1 === index) coin.last = _id;
        dataBlob[rowId] = coin;
      });
    })

    return { dataBlob, sectionIds, rowIds };
  }

  updateChart(portfolioId, range, symbol) {
    this.props.getTotals({ portfolioId, range, symbol });
    this.props.updatePeriod(range);
    this.props.portfoliosFetch(symbol);
  }

  componentDidMount() {
    const {
      activePortfolio,
      period,
      currency
    } = this.props;
    this.updateChart(activePortfolio || 'all', period, currency);
  }


  render() {
    const {
      portfoliosError,
      portfoliosLoading,
      portfolios,
      drawer,
      addPortfolio,
      removePortfolio,
      portfoliosChart,
      changePct,
      portfoliosFetch,
      getTotals,
      addTransaction,
      removeCoin,
      activePortfolio,
      updateCurrency,
      updatePeriod,
      currency,
      period,
      lastTotal,
    } = this.props;

    // Loading
    if (portfoliosLoading) return <Loading />;

    // // Error
    if (portfoliosError) return <Error content={portfoliosError} />;

    const keyExtractor = item => item._id;

    const showCoin = item => Actions.coin({ match: { params: { coinId: String(item._id) } } });
    const editPortfolio = item => Actions.portfolioSettings({ match: { params: { portfolioId: String(item) } } });

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const portfoliosList = activePortfolio ? portfolios.filter(portfolio => portfolio._id === activePortfolio) : portfolios;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1._id !== r2._id,
      sectionHeaderHasChanged: (s1, s2) => s1._id !== s2._id,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(portfoliosList);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
    };

    // let lastTotal = 0;
    //
    // portfoliosList.forEach(portfolio => {
    //   if (portfolio.amount) lastTotal += portfolio.amount;
    // });

    const getChangePct = prices => {
      const changes = {};
      if (prices) Object.keys(prices).forEach(symbol => {
        changes[symbol] = prices[symbol].changePctDay;
      });
      return changes;
    }


    const _renderSectionHeader = (portfolio) => {
      return (
        <PortfolioHeader
          show={!activePortfolio}
          id={portfolio._id}
          title={portfolio.title}
          totals={portfolio.total}
          count={portfolio.count}
          addTransaction={addTransaction}
          symbol={currency}
          // changePct={getChangePct(portfolio.prices)}
          changePct={portfolio.changePct}
          amount={portfolio.amount}
        />
      )
    };




    const _renderRow = (coin) => {
      return coin ? (
        <CoinCard
          key={coin._id}
          coin={coin}
          symbol={currency}
          showCoin={showCoin}
          addTransaction={addTransaction}
          removeCoin={removeCoin}
          activePortfolio={activePortfolio}
        />
      ) : (
        <ListItem style={styles.coins__nocoinsRow}>
          <Text style={styles.coins__nocoinsRowText}>No coins here</Text>
        </ListItem>
      )
    };

    // _onRefresh() {
    //   this.setState({refreshing: true});
    //   fetchData().then(() => {
    //     this.setState({refreshing: false});
    //   });
    // }


    const portfoliosChartArray = portfoliosChart && Object.keys(portfoliosChart).length ? Object.keys(portfoliosChart).map(time => {
      if (typeof portfoliosChart[time] === 'number') return portfoliosChart[time];
      return portfoliosChart[time].avg;
    }) : [];

    const chartPct = parseFloat(1 - portfoliosChartArray[0]/portfoliosChartArray[portfoliosChartArray.length-1]).toFixed(2);


    return (
      <Container style={base.contentContainer}>
        <Header style={styles.coinsHeader}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => drawer.open()}>
              <Icon name='Menu' width={28} />
            </Button>
          </Left>
          <Body>
            <Title button onPress={() => Actions.portfolioSelect()}>
              <Icon name='Arrow' width={15} height={15} fill={colors.textGray} style={[styles.coins__bodyArrowIcon]} />
              <Text>{activePortfolio && portfoliosList.length ? portfoliosList[0].title : 'All Portfolios'}</Text>
            </Title>
          </Body>
          <Right>
            {
              activePortfolio &&
              <Button transparent onPress={() => editPortfolio ? editPortfolio(activePortfolio) : ''}>
                <Icon name='Edit' width={28} />
              </Button>
            }
          </Right>
        </Header>
        <Content style={{ shadowOpacity: 0, elevation: 0 }}>
          <SGListView
            dataSource={this.state.dataSource}
            renderRow={_renderRow}
            enableEmptySections
            ref={'listview'}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this._onRefresh.bind(this)}
            //   />
            // }
            initialListSize={1}
            stickyHeaderIndices={[]}
            onEndReachedThreshold={1}
            scrollRenderAheadDistance={1}
            pageSize={1}
            renderHeader={() => (
              <View>
                <PortfolioTotal
                  lastTotal={lastTotal}
                  changePct={changePct}
                  currency={currency}
                  updateCurrency={updateCurrency}
                  updateChart={(currency) => this.updateChart(activePortfolio || 'all', period, currency)}
                />
                <Chart dataPoints={portfoliosChart} />
                <View style={styles.coins__contentHeader}>
                  { ['1h', '1d', '1w', '1m', '3m', '6m', '1y'].map(periodKey => (
                    <Button
                      key={periodKey} small transparent
                      onPress={() => this.updateChart(activePortfolio || 'all', periodKey, currency)}
                      style={[styles.coins__buttonPeriod, period === periodKey && styles.coins__buttonPeriodActive]}
                    >
                      <Text style={[styles.coins__buttonPeriodText, period === periodKey && styles.coins__buttonPeriodTextActive]}>
                        {periodKey.toUpperCase()}
                      </Text>
                    </Button>
                  )) }
                </View>
              </View>
            )}
            renderFooter={() => <Spacer size={40} />}
            renderSectionHeader={_renderSectionHeader}
          />
        </Content>
        {activePortfolio &&
        <Footer style={base.footer}>
          <Button
            small
            bordered
            full
            onPress={() => addTransaction(activePortfolio)}
            style={base.footer__button}
          >
            <Text style={base.footer__buttonText}>+ ADD NEW COIN</Text>
          </Button>
        </Footer>}
      </Container>
    );
  }
}

export default CoinListing;
