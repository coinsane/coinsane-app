import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, View } from 'react-native';
import { Container, List, Text, Button, Footer, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SGListView from 'react-native-sglistview';

import I18n from '../../../i18n';
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
import { nFormat } from '../../../lib/utils';

class Portfolios extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    chart: PropTypes.shape({}).isRequired,

    fetchPortfolios: PropTypes.func.isRequired,
    updatePortfolioChart: PropTypes.func.isRequired,
    updatePortfolioPeriod: PropTypes.func.isRequired,
    updatePortfolioCurrency: PropTypes.func.isRequired,

    changePct: PropTypes.number.isRequired,
    drawer: PropTypes.shape({}).isRequired,
    addCoin: PropTypes.func.isRequired,
    removeCoin: PropTypes.func.isRequired,
    activePortfolio: PropTypes.string,
    collapsedList: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateCollapsed: PropTypes.func.isRequired,
    currencies: PropTypes.shape({}).isRequired,
    periods: PropTypes.arrayOf(PropTypes.string).isRequired,
    symbol: PropTypes.string.isRequired,
    currency: PropTypes.shape({}).isRequired,
    period: PropTypes.string,
    lastTotal: PropTypes.number.isRequired,
  };

  static defaultProps = {
    error: null,
    activePortfolio: 'all',
    period: null,
  };

  constructor(props) {
    super(props);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    // this.refreshData();
  }

  refreshData() {
    const {
      activePortfolio,
      period,
      symbol,
      updatePortfolioChart,
      fetchPortfolios,
    } = this.props;
    fetchPortfolios(symbol);
    updatePortfolioChart({ symbol, period, portfolio: activePortfolio });
  }

  updatePeriod(period) {
    const {
      activePortfolio,
      symbol,
      updatePortfolioPeriod,
    } = this.props;
    updatePortfolioPeriod({ period, symbol, portfolio: activePortfolio });
  }

  updateCurrency = (symbol) => {
    const {
      activePortfolio: portfolio,
      period,
      updatePortfolioCurrency,
    } = this.props;
    updatePortfolioCurrency({ symbol, period, portfolio });
  };

  formatData = (portfolios) => {
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
  };

  renderHeader = () => {
    const {
      currencies,
      currency,
      lastTotal,
      changePct,
      chart,
      period,
      periods,
      loading,
      error,
    } = this.props;
    return (
      <View>
        <CoinsaneSummary
          value={nFormat(lastTotal, currency.decimal)}
          currency={currency}
          buttons={Object.keys(currencies)}
          subValue={changePct}
          updateCurrency={this.updateCurrency}
          loading={loading}
          error={error}
        />
        <Chart
          data={chart}
          currency={currency}
          loading={loading}
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
    );
  };

  render() {
    const {
      error,
      loading,
      list,
      drawer,
      addCoin,
      removeCoin,
      activePortfolio,
      currency,
      updateCollapsed,
      collapsedList,
    } = this.props;

    // // Error
    if (error) return <Error content={error} />;

    const showCoin = coinId => Actions.coin({ match: { params: { coinId } } });
    const editPortfolio = item => Actions.portfolioSettings({ match: { params: { portfolioId: String(item) } } });

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const portfoliosArray = activePortfolio ? list.filter(portfolio => portfolio._id === activePortfolio) : list;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1._id !== r2._id,
      sectionHeaderHasChanged: (s1, s2) => s1._id !== s2._id,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(portfoliosArray);
    this.dataSource = ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);

    const _renderSectionHeader = portfolio => (
      <PortfolioHeader
        show={!activePortfolio}
        id={portfolio._id}
        title={portfolio.title}
        totals={portfolio.total}
        count={portfolio.count}
        addCoin={addCoin}
        currency={currency}
        changePct={portfolio.changePct}
        amount={portfolio.amount}
        updateCollapsed={updateCollapsed}
        isCollapsed={collapsedList.indexOf(portfolio._id) !== -1}
        isLoading={loading}
      />
    );

    const _renderRow = coin => (
      <CoinCard
        type="portfolio"
        key={coin._id}
        coinId={coin._id}
        amount={coin.amount}
        market={coin.market}
        currency={currency}
        showCoin={showCoin}
        addCoin={addCoin}
        removeCoin={removeCoin}
        activePortfolio={activePortfolio}
        isCollapsed={collapsedList.indexOf(coin.portfolioId) !== -1}
        isLoading={loading}
        portfolioId={coin.last}
      />
    );

    const HeaderTitle = () => (
      <Title>
        <Icon name="ios-arrow-down" style={[styles.coins__bodyArrowIcon, { fontSize: 18, color: colors.textGray }]} />
        &nbsp;
        <Text>{activePortfolio && portfoliosArray.length ? portfoliosArray[0].title : I18n.t('portfolios.all')}</Text>
      </Title>
    );

    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<HeaderTitle />}
          titleAction={() => Actions.portfolioSelect()}
          rightIcon="Edit"
          rightAction={() => editPortfolio(activePortfolio)}
          rightActive={!!activePortfolio}
        />
        <List style={base.contentContainer}>
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
            renderHeader={this.renderHeader}
            renderFooter={() => <Spacer size={40} />}
            renderSectionHeader={_renderSectionHeader}
          />
        </List>
        {
          activePortfolio &&
          <Footer style={base.footer}>
            <Button
              small
              bordered
              full
              onPress={() => addCoin(activePortfolio)}
              style={base.footer__button}
            >
              <Text style={base.footer__buttonText}>{I18n.t('coins.addButton')}</Text>
            </Button>
          </Footer>
        }
      </Container>
    );
  }
}

export default Portfolios;
