import React, { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Text, Label } from 'native-base';
import ActivityView from 'react-native-activity-view';
import * as StoreReview from 'react-native-store-review';
import VersionNumber from 'react-native-version-number';
import { Actions } from 'react-native-router-flux';

import Spacer from '../Spacer/Spacer.component';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';

import styles from './Settings.styles';
import { colors } from '../../styles';

class Settings extends Component {
  static propTypes = {
    drawer: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}).isRequired,
    }).isRequired,
    pages: PropTypes.shape({
      terms: PropTypes.shape({}).isRequired,
      policy: PropTypes.shape({}).isRequired,
    }).isRequired,
  };

  render() {
    const {
      drawer, settings, pages,
    } = this.props;

    const items = [
      {
        label: 'Currency',
        name: Object.keys(settings.currencies).join(','),
        onPress: () => {},
      },
      {
        name: 'Sharing',
        onPress: () => {
          ActivityView.show({
            text: 'Coinsane is awesome!',
            url: 'https://coinsane.org',
          });
        },
      },
      {
        name: 'Terms and Conditions',
        onPress: () => Actions.page({ ...pages.terms }),
      },
      // {
      //   name: 'FAQ',
      //   onPress: () => Actions.page({
      //     title: 'FAQ',
      //     content: 'FAQ',
      //   }),
      // },
      {
        name: 'Rate the app',
        onPress: () => {
          if (StoreReview.isAvailable) {
            StoreReview.requestReview();
          }
        },
      },
      {
        name: 'Privacy policy',
        onPress: () => Actions.page({ ...pages.policy }),
      },
    ];

    const channels = [
      // {
      //   name: 'Slack',
      //   icon: 'Slack',
      //   onPress: () => Linking.openURL('https://t.me/coinsane'),
      // },
      {
        name: 'Telegram',
        icon: 'Telegram',
        onPress: () => Linking.openURL('https://t.me/coinsane'),
      },
      {
        name: 'Twitter',
        icon: 'Twitter',
        onPress: () => Linking.openURL('https://twitter.com/coinsane_org'),
      },
    ];
    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Text>Settings</Text>}
        />
        <Content style={styles.settings__container}>
          <List style={styles.settings_list}>
            {items.map(({ name, label, onPress }) => (
              <ListItem
                key={name}
                button
                style={[styles.settings_listItem, label && styles.settings_listItem__withLabel]}
                onPress={onPress}
              >
                {label && <Label style={styles.settings_listItem__label}>Currency</Label>}
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
          <Text style={styles.container__text}>App version {VersionNumber.appVersion}</Text>
          <Spacer size={30} />
        </Content>
      </Container>
    );
  }
}

export default Settings;
