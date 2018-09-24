import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';

import {
  IDrawer,
  INavigation,
} from 'src/models/INavigationState';
import {
  setDrawerActions,
  setDrawerClose,
} from 'src/redux/state/navigation/navigation.actioncreators';
import { colors } from 'src/native/styles';

import DrawerContent from './components/DrawerContent';


interface IProps {
  navigation: INavigation;
  setDrawerActions: (payload: IDrawer) => void;
  setDrawerClose: (payload: boolean) => void;
  children: any;
}

class NavigationDrawer extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.tweenHandler = this.tweenHandler.bind(this);
  }

  tweenHandler = (ratio: number) => ({
    main: {
      transform: [{ scale: 1 - (ratio / 5.1) }],
      left: ratio * 200,
    },
  });

  render() {
    const {
      navigation,
      setDrawerActions,
      setDrawerClose,
    } = this.props;
    return (
      <Drawer
        ref={(drawer: IDrawer) => {
          if (drawer && Object.getOwnPropertyNames(navigation.drawer).length === 0) {
            setDrawerActions({
              open: drawer.open,
              close: drawer.close,
            });
          }
        }}
        openDrawerOffset={200}
        content={<DrawerContent />}
        tweenHandler={this.tweenHandler}
        tweenDuration={100}
        acceptTap
        tapToClose
        onCloseStart={() => setDrawerClose(true)}
        onClose={() => setDrawerClose(false)}
        style={{ backgroundColor: colors.bgGray, borderBottomWidth: 0 }}
      >
        {this.props.children[0]}
      </Drawer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  navigation: state.navigation,
});

const mapDispatchToProps = {
  setDrawerActions,
  setDrawerClose,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
