import React from 'react';
import PropTypes from 'prop-types';
import { Left, Right, Body, Text, ListItem } from 'native-base';
import FastImage from 'react-native-fast-image';

import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import { nFormat, cFormat } from '../../../../lib/utils';
import styles from './CoinCell.styles';
import { colors } from '../../../styles';

const CoinCell = ({
  item,
  selectAction,
  listItemType,
  currency,
  active,
}) => {
  const RenderRight = () => {
    switch (listItemType) {
      case 'check': return active ? <CoinsaneIcon name="Check" width={28} fill={colors.white} /> : null;
      case 'arrow': return <CoinsaneIcon name="ChevronRight" width={16} fill={colors.textGray} />;
      default: return null;
    }
  };

  const RenderLeft = () => {
    if (!item.imageUrl) return null;
    const source = { uri: `https://www.cryptocompare.com${item.imageUrl}` };
    return (
      <Left style={styles.listItem__left}>
        <FastImage source={source} style={styles.listItem__thumbnail} />
      </Left>
    );
  };

  const title = item.name || item.title;
  const subtitle = item.symbol ?
    item.symbol :
    item.amount ?
      cFormat(nFormat(item.amount, currency.decimal), currency.symbol) :
      null;

  return (
    <ListItem style={styles.listItemContainer} onPress={selectAction}>
      <RenderLeft />
      <Body style={styles.listItem__body}>
        <Text numberOfLines={1} style={styles.listItem__text}>{title}</Text>
        {
          subtitle &&
          <Text numberOfLines={1} style={styles.listItem__text_footer}>{subtitle}</Text>
        }
      </Body>
      <Right style={styles.listItem__right}>
        <RenderRight />
      </Right>
    </ListItem>
  );
};

CoinCell.propTypes = {
  item: PropTypes.shape({}).isRequired,
  selectAction: PropTypes.func.isRequired,
  listItemType: PropTypes.string,
  active: PropTypes.bool,
  currency: PropTypes.shape({}),
};

CoinCell.defaultProps = {
  listItemType: null,
  active: false,
  currency: {},
};

export default CoinCell;
