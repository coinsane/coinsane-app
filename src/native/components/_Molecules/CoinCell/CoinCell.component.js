import React from 'react';
import PropTypes from 'prop-types';
import { Left, Right, Body, Text, ListItem, Icon } from 'native-base';
import FastImage from 'react-native-fast-image';

import styles from './CoinCell.styles';

const CoinCell = ({ item, selectAction, listItemType }) => {
  const imgSourceUrl = 'https://www.cryptocompare.com';

  const RenderRight = () => {
    if (!listItemType || listItemType === 'blank') return null;
    return (
      <Right style={styles.listItem__right}>
        <Icon name="ios-arrow-forward" style={styles.listItem__rightIcon} />
      </Right>
    );
  };

  const RenderLeft = () => {
    if (!listItemType || listItemType === 'blank' || !item.imageUrl) return null;
    const source = { uri: imgSourceUrl + item.imageUrl };
    return (
      <Left>
        <FastImage source={source} style={styles.listItem__thumbnail} />
      </Left>
    );
  };

  return (
    <ListItem avatar style={styles.listItemContainer} onPress={selectAction}>
      <RenderLeft />
      <Body style={styles.listItem__body}>
        <Text numberOfLines={1} style={styles.listItem__text} >{item.name || item.title}</Text>
        <Text numberOfLines={1} style={styles.listItem__text_footer}>{item.symbol}</Text>
      </Body>
      <RenderRight />
    </ListItem>
  );
};

export default CoinCell;

CoinCell.propTypes = {
  item: PropTypes.shape({}).isRequired,
  selectAction: PropTypes.func.isRequired,
  listItemType: PropTypes.string,
};

CoinCell.defaultProps = {
  listItemType: 'blank',
};
