import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content, List, ListItem, Left, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setActiveMenu } from '../../../redux/state/navigation/navigation.actioncreators';

import Spacer from '../Spacer/Spacer.component';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './DrawerContent.styles';
import { colors } from '../../styles';

class DrawerContent extends Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    setActiveMenu: PropTypes.func.isRequired,
  };

  openScene(key) {
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
      <Content style={styles.contentContainer} scrollEnabled={false}>
        <Spacer size={100} />
        <List>
          {navigation.menu.map(item => (
            <ListItem
              key={item.icon}
              icon
              onPress={() => this.openScene(item.scene)}
              style={styles.listItem}
            >
              <Left>
                <CoinsaneIcon
                  name={item.icon}
                  width={28}
                  fill={item.active ? colors.white : colors.mediumGray}
                />
              </Left>
              <Body>
                <Text
                  numberOfLines={1}
                  style={[styles.text, { color: item.active ? colors.white : colors.mediumGray }]}
                >
                  {item.text}
                </Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
});

const mapDispatchToProps = {
  setActiveMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
