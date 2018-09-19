import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, View } from 'react-native';
import { Container, List, Text, Button, Footer, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import get from 'lodash/get';

import Config from 'src/constants/config';
import ga from 'src/lib/ga';
import I18n from 'src/i18n';

import Summary from 'src/native/components/_Molecules/Summary';

import Loading from '../Loading/Loading.component';
import Spacer from '../Spacer/Spacer.component';
import PortfolioHeader from '../_Molecules/PortfolioHeader/PortfolioHeader.molecula';
import CoinsaneButton from '../_Atoms/CoinsaneButton/CoinsaneButton.component';
import Chart from '../_Organisms/Chart/Chart.component';
import Pie from '../_Organisms/Pie/Pie.component';
import Header from 'src/native/components/_Organisms/Header';
import Onboarding from '../_Organisms/Onboarding/Onboarding.organism';
import CoinCard from '../_Organisms/CoinCard/CoinCard.organism';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
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
    onboarding: PropTypes.bool.isRequired,
    hideOnboarding: PropTypes.func.isRequired,
    period: PropTypes.string,
    getAvailableMarkets: PropTypes.func.isRequired,
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

  componentDidMount() {
    ga.trackScreenView('Portfolios');
    this.props.getAvailableMarkets({});
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
    const { symbol } = market;
    ga.trackEvent('portfolios', 'showCoin', {
      symbol,
    });
    Actions.coin({ match: { params: { market, id } } });
  };

  editPortfolio = (portfolioId) => {
    ga.trackEvent('portfolios', 'editPortfolio');
    Actions.portfolioSettings({ match: { params: { portfolioId } } });
  };

  portfolioTotal = (all) => {
    // console.log('portfolioTotal', this.props);
    const { portfolios, activePortfolio } = this.props;
    const lastTotals = {};
    if (!all && activePortfolio && activePortfolio !== 'all') {
      const { amounts } = portfolios[activePortfolio];
      return amounts;
    }
    Object.keys(portfolios).forEach((key) => {
      const { amounts, inTotal } = portfolios[key];
      if (inTotal) {
        Object.keys(amounts).forEach((currencyCode) => {
          if (!lastTotals[currencyCode]) lastTotals[currencyCode] = 0;
          lastTotals[currencyCode] += amounts[currencyCode];
        });
      }
    });
    return lastTotals;
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
        ga.trackEvent('portfolios', 'createPortfolio');
        Actions.createPortfolio();
      },
      headItem: {
        title: I18n.t('portfolios.all'),
        amounts: this.portfolioTotal(true),
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
        value: portfolios[portfolioId].amounts[symbol],
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
              value={I18n.t(`periods.period${key}`)}
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
        <Summary
          value={nFormat(this.portfolioTotal()[currency.code], currency.decimal)}
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
      portfolios,
    } = this.props;
    // if (!amount) return null;
    const service = !!get(portfolios, `${section._id}.service`, false);
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
        service={service}
      />
    );
  };

  renderSectionHeader = ({ section }) => {
    const {
      activePortfolio,
      addCoin,
      currency,
      collapsedList,
      portfolios,
      updateCollapsed,
      loading,
      charts,
      period,
      symbol,
    } = this.props;
    const changePct = round(get(charts, `[${section._id}][${period}:${symbol}].pct`, 0), 2);
    const provider = get(portfolios, `${section._id}.service.provider.name`, null);
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
        amount={section.amounts[symbol]}
        updateCollapsed={updateCollapsed}
        isCollapsed={collapsedList.indexOf(section._id) !== -1}
        isLoading={loading}
        hideAddButton={!!provider}
        provider={provider}
      />
    );
  };

  render() {
    const {
      // error,
      refreshing,
      drawer,
      addCoin,
      activePortfolio,
      portfolios,
      markets,
      onboarding,
    } = this.props;

    // if (error) return <Error content={error} />;

    const HeaderTitle = () => {
      const title = get(portfolios, `${activePortfolio}.title`, I18n.t('portfolios.all'));
      return (
        <Title>
          <Icon name="ios-arrow-down" style={[styles.header__arrow, { color: colors.textGray }]} />
          &nbsp;
          <Text style={base.title}>{title}</Text>
        </Title>
      );
    };

    const FooterButton = () => {
      if (!activePortfolio) return null;
      const { service } = portfolios[activePortfolio];
      const onPress = () => {
        if (!service) addCoin(activePortfolio);
      };
      const title = get(service, 'provider.name', I18n.t('coins.addButton'));
      return (
        <Footer style={base.footer}>
          <Button
            small
            bordered
            full
            onPress={onPress}
            style={base.footer__button_bordered}
          >
            { service && <CoinsaneIcon name={title} height={22} width={22} /> }
            <Text style={base.footer__buttonText_bordered}>{title.toUpperCase()}</Text>
          </Button>
        </Footer>
      );
    };

    const sections = [];
    if (activePortfolio && portfolios[activePortfolio]) {
      sections.push(portfolios[activePortfolio]);
    } else {
      Object.keys(portfolios).forEach(key => sections.push(portfolios[key]));
    }

    if (onboarding) {
      const market = markets.items[Config.BTC];
      if (!market) return <Loading />;
      return (
        <Onboarding
          currency={this.props.currency}
          market={market}
          hideOnboarding={this.props.hideOnboarding}
        />
      );
    }

    return (
      <Container>
        <Header
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
            !!activePortfolio && <LinearGradient
              colors={[colors.gradientTo, colors.gradientFrom]}
              style={base.gradientBottom}
            />
          }
        </List>
        <FooterButton />
      </Container>
    );
  }
}

export default Portfolios;
