import React from 'react';
import { Container, List, ListItem, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  INavigation,
} from 'src/models/INavigationState';

import { setActiveMenu } from 'src/actions/navigationActions';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import { colors } from 'src/styles';

import styles from './DrawerContent.styles';

interface IProps {
  navigation: INavigation;
  setActiveMenu: (key: string) => void;
}

class DrawerContent extends React.PureComponent<IProps> {
  openScene(key: string) {
    const { navigation } = this.props;
    if (Actions.currentScene !== key) {
      this.props.setActiveMenu(key);
      Actions.pop();
      // Actions[key].call();
      Actions[key].call(this);
    }
    setTimeout(() => navigation.drawer.close(), 0);
  }

  render() {
    const { navigation } = this.props;
    const getColor = (active: boolean) => {
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

const mapStateToProps = (state: any) => ({
  navigation: state.navigation,
});

const mapDispatchToProps = {
  setActiveMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
