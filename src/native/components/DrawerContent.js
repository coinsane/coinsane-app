import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content, List, ListItem, Left, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setActiveMenu } from '../../actions/navigation';

import Spacer from './Spacer'
import Icon from './Icon'

class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }

  openScene(key) {
    console.log('open Actions.currentScene', Actions.currentScene)
    const { navigation } = this.props;
    if (Actions.currentScene !== key) {
      this.props.setActiveMenu(key);
      Actions[key].call();
    }
    setTimeout(() => navigation.drawer.close(), 0);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Content style={{ backgroundColor: 'transparent' }} scrollEnabled={false}>
        <Spacer size={100} />
        <List>
          {navigation.menu.map(item => (
            <ListItem key={item.icon} icon onPress={() => this.openScene(item.scene)} style={{ borderBottomWidth: 0, paddingTop: 30, paddingBottom: 30, paddingLeft: 10 }}>
              <Left>
                <Icon name={item.icon} width={28} fill={(item.active ? '#7C778C' : '#fff')} />
              </Left>
              <Body>
                <Text style={{ fontSize: 18, color: (item.active ? '#7C778C' : '#fff') }}>{item.text}</Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation
  };
};

const mapDispatchToProps = {
  setActiveMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
