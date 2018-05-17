import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, View, RefreshControl } from 'react-native';
import { Container, Content, Text, Button, Footer, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SGListView from 'react-native-sglistview';

import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import PortfolioHeader from '../_Molecules/PortfolioHeader/PortfolioHeader.molecula';
import CoinsaneButton from '../_Atoms/CoinsaneButton/CoinsaneButton.component';
import Chart from '../_Organisms/Chart/Chart.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinCard from '../_Organisms/CoinCard/CoinCard.organism';

import styles from './Portfolios.styles';
import { colors, base } from '../../styles';

class Portfolios extends Component {
  static propTypes = {
    portfoliosError: PropTypes.string,
    portfoliosLoading: PropTypes.bool.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    portfoliosChart: PropTypes.shape({}).isRequired,

    fetchPortfolios: PropTypes.func.isRequired,
    updatePortfolioChart: PropTypes.func.isRequired,
    updatePortfolioPeriod: PropTypes.func.isRequired,
    updatePortfolioCurrency: PropTypes.func.isRequired,

    changePct: PropTypes.number.isRequired,
    drawer: PropTypes.shape({}).isRequired,
    getTotals: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    activePortfolio: PropTypes.string,
    updatePeriod: PropTypes.func.isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    period: PropTypes.string,
    lastTotal: PropTypes.number.isRequired,
    settings: PropTypes.shape({}).isRequired,
    pulldownDistance: PropTypes.number,
  };

  static defaultProps = {
    portfoliosError: null,
    activePortfolio: 'all',
    period: null,
    pulldownDistance: 40,
  };

  constructor(props) {
    super(props);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    const {
      activePortfolio,
      period,
      currency,
      updatePortfolioChart,
      fetchPortfolios,
    } = this.props;
    fetchPortfolios(currency);
    updatePortfolioChart({ currency, period, portfolio: activePortfolio });
  }

  updatePeriod(period) {
    const {
      activePortfolio,
      currency,
      updatePortfolioPeriod,
    } = this.props;
    updatePortfolioPeriod({ period, currency, portfolio: activePortfolio });
    // saga: actions: update period, update chart
  }

  updateCurrency(currency) {
    const {
      activePortfolio,
      period,
      updatePortfolioCurrency,
    } = this.props;
    updatePortfolioCurrency({ currency, period, portfolio: activePortfolio });
    // saga: actions: update currency, update totals, update chart
  }

  formatData(portfolios) {
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    portfolios.forEach((portfolio) => {
      const {
        _id, title, total, inTotal, changePct, amount,
      } = portfolio;
      sectionIds.push(_id);

      const coins = portfolio.coins || [];
      dataBlob[_id] = {
        _id, title, total, inTotal, count: coins.length, changePct, amount,
      };

      rowIds.push([]);

      coins.forEach((coin, index) => {
        const rowId = `${_id}:${index}`;
        rowIds[rowIds.length - 1].push(rowId);
        coin.portfolioId = _id;
        if (coins.length - 1 === index) coin.last = _id;
        dataBlob[rowId] = coin;
      });
    });

    return { dataBlob, sectionIds, rowIds };
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
      getTotals,
      addTransaction,
      removeCoin,
      activePortfolio,
      updatePeriod,
      currency,
      currencies,
      period,
      lastTotal,
      updateCollapsed,
      collapsedList,
    } = this.props;

    // // Error
    if (portfoliosError) return <Error content={portfoliosError} />;

    const showCoin = coinId => Actions.coin({ match: { params: { coinId } } });
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
    this.dataSource = ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);

    const _renderSectionHeader = portfolio => (
      <PortfolioHeader
        show={!activePortfolio}
        id={portfolio._id}
        title={portfolio.title}
        totals={portfolio.total}
        count={portfolio.count}
        addTransaction={addTransaction}
        symbol={currency}
        changePct={portfolio.changePct}
        amount={portfolio.amount}
        updateCollapsed={updateCollapsed}
        isCollapsed={collapsedList.indexOf(portfolio._id) !== -1}
        isLoading={portfoliosLoading}
      />
    );

    const _renderRow = coin => (
      <CoinCard
        type="portfolio"
        key={coin._id}
        coinId={coin._id}
        amount={coin.amount}
        market={coin.market}
        currency={currencies[currency]}
        showCoin={showCoin}
        addTransaction={addTransaction}
        removeCoin={removeCoin}
        activePortfolio={activePortfolio}
        isCollapsed={collapsedList.indexOf(coin.portfolioId) !== -1}
        isLoading={portfoliosLoading}
        portfolioId={coin.last}
      />
    );

    const periods = ['1h', '1d', '1w', '1m', '3m', '6m', '1y'];

    const HeaderTitle = () => (
      <Text>
        <Icon name="ios-arrow-down" style={[styles.coins__bodyArrowIcon, { fontSize: 18, color: colors.textGray }]} />
        &nbsp;
        <Text>{activePortfolio && portfoliosList.length ? portfoliosList[0].title : 'All Portfolios'}</Text>
      </Text>
    );

    return (
      <Container style={base.contentContainer}>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<HeaderTitle />}
          titleAction={() => Actions.portfolioSelect()}
          rightIcon="Edit"
          rightAction={() => editPortfolio(activePortfolio)}
          rightActive={!!activePortfolio}
        />
        <Content style={{ shadowOpacity: 0, elevation: 0 }}>
          <SGListView
            dataSource={this.dataSource}
            renderRow={_renderRow}
            enableEmptySections
            // refreshControl={
            //   <RefreshControl
            //     progressViewOffset={40}
            //     refreshing={this.state.refreshing}
            //     onRefresh={this.refreshData}
            //   />
            // }
            initialListSize={10}
            stickyHeaderIndices={[]}
            onEndReachedThreshold={1}
            scrollRenderAheadDistance={1}
            pageSize={1}
            renderHeader={() => (
              <View>
                <CoinsaneSummary
                  value={lastTotal}
                  currency={currency}
                  buttons={Object.keys(currencies)}
                  subValue={changePct}
                  updateCurrency={this.updateCurrency}
                />
                <Chart
                  dataPoints={portfoliosChart}
                />
                <View style={styles.coins__contentHeader}>
                  { periods.map(key => (
                    <CoinsaneButton
                      key={key}
                      type="period"
                      value={key}
                      uppercase
                      onPress={() => this.updatePeriod(key)}
                      active={period === key}
                    />
                  )) }
                </View>
              </View>
            )}
            renderFooter={() => <Spacer size={40} />}
            renderSectionHeader={_renderSectionHeader}
          />
        </Content>
        {
          activePortfolio &&
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
          </Footer>
        }
      </Container>
    );
  }
}

export default Portfolios;
