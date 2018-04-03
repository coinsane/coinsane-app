import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StatusBar, ScrollView } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, List, Item, Label, Input, ListItem, Icon, Text, Button, Segment, Footer, Form } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import { Actions } from 'react-native-router-flux';
import Modal from '../modal/BaseModal.component';
import { getCourse, addTransaction } from '../../../redux/state/coin/coin.actioncreators';
import SwitchSelector from 'react-native-switch-selector';
import CoinsaneStackedLabel from '../_Atoms/CoinsaneStackedLabel/CoinsaneStackedLabel.atom';
import DatePicker from 'react-native-datepicker';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { updateProccessTransaction, clearProccessTransaction, recalculate } from '../../../redux/state/inProcess/inProcess.actioncreators';
import { getAvaliableMarkets, clearMarkets } from '../../../redux/state/markets/markets.actioncreators';
import { getAvaliableCurrencies } from '../../../redux/state/currencies/currencies.actioncreators';
import styles from './CreateNewTransaction.styles';
import { colors, base, typography } from '../../styles';

class CreateNewTransaction extends Component {

  componentWillMount() {
    // selected portfolio and coin
    const portfolioItem = this.props.portfolios.list.filter(portfolio => { return portfolio._id === this.props.inProcess.transaction.portfolio })[0];
    const currencyItem = this.props.currencies.list.filter(currency => { return currency.code === 'USD' })[0];
    let update = {
      portfolioItem,
      currencyItem,
      currency: currencyItem._id
    };
    this.props.updateProccessTransaction(update);
    this.props.recalculate();
  }

  componentDidMount() {
    console.log(this.props.inProcess.transaction);
  }

  static onEnter() {
    console.log('On Enter');
  }

