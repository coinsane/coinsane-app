import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
// import { Actions } from 'react-native-router-flux';

import i18n from 'src/i18n'

import Header from 'src/native/components/_Organisms/Header';
import { Logo } from 'src/native/components/Svg';

import { base } from 'src/native/styles';

interface IState {
  email: string;
  password: string;
  password2: string;
}

class SignUp extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name: string, val: string) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  handleSubmit = () => {
    // this.props.onFormSubmit(this.state)
    //   .then(() => Actions.login())
    // // .catch(e => console.log(`Error: ${e}`));
  };

  render () {
    return (
      <Container>
        <Header
          leftIcon="Close"
          title=""
        />
        <Content padder style={base.contentContainer}>
          <View>
            <Logo />
            <Text>{i18n.t('auth.signUp.title')}</Text>
          </View>
          <Form>
            <View>
              <Item stackedLabel>
                <Label>{i18n.t('auth.form.email')}</Label>
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
              <Item stackedLabel>
                <Label>{i18n.t('auth.form.password')}</Label>
                <Input
                  secureTextEntry
                  onChangeText={v => this.handleChange('password', v)}
                />
              </Item>

              <Item stackedLabel>
                <Label>{i18n.t('auth.form.confirm')}</Label>
                <Input
                  secureTextEntry
                  onChangeText={v => this.handleChange('password2', v)}
                />
              </Item>
              <Text>{i18n.t('auth.signUp.text')}</Text>
            </View>
            <View>
              <Text>{i18n.t('auth.signUp.link')}</Text>
              <Button
                onPress={this.handleSubmit}
                style={base.action__button}
              >
                <Text>{i18n.t('auth.signUp.button')}</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
