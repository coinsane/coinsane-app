import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, List, ListItem, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { setActiveMenu } from '../../../redux/state/navigation/navigation.actioncreators';

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
      Actions.pop();
      Actions[key].call();
    }
    setTimeout(() => navigation.drawer.close(), 0);
  }

  render() {
    const { navigation } = this.props;
    const getColor = (active) => {
      return active ? colors.white : colors.mediumGray;
    };

    return (
      <Container style={styles.contentContainer}>
        <List style={styles.list}>
          {navigation.menu.map(item => (
            <ListItem
              key={item.icon}
              icon
              onPress={() => this.openScene(item.scene)}
              style={styles.listItem}
            >
              <CoinsaneIcon
                name={item.icon}
                width={28}
                fill={getColor(item.active)}
              />
              <Text
                numberOfLines={1}
                style={[styles.text, { color: getColor(item.active) }]}
              >
                {item.text}
              </Text>
            </ListItem>
          ))}
        </List>
      </Container>
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
