import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, List, Item, Label, Input, ListItem, Icon, Text, Button, Segment, Footer } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import { Actions } from 'react-native-router-flux';
import Modal from '../modal/BaseModal.component';
import styles from './CreateNewTransaction.styles';
import { colors, base, typography } from '../../styles';

class CreateNewTransaction extends Component {
  
  portfolio = {};
  coin = {};
  currency = {};
  
  componentWillMount() {
    // selected coin
    // price for coin
    // price total
    this.setState({
      buy: true,
      portfolioId: this.props.inProccess.transaction.portfolioId,
      coinId: this.props.inProccess.transaction.coinId,
      amount: 0
    });
    
    this.portfolio = this.props.portfolios.list.filter(port => { return port._id === this.props.inProccess.transaction.portfolioId })[0];
    this.coin = this.props.coins.list.filter(coin => { return coin._id === this.props.inProccess.transaction.coinId })[0];
  }
  
  changeCoin() {
    Actions.pop();
  }
  
  changeCurrency() {
    console.log('changeCurrency');
  }
  
  formatDate(date) {
    let d = date || new Date();
    let formattedDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}. ${d.getHours()}:${d.getMinutes()}`;
    return formattedDate;
  }
  
  close() {
    // clear selected coin
    Actions.pop()
  }
  
  toggleSegment() {
    this.setState({
      buy: !this.state.buy
    });
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
            <Segment style={ styles.segmentControl } >
              <Button first active={ this.state.buy } onPress={ () => { this.toggleSegment() } } style={ styles.segmentBtn } ><Text>BUY</Text></Button>
              <Button last active={ !this.state.buy } onPress={ () => { this.toggleSegment() } } style={ styles.segmentBtn } ><Text>SELL</Text></Button>
            </Segment>
            <List>
              <ListItem style={ styles.listItemContainer } >
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
                      value={this.state.amount}
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
                  <Text style={ typography.menuSmall }>$8,265.00</Text>
                </Body>
                <Right >
                  <Button style={ styles.listItem__rightButton } onPress={ () => { this.changeCurrency() } }>
                    <Text style={ [typography.menuSmall, styles.listItem__rightButtonText] }>{ this.currency.symbol || 'USD' }</Text>
                    <Icon name="ios-arrow-forward" style={[styles.listItem__rightIcon, { color: colors.textGray }]} />
                  </Button>
                </Right>
              </ListItem>
              <ListItem style={ styles.listItemContainer } >
                <Body>
                  <Text style={ [typography.smallest, { color: colors.textGray }] } >Total value</Text>
                  <Text style={ typography.menuSmall }>$17,530.00</Text>
                </Body>
              </ListItem>
              <ListItem style={ styles.listItemContainer } >
                <Body>
                  <Text style={ [typography.smallest, { color: colors.textGray }] } >Date and time</Text>
                  <Text style={ typography.menuSmall }>{ this.formatDate() }</Text>
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
          </Content>
        </Container>
        <Footer style={base.footer}>
          <Button
            small
            full
            bordered
            onPress={() => {}}
            style={base.footer__button}
          >
            <Text style={base.footer__buttonText}>ADD</Text>
          </Button>
        </Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({ coins, inProccess, portfolios }) => {
  return {
    coins,
    inProccess,
    portfolios
  };
}

export default connect(mapStateToProps)(CreateNewTransaction);
