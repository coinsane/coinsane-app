import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinsaneSummary from '../_Molecules/CoinsaneSummary/CoinsaneSummary.component';
import SearchBar from '../_Molecules/SearchBar/SearchBar.molecula';

import { base } from '../../styles';

const Market = ({ drawer, currencies, updateCurrency }) => (
  <Container>
    <CoinsaneHeader
      leftIcon="Menu"
      leftAction={() => drawer.open()}
      title={<Text>Markets</Text>}
      rightIcon="Filter"
      rightAction={() => {}}
    />
    <Content padder style={base.contentContainer}>
      <CoinsaneSummary
        value={307210000000}
        currency={'USD'}
        buttons={currencies}
        changePct={17.625}
        updateCurrency={updateCurrency}
        updateChart={() => {}}
      />
      <SearchBar />
      <Text>Coming soon...</Text>
    </Content>
  </Container>
);

Market.propTypes = {
  drawer: PropTypes.shape({}).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateCurrency: PropTypes.func.isRequired,
};

export default Market;
