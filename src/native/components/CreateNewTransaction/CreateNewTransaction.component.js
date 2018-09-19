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

import Config from '../../../constants/config';
import ga from '../../../lib/ga';
import CoinsaneIcon from '../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import withPreventDoubleClick from '../../../hocs';
import I18n from '../../../i18n';
import Modal from '../modal/BaseModal.component';
import CoinsaneStackedLabel from '../_Atoms/CoinsaneStackedLabel/CoinsaneStackedLabel.atom';
import CoinsaneSwitch from '../_Atoms/CoinsaneSwitch/CoinsaneSwitch.atom';
import CoinsaneSwitchSelector from '../_Molecules/CoinsaneSwitchSelector/CoinsaneSwitchSelector.molecula';
import Header from 'src/native/components/_Organisms/Header';
import Loading from '../Loading/Loading.component';
import { updateDraftTransaction, clearDraftTransaction, recalculate, addTransaction } from '../../../redux/state/transactions/transactions.actioncreators';
import { getAvailableMarkets } from '../../../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../../../redux/state/currencies/currencies.actioncreators';
import { getCategories } from '../../../redux/state/categories/categories.actioncreators';
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
    marketId: PropTypes.string,
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
    marketId: null,
    market: {},
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const {
      coinId,
      coin,
      market,
      currencies,
      transactions,
      portfolios,
      marketId,
    } = this.props;

    if (!currencies.list.length) this.props.getAvailableCurrencies({});

    const { draft } = transactions;

    const portfolioId = get(coin, `items[${coinId}].portfolio`, draft.portfolio) || portfolios.list[0];
    const _marketId = get(coin, `items[${coinId}].market`, market && market._id) || marketId;

    console.log(portfolioId, _marketId, coinId);

    this.props.updateDraftTransaction({
      coin: coinId,
      market: _marketId,
      portfolio: portfolioId,
      exchange: Config.BTC,
      currency: Config.USD,
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm'),
      type: 'buy',
      deduct: false,
    });

    this.timer = null;
  }

  componentDidMount() {
    ga.trackScreenView('CreateTransaction');
  }

  update = (list) => {
    if (!list) return;
    const { portfolios } = this.props;
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
        options.items = Object.assign(...Object.keys(portfolios.items)
          .filter(key => !portfolios.items[key].service)
          .map(key => ({ [key]: portfolios.items[key] })));
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
      ga.trackEvent('transactions', 'addTransaction');
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
      btnCancel: {
        padding: 0,
        paddingLeft: 20,
        paddingRight: 20,
      },
      btnConfirm: {
        padding: 0,
        paddingLeft: 20,
        paddingRight: 20,
      },
      btnTextConfirm: {
        color: '#07f',
        fontWeight: 'bold',
      },
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

    const DeductSwitch = () => {
      if (draft.type !== 'exchange') return null;
      const symbol = draft.type === 'exchange' ? exchange.symbol : currency.code;
      const deductTitle = draft.type === 'sell' ?
        I18n.t('transactions.form.fieldDeductAlt', { currency: symbol }) :
        I18n.t('transactions.form.fieldDeduct', { currency: symbol });
      return (
        <View style={base.form__switchContainer}>
          <Text style={base.form__switchLabel}>{deductTitle}</Text>
          <View style={base.form__switchInput}>
            <CoinsaneSwitch
              onSyncPress={deduct => this.props.updateDraftTransaction({ deduct })}
              defaultValue={draft.deduct}
            />
          </View>
        </View>
      );
    };

    return (
      <Modal hideClose>
        <Container>
          <Header
            leftIcon="Close"
            leftAction={() => this.close()}
            title={<Title style={base.title}>{I18n.t('transactions.titleAdd')}</Title>}
          />
          <Content style={[base.contentContainer, base.contentPadding]}>
            <CoinsaneSwitchSelector
              options={segmentOptions}
              onPress={value => this.toggleSegment(value)}
            />
            <List>
              <PortfolioSelector />
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <CoinsaneStackedLabel
                    label={I18n.t('transactions.form.fieldAmount')}
                    propName="amount"
                    clearTextOnFocus={values.amount === '0'}
                    selectTextOnFocus
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
              {draft.type !== 'exchange' &&
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <CoinsaneStackedLabel
                    label={I18n.t('transactions.form.fieldPrice')}
                    propName="price"
                    selectTextOnFocus
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
              </ListItem>}
              {draft.type === 'exchange' &&
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <CoinsaneStackedLabel
                    label={I18n.t('transactions.form.fieldPrice')}
                    propName="price"
                    selectTextOnFocus
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
              </ListItem>}
              <ListItem style={styles.listItemContainer}>
                <Body>
                  <CoinsaneStackedLabel
                    label={I18n.t('transactions.form.fieldTotal', { currency: draft.type === 'exchange' ? exchange.symbol : currency.symbol })}
                    propName="total"
                    clearTextOnFocus={values.total === '0'}
                    selectTextOnFocus
                    onChangeText={this.handleChange}
                    keyboardType="numeric"
                    value={values.total}
                  />
                </Body>
              </ListItem>
              <DeductSwitch />
              <DateSelector />
              <ListItem itemHeader style={styles.listItemContainer_header}>
                <Text style={styles.listItem__header}>{I18n.t('transactions.form.labelAdditional')}</Text>
              </ListItem>
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
