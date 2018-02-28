import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Left, Right, View, Button } from 'native-base';
import Spacer from '../Spacer';
import Icon from '../Icon';
import styles from '../../styles';

const { portfolio } = styles.components;
const colors = styles.variables.colors;

const PortfolioHeader = ({ id, show, title, totals, count, addCoin, changePct }) => {
  if (!show) return <Spacer size={15} />;

  const totalDisplay = totals && totals.USD ? `$${totals.USD.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0.00';
  const changeColor = changePct && changePct.USD && changePct.USD > 0 ? colors.primaryGreen : colors.primaryPink;
  const changePctDisplay = changePct && changePct.USD ? `${changePct.USD.toFixed(2)}%` : '0%';

  return (
    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
      <ListItem style={portfolio.listItemContainer}>
        <Body style={portfolio.body}>
          <Icon name='Arrow' width={15} height={15} fill={colors.textGray} style={portfolio.bodyArrowIcon} />
          <Text numberOfLines={1} style={portfolio.bodyText}>{title}</Text>
        </Body>
        <Right style={portfolio.right}>
          <Text numberOfLines={1}>
            <Text style={portfolio.rightText}>{totalDisplay}</Text>  <Text style={{ color: changeColor, fontSize: styles.variables.size12, fontFamily: styles.variables.fontRegular }}>{changePctDisplay}</Text>
          </Text>
        </Right>
      </ListItem>
      {
        !count &&
        <Button small bordered full
          style={portfolio.headerBtn}
          onPress={() => addCoin(id)}
        >
          <Text style={portfolio.headerBtnText}>+ ADD NEW COIN</Text>
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
  changePct: PropTypes.shape({}),
};

PortfolioHeader.defaultProps = {
  show: null
};

export default PortfolioHeader;
