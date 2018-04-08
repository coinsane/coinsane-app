import React from 'react';
import PropTypes from 'prop-types';
import { Text, Content, Container, Footer, Button, View } from 'native-base';
import Spacer from '../Spacer/Spacer.component';

import { base } from '../../styles';

import SummaryCell from '../_Molecules/SummaryCell/SummaryCell.molecula';
import TransactionItem from '../_Molecules/TransactionItem/TransactionItem.molecula';

const CoinTabTransactions = ({}) => {
  const summaryList = [
    {
      label: 'Coins',
      value: '5.0'
    },
    {
      label: 'Total',
      value: '$1,936.00'
    },
    {
      label: 'Profit',
      value: '-16.88%'
    },
  ];

  const transactionsList = [
    {
      time: '9 Feb. 2018 at 22:41',
      category: 'Travel',
      value: '5.00',
      currencyAmount: '1936',
      type: 'Buy',
    },
    {
      time: '2 Feb. 2018 at 13:22',
      category: 'Travel',
      value: '5.00',
      currencyAmount: '-1566',
      type: 'Sell',
    },
  ];

  const addTransaction = () => {};

  return (
    <Container style={base.contentContainer}>
      <Content>
        <SummaryCell
          summaryList={summaryList}
          background={true}
        />
        <Spacer size={20} />
        <View>
          {transactionsList.map(({time, category, value, currencyAmount, type}, i) => (
            <TransactionItem
              key={i}
              time={time}
              category={category}
              value={value}
              currencyAmount={currencyAmount}
              type={type}
            />
          ))}
        </View>
      </Content>
      <Footer style={base.footer}>
        <Button
          small
          full
          bordered
          onPress={() => addTransaction()}
          style={base.footer__button}
        >
          <Text style={base.footer__buttonText}>+ ADD NEW TRANSACTION</Text>
        </Button>
      </Footer>
    </Container>
  );
};

CoinTabTransactions.propTypes = {
};

CoinTabTransactions.defaultProps = {
};

export default CoinTabTransactions;
