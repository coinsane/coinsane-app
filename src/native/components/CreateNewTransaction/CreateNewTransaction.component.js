import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StatusBar, ScrollView } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, List, Item, Label, Input, ListItem, Icon, Text, Button, Segment, Footer, Form } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import { Actions } from 'react-native-router-flux';
import Modal from '../modal/BaseModal.component';
import { getCourse, addTransaction } from '../../../actions/coins';
import { clearMarkets } from '../../../actions/markets';
import SwitchSelector from 'react-native-switch-selector';
import WiseStackedLabel from '../Atoms/WiseStackedLabel/WiseStackedLabel.atom';
import DatePicker from 'react-native-datepicker';
import { updateProccessTransaction, clearProccessTransaction } from '../../../actions/inProccess';
import styles from './CreateNewTransaction.styles';
import { colors, base, typography } from '../../styles';

class CreateNewTransaction extends Component {
  
  portfolio = {};
  coin = {};
  currency = {};
  
  componentWillMount() {
    // selected portfolio and coin
    this.portfolio = this.props.portfolios.list.filter(port => { return port._id === this.props.inProccess.transaction.portfolio })[0];
    this.coin = this.props.markets.list.filter(coin => { return coin._id === this.props.inProccess.transaction.coin })[0];
    this.currency = this.props.currencies.list.filter(currency => { return currency.code === 'USD' })[0];
    this.props.updateProccessTransaction({ currency: this.currency._id });
    // price for coin
    this.props.getCourse(this.coin.symbol, this.currency.code);
  }
  
  formatDate(d) {
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}. ${d.getHours()}:${d.getMinutes()}`;
  }
  
  changeCoin() {
    Actions.pop();
  }
  
  changeCurrency() {
    console.log('changeCurrency');
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
      let exp = /^\d*(\.{0,1}\d{0,4})$/;
      value = value.replace(/[,]/g, '.');
      value = value.replace(/[^0-9.]/g, '');
      if (exp.test(value)) {
        this.props.updateProccessTransaction({ [name]: { [this.currency.code]: value } });
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
  }
  
  onBlur = (name, val) => {
    console.log('blur');
    if (name === 'total') {
      let amount = parseFloat(this.props.inProccess.transaction.amount);
      let total = parseFloat(this.props.inProccess.transaction.total);
      let price = total/amount;
      if (!price || price === Infinity) {
        this.props.getCourse(this.coin.symbol, this.currency.code);
      } else {
        this.props.updateProccessTransaction({ price: { [this.currency.code]: price } });
      }
    } else {
      let value = parseFloat(this.props.inProccess.transaction.amount)*this.props.inProccess.transaction.price[this.currency.code];
      this.props.updateProccessTransaction({ total: value });
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
    this.onBlur();
    if (this.props.inProccess.transaction.amount != "0" && this.props.inProccess.transaction.total != "0") {
      this.props.addTransaction(this.props.inProccess.transaction);
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
                <ListItem style={ styles.listItemContainer } onPress={ () => Actions.portfolioSelect() } >
                  <Body>
                    <Text style={ [typography.smallest, { color: colors.textGray }] } >Choose portfolio</Text>
                    <Text style={ typography.menuSmall }>{ this.portfolio.title }</Text>
                  </Body>
                  <Right style={ styles.listItem__rightIconContainer }>
                    <Icon name="ios-arrow-forward" style={{ color: colors.textGray }} />
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <WiseStackedLabel
                      sublabel="Amount"
                      propName="amount"
                      clearTextOnFocus={ true }
                      onChangeText={ this.handleChange.bind(this) }
                      keyboardType="numeric"
                      onBlur={ this.onBlur.bind(this) }
                      value={this.props.inProccess.transaction.amount}
                    />
                  </Body>
                  <Right >
                    <Button style={ styles.listItem__rightButton } onPress={ () => { this.changeCoin() } }>
                      <Text style={ [typography.menuSmall, styles.listItem__rightButtonText] }>{ this.coin.symbol }</Text>
                      <Icon name="ios-arrow-forward" style={[styles.listItem__rightIcon, { color: colors.textGray }]} />
                    </Button>
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <WiseStackedLabel
                      sublabel="Price by coin"
                      propName="price"
                      clearTextOnFocus={ true }
                      onChangeText={ this.handleChange.bind(this) }
                      keyboardType="numeric"
                      onBlur={ this.onBlur.bind(this) }
                      value={this.props.inProccess.transaction.price[this.currency.code]+''}
                    />
                  </Body>
                  <Right >
                    <Button style={ styles.listItem__rightButton } onPress={ () => { this.changeCurrency() } }>
                      <Text style={ [typography.menuSmall, styles.listItem__rightButtonText] }>{ this.currency.code }</Text>
                      <Icon name="ios-arrow-forward" style={[styles.listItem__rightIcon, { color: colors.textGray }]} />
                    </Button>
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <WiseStackedLabel
                      sublabel="Total value"
                      propName="total"
                      clearTextOnFocus={ true }
                      onChangeText={ this.handleChange.bind(this) }
                      keyboardType="numeric"
                      onBlur={ this.onBlur.bind(this) }
                      value={this.props.inProccess.transaction.total+''}
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
                      date={this.props.inProccess.transaction.date}
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
                    <Text style={ [typography.menuSmall, { color: colors.textGray }] } >Set Category</Text>
                  </Body>
                  <Right style={ styles.listItem__rightIconContainer }>
                    <Icon name="ios-arrow-forward" style={{ color: colors.textGray }} />
                  </Right>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <Text style={ [typography.menuSmall, { color: colors.textGray }] } >Note</Text>
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

const mapStateToProps = ({ markets, currencies, inProccess, portfolios }) => {
  return {
    markets,
    currencies,
    inProccess,
    portfolios
  };
}

export default connect(
  mapStateToProps, 
  { 
    getCourse, 
    updateProccessTransaction, 
    clearProccessTransaction, 
    addTransaction,
    clearMarkets
  })(CreateNewTransaction);
