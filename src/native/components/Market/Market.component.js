import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { Container, View, Text, Title, List } from 'native-base';

import I18n from '../../../i18n';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinCard from '../_Organisms/CoinCard/CoinCard.organism';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import SearchBar from '../_Molecules/SearchBar/SearchBar.molecula';
import Loading from '../Loading/Loading.component';
import Empty from '../Empty/Empty.component';

import { nFormat } from '../../../lib/utils';

import { base } from '../../styles';
import styles from './Market.styles';

class Market extends Component {
  static propTypes = {
    drawer: PropTypes.shape({}).isRequired,
    currencies: PropTypes.shape({}).isRequired,
    currency: PropTypes.string.isRequired,
    markets: PropTypes.shape({
      loading: PropTypes.bool,
      cap: PropTypes.shape({}),
      list: PropTypes.arrayOf(PropTypes.string),
      items: PropTypes.shape({}),
    }).isRequired,
    getCurrency: PropTypes.shape({}).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
  };

  componentDidMount() {
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
      getAvailableMarkets,
    } = this.props;
    if (!markets.loading) {
      if (markets.searchTerm) {
        changeSearchTerm({
          skip: markets.list.length,
          q: markets.searchTerm,
        });
      } else {
        getAvailableMarkets({ skip: markets.list.length });
      }
    }
  };

  renderHeader = () => {
    const {
      currencies,
      currency,
      getCurrency,
      updateCurrency,
      markets,
    } = this.props;
    return (
      <View>
        <CoinsaneSummary
          value={markets.cap[`total_market_cap_${currency.toLowerCase()}`] || 0}
          currency={getCurrency}
          buttons={Object.keys(currencies)}
          subValue={`24 Vol: ${nFormat(markets.cap[`total_24h_volume_${currency.toLowerCase()}`] || 0, 2)}`}
          updateCurrency={updateCurrency}
        />
        <SearchBar />
        <View style={styles.market__header}>
          <Text style={[styles.market__header_text, styles.market__header_row1]}>{I18n.t('markets.coin')}</Text>
          <Text style={[styles.market__header_text, styles.market__header_row2]}>{I18n.t('markets.mcap')}/{I18n.t('markets.vol24')}</Text>
          <Text style={[styles.market__header_text, styles.market__header_row3]}>{I18n.t('markets.price')}</Text>
        </View>
      </View>
    );
  };

  renderFooter = () => {
    const {
      markets,
    } = this.props;
    // if (!markets.loading) return null;
    return <Loading size={25} />;
  };

  renderEmpty = () => {
    const {
      markets,
    } = this.props;
    if (markets.loading) return null;
    return <Empty description={I18n.t('empty.search')} />;
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const {
      drawer,
      getCurrency,
      markets,
    } = this.props;

    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Title>{I18n.t('markets.title')}</Title>}
          rightIcon="Filter"
          rightAction={() => {}}
        />
        <List style={base.contentContainer}>
          <FlatList
            data={this.getData()}
            renderItem={({ item, index }) => (
              <CoinCard
                type="market"
                order={index + 1}
                market={markets.items[item]}
                currency={getCurrency}
                showCoin={() => {}}
                addTransaction={() => {}}
                removeCoin={() => {}}
              />
            )}
            keyExtractor={item => item}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={this.renderEmpty}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
            onRefresh={this.handleRefresh}
            refreshing={markets.refreshing}
            initialNumToRender={10}
          />
        </List>
      </Container>
    );
  }
}

export default Market;
