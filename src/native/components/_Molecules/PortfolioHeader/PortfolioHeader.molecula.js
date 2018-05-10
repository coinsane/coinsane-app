import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Icon, Right, View, Button } from 'native-base';

import Spacer from '../../Spacer/Spacer.component';
import styles from './PortfolioHeader.styles';
import { colors } from '../../../styles/index';
import {typography} from "../../../styles";

const PortfolioHeader = ({
  id,
  show,
  title,
  count,
  addTransaction,
  changePct,
  amount,
  symbol,
  updateCollapsed,
  isCollapsed,
  isLoading,
}) => {
  if (!show) return <Spacer size={0} />;

  const fixed = symbol === 'BTC' ? 6 : 2;

  const amountSplit = amount.toString().split('.');
  let totalDisplay = amountSplit.length > 1
    ? `${amountSplit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}.${amountSplit[1].slice(0, fixed)} ${symbol}`
    : `${amount !== 0 ? amount.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'} ${symbol}`;

  const changeColor = changePct > 0 ? colors.primaryGreen : colors.primaryPink;
  let changePctDisplay = `${changePct}%`;

  return (
    <View style={styles.container}>
      <ListItem style={styles.listItem} onPress={() => updateCollapsed(id)}>
        <Body style={styles.body}>
          {
            isCollapsed ?
              <Icon name="ios-arrow-up" style={styles.body__arrowIcon} /> :
              <Icon name="ios-arrow-down" style={styles.body__arrowIcon} />
          }
          <Text numberOfLines={1} style={styles.body__text}>{title}</Text>
        </Body>
        <Right style={styles.right}>
          {
            !!amount &&
            <Text style={[styles.right__text, isLoading && typography.textPlaceholder]} numberOfLines={1}>
              <Text style={[styles.right__text, isLoading && typography.textPlaceholder]}>{totalDisplay}</Text>
              &nbsp;
              <Text style={[styles.right__text, { color: changeColor }, isLoading && typography.textPlaceholder]}>{changePctDisplay}</Text>
            </Text>
          }
        </Right>
      </ListItem>
      {
        !count && !isCollapsed &&
        <Button
          small
          bordered
          full
          style={styles.headerBtn}
          onPress={() => addTransaction(id)}
        >
          <Text style={styles.headerBtn__text}>+ ADD NEW COIN</Text>
        </Button>
      }
    </View>
  );
};

PortfolioHeader.propTypes = {
  show: PropTypes.bool,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  addTransaction: PropTypes.func.isRequired,
  updateCollapsed: PropTypes.func.isRequired,
  changePct: PropTypes.number,
  amount: PropTypes.number,
  symbol: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
};

PortfolioHeader.defaultProps = {
  show: null,
  amount: 0,
  changePct: 0,
  isCollapsed: false,
  isLoading: false,
};

export default PortfolioHeader;
