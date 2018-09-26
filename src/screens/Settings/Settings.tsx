import React, { Component } from 'react';
import { Linking, Share, Alert } from 'react-native';
import { Container, Content, List, ListItem, Text, Label, Title, Button } from 'native-base';
import * as StoreReview from 'react-native-store-review';
import VersionNumber from 'react-native-version-number';
import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';

import ga from 'src/lib/ga';
import I18n from 'src/i18n';

import { Spacer } from 'src/components/Base';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import Header from 'src/components/_Organisms/Header';

import {
  ICurrency,
  ICurrencies,
  ICurrencyUpdate,
} from 'src/models/ICurrencyState';

import styles from './Settings.styles';
import { base, colors } from 'src/styles';

interface IProps {
  drawer: any;
  settings: {
    currencies: ICurrencies,
  };
  pages: {
    terms: {},
    policy: {},
  };
  currencySearch: (payload: any) => void;
  clearMarkets: () => void;
  updateCurrencies: (payload: ICurrencyUpdate) => void;
}

class Settings extends Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.chooseCurrency = this.chooseCurrency.bind(this);
  }

  componentDidMount() {
    ga.trackScreenView('Settings');
    OneSignal.getPermissionSubscriptionState((status: any) => {
      if (!status.notificationsEnabled) setTimeout(OneSignal.registerForPushNotifications, 3000);
    });
  }

  selectCurrency = (item: ICurrency, selectedIds: string[]) => {
    const { settings } = this.props;
    if (selectedIds.includes(item._id)) {
      const updatedCurrencies: ICurrencies = {};
      let isSystem = false;
      Object.keys(settings.currencies).forEach((currency) => {
        if (currency === item.code && settings.currencies[currency].system) {
          isSystem = true;
        }
        if (currency !== item.code || isSystem) {
          updatedCurrencies[currency] = settings.currencies[currency];
        }
      });
      if (!isSystem) {
        this.props.updateCurrencies({
          type: 'remove',
          currencyId: item._id,
          currencies: {
            ...updatedCurrencies,
          },
        });
      }
    } else if (selectedIds.length < 5) {
      const { _id, name, ...currency } = item;
      this.props.updateCurrencies({
        type: 'add',
        currencyId: item._id,
        currencies: {
          ...settings.currencies,
          [item.code]: {
            id: _id,
            type: 'currency',
            system: false,
            imageUrl: '',
            symbol: currency.code,
            ...currency,
            decimal: 2,
          },
        },
      });
    } else {
      Alert.alert('Max 5 currencies allowed!');
    }
  };

  chooseCurrency = () => {
    const { settings } = this.props;
    Actions.selector({
      preLoad: (data) => {
        this.props.currencySearch(data);
        // this.props.changeSearchTerm(data);
        // this.props.getAvailableCurrencies({});
      },
      clear: () => this.props.clearMarkets(),
      title: I18n.t('coins.titleSelect'),
      listItemType: 'check',
      navigationType: 'close',
      searchBar: true,
      listName: 'currencies',
      selectedItems: 'settings.currencies',
      selectAction: (item: ICurrency, selectedIds: string[]) => this.selectCurrency(item, selectedIds),
      footerTitle: 'Selected:',
      footerTitleSelected: 'code',
      footerAction: () => {
        Actions.pop();
      },
      closeType: 'close',
    });
  };

  createAccount = () => {
    ga.trackEvent('settings', 'createAccount');
    Actions.createAccount();
  };

  render() {
    const {
      drawer,
      settings,
      pages,
    } = this.props;

    const items = [
      {
        label: I18n.t('settings.currency'),
        name: Object.keys(settings.currencies).join(', '),
        onPress: () => {
          ga.trackEvent('settings', 'chooseCurrencies');
          this.chooseCurrency();
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
        <Header
          leftIcon="Menu"
          leftAction={() => drawer.open()}
          title={<Title style={base.title}>{I18n.t('navigation.settings')}</Title>}
        />
        <Button
          small
          bordered
          full
          onPress={this.createAccount}
          style={base.action__button}
        >
          <Text style={base.footer__buttonText}>{I18n.t('auth.createButton')}</Text>
        </Button>
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
