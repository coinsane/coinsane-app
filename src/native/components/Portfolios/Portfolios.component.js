import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, View } from 'react-native';
import { Container, List, Text, Button, Footer, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import get from 'lodash/get';

import I18n from '../../../i18n';
import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import PortfolioHeader from '../_Molecules/PortfolioHeader/PortfolioHeader.molecula';
import CoinsaneButton from '../_Atoms/CoinsaneButton/CoinsaneButton.component';
import Chart from '../_Organisms/Chart/Chart.component';
import Pie from '../_Organisms/Pie/Pie.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinCard from '../_Organisms/CoinCard/CoinCard.organism';
import Empty from '../Empty/Empty.component';

import styles from './Portfolios.styles';
import { colors, base } from '../../styles';
import { nFormat, round } from '../../../lib/utils';

class Portfolios extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool,
    portfolios: PropTypes.shape({}).isRequired,
    chart: PropTypes.shape({}).isRequired,
    charts: PropTypes.shape({}).isRequired,
    markets: PropTypes.shape({}).isRequired,
    coins: PropTypes.shape({}).isRequired,

    selectPortfolio: PropTypes.func.isRequired,
    fetchPortfolios: PropTypes.func.isRequired,
    updatePortfolioChart: PropTypes.func.isRequired,
    updatePortfolioPeriod: PropTypes.func.isRequired,
    updatePortfolioCurrency: PropTypes.func.isRequired,

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
  };

  static defaultProps = {
    error: null,
    activePortfolio: null,
    period: null,
    refreshing: false,
  };

  constructor(props) {
    super(props);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.updatePeriod = this.updatePeriod.bind(this);
  }

  handleRefresh = () => {
    const {
      refreshing,
      activePortfolio,
      period,
      symbol,
      updatePortfolioChart,
      fetchPortfolios,
    } = this.props;
    if (!refreshing) {
      fetchPortfolios({ symbol, refreshing });
      updatePortfolioChart({ symbol, period, portfolio: activePortfolio });
    }
  };

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

  showCoin = ({ market, id }) => {
    Actions.coin({ match: { params: { market, id } } });
  };

  editPortfolio = (portfolioId) => {
    Actions.portfolioSettings({ match: { params: { portfolioId } } });
  };

  portfolioTotal = () => {
    const { portfolios, activePortfolio } = this.props;
    let lastTotal = 0;
    if (activePortfolio && activePortfolio !== 'all') {
      const { amount } = portfolios[activePortfolio];
      lastTotal = amount;
      return lastTotal;
    }
    Object.keys(portfolios).forEach((key) => {
      const { amount, inTotal } = portfolios[key];
      if (inTotal) lastTotal += amount;
    });
    return lastTotal;
  };

  portfolioSelect() {
    const { activePortfolio } = this.props;
    Actions.selector({
      listName: 'portfolios',
      title: I18n.t('portfolios.titleChoose'),
      listItemType: 'check',
      activeItem: activePortfolio,
      selectAction: (item) => {
        this.props.selectPortfolio(item._id);
        Actions.pop();
      },
      footerTitle: I18n.t('portfolios.addButton'),
      footerAction: () => {
        Actions.pop();
        Actions.createPortfolio();
      },
      headItem: {
        title: I18n.t('portfolios.all'),
        amount: this.portfolioTotal(),
        selectAction: () => {
          this.props.selectPortfolio(null);
          Actions.pop();
        },
      },
    });
  }

  pieChartData = () => {
    const {
      activePortfolio,
      portfolios,
      markets,
      symbol,
      coins,
    } = this.props;

    let portfolioItems = [];
    if (activePortfolio && portfolios[activePortfolio]) {
      portfolioItems = portfolios[activePortfolio].data;
    } else {
      portfolioItems = Object.keys(portfolios).map(portfolioId => ({
        value: portfolios[portfolioId].amount,
        symbol: portfolios[portfolioId].title,
      }));
    }

    const pieData = [];
    const max = 5;
    let others = 0;
    let total = 0;
    const getCoinPrice = market => get(market, `prices[${symbol}].price`, 0);
    const items = [];

    if (portfolioItems) {
      portfolioItems.forEach((item) => {
        if (item.value && item.symbol) {
          total += item.value;
          items.push(item);
          return;
        }
        if (coins[item._id]) {
          const price = getCoinPrice(markets.items[item.market]);
          const value = +(coins[item._id].amount * price).toFixed(2);
          if (value > 0) {
            total += value;
            items.push({
              value,
              symbol: markets.items[item.market].symbol,
            });
          }
        }
      });
    }

    items.sort((a, b) => b.value - a.value);
    items.forEach((item, index) => {
      if (index + 1 < max) {
        pieData.push(item);
      } else if (items.length > max) {
        others += item.value;
      } else {
        pieData.push(item);
      }
    });

    if (others) {
      pieData.push({
        value: others,
        symbol: I18n.t('portfolios.others'),
      });
    }

    return pieData.map(item => ({ ...item, pct: (item.value / total) * 100 }));
  };

  renderHeader = () => {
    const {
      currencies,
      currency,
      chart,
      period,
      periods,
      loading,
      error,
    } = this.props;

    const decimal = currency.decimal > 6 ? 6 : currency.decimal;
    const low = chart.low && nFormat(chart.low, decimal);
    const high = chart.high && nFormat(chart.high, decimal);

    const SlidePie = () => (
      <View style={styles.slide}>
        <Pie
          data={this.pieChartData()}
          loading={loading}
        />
      </View>
    );

    const SlideChart = () => (
      <View style={styles.slide}>
        <Chart
          data={chart.data}
          currency={currency}
          loading={loading}
        />
        <View style={styles.range}>
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

    return (
      <View style={{ marginBottom: 15 }}>
        <CoinsaneSummary
          value={nFormat(this.portfolioTotal(), currency.decimal)}
          currency={currency}
          buttons={Object.keys(currencies)}
          subValue={round(chart.pct, 2)}
          updateCurrency={this.updateCurrency}
          leftTitle={I18n.t('coins.low')}
          leftValue={low}
          rightTitle={I18n.t('coins.high')}
          rightValue={high}
          loading={loading}
          error={error}
        />
        <Swiper
          index={0}
          height={180}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.dotActive} />}
          paginationStyle={styles.pagination}
          loop={false}
        >
          <SlideChart />
          <SlidePie />
        </Swiper>
      </View>
    );
  };

  renderFooter = () => <Spacer size={20} />;

  renderEmpty = () => {
    const { loading } = this.props;
    if (loading) return null;
    return <Empty description={I18n.t('empty.portfolios')} />;
  };

  renderItem = ({
    item: {
      _id,
      amount,
      market,
    },
    index,
    section,
  }) => {
    const {
      markets,
      addCoin,
      currency,
      activePortfolio,
      collapsedList,
      removeCoin,
      loading,
    } = this.props;
    // if (!amount) return null;
    return (
      <CoinCard
        type="portfolio"
        key={_id}
        id={_id}
        amount={amount}
        market={markets.items[market]}
        currency={currency}
        showCoin={this.showCoin}
        addCoin={addCoin}
        removeCoin={removeCoin}
        activePortfolio={activePortfolio}
        isCollapsed={collapsedList.indexOf(section._id) !== -1}
        isLoading={loading}
        portfolioId={section._id}
        isLast={section.data.length - 1 === index}
      />
    );
  };

  renderSectionHeader = ({ section }) => {
    const {
      activePortfolio,
      addCoin,
      currency,
      collapsedList,
      updateCollapsed,
      loading,
      charts,
      period,
      symbol,
    } = this.props;
    const changePct = round(get(charts, `[${section._id}][${period}:${symbol}].pct`, 0), 2);
    return (
      <PortfolioHeader
        show={!activePortfolio}
        id={section._id}
        title={section.title}
        totals={section.total}
        count={section.data.length}
        addCoin={addCoin}
        currency={currency}
        changePct={changePct}
        amount={section.amount}
        updateCollapsed={updateCollapsed}
        isCollapsed={collapsedList.indexOf(section._id) !== -1}
        isLoading={loading}
      />
    );
  };

  render() {
    const {
      error,
      refreshing,
      drawer,
      addCoin,
      activePortfolio,
      portfolios,
    } = this.props;

    if (error) return <Error content={error} />;

    const HeaderTitle = () => {
      const title = get(portfolios, `${activePortfolio}.title`, I18n.t('portfolios.all'));
      return (
        <Title>
          <Icon name="ios-arrow-down" style={[styles.header__arrow, { color: colors.textGray }]} />
          &nbsp;
          <Text>{title}</Text>
        </Title>
      );
    };

    const sections = [];
    if (activePortfolio && portfolios[activePortfolio]) {
      sections.push(portfolios[activePortfolio]);
    } else {
      Object.keys(portfolios).forEach(key => sections.push(portfolios[key]));
    }

    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<HeaderTitle />}
          titleAction={() => this.portfolioSelect()}
          rightIcon="Edit"
          rightAction={() => this.editPortfolio(activePortfolio)}
          rightActive={!!activePortfolio}
        />
        <List style={base.contentContainer}>
          <SectionList
            sections={sections}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            keyExtractor={coin => coin._id}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            extraData={portfolios}
          />
          {
            activePortfolio && <LinearGradient
              colors={[colors.gradientTo, colors.gradientFrom]}
              style={base.gradientBottom}
            />
          }
        </List>
        {
          activePortfolio &&
          <Footer style={base.footer}>
            <Button
              small
              bordered
              full
              onPress={() => addCoin(activePortfolio)}
              style={base.footer__button_bordered}
            >
              <Text style={base.footer__buttonText_bordered}>{I18n.t('coins.addButton')}</Text>
            </Button>
          </Footer>
        }
      </Container>
    );
  }
}

export default Portfolios;
