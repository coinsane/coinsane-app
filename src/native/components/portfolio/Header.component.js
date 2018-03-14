import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Left, Right, View, Button } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import Icon from '../Icon/Icon.component';
import styles from './Header.styles';
import { Actions } from 'react-native-router-flux';
import { typography, colors } from '../../styles';

const PortfolioHeader = ({ id, show, title, totals, count, addCoin, changePct, amount, symbol }) => {
  if (!show) return <Spacer size={15} />;

  const fixed = 6;

  const amountSplit = amount.toString().split('.');
  const totalDisplay = amountSplit.length > 1
    ? `${amountSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${amountSplit[1].slice(0, fixed)} ${symbol}`
    : `${amount !== 0 ? amount.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'} ${symbol}`

  // const totalDisplay = amount ? `${amount.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${symbol}` : `0 ${symbol}`;
  // const changeColor = changePct && changePct.USD && changePct.USD > 0 ? '#31E981' : '#F61067';
  // const changePctDisplay = changePct && changePct.USD ? `${changePct.USD.toFixed(2)}%` : '0%';
  const changeColor = changePct && parseFloat(changePct) > 0 ? colors.primaryGreen : colors.primaryPink;
  const changePctDisplay = `${changePct}%`;

  return (
    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
      <ListItem style={styles.listItemContainer}>
        <Body style={styles.body}>
          <Icon name='Arrow' width={15} height={15} fill={colors.textGray} style={[styles.body__arrowIcon]} />
          <Text numberOfLines={1} style={styles.body__text}>{title}</Text>
        </Body>
        <Right style={styles.right}>
          <Text numberOfLines={1}>
            <Text style={styles.right__text}>{totalDisplay}</Text>  <Text style={{ color: changeColor, fontSize: typography.size12, fontFamily: typography.fontRegular }}>{changePctDisplay}</Text>
          </Text>
        </Right>
      </ListItem>
      {
        !count &&
        <Button
          small
          bordered
          full
          style={styles.headerBtn}
          onPress={() => Actions.selectCoin()}
        >
          <Text style={styles.headerBtn__text}>+ ADD NEW COIN</Text>
        </Button>
      }
    </View>
  );
};

PortfolioHeader.propTypes = {
  show: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.number,
  totals: PropTypes.shape({}),
  addCoin: PropTypes.func,
  changePct: PropTypes.number,
  amount: PropTypes.number,
};

PortfolioHeader.defaultProps = {
  show: null,
  amount: 0,
  changePct: 0,
};

export default PortfolioHeader;
