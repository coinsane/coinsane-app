import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Footer, Left, Button, Title, Right, Form, Item, Label, Input } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import Error from '../Error/Error.component';
import Spacer from '../Spacer/Spacer.component';
import Icon from '../Icon/Icon.component';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

import styles from './PortfolioSettings.styles';
import { colors, base } from '../../styles';

class PortfolioSettings extends Component {
  static propTypes = {
    error: PropTypes.string,
    portfolioId: PropTypes.string.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    editPortfolio: PropTypes.func,
    selectPortfolio: PropTypes.func,
    removePortfolio: PropTypes.func
  }

  static defaultProps = {
    error: null
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.getPortfolio()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getPortfolio = () => {
    const { portfolios, portfolioId } = this.props;
    return portfolioId && portfolios ? portfolios.find(item => item.id === portfolioId) : null;
  }

  handleChange = (name, val) => {
    console.log('handleChange', name, val)
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    console.log('handleSubmit this.state', this.state)
    this.props.editPortfolio(this.state)
      .then(() => Actions.pop())
      .catch(e => console.log(`Error: ${e}`));
  }

  removePortfolioAlert = () => {
    Alert.alert(
      'Delete portfolio',
      'Are you sure?',
      [
        {
          text: 'Delete',
          onPress: () => {
            this.props.removePortfolio(this.state.id)
              .then(() => this.props.selectPortfolio())
              .then(Actions.pop)
              .catch(e => console.log(`Error: ${e}`));
          },
          style: 'cancel'
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed')
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const {
      error,
      portfolios,
      portfolioId,
      editPortfolio,
      removePortfolio
    } = this.props;

    // Error
    if (error) return <Error content={error} />;

    // Get this Portfolio from all portfolios
    let portfolio = this.getPortfolio();

    // Portfolio not found
    if (!portfolio) return <Error content={ErrorMessages.portfolio404} />;

    return (
      <Container style={base.contentContainer}>
        <Header style={styles.settings__header}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='Back' width={28} fill={colors.white} />
            </Button>
          </Left>
          <Body>
            <Title>{portfolio.title}</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content style={styles.settings__container}>
          <Text style={styles.container__text}>{'Edit portfolio'.toUpperCase()}</Text>
          <Form>
            <Item stackedLabel style={base.form__titleContainer}>
              <Label style={base.form__titleLabel}>Portfolio title</Label>
              <Input
                onChangeText={v => this.handleChange('title', v)}
                value={this.state.title}
                style={base.form__titleInput}
              />
            </Item>
            <CheckBox
              style={base.form__checkbox}
              leftTextStyle={base.form__checkboxText}
              checkBoxColor={colors.textGray}
              onClick={() => this.handleChange('inTotal', !this.state.inTotal)}
              isChecked={this.state.inTotal}
              leftText={'Calculate amount on Total'}
             />
          </Form>
          <Button style={styles.form__button} transparent onPress={() => this.removePortfolioAlert()}>
            <Text style={styles.form__buttonText}>Delete portfolio</Text>
          </Button>
        </Content>
        <Footer style={base.footer}>
          <Button
            small
            full
            onPress={() => this.handleSubmit()}
            style={styles.footer__button}
          >
            <Text style={base.footer__buttonText}>SAVE</Text>
          </Button>
        </Footer>
      </Container>
    );

  }
}

export default PortfolioSettings;