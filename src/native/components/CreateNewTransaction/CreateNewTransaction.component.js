import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Right, Body, Container, Content, List, Input, ListItem, Text, Button, Footer, Title, View } from 'native-base';
import get from 'lodash/get';
import moment from 'moment';

import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import withPreventDoubleClick from '../../../hocs';
import I18n from '../../../i18n';
import Modal from '../modal/BaseModal.component';
import CoinsaneStackedLabel from '../_Atoms/CoinsaneStackedLabel/CoinsaneStackedLabel.atom';
import CoinsaneSwitchSelector from '../_Molecules/CoinsaneSwitchSelector/CoinsaneSwitchSelector.molecula';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import Loading from '../Loading/Loading.component';
import { updateDraftTransaction, clearDraftTransaction, recalculate, addTransaction } from '../../../redux/state/transactions/transactions.actioncreators';
import { getAvailableMarkets } from '../../../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../../../redux/state/currencies/currencies.actioncreators';
import { getCategories } from '../../../redux/state/categories/categories.actioncreators';
import styles from './CreateNewTransaction.styles';
import { colors, base } from '../../styles';

const WAIT_INTERVAL = 1000;

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
    categories: PropTypes.shape({
      items: PropTypes.shape({}),
    }).isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    updateDraftTransaction: PropTypes.func.isRequired,
    clearDraftTransaction: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
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
  }

  componentWillMount() {
    const {
      coinId,
      coin,
      market,
      transactions,
    } = this.props;

    const { draft } = transactions;

    const portfolioId = get(coin, `items[${coinId}].portfolio`, draft.portfolio);
    const marketId = get(coin, `items[${coinId}].market`, market && market._id);

    this.props.updateDraftTransaction({
      coin: coinId,
      market: marketId,
      portfolio: portfolioId,
      exchange: '5a9c5e5244d0ad001eed91cd', // BTC
      currency: '5a9db9c3ce2c75001e71555d', // USD
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm'),
      type: 'buy',
    });

    this.timer = null;
  }

  update = (list) => {
    if (!list) return;
    const { draft } = this.props.transactions;
    const options = {
      listItemType: 'arrow',
      selectAction: (item) => {
        this.props.updateDraftTransaction({ [list]: item._id });
        Actions.pop();
      },
    };
    switch (list) {
      case 'portfolio':
        options.listName = 'portfolios';
        options.title = I18n.t('portfolios.titleChoose');
        options.listItemType = 'check';
        options.activeItem = draft.portfolio;
        break;
      case 'market':
        options.listName = 'markets';
        options.title = I18n.t('markets.titleChoose');
        options.searchBar = true;
        options.preLoad = data => this.props.getAvailableMarkets(data);
        break;
      case 'exchange':
        options.listName = 'markets';
        options.title = I18n.t('markets.titleChoose');
        options.searchBar = true;
        options.preLoad = data => this.props.getAvailableMarkets(data);
        break;
      case 'currency':
        options.listName = 'currencies';
        options.title = I18n.t('currencies.titleChoose');
        options.searchBar = true;
        options.preLoad = data => this.props.getAvailableCurrencies(data);
        break;
      case 'category':
        options.listName = 'categories';
        options.title = I18n.t('categories.titleChoose');
        options.listItemType = 'check';
        options.activeItem = draft.category;
        options.preLoad = data => this.props.getCategories(data);
        break;
      default:
    }
    Actions.selector(options);
  };

  handleChange = (name, val) => {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      let value = val;
      if (value === '0') value = '';
      if (name === 'amount' || name === 'price' || name === 'total') {
        const exp = /^\d*(\.{0,1}\d{0,12})$/;
        value = value.replace(/[,]/g, '.');
        value = value.replace(/[^0-9.]/g, '');
        if (exp.test(value)) {
          this.props.updateDraftTransaction({ [name]: value });
          this.props.recalculate(name);
        }
      } else if (name === 'category' || name === 'note') {
        this.props.updateDraftTransaction({ [name]: value });
      }
    }, WAIT_INTERVAL);
  };

  close = () => {
    this.props.clearDraftTransaction();
    Actions.pop();
  };

  toggleSegment = type => this.props.updateDraftTransaction({ type });

  addTransaction() {
    const { draft } = this.props.transactions;
    if (+draft.amount && +draft.total) {
      this.props.addTransaction(draft);
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
      categories,
    } = this.props;
    const { draft } = transactions;
    const portfolio = get(portfolios, `items[${draft.portfolio}]`, null);
    const market = get(markets, `items[${draft.market}]`, null);
    const currency = get(currencies, `items[${draft.currency}]`, null);
    const exchange = get(markets, `items[${draft.exchange}]`, null);
    const category = get(categories, `items[${draft.category}].title`, draft.category);
    const values = {
      amount: draft.amount ? draft.amount.toString() : '0',
      price: draft.price ? draft.price.toString() : '0',
      total: draft.total ? draft.total.toString() : '0',
    };
    const segmentOptions = [
      { label: I18n.t('transactions.form.labelBuy'), value: 'buy' },
      { label: I18n.t('transactions.form.labelSell'), value: 'sell' },
      { label: I18n.t('transactions.form.labelExchange'), value: 'exchange' },
    ];

    const customStyles = {
      dateInput: styles.dateInput,
      dateText: styles.dateText,
    };

    const ListItemEx = withPreventDoubleClick(ListItem);
    const ButtonEx = withPreventDoubleClick(Button);

    if (!(portfolio && market && currency && exchange)) return <Loading />;

    const PortfolioSelector = () => (
      <ListItemEx style={styles.listItemContainer} onPress={() => this.update('portfolio')}>
        <Body>
          <Text style={styles.listItem__label}>{I18n.t('transactions.form.fieldPortfolio')}</Text>
          <Text style={styles.listItem__title}>{portfolio.title}</Text>
        </Body>
        <Right style={styles.listItem__rightIconContainer}>
          <CoinsaneIcon name="ChevronRight" width={16} fill={colors.textGray} />
        </Right>
      </ListItemEx>
    );

    const MarketSelector = () => (
      <ListItem style={styles.listItemContainer}>
        <Body>
          <CoinsaneStackedLabel
            label={I18n.t('transactions.form.fieldAmount')}
            propName="amount"
            clearTextOnFocus={values.amount === '0'}
            onChangeText={this.handleChange}
            keyboardType="numeric"
            value={values.amount}
          />
        </Body>
        <Right>
          <ButtonEx style={styles.listItem__rightButton} onPress={() => this.update('market')}>
            <Text style={styles.listItem__rightButtonText}>{market.symbol}</Text>
            <CoinsaneIcon name="ChevronRight" width={16} fill={colors.textGray} />
          </ButtonEx>
        </Right>
      </ListItem>
    );

    const CurrencySelector = () => (
      draft.type !== 'exchange' &&
      <ListItem style={styles.listItemContainer}>
        <Body>
          <CoinsaneStackedLabel
            label={I18n.t('transactions.form.fieldPrice')}
            propName="price"
            onChangeText={this.handleChange}
            keyboardType="numeric"
            value={values.price}
          />
        </Body>
        <Right>
          <ButtonEx style={styles.listItem__rightButton} onPress={() => this.update('currency')}>
            <Text style={styles.listItem__rightButtonText}>{currency.code}</Text>
            <CoinsaneIcon name="ChevronRight" width={16} fill={colors.textGray} />
          </ButtonEx>
        </Right>
      </ListItem>
    );

    const ExchangeSelector = () => (
      draft.type === 'exchange' &&
      <ListItem style={styles.listItemContainer}>
        <Body>
          <CoinsaneStackedLabel
            label={I18n.t('transactions.form.fieldPrice')}
            propName="price"
            onChangeText={this.handleChange}
            keyboardType="numeric"
            value={values.price}
          />
        </Body>
        <Right>
          <ButtonEx style={styles.listItem__rightButton} onPress={() => this.update('exchange')}>
            <Text style={styles.listItem__rightButtonText}>{exchange.symbol || 'Choose'}</Text>
            <CoinsaneIcon name="ChevronRight" width={16} fill={colors.textGray} />
          </ButtonEx>
        </Right>
      </ListItem>
    );

    const DateSelector = () => (
      <ListItem style={styles.listItemContainer}>
        <Body>
          <Text style={styles.listItem__label}>{I18n.t('transactions.form.fieldDate')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <DatePicker
              style={{ flex: 0.5, height: 30 }}
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
              style={{ flex: 0.5, height: 30 }}
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
    );

    const TotalInput = () => {
      const symbol = draft.type === 'exchange' ? exchange.symbol : currency.symbol;
      return (
        <ListItem style={styles.listItemContainer}>
          <Body>
            <CoinsaneStackedLabel
              label={I18n.t('transactions.form.fieldTotal', { currency: symbol })}
              propName="total"
              clearTextOnFocus={values.total === '0'}
              onChangeText={this.handleChange}
              keyboardType="numeric"
              value={values.total}
            />
          </Body>
        </ListItem>
      );
    };

    const CategorySelector = () => (
      <ListItem style={styles.listItemContainer}>
        <Body>
          <Input
            placeholder={I18n.t('transactions.form.placeholderCategory')}
            placeholderTextColor={colors.textGray}
            onChangeText={v => this.handleChange('category', v)}
            value={category}
            style={styles.listItem__textInput}
          />
        </Body>
        <Right style={styles.listItem__rightIconContainer}>
          <Button style={styles.listItem__rightButton} onPress={() => this.update('category')}>
            <CoinsaneIcon name="ChevronRight" width={16} fill={colors.textGray} />
          </Button>
        </Right>
      </ListItem>
    );

    const NoteInput = () => (
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
    );

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
              <PortfolioSelector />
              <MarketSelector />
              <CurrencySelector />
              <ExchangeSelector />
              <TotalInput />
              <DateSelector />
              <ListItem itemHeader style={styles.listItemContainer_header}>
                <Text style={styles.listItem__header}>{I18n.t('transactions.form.labelAdditional')}</Text>
              </ListItem>
              <CategorySelector />
              <NoteInput />
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
  categories: state.categories,
});

const mapDispatchToProps = {
  getAvailableMarkets,
  getAvailableCurrencies,
  updateDraftTransaction,
  clearDraftTransaction,
  addTransaction,
  recalculate,
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewTransaction);
