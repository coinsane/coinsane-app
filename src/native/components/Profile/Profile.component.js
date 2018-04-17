import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Button, Title, Right, Container, Content, List, ListItem, Body, Left, Text, Item, Label, Input } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import styles from './Profile.styles';
import { colors, base } from '../../styles';

const Profile = ({ auth, logout, drawer }) => {
  const items = [
    {
      label: 'Currency',
      name: 'BTC,USD,RUB',
      onPress: () => {},
    },
    {
      name: 'Sharing',
      onPress: () => {},
    },
    {
      name: 'Terms and Conditions',
      onPress: () => {},
    },
    {
      name: 'FAQ',
      onPress: () => {},
    },
    {
      name: 'Rate the app',
      onPress: () => {},
    },
    {
      name: 'Privacy policy',
      onPress: () => {},
    },
  ];

  const channels = [
    {
      name: 'Slack',
      icon: 'Slack',
      onPress: () => {},
    },
    {
      name: 'Telegram',
      icon: 'Telegram',
      onPress: () => {},
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      onPress: () => {},
    },
  ];
  return (
    <Container>
      <Header style={base.headerContainer}>
        <StatusBar barStyle="light-content" />
        <Left>
          <Button transparent onPress={() => drawer.open()}>
            <CoinsaneIcon name="Menu" width={28} fill={colors.white} />
          </Button>
        </Left>
        <Body>
          <Title>Settings</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.settings__container}>
        <List style={styles.settings_list}>
          {items.map(({ name, label, onPress }) => (
            <ListItem
              key={name}
              button
              style={[styles.settings_listItem, label && styles.settings_listItem__withLabel]}
              onPress={onPress}
            >
              { label && <Label style={styles.settings_listItem__label}>Currency</Label> }
              <Text
                style={[styles.settings_listItem__text, styles.settings_listItem__textWithLabel]}
              >
                {name}
              </Text>
            </ListItem>
          ))}
        </List>
        <Text style={styles.container__text}>{'Channels'.toUpperCase()}</Text>
        <List style={styles.settings_list}>
          {channels.map(({ name, icon, onPress }) => (
            <ListItem
              key={name}
              button
              style={[styles.settings_listItem, styles.settings_listItem__withIcon]}
              onPress={onPress}
            >
              <CoinsaneIcon name={icon} width={28} fill={colors.iconDark} />
              <Text
                style={[styles.settings_listItem__text, styles.settings_listItem__text_withIcon]}
              >
                {name}
              </Text>
            </ListItem>
          ))}
        </List>
        <Text style={styles.container__text}>App version 0.1.0</Text>
        <Spacer size={30} />
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  auth: PropTypes.shape({}),
  drawer: PropTypes.shape({}).isRequired,
};

Profile.defaultProps = {
  auth: {},
};

export default Profile;
