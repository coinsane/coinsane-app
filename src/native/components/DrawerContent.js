import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content, List, ListItem, Left, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';

import Spacer from './Spacer'
import Icon from './Icon'

class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  openScene(key) {
    this.props.closeDrawer();
    Actions[key].call();
  }

  render() {
    // console.log('Actions', Actions)
    console.log('Actions.currentScene', Actions.currentScene)
    const menuItems = [
      {
        action: () => this.openScene('coins'),
        icon: 'planet',
        text: 'Portfolios',
        color: Actions.currentScene === 'coins' ? '#7C778C' : '#fff'
      },
      {
        action: () => this.openScene('market'),
        icon: 'list',
        text: 'Market',
        color: Actions.currentScene === 'market' ? '#7C778C' : '#fff'
      },
      // {
      //   action: () => Actions.watchlist,
      //   icon: 'bookmark',
      //   text: 'Watchlist',
      //   color: Actions.currentScene === 'watchlist' ? '#7C778C' : '#fff'
      // },
      {
        action: () => this.openScene('profile'),
        icon: 'contact',
        text: 'Settings',
        color: Actions.currentScene === 'profile' ? '#7C778C' : '#fff'
      },
    ];

    return (
      <Content style={{ backgroundColor: 'transparent' }} scrollEnabled={false}>
        <Spacer size={100} />
        <List>
          {menuItems.map(item => (
            <ListItem key={item.icon} icon onPress={item.action} style={{ borderBottomWidth: 0, paddingTop: 30, paddingBottom: 30, paddingLeft: 10 }}>
              <Left>
                <Icon name="Portfolio" width={20} fill={item.color} />
              </Left>
              <Body>
                <Text style={{ fontSize: 18, paddingLeft: 5, color: item.color }}>{item.text}</Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
    );
  }
}

export default DrawerContent;
