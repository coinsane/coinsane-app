import React, { Component } from 'react';
import { SectionList, SectionListData, View } from 'react-native';
import { Container, List, Text, Button, Footer, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import get from 'lodash/get';

import Config from 'src/constants/config';
import { analytics, i18n, math } from 'src/services';

import { ICurrencies, ICurrency } from 'src/models/ICurrencyState';
import { IDrawer } from 'src/models/INavigationState';
import { IPortfolios, IAmount, IChartData, ICharts, IPortfolio, IPortfolioCoin } from 'src/models/IPortfolioState';
import { IMarkets, IMarket } from 'src/models/IMarketState';
import { ICoins, ICoin } from 'src/models/ICoinState';

import { colors, base } from 'src/styles';

import { Loading, Empty, Spacer } from 'src/components/Base';
import Summary from 'src/components/_Molecules/Summary';
import Header from 'src/components/_Organisms/Header';

import PortfolioHeader from 'src/components/_Molecules/PortfolioHeader/PortfolioHeader.molecula';
import CoinsaneButton from 'src/components/_Atoms/CoinsaneButton/CoinsaneButton.component';
import Chart from 'src/components/_Organisms/Chart/Chart.component';
import Pie from 'src/components/_Organisms/Pie/Pie.component';
import Onboarding from 'src/components/_Organisms/Onboarding/Onboarding.organism';
import CoinCard from 'src/components/_Organisms/CoinCard/CoinCard.organism';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './Portfolios.styles';

interface IProps {
  error: string;
  loading: boolean;
  refreshing: boolean;

  portfolios: IPortfolios;
  chart: IChartData;
  charts: ICharts;
  markets: IMarkets;
  coins: ICoins;

  selectPortfolio: (id?: string) => void;
  fetchPortfolios: (payload: {}) => void;
  updatePortfolioChart: (payload: {}) => void;
  updatePortfolioPeriod: (payload: {}) => void;
  updatePortfolioCurrency: (payload: {}) => void;
  addCoin: (activePortfolio?: string) => void;
  removeCoin: () => void;
  updateCollapsed: () => void;
  hideOnboarding: () => void;
  getAvailableMarkets: (payload: {}) => void;

  drawer: IDrawer;
  activePortfolio: string;
  collapsedList: string[];
  periods: string[];
  currencies: ICurrencies;
  currency: ICurrency;
  symbol: string;
  onboarding: boolean;
  period: string;
}

class Portfolios extends Component<IProps> {
  static defaultProps = {
    error: null,
    activePortfolio: null,
    period: null,
    refreshing: false,
  };

  constructor(props: IProps) {
    super(props);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.updatePeriod = this.updatePeriod.bind(this);
  }

  componentDidMount() {
    analytics.logContentView('Portfolios', 'Portfolios', 'portfolios');
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

  updatePeriod(period: string) {
    const {
      activePortfolio,
      symbol,
      updatePortfolioPeriod,
    } = this.props;
    updatePortfolioPeriod({ period, symbol, portfolio: activePortfolio });
  }

  updateCurrency = (symbol: string) => {
    const {
      activePortfolio: portfolio,
      period,
      updatePortfolioCurrency,
    } = this.props;
    updatePortfolioCurrency({ symbol, period, portfolio });
  };

  showCoin = (params: { market: IMarket, id: string }) => {
    analytics.trackEvent('portfolios', 'showCoin');
    Actions.coin({ match: { params } });
  };

  editPortfolio = (portfolioId: string) => {
    analytics.trackEvent('portfolios', 'editPortfolio');
    Actions.portfolioSettings({ match: { params: { portfolioId } } });
  };

  portfolioTotal = (all?: boolean): IAmount => {
    const { portfolios, activePortfolio } = this.props;
    const lastTotals: IAmount = {};
    if (!all && activePortfolio && activePortfolio !== 'all') {
      const { amounts } : IPortfolio = portfolios[activePortfolio];
      Object.keys(amounts).forEach((symbol: string) => {
        if (!lastTotals[symbol]) lastTotals[symbol] = 0;
        lastTotals[symbol] += amounts[symbol];
      });
      return lastTotals;
    }
    Object.keys(portfolios).forEach((key) => {
      const { amounts, inTotal } : IPortfolio = portfolios[key];
      if (inTotal) {
        Object.keys(amounts).forEach((symbol: string) => {
          if (!lastTotals[symbol]) lastTotals[symbol] = 0;
          lastTotals[symbol] += parseFloat(amounts[symbol]);
        });
      }
    });
    return lastTotals;
  };

  portfolioSelect() {
    const { activePortfolio } = this.props;
    Actions.selector({
      listName: 'portfolios',
      title: i18n.t('portfolios.titleChoose'),
      listItemType: 'check',
      activeItem: activePortfolio,
      selectAction: (item) => {
        this.props.selectPortfolio(item._id);
        Actions.pop();
      },
      footerTitle: i18n.t('portfolios.addButton'),
      footerAction: () => {
        Actions.pop();
        analytics.trackEvent('portfolios', 'createPortfolio');
        Actions.createPortfolio();
      },
      headItem: {
        title: i18n.t('portfolios.all'),
        amounts: this.portfolioTotal(true),
        selectAction: () => {
          this.props.selectPortfolio();
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

    let portfolioItems: { value: number, symbol: string }[] = [];
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
    const getCoinPrice = (market: IMarket) => get(market, `prices[${symbol}].price`, 0);
    const items: ICoin[] = [];

    if (portfolioItems) {
      portfolioItems.forEach((item: ICoin) => {
        if (item.value && item.symbol) {
          total += item.value;
          items.push(item);
          return;
        }
        if (coins[item._id]) {
          const price = getCoinPrice(markets[item.market]);
          const value = +(coins[item._id].amount * price).toFixed(2);
          if (value > 0) {
            total += value;
            items.push({
              value,
              symbol: markets[item.market].symbol,
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
        symbol: i18n.t('portfolios.others'),
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
    } = this.props;

    const decimal = currency.decimal > 6 ? 6 : currency.decimal;
    const low = chart.low && math.nFormat(chart.low, decimal);
    const high = chart.high && math.nFormat(chart.high, decimal);

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
              value={i18n.t(`periods.period${key}`)}
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
          value={math.nFormat(this.portfolioTotal()[currency.code], currency.decimal)}
          currency={currency}
          buttons={Object.keys(currencies)}
          subValue={math.round(chart.pct, 2)}
          updateCurrency={this.updateCurrency}
          leftTitle={i18n.t('coins.low')}
          leftValue={low}
          rightTitle={i18n.t('coins.high')}
          rightValue={high}
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
    if (loading) return <Spacer />;
    return <Empty description={i18n.t('empty.portfolios')} />;
  };

  renderItem = (info: { item: IPortfolioCoin, index: number, section: SectionListData<IPortfolio> }) => {
    const {
      item,
      index,
      section,
    } = info;
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
        key={item._id}
        id={item._id}
        amount={item.amount}
        market={markets[item.market]}
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

  renderSectionHeader = (info: { section: SectionListData<IPortfolio> }) => {
    const { section } = info;
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
    const changePct = math.round(get(charts, `[${section._id}][${period}:${symbol}].pct`, 0), 2);
    const provider = get(portfolios, `${section._id}.service.provider.name`, null);
    return (
      <PortfolioHeader
        show={!activePortfolio}
        id={section._id}
        title={section.title}
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
      const title = get(portfolios, `${activePortfolio}.title`, i18n.t('portfolios.all'));
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
      const title = get(service, 'provider.name', i18n.t('coins.addButton'));
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

    const sections: IPortfolio[] = [];
    if (activePortfolio && portfolios[activePortfolio]) {
      sections.push(portfolios[activePortfolio]);
    } else {
      Object.keys(portfolios).forEach(key => sections.push(portfolios[key]));
    }

    if (onboarding) {
      const market = markets[Config.BTC];
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
