import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Header, Footer, Left, Button, Title, Right, Form, Item, Label, Input } from 'native-base';
import Error from './Error';
import Spacer from './Spacer';
import Icon from './Icon';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

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
      <Container style={{ backgroundColor: '#1B152D' }}>
        <Header style={{ backgroundColor: '#1B152D', borderBottomColor: '#2F2A40' }}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='Back' width={28} fill={'#fff'} />
            </Button>
          </Left>
          <Body>
            <Title>Add new portfolio</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content style={{ backgroundColor: '#1B152D', paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingRight: 15 }}>
          <Text style={{ color: '#8D8A96', fontSize: 14, letterSpacing: 1, fontFamily: 'Lato-Medium', marginBottom: 20, marginTop: 5 }}>{'Basic'.toUpperCase()}</Text>
          <Form>
            <Item stackedLabel style={{ marginLeft: 0, borderBottomColor: '#2F2A40' }}>
              <Label style={{ color: '#8D8A96', fontSize: 12, letterSpacing: 1, fontFamily: 'Lato-Regular' }}>Portfolio title</Label>
              <Input
                autoFocus
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
        </Content>
        <Footer style={{ backgroundColor: '#1B152D', marginBottom: 15, paddingBottom: 15, borderTopWidth: 0 }}>
          <Button small full onPress={() => this.handleSubmit()} style={{ flex: 1, backgroundColor: '#282239', borderRadius: 5, marginTop: 15, marginBottom: 15, paddingTop: 25, paddingBottom: 15, marginLeft: 15, marginRight: 15 }}>
            <Text style={{ color: '#8D8A96', fontFamily: 'Lato-Medium' }}>ADD</Text>
          </Button>
        </Footer>
      </Container>
    );

  }
}

export default CreatePortfolio;
