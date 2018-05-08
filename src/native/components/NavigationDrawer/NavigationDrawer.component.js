import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';

import DrawerContent from '../DrawerContent/DrawerContent.component';
import { setDrawerActions } from '../../../redux/state/navigation/navigation.actioncreators';

import { colors } from '../../styles';

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.tweenHandler = this.tweenHandler.bind(this);
  }

  tweenHandler(ratio) {
    return {
      main: {
        transform: [
          { scale: 1 - ratio / 5.1 },
        ],
        left: ratio * 200,
      },
    };
  }

  render() {
    return (
      <Drawer
        ref={(drawer) => {
          if (!this.props.navigation.drawer.open) this.props.setDrawerActions(drawer.open, drawer.close);
        }}
        openDrawerOffset={200}
        content={<DrawerContent />}
        tweenHandler={this.tweenHandler}
        acceptTap
        tapToClose
        style={{ backgroundColor: colors.bgGray, borderBottomWidth: 0 }}
      >
        {this.props.children[0]}
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
});

const mapDispatchToProps = {
  setDrawerActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
