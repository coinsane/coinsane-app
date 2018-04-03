import React from 'react';
import { Left, Right, Body, Text, ListItem, Thumbnail, Icon } from 'native-base';
import styles from './CoinCell.styles';
import { typography } from '../../../styles';

const imgSourceUrl = 'https://www.cryptocompare.com';

function renderRight(listItemType) {
  if (listItemType && listItemType === 'arrow') { return <Icon name="ios-arrow-forward" style={ styles.listItem__rightIcon } /> }
}

function renderLeft(listItemType, item) {
  if (listItemType && listItemType !== 'blank') { return(
    <Left>
      <Thumbnail source={{ uri: imgSourceUrl + item.imageUrl }} style={ styles.listItem__leftIcon } />
    </Left>
  ); }
}

export default ({ item, selectAction, listItemType }) => {
  return (
    <ListItem avatar style={ styles.listItemContainer } onPress={ selectAction } >
      { renderLeft(listItemType, item) }
      <Body>
        <Text style={ typography.p } >{ item.name || item.title }</Text>
        <Text style={ [typography.smallest, styles.listItem__subTitle] } >{ item.symbol }</Text>
      </Body>
      <Right style={ styles.listItem__rightIconContainer }>
        { renderRight(listItemType) }
      </Right>
    </ListItem>
  );
}