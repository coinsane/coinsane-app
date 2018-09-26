import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { Container, View, Text, Title, List } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { analytics, i18n, math } from 'src/services';

import Summary from 'src/components/_Molecules/Summary';
import { Loading, Empty } from 'src/components/Base';

import Header from 'src/components/_Organisms/Header';
import CoinCard from 'src/components/_Organisms/CoinCard/CoinCard.organism';
import SearchBar from 'src/components/_Molecules/SearchBar/SearchBar.molecula';

import { base } from 'src/styles';
import styles from './Market.styles';

class Market extends Component {
  static propTypes = {
    drawer: PropTypes.shape({}).isRequired,
    currencies: PropTypes.shape({}).isRequired,
    symbol: PropTypes.string.isRequired,
    currency: PropTypes.shape({}).isRequired,
    markets: PropTypes.shape({
      loading: PropTypes.bool,
      cap: PropTypes.shape({}),
      list: PropTypes.arrayOf(PropTypes.string),
      items: PropTypes.shape({}),
    }).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
  };

  componentDidMount() {
    analytics.logContentView('Market', 'Market', 'market');
    const {
      getAvailableMarkets,
    } = this.props;
    getAvailableMarkets({});
  }

  getData = () => {
    const {
      markets,
    } = this.props;
    return markets.list;
  };

  handleRefresh = () => {
    const {
      markets,
      getAvailableMarkets,
    } = this.props;
    if (!markets.refreshing) getAvailableMarkets({ refreshing: true });
  };

  handleLoadMore = () => {
    const {
      markets,
      changeSearchTerm,
    } = this.props;
    if (!markets.loading && markets.count !== markets.list.length) {
      const q = markets.searchTerm || '';
      changeSearchTerm({
        skip: markets.list.length,
        q,
      });
    }
  };

  showCoin = ({ market }) => {
    const { symbol } = market;
    analytics.trackEvent('markets', 'showCoin');
    Actions.coin({ match: { params: { market } } });
  };

  renderHeader = () => {
    const {
      currencies,
      symbol,
      currency,
      updateCurrency,
      markets,
    } = this.props;
    const { total = 0, volume = 0 } = markets.cap[symbol] || {};
    return (
      <View>
        <Summary
          value={math.nFormat(total, 2)}
          currency={currency}
          buttons={Object.keys(currencies)}
          subValue={`${i18n.t('markets.vol24')}: ${math.nFormat(volume, 2)}`}
          updateCurrency={updateCurrency}
          loading={markets.cap.loading}
          error={markets.cap.error}
        />
        <View style={styles.market__search}>
          <SearchBar />
        </View>
        {
          !!markets.list.length &&
          <View style={styles.market__header}>
            <Text style={[styles.market__header_text, styles.market__header_row1]}>{i18n.t('markets.coin')}</Text>
            <Text style={[styles.market__header_text, styles.market__header_row2]}>{i18n.t('markets.mcap')}/{i18n.t('markets.vol24')}</Text>
            <Text style={[styles.market__header_text, styles.market__header_row3]}>{i18n.t('markets.price')}</Text>
          </View>
        }
      </View>
    );
  };

  renderFooter = () => {
    const {
      markets,
    } = this.props;
    if (!markets.loading) return null;
    return <Loading size={25} />;
  };

  renderEmpty = () => {
    const {
      markets,
    } = this.props;
    if (markets.loading) return null;
    return <Empty description={i18n.t('empty.search')} />;
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const {
      drawer,
      currency,
      markets,
    } = this.props;

    return (
      <Container>
        <Header
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Title style={base.title}>{i18n.t('navigation.markets')}</Title>}
          // rightIcon="Filter"
          // rightAction={() => {}}
        />
        <List style={base.contentContainer}>
          <FlatList
            data={this.getData()}
            renderItem={({ item }) => (
              <CoinCard
                type="market"
                order={markets.items[item].rank}
                market={markets.items[item]}
                currency={currency}
                showCoin={this.showCoin}
                addCoin={() => {}}
                removeCoin={() => {}}
              />
            )}
            keyExtractor={item => item}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={this.renderEmpty}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.01}
            onRefresh={this.handleRefresh}
            refreshing={markets.refreshing}
            extraData={markets}
          />
        </List>
      </Container>
    );
  }
}

export default Market;
