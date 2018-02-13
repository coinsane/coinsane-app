import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import DrawerContent from './DrawerContent';

import { connect } from 'react-redux';

import { setDrawerActions } from '../../actions/navigation';

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
  }

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
    return (
      <Drawer
        ref={drawer => {
          if (!this.props.navigation.drawer.open) this.props.setDrawerActions(drawer.open, drawer.close)
        }}
        openDrawerOffset={200}
        content={<DrawerContent />}
        tweenHandler={this.tweenHandler.bind(this)}
        acceptTap
        tapToClose
        style={{ backgroundColor: '#1B152D', borderBottomWidth: 0 }}
      >
        {this.props.children[0]}
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation
  };
};

const mapDispatchToProps = {
  setDrawerActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
