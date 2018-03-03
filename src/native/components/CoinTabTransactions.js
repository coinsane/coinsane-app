import React from 'react';
import PropTypes from 'prop-types';
import { Text, Content } from 'native-base';

import { base } from '../styles';

const CoinTabTransactions = ({

}) => {
  return (
    <Content style={base.contentContainer}>
      <Text>Transactions list</Text>
    </Content>
  );
};

CoinTabTransactions.propTypes = {
};

CoinTabTransactions.defaultProps = {
};

export default CoinTabTransactions;
