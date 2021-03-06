export default {
  authorization: {
    error: {
      networkTokenError: 'Please connect to the internet to proceed',
    },
    reconnect: 'Reconnect',
  },
  navigation: {
    portfolio: 'Portfolio',
    markets: 'Markets',
    settings: 'Settings',
  },
  markets: {
    coin: 'Coin',
    mcap: 'M.cap',
    vol24: '24 Vol',
    price: 'Price',
    supply: 'Supply',
    titleChoose: 'Choose Market',
  },
  currencies: {
    titleChoose: 'Choose Currency',
  },
  coins: {
    addButton: '+ ADD NEW COIN',
    low: 'LOW',
    high: 'HIGH',
    exchanges: 'Markets',
    news: 'News',
    loadMore: 'LOAD MORE',
    titleSelect: 'Select coin',
  },
  portfolios: {
    titleChoose: 'Choose Portfolio',
    titleAdd: 'Add new portfolio',
    all: 'All Portfolios',
    addButton: '+ ADD NEW PORTFOLIO',
    saveButton: 'SAVE',
    createButton: 'ADD',
    form: {
      labelAdd: 'BASIC',
      labelEdit: 'EDIT PORTFOLIO',
      fieldTitle: 'Portfolio title',
      fieldSwitch: 'Calculate amount on total',
      fieldRemove: 'Delete portfolio',
      fieldRemoveDesc: 'Are you sure?',
      buttonRemove: 'Delete',
      buttonFromExchange: 'ADD FROM EXCHANGE',
      labelExchange: 'EXCHANGE',
      fieldExchange: 'Exchange select',
      fieldKey: 'API key',
      fieldSecret: 'API secret',
    },
    others: 'Others',
  },
  transactions: {
    titleAdd: 'Add new transaction',
    addButton: '+ ADD NEW TRANSACTION',
    coins: 'My coins',
    total: 'Total',
    profit: 'Profit',
    createButton: 'ADD',
    form: {
      labelBuy: 'IN',
      labelSell: 'OUT',
      labelExchange: 'EXCHANGE',
      fieldPortfolio: 'Choose portfolio',
      fieldAmount: 'Amount',
      fieldPrice: 'Price by coin',
      fieldTotal: 'Total value, {{currency}}',
      fieldDeduct: 'Deduct from {{currency}} holdings',
      fieldDeductAlt: 'Add to {{currency}} holdings',
      fieldDate: 'Date and time',
      placeholderDate: 'Select date',
      placeholderTime: 'Select time',
      labelAdditional: 'ADDITIONAL INFO',
      placeholderCategory: 'Set category',
      placeholderNote: 'Note',
    },
    error: {
      title: 'Error',
      emptyAmount: 'Amount is empty',
    },
  },
  settings: {
    channels: 'CHANNELS',
    version: 'App version',
    policy: 'Privacy policy',
    rate: 'Rate the app',
    terms: 'Terms and Conditions',
    pushNotifications: 'Push Notifications',
    share: 'Sharing',
    shareText: 'Coinsane is awesome!',
    shareUrl: 'https://coinsane.org',
    currency: 'Currency',
    telegram: 'Telegram',
    telegramUrl: 'https://t.me/coinsane',
    twitter: 'Twitter',
    twitterUrl: 'https://twitter.com/coinsane_org',
  },
  categories: {
    titleChoose: 'Choose Category',
    empty: 'No category',
    exchange: 'Exchange',
  },
  providers: {
    titleChoose: 'Choose Exchange',
  },
  onboarding: {
    prev: 'PREV',
    next: 'NEXT',
    skip: 'SKIP',
    start: 'START',
    category: 'My Investments',
    oneText: 'Add and edit portfolio manually or automatically. See total portfolios value',
    twoText: 'Chose coins, add transactions and track changes in portfolio and on the exchanges',
    threeText: 'See changes and trends in the market or a particular crypto',
  },
  placeholder: {
    search: 'Search',
  },
  empty: {
    search: 'Sorry. Nothing found',
    portfolios: 'You don\'t have any portfolios yet. Let\'s create one?',
    transactions: 'Transactions list is empty. Add one?',
  },
  buttons: {
    ok: 'OK',
    cancel: 'Cancel',
    setDate: 'Set Date',
    setTime: 'Set Time',
  },
};
