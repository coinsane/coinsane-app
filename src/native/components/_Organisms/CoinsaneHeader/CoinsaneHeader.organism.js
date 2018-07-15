import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Body, Header, Left, Button, Right } from 'native-base';
import {Platform, StatusBar, TouchableOpacity} from 'react-native';

import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './CoinsaneHeader.styles';
import { colors } from '../../../styles';

if (Platform.OS === 'android') {
  StatusBar.setHidden(false);
}

const CoinsaneHeader = ({
  leftIcon,
  leftAction,
  leftActive,
  title,
  titleAction,
  rightIcon,
  rightAction,
  rightActive,
}) => (
  <Header
    style={styles.header}
    hasTabs
  >
    <StatusBar backgroundColor={colors.bgPrimary} barStyle="light-content" />
    <Left style={styles.header__left}>
      {
        !!leftActive && leftIcon && leftAction &&
        <Button transparent onPress={leftAction}>
          <CoinsaneIcon name={leftIcon} width={28} fill={colors.white} />
        </Button>
      }
    </Left>
    <Body
      button
      style={[styles.header__body, styles.header__title]}
      onPress={titleAction}
    >
      <TouchableOpacity onPress={titleAction}>
        {title}
      </TouchableOpacity>
    </Body>
    <Right style={styles.header__right}>
      {
        !!rightActive && rightIcon && rightAction &&
        <Button transparent onPress={rightAction}>
          <CoinsaneIcon name={rightIcon} width={28} fill={colors.white} />
        </Button>
      }
    </Right>
  </Header>
);

CoinsaneHeader.propTypes = {
  leftIcon: PropTypes.string,
  leftAction: PropTypes.func,
  leftActive: PropTypes.bool,
  title: PropTypes.shape({}).isRequired,
  titleAction: PropTypes.func,
  rightIcon: PropTypes.string,
  rightAction: PropTypes.func,
  rightActive: PropTypes.bool,
};

CoinsaneHeader.defaultProps = {
  leftIcon: 'Back',
  leftAction: () => Actions.pop(),
  leftActive: true,
  titleAction: null,
  rightIcon: null,
  rightAction: null,
  rightActive: true,
};

export default CoinsaneHeader;
