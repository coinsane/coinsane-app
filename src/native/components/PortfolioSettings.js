import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Footer, Left, Button, Title, Right, Form, Item, Label, Input } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import Icon from './Icon';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

class PortfolioSettings extends Component {
  static propTypes = {
    error: PropTypes.string,
    portfolioId: PropTypes.string.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    editPortfolio: PropTypes.func,
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
              .then(() => Actions.popTo('coins'))
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
      <Container>
        <Header style={{ backgroundColor: '#1B152D', borderBottomColor: '#2F2A40' }}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='Back' width={28} fill={'#fff'} />
            </Button>
          </Left>
          <Body>
            <Title>{portfolio.title}</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content padder style={{ backgroundColor: '#1B152D' }}>
          <Text style={{ color: '#8D8A96', fontSize: 14, letterSpacing: 1, fontFamily: 'Lato-Medium', marginBottom: 20, marginTop: 5 }}>{'Edit portfolio'.toUpperCase()}</Text>
          <Form>
            <Item stackedLabel style={{ marginLeft: 0, borderBottomColor: '#2F2A40' }}>
              <Label style={{ color: '#8D8A96', fontSize: 12, letterSpacing: 1, fontFamily: 'Lato-Regular' }}>Title</Label>
              <Input
                onChangeText={v => this.handleChange('title', v)}
                value={this.state.title}
                style={{ fontSize: 17, letterSpacing: -.25, fontFamily: 'Lato-Regular' }}
              />
            </Item>
            <CheckBox
              style={{flex: 1, paddingTop: 25, paddingBottom: 25, borderBottomColor: '#2F2A40', borderBottomWidth: 1 }}
              leftTextStyle={{ color: '#fff', fontSize: 17, letterSpacing: -.25, fontFamily: 'Lato-Regular' }}
              checkBoxColor={'#8D8A96'}
              onClick={() => this.handleChange('inTotal', !this.state.inTotal)}
              isChecked={this.state.inTotal}
              leftText={'Calculate amount on Total'}
             />
          </Form>
          <Button style={{ marginTop: 15, marginBottom: 15 }} transparent onPress={() => this.removePortfolioAlert()}>
            <Text style={{ color: '#F61067', fontSize: 17, fontFamily: 'Lato-Regular', paddingLeft: 0, paddingRight: 0 }}>Delete portfolio</Text>
          </Button>
          <Spacer size={20} />
        </Content>
        <Footer style={{ backgroundColor: '#1B152D', marginBottom: 15, paddingBottom: 15, borderTopWidth: 0 }}>
          <Button small full onPress={() => this.handleSubmit()} style={{ flex: 1, backgroundColor: '#282239', borderRadius: 5, marginTop: 15, marginBottom: 15, paddingTop: 25, paddingBottom: 15, marginLeft: 10, marginRight: 10 }}>
            <Text style={{ color: '#8D8A96', fontFamily: 'Lato-Medium' }}>SAVE</Text>
          </Button>
        </Footer>
      </Container>
    );

  }
}

export default PortfolioSettings;
