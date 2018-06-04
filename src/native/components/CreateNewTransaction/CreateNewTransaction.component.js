import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Right, Body, Container, Content, List, Input, ListItem, Icon, Text, Button, Footer, Title, View } from 'native-base';
import get from 'lodash/get';

import I18n from '../../../i18n';
import Modal from '../modal/BaseModal.component';
import { getPrice } from '../../../redux/state/coin/coin.actioncreators';
import CoinsaneStackedLabel from '../_Atoms/CoinsaneStackedLabel/CoinsaneStackedLabel.atom';
import CoinsaneSwitchSelector from '../_Molecules/CoinsaneSwitchSelector/CoinsaneSwitchSelector.molecula';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import Loading from '../Loading/Loading.component';
import { updateDraftTransaction, clearDraftTransaction, recalculate, addTransaction } from '../../../redux/state/transactions/transactions.actioncreators';
import { getAvailableMarkets, clearMarkets } from '../../../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../../../redux/state/currencies/currencies.actioncreators';
import styles from './CreateNewTransaction.styles';
import { colors, base } from '../../styles';

class CreateNewTransaction extends Component {
  static propTypes = {
    transactions: PropTypes.shape({
      draft: PropTypes.shape({}).isRequired,
    }).isRequired,
    currencies: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.string),
      items: PropTypes.shape({}),
    }).isRequired,
    portfolios: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.string),
      items: PropTypes.shape({}),
    }).isRequired,
    coinId: PropTypes.string,
    coin: PropTypes.shape({
      items: PropTypes.shape({}),
    }).isRequired,
    markets: PropTypes.shape({
      items: PropTypes.shape({}),
    }).isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    getPrice: PropTypes.func.isRequired,
    updateDraftTransaction: PropTypes.func.isRequired,
    clearDraftTransaction: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    clearMarkets: PropTypes.func.isRequired,
    recalculate: PropTypes.func.isRequired,
    market: PropTypes.shape({}),
  };

  static defaultProps = {
    coinId: null,
    market: {},
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillMount() {
    const {
      coinId,
      coin,
      market,
      markets,
      transactions,
      currencies,
    } = this.props;

    const { draft } = transactions;

    const portfolioId = get(coin, `items[${coinId}].portfolio`, draft.portfolio);
    const marketId = get(coin, `items[${coinId}].market`, market && market._id);
    const fsym = get(markets, `items[${marketId}].symbol`, null);

    const currency = '5a9db9c3ce2c75001e71555d'; // USD
    const tsyms = currencies.items[currency].code;

    this.props.updateDraftTransaction({
      coin: coinId,
      market: marketId,
      portfolio: portfolioId,
      currency,
      time: '00:00',
    });
    this.props.getPrice({
      fsym,
      tsyms,
      date: new Date(),
    });
  }

  onBlur = (fieldName) => {
    const {
      transactions,
      markets,
      currencies,
    } = this.props;
    const { draft } = transactions;
    const market = markets.items[draft.market];
    const tsyms = currencies.items[draft.currency].code;

    if (!(market.symbol && draft.currency.code && draft.date)) return;

    if (!(+draft.price && draft.price !== Infinity)) {
    //   this.props.recalculate(fieldName);
    // } else {
      this.props.getPrice({
        fsym: market.symbol,
        tsyms,
        date: draft.date,
      });
    }
  };

  changePortfolio() {
    Actions.selector({
      title: I18n.t('portfolios.titleChoose'),
      listItemType: 'blank',
      navigationType: 'close',
      searchBar: false,
      listName: 'portfolios',
      selectAction: (portfolio) => {
        this.props.updateDraftTransaction({ portfolio: portfolio._id });
        Actions.pop();
      },
      closeType: 'close',
    });
  }

  changeMarket() {
    Actions.selector({
      preLoad: () => {
        this.props.getAvailableMarkets({});
        this.props.getAvailableCurrencies({});
      },
      clear: () => {
        this.props.clearMarkets();
      },
      title: I18n.t('markets.titleChoose'),
      listItemType: 'arrow',
      navigationType: 'back',
      searchBar: true,
      listName: 'markets',
      selectAction: (market) => {
        this.props.updateDraftTransaction({ market: market._id });
        Actions.pop();
      },
      closeType: 'close',
    });
  }

  changeCurrency() {
    const {
      markets,
      transactions,
    } = this.props;
    const { draft } = transactions;
    const fsym = markets.items[draft.market].symbol;
    Actions.selector({
      preLoad: () => {
        this.props.getAvailableMarkets({});
        this.props.getAvailableCurrencies({});
      },
      clear: () => {
        this.props.clearMarkets();
      },
      title: I18n.t('currencies.titleChoose'),
      listItemType: 'arrow',
      navigationType: 'back',
      searchBar: true,
      listName: 'currencies',
      selectAction: (currency) => {
        this.props.updateDraftTransaction({ currency: currency._id });
        this.props.getPrice({
          fsym,
          tsyms: currency.code,
          date: draft.date,
        });
        Actions.pop();
      },
      closeType: 'close',
    });
  }

  chooseCategory() {
    Actions.selector({
      title: I18n.t('categories.titleChoose'),
      listItemType: 'blank',
      navigationType: 'close',
      searchBar: false,
      listName: 'categories',
      selectAction: (category) => {
        this.props.updateDraftTransaction({ category: category.title });
        Actions.pop();
      },
      closeType: 'close',
    });
  }

  handleChange = (name, val) => {
    let value = val;
    if (value === '0') value = '';
    if (name === 'amount' || name === 'price' || name === 'total') {
      const exp = /^\d*(\.{0,1}\d{0,8})$/;
      value = value.replace(/[,]/g, '.');
      value = value.replace(/[^0-9.]/g, '');
      if (exp.test(value)) {
        this.props.updateDraftTransaction({ [name]: value });
        this.props.recalculate(name);
      }
    }

    if (name === 'category' || name === 'note') {
      this.props.updateDraftTransaction({ [name]: value });
    }
  };

  close() {
    this.props.clearDraftTransaction();
    Actions.pop();
  }

  toggleSegment(value) {
    this.props.updateDraftTransaction({ buy: value });
  }

  addTransaction() {
    const { draft } = this.props.transactions;

    if (+draft.amount && +draft.total) {
      this.props.addTransaction(draft);
      this.props.clearDraftTransaction();
      this.props.clearMarkets();
      Actions.pop();
    } else {
      Alert.alert(
        I18n.t('transactions.error.title'),
        I18n.t('transactions.error.emptyAmount'),
        [{ text: I18n.t('buttons.ok') }],
      );
    }
  }

  render() {
    const {
      transactions,
      markets,
      portfolios,
      currencies,
    } = this.props;
    const { draft } = transactions;
    const portfolio = portfolios.items[draft.portfolio];
    const market = markets.items[draft.market];
    const currency = currencies.items[draft.currency];

    const segmentOptions = [
      { label: I18n.t('transactions.form.labelBuy'), value: true },
      { label: I18n.t('transactions.form.labelSell'), value: false },
    ];

    const values = {
      amount: draft.amount ? draft.amount.toString() : '0',
      price: draft.price ? draft.price.toString() : '0',
      total: draft.total ? draft.total.toString() : '0',
    };

    const customStyles = {
      dateInput: {
        height: 24,
        paddingLeft: 0,
        borderWidth: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      dateText: {
        fontSize: 16,
        color: colors.white,
      },
    };

    if (!portfolio || !market) return <Loading />;

    return (
      <Modal hideClose>
        <Container>
          <CoinsaneHeader
            leftIcon="Close"
            leftAction={() => this.close()}
            title={<Title>{I18n.t('transactions.titleAdd')}</Title>}
          />
          <Content style={[base.contentContainer, base.contentPadding]}>
            <CoinsaneSwitchSelector
              options={segmentOptions}
              onPress={value => this.toggleSegment(value)}
            />
            <List>
              <ListItem style={styles.listItemContainer} onPress={() => this.changePortfolio()}>
                <Body>
                  <Text style={styles.listItem__label}>{I18n.t('transactions.form.fieldPortfolio')}</Text>
                  <Text style={styles.listItem__title}>{portfolio.title}</Text>
                </Body>
                <Right style={styles.listItem__rightIconContainer}>
                  <Icon name="ios-arrow-forward" style={styles.listItem__rightIcon} />
                </Right>
              </ListItem>
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <CoinsaneStackedLabel
                    autoFocus
                    label={I18n.t('transactions.form.fieldAmount')}
                    propName="amount"
                    clearTextOnFocus={values.amount === '0'}
                    onChangeText={this.handleChange}
                    keyboardType="numeric"
                    onBlur={this.onBlur}
                    value={values.amount}
                  />
                </Body>
                <Right>
                  <Button style={styles.listItem__rightButton} onPress={() => this.changeMarket()}>
                    <Text style={styles.listItem__rightButtonText}>{market.symbol}</Text>
                    <Icon name="ios-arrow-forward" style={styles.listItem__rightIcon} />
                  </Button>
                </Right>
              </ListItem>
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <CoinsaneStackedLabel
                    label={I18n.t('transactions.form.fieldPrice')}
                    propName="price"
                    onChangeText={this.handleChange}
                    keyboardType="numeric"
                    onBlur={this.onBlur}
                    value={values.price}
                  />
                </Body>
                <Right>
                  <Button style={styles.listItem__rightButton} onPress={() => this.changeCurrency()}>
                    <Text style={styles.listItem__rightButtonText}>{currency.code}</Text>
                    <Icon name="ios-arrow-forward" style={styles.listItem__rightIcon} />
                  </Button>
                </Right>
              </ListItem>
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <CoinsaneStackedLabel
                    label={I18n.t('transactions.form.fieldTotal')}
                    propName="total"
                    clearTextOnFocus={values.total === '0'}
                    onChangeText={this.handleChange}
                    keyboardType="numeric"
                    onBlur={this.onBlur}
                    value={values.total}
                  />
                </Body>
              </ListItem>
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <Text style={styles.listItem__label}>{I18n.t('transactions.form.fieldDate')}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <DatePicker
                      style={{ flex: 0.5 }}
                      date={draft.date}
                      mode="date"
                      maxDate={new Date()}
                      showIcon={false}
                      placeholder={I18n.t('transactions.form.placeholderDate')}
                      confirmBtnText={I18n.t('buttons.setDate')}
                      cancelBtnText={I18n.t('buttons.cancel')}
                      customStyles={customStyles}
                      onDateChange={date => this.props.updateDraftTransaction({ date })}
                    />
                    <DatePicker
                      style={{ flex: 0.5 }}
                      date={draft.time}
                      mode="time"
                      showIcon={false}
                      placeholder={I18n.t('transactions.form.placeholderTime')}
                      confirmBtnText={I18n.t('buttons.setTime')}
                      cancelBtnText={I18n.t('buttons.cancel')}
                      customStyles={customStyles}
                      onDateChange={time => this.props.updateDraftTransaction({ time })}
                    />
                  </View>
                </Body>
              </ListItem>
              <ListItem itemHeader style={[styles.listItemContainer, styles.listItemContainer_header]}>
                <Text style={styles.listItem__header}>{I18n.t('transactions.form.labelAdditional')}</Text>
              </ListItem>
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <Input
                    placeholder={I18n.t('transactions.form.placeholderCategory')}
                    placeholderTextColor={colors.textGray}
                    onChangeText={v => this.handleChange('category', v)}
                    value={draft.category}
                    style={styles.listItem__textInput}
                  />
                </Body>
                <Right style={styles.listItem__rightIconContainer}>
                  <Button style={styles.listItem__rightButton} onPress={() => this.chooseCategory()}>
                    <Icon name="ios-arrow-forward" style={styles.listItem__rightIcon} />
                  </Button>
                </Right>
              </ListItem>
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <AutoGrowingTextInput
                    placeholder={I18n.t('transactions.form.placeholderNote')}
                    placeholderTextColor={colors.textGray}
                    onChangeText={v => this.handleChange('note', v)}
                    value={draft.note}
                    style={styles.listItem__textInput_growing}
                  />
                </Body>
              </ListItem>
            </List>
          </Content>
        </Container>
        <Footer style={base.footer}>
          <Button
            small
            full
            bordered
            onPress={() => this.addTransaction()}
            style={base.footer__button}
          >
            <Text style={base.footer__buttonText}>{I18n.t('transactions.createButton')}</Text>
          </Button>
        </Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.currencies,
  portfolios: state.portfolios,
  coin: state.coin,
  markets: state.markets,
  transactions: state.transactions,
});

const mapDispatchToProps = {
  getAvailableMarkets,
  getAvailableCurrencies,
  getPrice,
  updateDraftTransaction,
  clearDraftTransaction,
  addTransaction,
  clearMarkets,
  recalculate,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewTransaction);
