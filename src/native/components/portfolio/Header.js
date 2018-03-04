import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Left, Right, View, Button } from 'native-base';
import Spacer from '../Spacer';
import Icon from '../Icon';

const PortfolioHeader = ({ id, show, title, totals, count, addCoin, changePct }) => {
  if (!show) return <Spacer size={15} />;

  const totalDisplay = totals && totals.USD ? `$${totals.USD.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0.00';
  // const changeColor = changePct && changePct.USD && changePct.USD > 0 ? '#31E981' : '#F61067';
  // const changePctDisplay = changePct && changePct.USD ? `${changePct.USD.toFixed(2)}%` : '0%';
  const changeColor = changePct && parseFloat(changePct) > 0 ? '#31E981' : '#F61067';
  const changePctDisplay = `${changePct}%`;

  return (
    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
      <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 1, paddingRight: 1, backgroundColor: 'transparent', borderBottomWidth: 0, marginBottom: 4 }}>
        <Body style={{ flex: .6, flexDirection: 'row', flexWrap:'nowrap' }}>
          <Icon name='Arrow' width={15} height={15} fill={'#8D8A96'} style={{ transform: [{ rotate: '270deg'}, { translateX: -4 }], marginRight: 8 }} />
          <Text numberOfLines={1} style={{ marginLeft: 0, marginRight: 0, fontSize: 16, fontFamily: 'Lato-Bold', color: '#8D8A96' }}>{title}</Text>
        </Body>
        <Right style={{ flex: .4 }}>
          <Text numberOfLines={1}>
            <Text style={{ color: '#8D8A96', fontSize: 12, fontFamily: 'Lato-Regular' }}>{totalDisplay}</Text>  <Text style={{ color: changeColor, fontSize: 12, fontFamily: 'Lato-Regular' }}>{changePctDisplay}</Text>
          </Text>
        </Right>
      </ListItem>
      {
        !count &&
        <Button small bordered full
          style={{ borderColor: '#2F2A40', borderRadius: 5, paddingTop: 15, paddingBottom: 15 }}
          onPress={() => addCoin(id)}
        >
          <Text style={{ color: '#8D8A96', fontWeight: 'normal' }}>+ ADD NEW COIN</Text>
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
  changePct: PropTypes.string,
};

PortfolioHeader.defaultProps = {
  show: null
};

export default PortfolioHeader;
