import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Right, Body, Container, Content, List, Input, ListItem, Icon, Text, Button, Footer } from 'native-base';
import Modal from '../modal/BaseModal.component';
import { getCourse, addTransaction, getTransactionsList } from '../../../redux/state/coin/coin.actioncreators';
import CoinsaneStackedLabel from '../_Atoms/CoinsaneStackedLabel/CoinsaneStackedLabel.atom';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import { updateProcessTransaction, clearProcessTransaction, recalculate } from '../../../redux/state/inProcess/inProcess.actioncreators';
import { getAvailableMarkets, clearMarkets } from '../../../redux/state/markets/markets.actioncreators';
import { getAvailableCurrencies } from '../../../redux/state/currencies/currencies.actioncreators';
import styles from './CreateNewTransaction.styles';
import { colors, base, typography } from '../../styles';

class CreateNewTransaction extends Component {
  static propTypes = {
    inProcess: PropTypes.shape({
      transaction: PropTypes.shape({}).isRequired,
    }).isRequired,
    currencies: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
    portfolios: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
    getTransactionsList: PropTypes.func.isRequired,
    getAvailableMarkets: PropTypes.func.isRequired,
    getAvailableCurrencies: PropTypes.func.isRequired,
    getCourse: PropTypes.func.isRequired,
    updateProcessTransaction: PropTypes.func.isRequired,
    clearProcessTransaction: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired,
    clearMarkets: PropTypes.func.isRequired,
    recalculate: PropTypes.func.isRequired,
    coinItem: PropTypes.shape({}).isRequired,
    portfolioId: PropTypes.string,
  };

  static defaultProps = {
    portfolioId: null,
  };

