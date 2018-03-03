import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Footer, Left, Button, Title, Right, Form, Item, Label, Input } from 'native-base';
import Error from './Error';
import Spacer from './Spacer';
import Icon from './Icon';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

import styles from './CreatePortfolio.styles';
import { colors, base } from '../styles';

class CreatePortfolio extends Component {
  static propTypes = {
    portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    addPortfolio: PropTypes.func,
    selectPortfolio: PropTypes.func,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      inTotal: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { addPortfolio, selectPortfolio, portfolios } = this.props;
    addPortfolio(this.state)
      .then(action => selectPortfolio(action.data.id))
      .then(Actions.pop)
      .catch(e => console.log(`Error: ${e}`));
  }


  render() {

    return (
      <Container style={base.contentContainer}>
        <Header style={styles.contentHeader}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='Back' width={28} fill={colors.white} />
            </Button>
          </Left>
          <Body>
            <Title>Add new portfolio</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content style={styles.content}>
          <Text style={styles.content__text}>{'Basic'.toUpperCase()}</Text>
          <Form>
            <Item stackedLabel style={styles.form__titleContainer}>
              <Label style={styles.form__titleLabel}>Portfolio title</Label>
              <Input
                autoFocus
                onChangeText={v => this.handleChange('title', v)}
                value={this.state.title}
                style={styles.form__titleInput}
              />
            </Item>
            <CheckBox
              style={styles.form__checkbox}
              leftTextStyle={styles.form__checkboxText}
              checkBoxColor={colors.textGray}
              onClick={() => this.handleChange('inTotal', !this.state.inTotal)}
              isChecked={this.state.inTotal}
              leftText={'Calculate amount on Total'}
             />
          </Form>
        </Content>
        <Footer style={base.footer}>
          <Button
            small
            full
            onPress={() => this.handleSubmit()}
            style={base.footer__button}
          >
            <Text style={base.footer__buttonText}>ADD</Text>
          </Button>
        </Footer>
      </Container>
    );

  }
}

export default CreatePortfolio;
