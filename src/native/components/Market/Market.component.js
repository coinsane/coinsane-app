import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Title } from 'native-base';
import SGListView from 'react-native-sglistview';

import I18n from '../../../i18n';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinCard from '../_Organisms/CoinCard/CoinCard.organism';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import SearchBar from '../_Molecules/SearchBar/SearchBar.molecula';
import { nFormat } from '../../../lib/utils';

import { base } from '../../styles';
import styles from './Market.styles';

class Market extends Component {
  static propTypes = {
    drawer: PropTypes.shape({}).isRequired,
    currencies: PropTypes.shape({}).isRequired,
    currency: PropTypes.string.isRequired,
    markets: PropTypes.arrayOf(PropTypes.string).isRequired,
    coins: PropTypes.shape({}).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    cap: PropTypes.shape({}).isRequired,
  };

  getDataSource() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1._id !== r2._id });
    const markets = this.props.markets.length > 0;
    return markets ? ds.cloneWithRows(this.props.markets) : ds;
  }

  render() {
    const {
      drawer,
      currencies,
      currency,
      updateCurrency,
      coins,
      cap,
    } = this.props;

    const renderRow = market => (
      <CoinCard
        type="market"
        key={market}
        market={coins[market]}
        currency={currencies[currency]}
        showCoin={() => {}}
        addTransaction={() => {}}
        removeCoin={() => {}}
      />
    );

    const Header = () => (
      <View>
        <CoinsaneSummary
          value={cap.total_market_cap_usd}
          currency={currencies[currency]}
          buttons={Object.keys(currencies)}
          subValue={`24 Vol: ${nFormat(cap.total_24h_volume_usd, 2)}`}
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

    const Footer = () => (
      <View>
        <TouchableOpacity onPress={() => console.log('load more')}>
          <Text>Load More</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Title>{I18n.t('markets.title')}</Title>}
          rightIcon="Filter"
          rightAction={() => {}}
        />
        <Content style={base.contentContainer}>
          <SGListView
            dataSource={this.getDataSource()}
            renderRow={renderRow}
            initialListSize={10}
            stickyHeaderIndices={[]}
            onEndReachedThreshold={1}
            scrollRenderAheadDistance={1}
            pageSize={1}
            renderHeader={() => <Header />}
            renderFooter={() => <Footer />}
          />
        </Content>
      </Container>
    );
  }
}

export default Market;