  formatDate(d) {
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}. ${d.getHours()}:${d.getMinutes()}`;
  }

  changeCoin() {
    Actions.selector({
      preLoad: () => {
        this.props.getAvaliableMarkets();
        this.props.getAvaliableCurrencies();
      },
      clear: () => {
        this.props.clearMarkets();
      },
      title: 'Select coin',
      listItemType: 'arrow',
      navigationType: 'close',
      searchBar: true,
      listName: 'markets',
      selectAction: (coin) => { // id - of selected item
        this.props.updateProccessTransaction({ coin: coin._id, coinItem: coin });
        this.props.recalculate();
        Actions.pop();
      }
    });
  }

  changeCurrency() {
    Actions.selector({
      preLoad: () => {
        this.props.getAvaliableMarkets();
        this.props.getAvaliableCurrencies();
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
        this.props.updateProccessTransaction({ currency: currency._id, currencyItem: currency });
        this.props.recalculate();
        Actions.pop();
      },
      closeType: 'close'
    });
  }

  changePortfolio() {
    Actions.selector({
      title: 'Choose portfolio',
      listItemType: 'blank',
      navigationType: 'back',
      searchBar: false,
      listName: 'portfolios',
      selectAction: (portfolio) => { // selected item
        this.props.updateProccessTransaction({ portfolio: portfolio._id, portfolioItem: portfolio });
        Actions.pop();
      },
      closeType: 'close'
    });
  }

  handleChange = (name, val) => {
    let value = val;
    if (name === 'amount') {
      let exp = /^\d*(\.{0,1}\d{0,8})$/;
      value = value.replace(/[,]/g, '.');
      value = value.replace(/[^0-9.]/g, '');
      if (exp.test(value)) {
        this.props.updateProccessTransaction({ [name]: value });
      }
    }
    if (name === 'price') {
      let exp = /^\d*(\.{0,1}\d{0,8})$/;
      value = value.replace(/[,]/g, '.');
      value = value.replace(/[^0-9.]/g, '');
      if (exp.test(value)) {
        this.props.updateProccessTransaction({ [name]: value });
      }
    }
    if (name === 'total') {
      let exp = /^\d*(\.{0,1}\d{0,8})$/;
      value = value.replace(/[,]/g, '.');
      value = value.replace(/[^0-9.]/g, '');
      if (exp.test(value)) {
        this.props.updateProccessTransaction({ [name]: value });
      }
    }
    if (name === 'category') {
      this.props.updateProccessTransaction({ [name]: value });
    }
    if (name === 'note') {
      this.props.updateProccessTransaction({ [name]: value });
    }
  }

  onBlur = (fieldName) => {

    // Check that always be a price
    if (!+this.props.inProcess.transaction.price || this.props.inProcess.transaction.price === Infinity) {
      this.props.getCourse(this.props.inProcess.transaction.coinItem.symbol, this.props.inProcess.transaction.currencyItem.code);
      return;
    } else {
      this.props.recalculate(fieldName);
    }
  }

  close() {
    // clear selected coin
    Actions.pop()
    this.props.clearProccessTransaction();
  }

  toggleSegment(value) {
    this.props.updateProccessTransaction({ buy: value });
  }

  addTransaction() {
    if (+this.props.inProcess.transaction.amount && +this.props.inProcess.transaction.total) {
      this.props.addTransaction(this.props.inProcess.transaction);
      this.props.clearProccessTransaction();
      this.props.clearMarkets();
      Actions.coins();
    }
  }

  render() {

    const segmentOptions = [
        { label: 'BUY', value: true },
        { label: 'SELL', value: false }
    ];

    return (
      <Modal hideClose>
        <Container>
          <Header style={styles.headerContainer}>
            <StatusBar barStyle="light-content"/>
            <Left>
              <Button transparent onPress={() => this.close()}>
                <Icon name='ios-arrow-back' width={28} style={{ color: colors.white }} />
              </Button>
            </Left>
            <Body>
              <Title>{'Add new transaction'}</Title>
            </Body>
            <Right></Right>
          </Header>
          <Content padder style={{ backgroundColor: colors.bgGray }}>
            <ScrollView
              keyboardShouldPersistTaps='never'
            >
              <SwitchSelector options={segmentOptions} initial={0} onPress={value => this.toggleSegment(value)} buttonColor={colors.inputBg} backgroundColor={colors.bgGray} textColor={colors.textGray} />
              <List>
                <ListItem style={ styles.listItemContainer } onPress={ () => this.changePortfolio() } >
                  <Body>
                    <Text style={ [typography.smallest, { color: colors.textGray }] } >Choose portfolio</Text>
                    <Text style={ typography.menuSmall }>{ this.props.inProcess.transaction.portfolioItem.title }</Text>
                  </Body>
                  <Right style={ styles.listItem__rightIconContainer }>
                    <Icon name="ios-arrow-forward" style={{ color: colors.textGray }} />
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <CoinsaneStackedLabel
                      sublabel="Amount"
                      propName="amount"
                      clearTextOnFocus={ true }
                      onChangeText={ this.handleChange.bind(this) }
                      keyboardType="numeric"
                      onBlur={ this.onBlur.bind(this) }
                      value={this.props.inProcess.transaction.amount+''}
                    />
                  </Body>
                  <Right >
                    <Button style={ styles.listItem__rightButton } onPress={ () => { this.changeCoin() } }>
                      <Text style={ [typography.menuSmall, styles.listItem__rightButtonText] }>{ this.props.inProcess.transaction.coinItem.symbol }</Text>
                      <Icon name="ios-arrow-forward" style={[styles.listItem__rightIcon, { color: colors.textGray }]} />
                    </Button>
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <CoinsaneStackedLabel
                      sublabel="Price by coin"
                      propName="price"
                      clearTextOnFocus={ false }
                      onChangeText={ this.handleChange.bind(this) }
                      keyboardType="numeric"
                      onBlur={ this.onBlur.bind(this) }
                      value={this.props.inProcess.transaction.price+''}
                    />
                  </Body>
                  <Right >
                    <Button style={ styles.listItem__rightButton } onPress={ () => { this.changeCurrency() } }>
                      <Text style={ [typography.menuSmall, styles.listItem__rightButtonText] }>{ this.props.inProcess.transaction.currencyItem.code }</Text>
                      <Icon name="ios-arrow-forward" style={[styles.listItem__rightIcon, { color: colors.textGray }]} />
                    </Button>
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <CoinsaneStackedLabel
                      sublabel="Total value"
                      propName="total"
                      clearTextOnFocus={ true }
                      onChangeText={ this.handleChange.bind(this) }
                      keyboardType="numeric"
                      onBlur={ this.onBlur.bind(this) }
                      value={this.props.inProcess.transaction.total+''}
                    />
                  </Body>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <Text style={ [typography.smallest, { color: colors.textGray }] } >Date and time</Text>
                    <DatePicker
                      style={{
                        width: '100%'
                      }}
                      date={this.props.inProcess.transaction.date}
                      mode="datetime"
                      placeholder="select date"
                      format="YYYY-MM-DD, hh:mm"
                      confirmBtnText="Set"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          display: 'none'
                        },
                        dateInput: {
                          height: 21,
                          paddingLeft: 10,
                          borderWidth: 0,
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start'
                        },
                        dateText: {
                          fontSize: 17,
                          color: colors.white
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {this.props.updateProccessTransaction({date: new Date(date)})}}
                    />
                  </Body>
                </ListItem>
                <ListItem itemHeader>
                  <Text style={ typography.h6, { color: colors.textGray } }>ADDITIONAL INFO</Text>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <Input
                      placeholder='Set category'
                      placeholderTextColor={ colors.textGray }
                      onChangeText={v => this.handleChange('category', v)}
                      value={this.props.inProcess.transaction.category}
                      style={base.form__titleInput}
                    />
                  </Body>
                  <Right style={ styles.listItem__rightIconContainer }>
                    <Icon name="ios-arrow-forward" style={{ color: colors.textGray }} />
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <AutoGrowingTextInput
                      placeholder='Note'
                      placeholderTextColor={ colors.textGray }
                      style={{
                        fontSize: 17,
                        color: '#fff',
                        paddingLeft: 5
                      }}
                      onChangeText={v => this.handleChange('note', v)}
                      value={this.props.inProcess.transaction.note}
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

const mapStateToProps = ({ markets, currencies, inProcess, portfolios }) => {
  return {
    markets,
    currencies,
    inProcess,
    portfolios
  };
}

export default connect(
  mapStateToProps,
  {
    getAvaliableMarkets,
    getAvaliableCurrencies,
    getCourse,
    updateProccessTransaction,
    clearProccessTransaction,
    addTransaction,
    clearMarkets,
    recalculate
  })(CreateNewTransaction);
