import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content, List, ListItem, Left, Body, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Spacer from './Spacer'

class DrawerContent extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  render() {
    const menuItems = [
      {
        action: Actions.coins,
        icon: 'planet',
        text: 'Portfolios'
      },
      {
        action: Actions.market,
        icon: 'list',
        text: 'Market'
      },
      {
        action: Actions.watchlist,
        icon: 'bookmark',
        text: 'Watchlist'
      },
      {
        action: Actions.profile,
        icon: 'contact',
        text: 'Profile'
      },
    ];

    return (
      <Content style={{ backgroundColor: '#1B152D' }} scrollEnabled={false}>
        <Spacer size={100} />
        <List>
          {menuItems.map(item => (
            <ListItem key={item.icon} icon onPress={item.action}>
              <Left>
              </Left>
              <Body>
                <Text>{item.text}</Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
    );
  }
}

export default DrawerContent;

const styles = StyleSheet.create({
  icon: {
    color: '#5956CB'
  }
})