  static onEnter() {
    // console.log('On Enter');
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillMount() {
    const {
      inProcess, portfolios, currencies, coinItem, portfolioId,
    } = this.props;
    const { transaction } = inProcess;
    const portfolioItemId = transaction.portfolio !== '' ? transaction.portfolio : portfolioId;
    // selected portfolio and coin
    const portfolioItem = portfolios.list.filter(portfolio => portfolio._id === portfolioItemId)[0];
    // const currencyItem = currencies.list.filter(currency => currency.code === portfolios.currency)[0];
    const currencyItem = currencies.list.filter(currency => currency.code === 'USD')[0];

    this.props.updateProcessTransaction({
      coin: coinItem._id,
      coinItem,
      portfolioItem,
      portfolio: portfolioItem._id,
      currencyItem,
      currency: currencyItem._id,
    });
    this.props.getCourse({
      fsym: coinItem.symbol,
      tsyms: currencyItem.code,
      date: new Date(),
    });
  }

  onBlur = (fieldName) => {
    const { transaction } = this.props.inProcess;

    if (!(transaction.coinItem.symbol && transaction.currencyItem.code && transaction.date)) return;

    if (!(+transaction.price && transaction.price !== Infinity)) {
    //   this.props.recalculate(fieldName);
    // } else {
      this.props.getCourse({
        fsym: transaction.coinItem.symbol,
        tsyms: transaction.currencyItem.code,
        date: transaction.date,
      });
    }
  };

  changeCoin() {
    Actions.selector({
      preLoad: () => {
        this.props.getAvailableMarkets();
        this.props.getAvailableCurrencies();
      },
      clear: () => {
        this.props.clearMarkets();
      },
      title: 'Select coin',
      listItemType: 'arrow',
      navigationType: 'back',
      searchBar: true,
      listName: 'markets',
      selectAction: (coin) => { // id - of selected item
        this.props.updateProcessTransaction({ coin: coin._id, coinItem: coin });
        Actions.pop();
      },
      closeType: 'close',
    });
  }

  changeCurrency() {
    Actions.selector({
      preLoad: () => {
        this.props.getAvailableMarkets();
        this.props.getAvailableCurrencies();
      },
      clear: () => {
        this.props.clearMarkets();
      },
      title: 'Select coin',
      listItemType: 'arrow',
      navigationType: 'back',
      searchBar: true,
      listName: 'currencies',
      selectAction: (currency) => { // id - of selected item
        this.props.updateProcessTransaction({ currency: currency._id, currencyItem: currency });
        Actions.pop();
      },
      closeType: 'close',
    });
  }

  changePortfolio() {
    Actions.selector({
      title: 'Choose portfolio',
      listItemType: 'blank',
      navigationType: 'close',
      searchBar: false,
      listName: 'portfolios',
      selectAction: (portfolio) => { // selected item
        this.props.updateProcessTransaction({ portfolio: portfolio._id, portfolioItem: portfolio });
        Actions.pop();
      },
      closeType: 'close',
    });
  }

  handleChange = (name, val) => {
    let value = val;
    if (name === 'amount' || name === 'price' || name === 'total') {
      const exp = /^\d*(\.{0,1}\d{0,8})$/;
      value = value.replace(/[,]/g, '.');
      value = value.replace(/[^0-9.]/g, '');
      if (exp.test(value)) {
        this.props.updateProcessTransaction({ [name]: value });
        this.props.recalculate(name);
      }
    }

    if (name === 'category' || name === 'note') {
      this.props.updateProcessTransaction({ [name]: value });
    }
  };

  close() {
    // clear selected coin
    this.props.clearProcessTransaction();
    Actions.pop();
  }

  toggleSegment(value) {
    this.props.updateProcessTransaction({ buy: value });
  }

  addTransaction() {
    const { transaction } = this.props.inProcess;

    if (+transaction.amount && +transaction.total) {
      this.props.addTransaction(transaction);
      this.props.clearProcessTransaction();
      this.props.clearMarkets();
      Actions.pop();
    }
  }

  render() {
    const { transaction } = this.props.inProcess;

    const segmentOptions = [
      { label: 'BUY', value: true },
      { label: 'SELL', value: false },
    ];

    const values = {
      amount: transaction.amount ? transaction.amount.toString() : '0',
      price: transaction.price ? transaction.price.toString() : '0',
      total: transaction.total ? transaction.total.toString() : '0',
    };

    return (
      <Modal hideClose>
        <Container>
          <CoinsaneHeader
            leftActive={false}
            rightIcon="Close"
            rightAction={() => this.close()}
            title={<Text>Add new transaction</Text>}
          />
          <Content padder style={{ backgroundColor: colors.bgGray }}>
            <ScrollView keyboardShouldPersistTaps="never">
              <SwitchSelector
                options={segmentOptions}
                initial={0}
                onPress={value => this.toggleSegment(value)}
                buttonColor={colors.inputBg}
                backgroundColor={colors.bgGray}
                textColor={colors.textGray}
              />
              <List>
                <ListItem
                  style={styles.listItemContainer}
                  onPress={() => this.changePortfolio()}
                >
                  <Body>
                    <Text style={[typography.smallest, { color: colors.textGray }]}>
                      Choose portfolio
                    </Text>
                    <Text style={typography.menuSmall}>{transaction.portfolioItem.title}</Text>
                  </Body>
                  <Right style={styles.listItem__rightIconContainer}>
                    <Icon name="ios-arrow-forward" style={{ color: colors.textGray }} />
                  </Right>
                </ListItem>
                <ListItem style={styles.listItemContainer}>
                  <Body>
                    <CoinsaneStackedLabel
                      label="Amount"
                      propName="amount"
                      autoFocus
                      clearTextOnFocus={values.amount === '0'}
                      onChangeText={this.handleChange}
                      keyboardType="numeric"
                      onBlur={this.onBlur}
                      value={values.amount}
                    />
                  </Body>
                  <Right >
                    <Button
                      style={styles.listItem__rightButton}
                      onPress={() => this.changeCoin()}
                    >
                      <Text style={[typography.menuSmall, styles.listItem__rightButtonText]}>
                        {transaction.coinItem.symbol}
                      </Text>
                      <Icon name="ios-arrow-forward" style={[styles.listItem__rightIcon, { color: colors.textGray }]} />
                    </Button>
                  </Right>
                </ListItem>
                <ListItem style={styles.listItemContainer}>
                  <Body>
                    <CoinsaneStackedLabel
                      label="Price by coin"
                      propName="price"
                      onChangeText={this.handleChange}
                      keyboardType="numeric"
                      onBlur={this.onBlur}
                      value={values.price}
                    />
                  </Body>
                  <Right >
                    <Button
                      style={styles.listItem__rightButton}
                      onPress={() => this.changeCurrency()}
                    >
                      <Text style={[typography.menuSmall, styles.listItem__rightButtonText]}>
                        {transaction.currencyItem.code}
                      </Text>
                      <Icon name="ios-arrow-forward" style={[styles.listItem__rightIcon, { color: colors.textGray }]} />
                    </Button>
                  </Right>
                </ListItem>
                <ListItem style={styles.listItemContainer}>
                  <Body>
                    <CoinsaneStackedLabel
                      label="Total value"
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
                    <Text style={[typography.smallest, { color: colors.textGray }]} >
                      Date and time
                    </Text>
                    <DatePicker
                      style={{ width: '100%' }}
                      date={transaction.date}
                      mode="datetime"
                      placeholder="select date"
                      format="YYYY-MM-DD, hh:mm"
                      confirmBtnText="Set"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          display: 'none',
                        },
                        dateInput: {
                          height: 21,
                          paddingLeft: 10,
                          borderWidth: 0,
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                        },
                        dateText: {
                          fontSize: 17,
                          color: colors.white,
                        },
                      }}
                      onDateChange={
                        date => this.props.updateProcessTransaction({ date: new Date(date) })
                      }
                    />
                  </Body>
                </ListItem>
                <ListItem itemHeader>
                  <Text style={[typography.h6, { color: colors.textGray }]}>ADDITIONAL INFO</Text>
                </ListItem>
                <ListItem style={styles.listItemContainer}>
                  <Body>
                    <Input
                      placeholder="Set category"
                      placeholderTextColor={colors.textGray}
                      onChangeText={v => this.handleChange('category', v)}
                      value={transaction.category}
                      style={base.form__titleInput}
                    />
                  </Body>
                  <Right style={styles.listItem__rightIconContainer}>
                    <Icon name="ios-arrow-forward" style={{ color: colors.textGray }} />
                  </Right>
                </ListItem>
                <ListItem style={styles.listItemContainer}>
                  <Body>
                    <AutoGrowingTextInput
                      placeholder="Note"
                      placeholderTextColor={colors.textGray}
                      style={{
                        fontSize: 17,
                        color: '#fff',
                        paddingLeft: 5,
                      }}
                      onChangeText={v => this.handleChange('note', v)}
                      value={transaction.note}
                    />
                  </Body>
                </ListItem>
              </List>
            </ScrollView>
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
            <Text style={base.footer__buttonText}>ADD</Text>
          </Button>
        </Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  inProcess: state.inProcess,
  currencies: state.currencies,
  portfolios: state.portfolios,
});

const mapDispatchToProps = {
  getTransactionsList,
  getAvailableMarkets,
  getAvailableCurrencies,
  getCourse,
  updateProcessTransaction,
  clearProcessTransaction,
  addTransaction,
  clearMarkets,
  recalculate,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewTransaction);
