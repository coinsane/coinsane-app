import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, View, Text } from 'native-base';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinCard from '../_Organisms/CoinCard/CoinCard.organism';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import SearchBar from '../_Molecules/SearchBar/SearchBar.molecula';
import { nFormat } from '../../../lib/utils';

import { base } from '../../styles';

class Market extends Component {
  static propTypes = {
    drawer: PropTypes.shape({}).isRequired,
    currencies: PropTypes.shape({}).isRequired,
    markets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    updateCurrency: PropTypes.func.isRequired,
    cap: PropTypes.shape({}).isRequired,
  };

  render() {
    const {
      drawer,
      currencies,
      updateCurrency,
      markets,
      cap,
    } = this.props;

    const currency = 'USD';

    const getCoinPrice = market => market.prices[currency].price;
    const getPctChange = market => market.prices[currency].changePctDay;

    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Text>Markets</Text>}
          rightIcon="Filter"
          rightAction={() => {}}
        />
        <Content style={base.contentContainer}>
          <CoinsaneSummary
            value={cap.total_market_cap_usd}
            currency={currency}
            buttons={Object.keys(currencies)}
            subValue={`24 Vol: ${nFormat(cap.total_24h_volume_usd, 2)}`}
            updateCurrency={updateCurrency}
          />
          <SearchBar />
          <View>
            {
              markets.map(market => {
                return (
                  <CoinCard
                    type="market"
                    key={market.order}
                    market={market}
                    currency={currencies[currency]}
                    showCoin={() => {}}
                    addTransaction={() => {}}
                    removeCoin={() => {}}
                  />
                )
              })
            }
          </View>
        </Content>
      </Container>
    );
  }
}

export default Market;
