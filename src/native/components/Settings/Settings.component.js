import React, { Component } from 'react';
import { Linking, Share } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, List, ListItem, Text, Label, Title } from 'native-base';
import * as StoreReview from 'react-native-store-review';
import VersionNumber from 'react-native-version-number';
import { Actions } from 'react-native-router-flux';

import ga from '../../../lib/ga';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import I18n from '../../../i18n';

import styles from './Settings.styles';
import { base, colors } from '../../styles';

class Settings extends Component {
  static propTypes = {
    drawer: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({
      currencies: PropTypes.shape({}).isRequired,
    }).isRequired,
    pages: PropTypes.shape({
      terms: PropTypes.shape({}),
      policy: PropTypes.shape({}),
    }).isRequired,
  };

  componentDidMount() {
    ga.trackScreenView('Settings');
  }

  render() {
    const {
      drawer, settings, pages,
    } = this.props;

    const items = [
      {
        label: I18n.t('settings.currency'),
        name: Object.keys(settings.currencies).join(','),
        onPress: () => {
          ga.trackEvent('settings', 'chooseCurrencies');
        },
      },
      {
        name: I18n.t('settings.share'),
        onPress: () => {
          ga.trackEvent('settings', 'share');
          Share.share({
            title: I18n.t('settings.shareText'),
            url: I18n.t('settings.shareUrl'),
          });
        },
      },
      {
        name: I18n.t('settings.terms'),
        onPress: () => {
          ga.trackEvent('settings', 'terms');
          Actions.page({ ...pages.terms });
        },
      },
      // {
      //   name: 'FAQ',
      //   onPress: () => Actions.page({
      //     title: 'FAQ',
      //     content: 'FAQ',
      //   }),
      // },
      {
        name: I18n.t('settings.rate'),
        onPress: () => {
          if (StoreReview.isAvailable) {
            ga.trackEvent('settings', 'rate');
            StoreReview.requestReview();
          }
        },
      },
      {
        name: I18n.t('settings.policy'),
        onPress: () => {
          ga.trackEvent('settings', 'policy');
          Actions.page({ ...pages.policy });
        },
      },
    ];

    const channels = [
      // {
      //   name: 'Slack',
      //   icon: 'Slack',
      //   onPress: () => Linking.openURL('https://t.me/coinsane'),
      // },
      {
        name: I18n.t('settings.telegram'),
        icon: 'Telegram',
        onPress: () => {
          ga.trackEvent('settings', 'telegram');
          Linking.openURL(I18n.t('settings.telegramUrl'));
        },
      },
      {
        name: I18n.t('settings.twitter'),
        icon: 'Twitter',
        onPress: () => {
          ga.trackEvent('settings', 'twitter');
          Linking.openURL(I18n.t('settings.twitterUrl'));
        },
      },
    ];
    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Title style={base.title}>{I18n.t('navigation.settings')}</Title>}
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
                {!!label && <Label style={styles.settings_listItem__label}>{I18n.t('settings.currency')}</Label>}
                <Text
                  style={[styles.settings_listItem__text, styles.settings_listItem__textWithLabel]}
                >
                  {name}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text style={styles.container__text}>{I18n.t('settings.channels')}</Text>
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
          <Text style={styles.container__text}>{I18n.t('settings.version')} {VersionNumber.appVersion}</Text>
          <Spacer size={30} />
        </Content>
      </Container>
    );
  }
}

export default Settings;
