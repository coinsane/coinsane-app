import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SectionList, View } from 'react-native';
import { Container, List, Text, Button, Footer, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import get from 'lodash/get';

import I18n from '../../../i18n';
import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import PortfolioHeader from '../_Molecules/PortfolioHeader/PortfolioHeader.molecula';
import CoinsaneButton from '../_Atoms/CoinsaneButton/CoinsaneButton.component';
import Chart from '../_Organisms/Chart/Chart.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinCard from '../_Organisms/CoinCard/CoinCard.organism';
import Empty from '../Empty/Empty.component';

import styles from './Portfolios.styles';
import { colors, base } from '../../styles';
import { nFormat } from '../../../lib/utils';

class Portfolios extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool,
    portfolios: PropTypes.shape({}).isRequired,
    chart: PropTypes.shape({}).isRequired,
    markets: PropTypes.shape({}).isRequired,

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

  renderHeader = () => {
    const {
      currencies,
      currency,
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
          value={nFormat(this.portfolioTotal(), currency.decimal)}
          currency={currency}
          buttons={Object.keys(currencies)}
          subValue={changePct}
          updateCurrency={this.updateCurrency}
          loading={loading}
          error={error}
        />
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
    const last = section.data.length - 1 === index ? section._id : null;
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
        portfolioId={last}
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
    } = this.props;
    return (
      <PortfolioHeader
        show={!activePortfolio}
        id={section._id}
        title={section.title}
        totals={section.total}
        count={section.data.length}
        addCoin={addCoin}
        currency={currency}
        changePct={section.changePct}
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
      symbol,
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
          titleAction={() => Actions.portfolioSelect()}
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
