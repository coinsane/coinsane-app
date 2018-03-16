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
      let exp = /^\d*(\.*\d*)$/;
      value = value.replace(/[,]/g, '.');
      value = value.replace(/[^0-9.]/g, '') 
      if (exp.test(value)) {
        this.props.updateProccessTransaction({ [name]: value });
      }
    } else {
      this.props.updateProccessTransaction({ [name]: value });
    }
  }
  
  onBlur() {
    console.log('blur');
    let value = parseFloat(this.props.inProccess.transaction.amount)*this.props.inProccess.course['USD'];
    this.props.updateProccessTransaction({ total: value });
  }
  
  close() {
    // clear selected coin
    Actions.pop()
    this.props.clearProccessTransaction();
  }
  
  toggleSegment() {
    this.props.updateProccessTransaction({ buy: !this.props.inProccess.transaction.buy });
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
              <Segment style={ styles.segmentControl } >
                <Button first active={ this.props.inProccess.transaction.buy } onPress={ () => { this.toggleSegment() } } style={ styles.segmentBtn } ><Text>BUY</Text></Button>
                <Button last active={ !this.props.inProccess.transaction.buy } onPress={ () => { this.toggleSegment() } } style={ styles.segmentBtn } ><Text>SELL</Text></Button>
              </Segment>
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
                    <Item stackedLabel style={base.listItem__labelInputContainer}>
                      <Label style={[typography.smallest, { color: colors.textGray }]}>Amount</Label>
                      <Input
                        clearTextOnFocus={true}
                        keyboardType='numeric'
                        onChangeText={v => this.handleChange('amount', v)}
                        onBlur={e => this.onBlur()}
                        value={this.props.inProccess.transaction.amount+''}
                        style={base.listItem__labelInput}
                      />
                    </Item>
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
                    <Text style={ [typography.smallest, { color: colors.textGray }] } >Price by coin</Text>
                    <Text style={ typography.menuSmall }>{ this.currency.symbol + this.props.inProccess.course['USD'] }</Text>
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
                    <Text style={ [typography.smallest, { color: colors.textGray }] } >Total value</Text>
                    <Text style={ typography.menuSmall }>{ this.currency.symbol + this.props.inProccess.transaction.total+''}</Text>
                  </Body>
                </ListItem>
                <ListItem style={ styles.listItemContainer } >
                  <Body>
                    <Text style={ [typography.smallest, { color: colors.textGray }] } >Date and time</Text>
                    <Text style={ typography.menuSmall }>{ this.formatDate(this.props.inProccess.transaction.date) }</Text>
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
