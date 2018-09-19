import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Body, Header as BaseHeader, Left, Button, Right } from 'native-base';
import {Platform, StatusBar, TouchableOpacity} from 'react-native';

import { colors } from 'src/native/styles';

import CoinsaneIcon from 'src/native/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './Header.styles';

if (Platform.OS === 'android') {
  StatusBar.setHidden(false);
}

interface IProps {
  leftIcon?: string;
  leftAction?: () => void;
  leftActive?: boolean;
  title: any;
  titleAction?: () => void;
  rightIcon?: string;
  rightAction?: () => void;
  rightActive?: boolean;
}

class Header extends React.PureComponent<IProps> {
  render() {
    const {
      leftIcon = 'Back',
      leftAction = () => Actions.pop(),
      leftActive = true,
      title,
      titleAction,
      rightIcon,
      rightAction,
      rightActive,
    } = this.props;
    return (
      <BaseHeader
        style={styles.header}
        hasTabs
      >
        <StatusBar backgroundColor={colors.bgPrimary} barStyle="light-content" />
        <Left style={styles.header__left}>
          {
            leftActive && leftIcon && leftAction &&
            <Button transparent onPress={leftAction}>
              <CoinsaneIcon name={leftIcon} width={28} fill={colors.white} />
            </Button>
          }
        </Left>
        <Body style={[styles.header__body, styles.header__title]}>
          <TouchableOpacity onPress={titleAction}>
            {title}
          </TouchableOpacity>
        </Body>
        <Right style={styles.header__right}>
          {
            rightActive && rightIcon && rightAction &&
            <Button transparent onPress={rightAction}>
              <CoinsaneIcon name={rightIcon} width={28} fill={colors.white} />
            </Button>
          }
        </Right>
      </BaseHeader>
    );
  }
}

export default Header;
