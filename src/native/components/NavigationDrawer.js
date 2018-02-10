import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import DrawerContent from './DrawerContent';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

import { Container, Header, Left, Button, Body, Title, Right } from 'native-base';
import { StatusBar } from 'react-native';
import Icon from './Icon';

export default class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);

  }
  closeDrawer() {
    console.log('this.drawer openDrawer')
    this.drawer.close()
  };

  openDrawer() {
    console.log('this.drawer openDrawer')
    this.drawer.open()
  };

  tweenHandler(ratio) {
    return {
      main: {
        transform: [
          { scale: 1-ratio/5.1 }
        ],
        left: ratio * 200
      },
    }
  }

  render(){
    // console.log('>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<', this.props)
    // const state = this.props.navigationState;
    // const children = state.children;
    // console.log("NavigationDrawer >> state >>",state)
    // console.log("NavigationDrawer >> children >>",children)
    // console.log('this.props.portfolios', this.props.portfolios)
    const activePortfolio = this.props.portfolios ? this.props.portfolios.selected : null;

    // console.log('this.props.children 1', this.props)
    // console.log('this.props.children 2', Object.keys(this.props.children[1]), this.props.children[1][0].key)
    // console.log('Drawer Actions.currentScene', Actions.currentScene)

    // let display = Actions.currentScene === 'watchlist' ? this.props.children[1] : this.props.children[0]

    // console.log('Actions', Actions)
    // console.log('this.props.children[0]', Object.keys(this.props.children[0]))
    // console.log('Actions._state.routes[0]', Object.keys(Actions._state.routes[0]))

    return (
      <Drawer
        ref={c => this.drawer = c}
        openDrawerOffset={200}
        content={<DrawerContent closeDrawer={this.closeDrawer} />}
        tweenHandler={this.tweenHandler.bind(this)}
        acceptTap
        tapToClose
        style={{ backgroundColor: '#1B152D', borderBottomWidth: 0 }}
      >
        <Container>
          <Header style={{ borderBottomWidth: 0 }}>
            <StatusBar barStyle="light-content"/>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='Menu' height='22' width='22' fill='#fff' />
              </Button>
            </Left>
            <Body>
              <Title>{activePortfolio ? this.props.portfolios[0].title : 'All Portfolios'}</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          {this.props.children[0]}
        </Container>
      </Drawer>
    );
  }
}
