import React from 'react';
import { Left, Right, Body, Text, ListItem, Thumbnail, Icon } from 'native-base';
import styles from './SearchListItem.styles';
import { typography } from '../../styles';

const imgSourceUrl = 'https://www.cryptocompare.com';

export default ({ coin }) => {
  return (
    <ListItem avatar style={ styles.listItemContainer }>
      <Left>
        <Thumbnail source={{ uri: imgSourceUrl + coin.imageUrl }} style={ styles.listItem__leftIcon } />
      </Left>
      <Body>
        <Text style={ typography.p } >{ coin.name }</Text>
        <Text style={ [typography.smallest, styles.listItem__subTitle] } >{ coin.symbol }</Text>
      </Body>
      <Right style={ styles.listItem__rightIconContainer }>
        <Icon name="ios-arrow-forward" style={ styles.listItem__rightIcon } />
      </Right>
    </ListItem>
  );
}